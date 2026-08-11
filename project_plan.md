# Portfólio Paulo Henrique — Desenvolvedor de Software

## 1. Project Description
Portfólio profissional pessoal de Paulo Henrique, estudante de Engenharia de Software e desenvolvedor em formação. O site tem como objetivo apresentar habilidades, projetos, formação acadêmica e canais de contato de forma visualmente atraente e profissional, direcionado a recrutadores e clientes da plataforma Upwork.

**Público-alvo:** Recrutadores, clientes de freelancing e empregadores de TI.
**Valor principal:** Apresentar competências e potencial de forma clara, moderna e impactante.

## 2. Page Structure
- `/` — Página Inicial (single-page portfolio)
  - Hero (nome, profissão, foto, CTA)
  - Sobre (quem sou eu, objetivo profissional)
  - Habilidades Técnicas (cards com barras de progresso)
  - Projetos (mock de projetos realistas)
  - Educação (timeline de formação acadêmica e cursos)
  - Contato (formulário funcional + links)
  - Footer

## 3. Core Features
- [ ] Hero impactante com nome, título e foto
- [ ] Seção "Sobre" com texto profissional
- [ ] Seção "Habilidades" com cards visuais e barras de progresso
- [ ] Seção "Projetos" com cards de projetos mock realistas
- [ ] Seção "Educação" com timeline visual
- [ ] Formulário de contato funcional com anti-spam (honey pot)
- [ ] Links para WhatsApp, LinkedIn e e-mail
- [ ] Animações de entrada suaves (scroll-triggered)
- [ ] Design responsivo completo
- [ ] SEO básico com tags meta

## 4. Data Model Design
Não necessita de banco de dados no momento. Todos os dados serão mockados em arquivos TypeScript separados em `src/mocks/`.

## 5. Backend / Third-party Integration Plan
- Sem backend necessário para MVP
- Formulário de contato: usar `get_form_url` para criação de formulário funcional
- Sem Supabase, Shopify, Stripe ou PayPal no momento

## 6. Development Phase Plan

### Phase 1: Estrutura da Homepage e Hero
- Goal: Criar a página inicial completa com todas as seções e design profissional
- Deliverable: Homepage funcional com Hero, Sobre, Habilidades, Projetos, Educação, Contato e Footer

### Phase 2: Animações, SEO e Polimento Final
- Goal: Adicionar animações de entrada, otimizar SEO e refinar detalhes visuais
- Deliverable: Portfólio finalizado com animações, meta tags SEO e formulário de contato funcional