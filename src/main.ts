import './style.css'
import { Effect } from './Effect';
import { inject } from '@vercel/analytics';

inject();

const canvas = document.getElementById('particleCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

// Performance detection
const isLowPerformance = () => {
  // Detect mobile or low-end devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
  return isMobile || isLowMemory;
};

if (ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect = new Effect(canvas);
  
  // Reduce particles on low-end devices
  if (isLowPerformance()) {
    effect.numberOfParticles = Math.floor(effect.numberOfParticles * 0.3);
    effect.init();
  }

  // --- Typing Animation ---
  const typingTexts = [
    'Web - Full Stack',
    'Front-End',
    'Back-End',
    'React & TypeScript',
    'de Soluções',
  ];

  const typingEl = document.getElementById('typing-text');
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingEl) return;

    const currentText = typingTexts[textIndex];

    if (isDeleting) {
      typingEl.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end of word
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // --- Scroll Progress Bar ---
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = `${progress}%`;
  });

  // --- Scroll Reveal Logic ---
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => revealObserver.observe(reveal));

  // --- Custom Cursor Logic ---
  const cursor = document.getElementById('custom-cursor');
  window.addEventListener('mousemove', (e) => {
    if (cursor) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }
  });

  // --- Project Filter Logic ---
  function filterProjects(tech: string) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card) => {
      const projectId = card.getAttribute('data-project');
      const data = PROJECT_DATA[projectId as keyof typeof PROJECT_DATA];
      
      if (!data) return;
      
      if (tech === 'all' || data.tags.some(tag => tag.toLowerCase().includes(tech.toLowerCase()))) {
        (card as HTMLElement).style.display = 'flex';
        setTimeout(() => {
          card.classList.add('filter-visible');
        }, 10);
      } else {
        card.classList.remove('filter-visible');
        setTimeout(() => {
          (card as HTMLElement).style.display = 'none';
        }, 300);
      }
    });
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${tech}"]`)?.classList.add('active');
  }

  // --- Project Modal Data & Logic ---
  const PROJECT_DATA = {
    'pokemon': {
      title: 'Buscador Pokémon 🕹️',
      image: '/pokemon.png',
      tags: ['TypeScript', 'Python', 'FastAPI', 'Redis', 'PokéAPI', 'Docker', 'Railway'],
      description: 'Pokédex completa com interface Neobrutalism, dark mode, shiny toggle, favoritos e radar chart SVG dos stats. Consome a PokéAPI via um BFF (Backend For Frontend) próprio em FastAPI com cache Redis — cada Pokémon é buscado uma vez e servido do cache nas próximas requisições, eliminando rate limits. Front-end deployado no GitHub Pages via GitHub Actions; back-end no Railway com Docker.',
      live: 'https://carlosdayton.github.io/buscador-pokemon/',
      github: 'https://github.com/carlosdayton/buscador-pokemon'
    },
    'market': {
      title: 'Checklist Market 🛒',
      image: '/grocery_app.png',
      tags: ['React', 'Supabase', 'PWA', 'Offline-First'],
      description: 'O Checklist Market é um organizador de compras inteligente. Utiliza uma arquitetura híbrida onde os dados são salvos localmente (Local Storage) para funcionamento offline instantâneo e sincronizados com o Supabase quando houver conexão. Inclui funcionalidades de categorias customizadas, soma automática de valores e instalação como aplicativo direto na tela do celular (PWA).',
      live: 'https://checklist-market.vercel.app',
      github: 'https://github.com/carlosdayton' // Placeholder or real
    },
    'visionai': {
      title: 'VisionAI Dashboard 🤖',
      image: '/vision_ai.png',
      tags: ['Python', 'YOLOv8', 'Streamlit', 'OpenCV'],
      description: 'Dashboard de Visão Computacional de alta performance que implementa o algoritmo YOLOv8 (You Only Look Once) para detecção simultânea de múltiplos objetos. O projeto foca na integração de modelos de Deep Learning em interfaces web, utilizando inferência em tempo real via Python para reconhecer e categorizar mais de 80 tipos de itens com precisão dinâmica.',
      live: '#',
      github: 'https://github.com/carlosdayton'
    },
    'limpador': {
      title: 'Limpador Pro 🧹',
      image: '/cleaner.png',
      tags: ['Electron', 'Python', 'React', 'Vite'],
      description: 'Ferramenta avançada de limpeza e otimização de sistema para Windows. Utiliza um backend Python robusto para identificar e remover arquivos temporários, logs e lixo de sistema, integrados em uma interface desktop fluida construída com Electron e React.',
      live: 'https://github.com/carlosdayton/limpador-arquivos-temporarios',
      github: 'https://github.com/carlosdayton/limpador-arquivos-temporarios'
    },
    'cursinho': {
      title: 'Foco ENEM 🎓',
      image: '/foco_enem_banner.png',
      tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      description: 'Sistema de estudos inteligente para o ENEM com revisão espaçada adaptativa, cronograma semanal automático por prioridade, timer Pomodoro integrado, rastreador de simulados com gráfico de evolução e contagem regressiva em tempo real. Todos os dados ficam salvos localmente — sem cadastro, sem servidor.',
      live: 'https://estudos-cursinho.vercel.app',
      github: 'https://github.com/carlosdayton/estudos-cursinho'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modal-img') as HTMLImageElement;
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-description');
  const modalLive = document.getElementById('modal-link-live') as HTMLAnchorElement;
  const modalGithub = document.getElementById('modal-link-github') as HTMLAnchorElement;
  const closeModalBtn = document.getElementById('close-modal');

  function openProjectModal(projectId: string) {
    const data = PROJECT_DATA[projectId as keyof typeof PROJECT_DATA];
    if (!data || !modal) return;

    modalImg.src = data.image;
    if (modalTitle) modalTitle.innerText = data.title;
    if (modalDesc) modalDesc.innerText = data.description;
    modalLive.href = data.live;
    modalGithub.href = data.github;

    // Inject tags
    if (modalTags) {
      modalTags.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.innerText = tag;
        modalTags.appendChild(span);
      });
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Block scroll
  }

  function closeProjectModal() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }

  // Hook up project card clicks
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      // Allow secondary-btn (external links) to work normally
      if (target.classList.contains('secondary-btn')) return;
      
      const projectId = card.getAttribute('data-project');
      if (projectId) openProjectModal(projectId);
    });
  });

  closeModalBtn?.addEventListener('click', closeProjectModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  // Hook up filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      if (filter) filterProjects(filter);
    });
  });

  // Initialize all projects as visible
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('filter-visible');
  });

  // --- Hover effects for custom cursor ---
  // Re-run this after modal injection if needed, but for now we'll use a delegation or broad selector
  function updateHoverables() {
    const hoverables = document.querySelectorAll('a, button, .btn, .skill-badge, .project-card, input, textarea, .close-btn, .filter-btn');
    hoverables.forEach(item => {
      item.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
      item.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    });
  }
  updateHoverables();

  function animate() {
    // Reset to default for background clearing
    ctx!.globalCompositeOperation = 'source-over';
    
    // Semi-transparent background for a subtle trail effect
    ctx!.fillStyle = 'rgba(11, 12, 16, 0.3)';
    ctx!.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set to screen so overlapping gradients combine into bright light
    ctx!.globalCompositeOperation = 'screen';
    effect.handleParticles(ctx!);
    
    requestAnimationFrame(animate);
  }
  
  // --- Tilt Effect for Project Cards ---
  function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    let rafId: number | null = null;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const mouseEvent = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * 10;
          const rotateY = ((centerX - x) / centerX) * 10;
          
          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
          rafId = null;
        });
      });
      
      card.addEventListener('mouseleave', () => {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        (card as HTMLElement).style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }
  // --- Toast System ---
  function mostrarToast(mensagem: string, tipo: 'success' | 'error' | 'info' = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerText = mensagem;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('active'), 10);

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // --- Contact Form AJAX ---
  const contactForm = document.querySelector('.contact-form') as HTMLFormElement;
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]') as HTMLButtonElement;
      const originalBtnText = submitBtn.innerText;
      
      try {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';
        
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        
        if (response.ok) {
          mostrarToast('Mensagem enviada! Te responderei em breve.', 'success');
          contactForm.reset();
        } else {
          mostrarToast('Opa! Algo deu errado. Verifique o formulário.', 'error');
        }
      } catch (err) {
        mostrarToast('Erro de conexão. Tente novamente mais tarde.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    });
  }

  initTiltEffect();

  // --- GitHub Stats ---
  async function loadGitHubStats() {
    const username = 'carlosdayton';
    const statsContainer = document.getElementById('github-stats');
    
    if (!statsContainer) return;
    
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();
      
      // Fetch repos
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const repos = await reposResponse.json();
      
      // Calculate stats
      const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
      const totalForks = repos.reduce((acc: number, repo: any) => acc + repo.forks_count, 0);
      const publicRepos = userData.public_repos;
      
      // Get top languages
      const languages: { [key: string]: number } = {};
      repos.forEach((repo: any) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });
      
      const topLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);
      
      // Update DOM
      statsContainer.innerHTML = `
        <div class="stat-item">
          <div class="stat-icon">📦</div>
          <div class="stat-value">${publicRepos}</div>
          <div class="stat-label">Repositórios</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">${totalStars}</div>
          <div class="stat-label">Stars</div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🔱</div>
          <div class="stat-value">${totalForks}</div>
          <div class="stat-label">Forks</div>
        </div>
        <div class="stat-item languages">
          <div class="stat-icon">💻</div>
          <div class="stat-label">Top Linguagens</div>
          <div class="languages-list">${topLanguages.join(' • ')}</div>
        </div>
      `;
      
      statsContainer.classList.add('loaded');
    } catch (error) {
      console.error('Erro ao carregar stats do GitHub:', error);
      statsContainer.innerHTML = '<p style="color: #a0a5b5; text-align: center;">Erro ao carregar estatísticas</p>';
    }
  }
  
  loadGitHubStats();

  animate();
}
