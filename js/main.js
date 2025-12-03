// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Throttle function para otimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ========================================
// NAVIGATION - Blur e Transparência no Scroll
// ========================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

let lastScrollY = 0;

// Efeito de blur na navbar ao fazer scroll (otimizado com throttle)
const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    if (scrollY > 50 && !navbar.classList.contains('scrolled')) {
        navbar.classList.add('scrolled');
    } else if (scrollY <= 50 && navbar.classList.contains('scrolled')) {
        navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
}, 50);

window.addEventListener('scroll', handleScroll, { passive: true });

// Toggle menu móvel
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL COM OFFSET
// ========================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// ANIMAÇÕES AO SCROLL (Intersection Observer com Lazy Load)
// ========================================

let animationsInitialized = false;

function initAnimations() {
    if (animationsInitialized) return;
    animationsInitialized = true;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animar elementos com data-aos
    document.querySelectorAll('[data-aos]').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.willChange = 'opacity, transform';
        observer.observe(element);
    });
}

// Inicializar animações após o DOM estar pronto (não bloqueia renderização)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// ========================================
// ANIMAÇÃO PARALLAX (otimizado com throttle)
// ========================================

const orbElements = document.querySelectorAll('.floating-orb');

const handleParallax = throttle(() => {
    const scrolled = window.scrollY;
    orbElements.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        requestAnimationFrame(() => {
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}, 16); // ~60fps

if (orbElements.length > 0) {
    window.addEventListener('scroll', handleParallax, { passive: true });
}

// FORM: substituído por botão WhatsApp no HTML. Nenhum handler de envio necessário.

// ========================================
// RIPPLE EFFECT NO BOTÃO CTA
// ========================================

const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', function (e) {
        // Criar elemento ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

// CSS para ripple effect (adicionar dinamicamente)
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// CONTADOR SIMPLES
// ========================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// MOUSE FOLLOW EFFECT (OPCIONAL)
// ========================================

document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('body');
    const x = e.clientX;
    const y = e.clientY;

    // Usar para criar efeitos de glow (opcional, comentado por padrão)
    // cursor.style.setProperty('--cursor-x', x + 'px');
    // cursor.style.setProperty('--cursor-y', y + 'px');
});

// ========================================
// DETECÇÃO DE PERFORMANCE E REDUÇÃO DE EFEITOS
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animation = 'none';
    });
}

// ========================================
// LAZY LOADING DE IMAGENS (SE HOUVER)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PROJECTS (render dinâmico, modal e filtros)
// ========================================

const projects = [
    {
        id: 'p1',
        title: 'Automação de Faturas',
        summary: 'Pipeline que importa faturas, valida e integra ao ERP.',
        badges: ['Python', 'RPA', 'Excel'],
        tags: ['Financeiro', 'Integração'],
        objective: 'Reduzir tempo de conciliação em 90%',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumb: ''
    },
    {
        id: 'p2',
        title: 'Robô de Suporte',
        summary: 'Chatbot que resolve FAQs e cria tickets automaticamente.',
        badges: ['Node.js', 'Dialogflow'],
        tags: ['Suporte', 'Chatbot'],
        objective: 'Diminuir SLA médio em 70%',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumb: ''
    },
    {
        id: 'p3',
        title: 'Relatórios Automáticos',
        summary: 'Geração e envio de relatórios semanais em PDF.',
        badges: ['Python', 'Pandas', 'PDF'],
        tags: ['BI', 'Relatórios'],
        objective: 'Economia de 6 horas semanais por analista',
        videoType: 'mp4',
        videoUrl: 'videos/project3.mp4',
        thumb: ''
    },
    {
        id: 'p4',
        title: 'Scraper Inteligente',
        summary: 'Coleta e normaliza dados para monitoramento de preços.',
        badges: ['Python', 'Scrapy'],
        tags: ['Web', 'Data'],
        objective: 'Base de dados atualizada em tempo real',
        videoType: 'mp4',
        videoUrl: 'videos/project4.mp4',
        thumb: ''
    },
    {
        id: 'p5',
        title: 'Automação de Testes',
        summary: 'Framework de testes para validar processos críticos.',
        badges: ['Selenium', 'CI'],
        tags: ['QA', 'CI/CD'],
        objective: 'Aumentar cobertura e reduzir regressões',
        videoType: 'youtube',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        thumb: ''
    },
    {
        id: 'p6',
        title: 'Dashboard Inteligente',
        summary: 'Painel com KPIs atualizados e alertas automáticos.',
        badges: ['React', 'API'],
        tags: ['BI', 'Dashboard'],
        objective: 'Visibilidade operacional centralizada',
        videoType: 'mp4',
        videoUrl: 'videos/project6.mp4',
        thumb: ''
    }
];

