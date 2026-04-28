# 🌟 Portfólio Carlos Dayton

Portfólio pessoal interativo com sistema de partículas generativo, glassmorphism e animações fluidas. Desenvolvido com TypeScript, Vite e Canvas API.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Features

### 🎨 Visual & Interatividade
- **Sistema de Partículas Generativo** - Background animado com física de fluidos e efeito vortex
- **Glassmorphism Design** - Cards com blur e transparência para estética moderna
- **Cursor Customizado** - Cursor neon que reage a elementos interativos
- **Animações Suaves** - Scroll reveal, tilt 3D nos cards e transições fluidas
- **Totalmente Responsivo** - Otimizado para desktop, tablet e mobile

### 🚀 Funcionalidades
- **Filtro de Projetos** - Filtragem dinâmica por tecnologia (React, TypeScript, Python, etc.)
- **GitHub Stats Live** - Estatísticas em tempo real da API do GitHub
- **Modal de Projetos** - Visualização detalhada com tags, descrição e links
- **Formulário de Contato** - Integrado com Formspree para envio de mensagens
- **Timeline Profissional** - Histórico de experiências e formação

### ⚡ Performance
- **GPU Acceleration** - Uso de `transform: translateZ(0)` para renderização otimizada
- **Lazy Loading** - Carregamento inteligente de recursos
- **Otimização de Partículas** - Algoritmo O(n) limitado para conexões entre partículas
- **Analytics** - Integração com Vercel Analytics

## 🛠️ Tecnologias

- **TypeScript** - Tipagem estática e código mais seguro
- **Vite 8** - Build tool ultrarrápido
- **Canvas API** - Renderização do sistema de partículas
- **CSS3** - Glassmorphism, animações e grid layout
- **GitHub API** - Dados em tempo real do perfil
- **Formspree** - Backend para formulário de contato
- **Vercel Analytics** - Monitoramento de visitas

## 📦 Estrutura do Projeto

```
particle-system/
├── src/
│   ├── main.ts           # Lógica principal e event handlers
│   ├── Effect.ts         # Sistema de partículas e física
│   ├── Particle.ts       # Classe individual de partícula
│   ├── style.css         # Estilos globais e glassmorphism
│   └── assets/           # Imagens e recursos
├── public/               # Assets estáticos (imagens de projetos, CV)
├── index.html            # HTML principal
├── vite.config.ts        # Configuração do Vite
└── tsconfig.json         # Configuração do TypeScript
```

## 🚀 Rodando Localmente

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/carlosdayton/portfolio.git
cd portfolio

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Preview do build
npm run preview
```

## 🎯 Seções

### 🏠 Hero
Apresentação inicial com call-to-actions e background animado

### 👨‍💻 Sobre
Resumo profissional e áreas de atuação

### 💻 Skills
- Tecnologias de desenvolvimento (React, TypeScript, Java, Node.js)
- Infraestrutura e redes
- Fundamentos de cibersegurança
- **GitHub Stats** com dados em tempo real

### 🗂️ Projetos
Portfólio com filtros por tecnologia:
- **Foco ENEM** - Sistema de estudos com revisão espaçada (React 19, TypeScript, Tailwind)
- **Buscador Pokémon** - Integração com PokéAPI (TypeScript, Canvas API)
- **Checklist Market** - PWA offline-first (React, Supabase)
- **VisionAI Dashboard** - Detecção de objetos com YOLOv8 (Python, Streamlit)
- **Limpador Pro** - Otimizador de sistema (Electron, Python)

### 🛤️ Jornada
Timeline com experiências profissionais e formação acadêmica

### 📬 Contato
Formulário funcional, links sociais e download de currículo

## 🎨 Customização

### Alterar Cores do Tema
Edite as variáveis no `src/style.css`:
```css
/* Gradient principal */
background: linear-gradient(90deg, #a855f7 0%, #d946ef 100%);

/* Cores de partículas */
hue: 260-300 (roxo a magenta)
```

### Adicionar Novos Projetos
Edite o objeto `PROJECT_DATA` em `src/main.ts`:
```typescript
'novo-projeto': {
  title: 'Título do Projeto 🚀',
  image: '/imagem.png',
  tags: ['React', 'Node.js'],
  description: 'Descrição detalhada...',
  live: 'https://link-deploy.com',
  github: 'https://github.com/user/repo'
}
```

E adicione o card no `index.html`:
```html
<div class="glass-card project-card" data-project="novo-projeto">
  <!-- conteúdo do card -->
</div>
```

## 📊 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Otimizado para SEO** com meta tags e Open Graph

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar como inspiração ou base para seu próprio portfólio.

## 🤝 Contato

- **LinkedIn**: [Carlos Dayton](https://www.linkedin.com/in/carlos-dayton-r/)
- **GitHub**: [@carlosdayton](https://github.com/carlosdayton)
- **Instagram**: [@carlosdayton_](https://www.instagram.com/carlosdayton_/)

---

⭐ Se gostou do projeto, deixe uma estrela no repositório!

**Feito com foco e dedicação por Carlos Dayton** 🚀
