# Copilot Instructions - Landing Page Dinâmica

## Visão Geral do Projeto

Este é um projeto de **Landing Page estática** para **GitHub Pages** construída com HTML, CSS e JavaScript puro. O objetivo é criar uma página visual e interativa sem dependências externas, garantindo máxima compatibilidade e performance.

## Estrutura do Projeto

```
Landing Page/
├── index.html           # Página principal com estrutura semântica
├── styles/
│   └── main.css        # Estilos com glassmorphism, gradientes e animações
├── js/
│   └── main.js         # Interatividade: scroll effects, menu toggle, animações
└── .github/
    └── copilot-instructions.md  # Este arquivo
```

## Arquitetura e Padrões Principais

### 1. **Glassmorphism e Blur Effects**
   - **Navbar**: Usa `backdrop-filter: blur(10px)` e `rgba()` semi-transparente
   - **Cards**: Combinam `background: rgba(255,255,255,0.05)` com `backdrop-filter` para efeito de vidro
   - **Gradientes**: Linear gradients com múltiplas cores para elementos destacados
   - Implementado em `styles/main.css` nas classes `.navbar.scrolled`, `.about-card`, `.feature-item`

### 2. **Sistema de Cores com CSS Variables**
   - Definidas no `:root`: cores primária, secundária, acentuada, fundos
   - Facilita manutenção e temas: `var(--primary-color)`, `var(--accent-color)`, etc.
   - Gradientes combinam 2-3 cores: `linear-gradient(135deg, var(--primary-color), var(--accent-color))`

### 3. **Animações e Transições**
   - **Scroll Behavior**: Smooth scroll com offset para navbar fixa (80px)
   - **Intersection Observer**: Elementos `.about-card` e `.feature-item` animam ao entrar na viewport
   - **Floating Orbs**: Usando `@keyframes float` com `translate` combinado
   - **Hover Effects**: Elevação com `transform: translateY(-Xpx)` + box-shadow
   - Duração padrão: `0.3s cubic-bezier(0.4, 0, 0.2, 1)`

### 4. **Responsividade Mobile-First**
   - Breakpoints: `768px` (tablet), `480px` (mobile)
   - Menu hamburger toggling com classe `.active`
   - Grid layouts com `grid-template-columns: repeat(auto-fit, minmax(...))`
   - Tipografia escalonada com `clamp(min, vw, max)`

### 5. **Interatividade com JavaScript Vanilla**
   - **Navbar Scroll**: Detecta `window.scrollY > 50` e adiciona classe `.scrolled` para blur
   - **Menu Mobile**: Hamburger toggle com rotação de spans
   - **Form Handling**: Simula envio com feedback visual (sem envio real - usar FormSubmit.co em produção)
   - **Ripple Effect**: Cria efeito de onda no botão CTA dinamicamente
   - **Parallax**: Orbs se movem com `scrolled * speed`

## Convenções de Código

### HTML
- Seções usam `id` para navegação: `#home`, `#about`, `#features`, `#contact`
- Atributos `data-aos` para trigger de animações (compatível com AOS.js se integrado)
- Meta tags essenciais para SEO e GitHub Pages
- Semântica correta: `<nav>`, `<section>`, `<footer>`

### CSS
- Classes BEM simplificado: `.navbar`, `.nav-container`, `.nav-link`
- Variables para cores, transições, raios de borda
- Prefixos `-webkit-` para compatibilidade (ex: `-webkit-backdrop-filter`, `-webkit-text-fill-color`)
- Media queries ao final usando `@media (max-width: ...)`
- Gradientes em múltiplas direções: `135deg` como padrão

### JavaScript
- Seletores armazenados em variáveis para reutilização
- Event listeners agrupados por funcionalidade (navegação, animações, form)
- Comentários em seções delimitadas por `// ========================================`
- Sem async/await complexo - transições com `setTimeout` direto
- Intersection Observer com options customizadas

## Fluxo de Desenvolvimento

### Adicionar Nova Seção
1. Criar `<section id="novo-id" class="nova-secao">` em `index.html`
2. Escrever CSS em `styles/main.css` com classes prefixadas à seção
3. Adicionar interatividade em `js/main.js` se necessário
4. Incluir elementos com `data-aos` para animações automáticas

### Modificar Cores
1. Editar `:root` em `styles/main.css`
2. Usar `var(--color-name)` em gradientes e backgrounds
3. Exemplo: `background: linear-gradient(135deg, var(--primary-color), var(--accent-color))`

### Adicionar Efeitos de Hover
1. Criar classe `.elemento:hover`
2. Combinar `transform`, `box-shadow`, `background` com `transition: var(--transition)`
3. Usar `::before`/`::after` para overlays e animações complexas

## Dependências Externas

**Zero dependências!** O projeto usa apenas HTML, CSS e JavaScript vanilla.

- Para email realmente funcional, integrar com **FormSubmit.co** (grátis, sem backend)
- Exemplo: `<form action="https://formsubmit.co/seu-email@example.com" method="POST">`

## Otimizações para GitHub Pages

- ✅ Arquivo único `index.html` (simples de servir)
- ✅ CSS e JS separados mas sem bundler (carregam direto)
- ✅ Sem assets pesados (cores geradas com CSS, sem PNGs/JPGs)
- ✅ Lazy loading integrado para imagens (com atributo `data-src`)
- ✅ Suporta `prefers-reduced-motion` para acessibilidade

## Pontos de Extensão Comuns

| Necessidade | Arquivo | Abordagem |
|-------------|---------|----------|
| Adicionar nova cor | `styles/main.css` `:root` | Criar `--new-color` variable |
| Novo efeito hover | `styles/main.css` | Classe `.elemento:hover` com `transform` |
| Evento ao scroll | `js/main.js` | Adicionar listener em seção relevante |
| Envio de emails | `index.html` form | Usar FormSubmit.co ou similar SaaS |
| Mudar fonte | `styles/main.css` `font-family` | Editar em `body` e heading rules |
| Adicionar ícones | `index.html` | Usar emoji (já presente) ou FontAwesome CDN |

## Debugging Comum

**Navbar blur não aparece ao scroll:**
- Verificar se `window.scrollY > 50` está sendo chamado
- Console: `window.addEventListener('scroll', () => console.log(window.scrollY))`

**Animações não funcionam:**
- Verificar `data-aos` e que Intersection Observer está rodando
- Verificar `prefers-reduced-motion` em settings do browser

**Menu mobile não fecha:**
- Verificar se evento click em `.nav-link` está removendo classe `.active`

**Formulário não envia:**
- Atualmente apenas simula - implementar FormSubmit.co ou backend próprio
- Ou integrar com Netlify Forms se hospedado lá

---

**Última atualização:** Dezembro 2025
**Mantido por:** AI Coding Agent