function renderProjects(list = projects) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';

    list.forEach(p => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.dataset.id = p.id;
        card.dataset.badges = p.badges.join(',');

        const thumb = document.createElement('div');
        thumb.className = 'project-thumb';
        if (p.thumb) thumb.style.backgroundImage = `url(${p.thumb})`;
        else thumb.style.background = 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(236,72,153,0.08))';

        const play = document.createElement('button');
        play.className = 'play-btn';
        play.type = 'button';
        play.title = 'Assistir vídeo';
        play.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7L8 5z" fill="white"/></svg>';
        play.dataset.projectId = p.id;
        thumb.appendChild(play);

        const body = document.createElement('div');
        body.className = 'project-body';

        const title = document.createElement('div');
        title.className = 'project-title';
        title.textContent = p.title;

        const summary = document.createElement('div');
        summary.className = 'project-summary';
        summary.textContent = p.summary;

        const badgesEl = document.createElement('div');
        badgesEl.className = 'badges';
        p.badges.forEach(b => { const bEl = document.createElement('span'); bEl.className = 'badge'; bEl.textContent = b; badgesEl.appendChild(bEl); });

        const tagsEl = document.createElement('div');
        tagsEl.className = 'tags';
        p.tags.forEach(t => { const tEl = document.createElement('span'); tEl.className = 'tag'; tEl.textContent = t; tagsEl.appendChild(tEl); });

        const obj = document.createElement('div');
        obj.className = 'project-objective';
        obj.style.marginTop = '0.6rem';
        obj.style.color = 'var(--muted-text)';
        obj.textContent = p.objective;

        body.appendChild(title);
        body.appendChild(summary);
        body.appendChild(badgesEl);
        body.appendChild(tagsEl);
        body.appendChild(obj);

        card.appendChild(thumb);
        card.appendChild(body);

        grid.appendChild(card);
    });

    attachProjectHandlers();
}

function attachProjectHandlers() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.querySelectorAll('.play-btn').forEach(btn => {
        btn.removeEventListener('click', onPlayClick);
        btn.addEventListener('click', onPlayClick);
    });
}

function onPlayClick(e) {
    const id = e.currentTarget.dataset.projectId;
    const project = projects.find(p => p.id === id);
    if (!project) return;
    openModal(project);
}

// Filters
function renderFilters() {
    const container = document.getElementById('project-filters');
    if (!container) return;
    const techs = Array.from(new Set(projects.flatMap(p => p.badges)));
    container.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'project-filter active';
    allBtn.textContent = 'Todos';
    allBtn.dataset.filter = 'all';
    container.appendChild(allBtn);

    techs.forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'project-filter';
        btn.textContent = t;
        btn.dataset.filter = t;
        container.appendChild(btn);
    });

    container.querySelectorAll('.project-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.project-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            applyFilter(filter);
        });
    });
}

function applyFilter(filter) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all') {
            card.style.display = '';
            return;
        }
        const badges = card.dataset.badges.split(',');
        card.style.display = badges.includes(filter) ? '' : 'none';
    });
}

// Modal
const modal = document.getElementById('video-modal');
const videoWrapper = document.getElementById('video-wrapper');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

function openModal(project) {
    if (!modal || !videoWrapper) return;
    videoWrapper.innerHTML = '';
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.summary;

    if (project.videoType === 'youtube') {
        const iframe = document.createElement('iframe');
        iframe.src = project.videoUrl + '?autoplay=1&rel=0&showinfo=0';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.border = '0';
        videoWrapper.appendChild(iframe);
    } else {
        const video = document.createElement('video');
        video.src = project.videoUrl;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        videoWrapper.appendChild(video);
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    if (!modal || !videoWrapper) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    // Stop video playback and remove element
    videoWrapper.innerHTML = '';
}

// Close modal on backdrop or close button
document.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (action === 'close-modal') closeModal();
});

// Close modal on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Inicializar projects e filtros no load
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderFilters();
});

console.log('✨ Landing Page iniciada com sucesso!');
