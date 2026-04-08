import './style.css'
import { Effect } from './Effect';

const canvas = document.getElementById('particleCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect = new Effect(canvas);

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

  // --- Project Modal Data & Logic ---
  const PROJECT_DATA = {
    'pokemon': {
      title: 'Buscador Pokémon 🕹️',
      image: '/pokemon.png',
      tags: ['TypeScript', 'PokéAPI', 'Canvas API', 'REST'],
      description: 'Uma aplicação robusta que consome a PokéAPI para fornecer dados em tempo real sobre qualquer um dos 1000+ Pokémon. Implementei um sistema de busca inteligente, filtragem por tipos e uma visualização detalhada de "base stats" (HP, Ataque, Defesa) com barras de progresso dinâmicas e design focado em acessibilidade e performance mobile.',
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

  // --- Hover effects for custom cursor ---
  // Re-run this after modal injection if needed, but for now we'll use a delegation or broad selector
  function updateHoverables() {
    const hoverables = document.querySelectorAll('a, button, .btn, .skill-badge, .project-card, input, textarea, .close-btn');
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
    ctx!.fillStyle = 'rgba(11, 12, 16, 0.3)'; // lower opacity for longer trails
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

  animate();
}
