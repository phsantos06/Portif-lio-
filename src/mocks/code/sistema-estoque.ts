import type { ProjectCode } from "./types";

export const sistemaEstoqueCode: ProjectCode = {
  slug: "sistema-estoque",
  title: "Sistema de Gerenciamento de Estoque",
  files: [
    {
      name: "InventoryController.cs",
      language: "csharp",
      content: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryDbContext _context;

        public InventoryController(InventoryDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lista todos os produtos com filtros e paginação
        /// </summary>
        [HttpGet("products")]
        public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
            [FromQuery] string search = "",
            [FromQuery] string category = "",
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Include(p => p.Supplier)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p =>
                    p.Name.Contains(search) ||
                    p.Code.Contains(search) ||
                    p.Supplier.Name.Contains(search)
                );
            }

            if (!string.IsNullOrWhiteSpace(category))
            {
                query = query.Where(p => p.Category.Name == category);
            }

            var total = await query.CountAsync();

            var products = await query
                .OrderBy(p => p.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Code = p.Code,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    MinQuantity = p.MinQuantity,
                    Category = p.Category.Name,
                    Supplier = p.Supplier.Name,
                    Status = p.Quantity <= p.MinQuantity
                        ? "low_stock"
                        : p.Quantity == 0 ? "out_of_stock" : "in_stock",
                })
                .ToListAsync();

            return Ok(new PagedResult<ProductDto>
            {
                Items = products,
                Total = total,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling((double)total / pageSize),
            });
        }

        /// <summary>
        /// Registra entrada de produto no estoque
        /// </summary>
        [HttpPost("movements/in")]
        public async Task<ActionResult> RegisterStockIn(
            [FromBody] StockMovementRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Produto não encontrado");

            var movement = new StockMovement
            {
                ProductId = request.ProductId,
                Type = MovementType.In,
                Quantity = request.Quantity,
                UnitPrice = request.UnitPrice,
                Notes = request.Notes,
                Date = DateTime.UtcNow,
                UserId = GetCurrentUserId(),
            };

            product.Quantity += request.Quantity;
            _context.StockMovements.Add(movement);
            await _context.SaveChangesAsync();

            await CheckLowStockAlerts(product);

            return Ok(new
            {
                message = "Entrada registrada com sucesso",
                currentQuantity = product.Quantity,
            });
        }

        /// <summary>
        /// Registra saída de produto do estoque
        /// </summary>
        [HttpPost("movements/out")]
        public async Task<ActionResult> RegisterStockOut(
            [FromBody] StockMovementRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null)
                return NotFound("Produto não encontrado");

            if (product.Quantity < request.Quantity)
                return BadRequest("Quantidade insuficiente em estoque");

            var movement = new StockMovement
            {
                ProductId = request.ProductId,
                Type = MovementType.Out,
                Quantity = request.Quantity,
                UnitPrice = product.Price,
                Notes = request.Notes,
                Date = DateTime.UtcNow,
                UserId = GetCurrentUserId(),
            };

            product.Quantity -= request.Quantity;
            _context.StockMovements.Add(movement);
            await _context.SaveChangesAsync();

            await CheckLowStockAlerts(product);

            return Ok(new
            {
                message = "Saída registrada com sucesso",
                currentQuantity = product.Quantity,
            });
        }

        /// <summary>
        /// Verifica e dispara alertas de estoque baixo
        /// </summary>
        private async Task CheckLowStockAlerts(Product product)
        {
            if (product.Quantity <= product.MinQuantity)
            {
                var alert = new StockAlert
                {
                    ProductId = product.Id,
                    ProductName = product.Name,
                    CurrentQuantity = product.Quantity,
                    MinQuantity = product.MinQuantity,
                    CreatedAt = DateTime.UtcNow,
                    Status = AlertStatus.Pending,
                };

                _context.StockAlerts.Add(alert);
                await _context.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Gera relatório de inventário
        /// </summary>
        [HttpGet("report")]
        public async Task<ActionResult<InventoryReport>> GetReport(
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null)
        {
            var startDate = from ?? DateTime.UtcNow.AddMonths(-1);
            var endDate = to ?? DateTime.UtcNow;

            var movements = await _context.StockMovements
                .Include(m => m.Product)
                .Where(m => m.Date >= startDate && m.Date <= endDate)
                .ToListAsync();

            var totalIn = movements
                .Where(m => m.Type == MovementType.In)
                .Sum(m => m.Quantity * m.UnitPrice);

            var totalOut = movements
                .Where(m => m.Type == MovementType.Out)
                .Sum(m => m.Quantity * m.UnitPrice);

            var topProducts = movements
                .GroupBy(m => m.Product.Name)
                .Select(g => new ProductMovementSummary
                {
                    ProductName = g.Key,
                    TotalQuantity = g.Sum(m => m.Quantity),
                    TotalValue = g.Sum(m => m.Quantity * m.UnitPrice),
                })
                .OrderByDescending(s => s.TotalValue)
                .Take(10)
                .ToList();

            return Ok(new InventoryReport
            {
                Period = new { From = startDate, To = endDate },
                TotalInValue = totalIn,
                TotalOutValue = totalOut,
                TotalMovements = movements.Count,
                TopProducts = topProducts,
            });
        }

        private int GetCurrentUserId()
        {
            return int.Parse(User.FindFirst("userId")?.Value ?? "0");
        }
    }
}`,
    },
    {
      name: "schema.sql",
      language: "sql",
      content: `-- ========================================
