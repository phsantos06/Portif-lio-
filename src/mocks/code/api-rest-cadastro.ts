import type { ProjectCode } from "./types";

export const apiRestCode: ProjectCode = {
  slug: "api-rest-cadastro",
  title: "API REST de Cadastro",
  files: [
    {
      name: "app.py",
      language: "python",
      content: `"""
API REST de Cadastro de Usuários
Flask + SQLAlchemy + JWT Authentication
"""

from datetime import datetime, timedelta, timezone
from functools import wraps

import bcrypt
import jwt
from flask import Flask, jsonify, request
from flask_cors import CORS
from pydantic import BaseModel, EmailStr, Field, ValidationError
from sqlalchemy import Column, DateTime, Integer, String, create_engine
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, declarative_base, sessionmaker

# ===== Configuração =====
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

app.config["SECRET_KEY"] = "sua-chave-secreta-aqui"
app.config["JWT_EXPIRATION_HOURS"] = 24

engine = create_engine("sqlite:///users.db", echo=False)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


# ===== Modelo SQLAlchemy =====
class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )


Base.metadata.create_all(bind=engine)


# ===== Schemas Pydantic =====
class UserCreateSchema(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserUpdateSchema(BaseModel):
    name: str | None = Field(None, min_length=2, max_length=120)
    password: str | None = Field(None, min_length=8, max_length=128)


# ===== Utilitários =====
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode(), salt).decode()


def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())


def generate_jwt(user_id: int) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.now(timezone.utc)
        + timedelta(hours=app.config["JWT_EXPIRATION_HOURS"]),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")


def decode_jwt(token: str) -> dict | None:
    try:
        return jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ===== Decorator de Autenticação =====
def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({
                "error": "Token não fornecido",
                "code": "MISSING_TOKEN",
            }), 401

        token = auth_header.split(" ")[1]
        payload = decode_jwt(token)
        if payload is None:
            return jsonify({
                "error": "Token inválido ou expirado",
                "code": "INVALID_TOKEN",
            }), 401

        request.user_id = payload["user_id"]
        return f(*args, **kwargs)
    return decorated


# ===== Rotas =====
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": "1.0.0",
    })


@app.route("/api/auth/register", methods=["POST"])
def register():
    try:
        data = UserCreateSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({
            "error": "Dados inválidos",
            "details": e.errors(),
            "code": "VALIDATION_ERROR",
        }), 422

    db = next(get_db())

    existing = db.query(UserModel).filter_by(email=data.email).first()
    if existing:
        return jsonify({
            "error": "Email já cadastrado",
            "code": "EMAIL_EXISTS",
        }), 409

    user = UserModel(
        name=data.name,
        email=data.email,
        password_hash=hash_password(data.password),
    )

    try:
        db.add(user)
        db.commit()
        db.refresh(user)
        token = generate_jwt(user.id)
        return jsonify({
            "message": "Usuário criado com sucesso",
            "user": {"id": user.id, "name": user.name, "email": user.email},
            "token": token,
        }), 201
    except IntegrityError:
        db.rollback()
        return jsonify({
            "error": "Erro ao criar usuário",
            "code": "DATABASE_ERROR",
        }), 500
    finally:
        db.close()


@app.route("/api/auth/login", methods=["POST"])
def login():
    try:
        data = UserLoginSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({
            "error": "Dados inválidos",
            "details": e.errors(),
            "code": "VALIDATION_ERROR",
        }), 422

    db = next(get_db())
    user = db.query(UserModel).filter_by(email=data.email).first()

    if not user or not verify_password(data.password, user.password_hash):
        return jsonify({
            "error": "Email ou senha incorretos",
            "code": "INVALID_CREDENTIALS",
        }), 401

    token = generate_jwt(user.id)
    return jsonify({
        "message": "Login realizado com sucesso",
        "user": {"id": user.id, "name": user.name, "email": user.email},
        "token": token,
    })


@app.route("/api/users/me", methods=["GET"])
@require_auth
def get_profile():
    db = next(get_db())
    user = db.query(UserModel).get(request.user_id)
    if not user:
        return jsonify({
            "error": "Usuário não encontrado",
            "code": "USER_NOT_FOUND",
        }), 404

    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "created_at": user.created_at.isoformat(),
        },
    })


@app.route("/api/users/me", methods=["PUT", "PATCH"])
@require_auth
def update_profile():
    try:
        data = UserUpdateSchema(**request.get_json())
    except ValidationError as e:
        return jsonify({
            "error": "Dados inválidos",
            "details": e.errors(),
            "code": "VALIDATION_ERROR",
        }), 422

    db = next(get_db())
    user = db.query(UserModel).get(request.user_id)
    if not user:
        return jsonify({
            "error": "Usuário não encontrado",
            "code": "USER_NOT_FOUND",
        }), 404

    if data.name is not None:
        user.name = data.name
    if data.password is not None:
        user.password_hash = hash_password(data.password)

    db.commit()
    return jsonify({
        "message": "Perfil atualizado",
        "user": {"id": user.id, "name": user.name, "email": user.email},
    })


@app.route("/api/users/me", methods=["DELETE"])
@require_auth
def delete_account():
    db = next(get_db())
    user = db.query(UserModel).get(request.user_id)
    if not user:
        return jsonify({
            "error": "Usuário não encontrado",
            "code": "USER_NOT_FOUND",
        }), 404

    db.delete(user)
    db.commit()
    return jsonify({"message": "Conta excluída com sucesso"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)`,
    },
  ],
};