-- Inventory Manager - Database Schema
-- SQL Server
-- ========================================

-- Tabela de Categorias
CREATE TABLE Categories (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    IsActive    BIT DEFAULT 1,
    CreatedAt   DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt   DATETIME2 DEFAULT GETUTCDATE(),
    CONSTRAINT UQ_Category_Name UNIQUE (Name)
);

-- Tabela de Fornecedores
CREATE TABLE Suppliers (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(200) NOT NULL,
    CNPJ        NVARCHAR(18),
    Phone       NVARCHAR(20),
    Email       NVARCHAR(255),
    Address     NVARCHAR(500),
    IsActive    BIT DEFAULT 1,
    CreatedAt   DATETIME2 DEFAULT GETUTCDATE(),
    CONSTRAINT UQ_Supplier_CNPJ UNIQUE (CNPJ)
);

-- Tabela de Produtos
CREATE TABLE Products (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    Code            NVARCHAR(50) NOT NULL,
    Name            NVARCHAR(200) NOT NULL,
    Description     NVARCHAR(1000),
    Price           DECIMAL(18,2) NOT NULL DEFAULT 0,
    Quantity        INT NOT NULL DEFAULT 0,
    MinQuantity     INT NOT NULL DEFAULT 5,
    CategoryId      INT NOT NULL,
    SupplierId      INT,
    ImageUrl        NVARCHAR(500),
    IsActive        BIT DEFAULT 1,
    CreatedAt       DATETIME2 DEFAULT GETUTCDATE(),
    UpdatedAt       DATETIME2 DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Product_Category FOREIGN KEY (CategoryId) REFERENCES Categories(Id),
    CONSTRAINT FK_Product_Supplier FOREIGN KEY (SupplierId) REFERENCES Suppliers(Id),
    CONSTRAINT UQ_Product_Code UNIQUE (Code),
    CONSTRAINT CK_Price_Positive CHECK (Price >= 0),
    CONSTRAINT CK_Quantity_NonNegative CHECK (Quantity >= 0)
);

-- Índices de performance
CREATE INDEX IX_Products_CategoryId ON Products(CategoryId);
CREATE INDEX IX_Products_SupplierId ON Products(SupplierId);
CREATE INDEX IX_Products_Name ON Products(Name);
CREATE INDEX IX_Products_Code ON Products(Code);

-- Tabela de Movimentações
CREATE TABLE StockMovements (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    ProductId   INT NOT NULL,
    Type        NVARCHAR(10) NOT NULL,
    Quantity    INT NOT NULL,
    UnitPrice   DECIMAL(18,2) NOT NULL DEFAULT 0,
    Notes       NVARCHAR(500),
    UserId      INT NOT NULL,
    Date        DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_Movement_Product FOREIGN KEY (ProductId) REFERENCES Products(Id),
    CONSTRAINT CK_Movement_Type CHECK (Type IN ('IN', 'OUT')),
    CONSTRAINT CK_Movement_Quantity CHECK (Quantity > 0)
);

CREATE INDEX IX_StockMovements_ProductId ON StockMovements(ProductId);
CREATE INDEX IX_StockMovements_Date ON StockMovements(Date);

-- Tabela de Alertas
CREATE TABLE StockAlerts (
    Id              INT IDENTITY(1,1) PRIMARY KEY,
    ProductId       INT NOT NULL,
    ProductName     NVARCHAR(200) NOT NULL,
    CurrentQuantity INT NOT NULL,
    MinQuantity     INT NOT NULL,
    Status          NVARCHAR(20) DEFAULT 'pending',
    CreatedAt       DATETIME2 DEFAULT GETUTCDATE(),
    ResolvedAt      DATETIME2,
    CONSTRAINT FK_Alert_Product FOREIGN KEY (ProductId) REFERENCES Products(Id),
    CONSTRAINT CK_Alert_Status CHECK (Status IN ('pending', 'acknowledged', 'resolved'))
);

-- View de Dashboard
CREATE VIEW vw_DashboardSummary AS
SELECT
    (SELECT COUNT(*) FROM Products WHERE IsActive = 1) AS TotalProducts,
    (SELECT COUNT(*) FROM Products WHERE Quantity = 0 AND IsActive = 1) AS OutOfStock,
    (SELECT COUNT(*) FROM Products
     WHERE Quantity <= MinQuantity AND Quantity > 0 AND IsActive = 1) AS LowStock,
    (SELECT ISNULL(SUM(Quantity * Price), 0) FROM Products WHERE IsActive = 1) AS TotalInventoryValue,
    (SELECT COUNT(*) FROM StockAlerts WHERE Status = 'pending') AS PendingAlerts;

-- Stored Procedure: Produtos Críticos
CREATE PROCEDURE sp_GetCriticalProducts
    @MinStockThreshold INT = 5
AS
BEGIN
    SELECT
        p.Code, p.Name, p.Quantity, p.MinQuantity,
        c.Name AS Category, s.Name AS Supplier,
        CASE
            WHEN p.Quantity = 0 THEN 'Sem Estoque'
            WHEN p.Quantity <= p.MinQuantity THEN 'Estoque Baixo'
            ELSE 'OK'
        END AS Status
    FROM Products p
    INNER JOIN Categories c ON p.CategoryId = c.Id
    LEFT JOIN Suppliers s ON p.SupplierId = s.Id
    WHERE p.IsActive = 1 AND p.Quantity <= @MinStockThreshold
    ORDER BY p.Quantity ASC;
END;`,
    },
  ],
};