import { Particle } from './Particle';

export class Effect {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  particles: Particle[];
  numberOfParticles: number;
  mouse: { x: number; y: number; pressed: boolean; radius: number };
  viscosity: number;
  glowSize: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = Math.floor((this.width * this.height) / 8000); // Standard density for constellations
    this.mouse = {
      x: -1000,
      y: -1000,
      pressed: false,
      radius: 180, // Influence radius
    };
    // Hardcoded optimal fluid simulation parameters
    this.viscosity = 0.92;
    this.glowSize = 2; // Reduced for stars

    window.addEventListener('resize', () => {
      this.resize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mousedown', (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });

    window.addEventListener('mouseup', () => {
      this.mouse.pressed = false;
    });
    
    // For mobile
    window.addEventListener('touchstart', (e) => {
      this.mouse.pressed = true;
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    });

    window.addEventListener('touchend', () => {
      this.mouse.pressed = false;
    });
    
    window.addEventListener('touchmove', (e) => {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    });

    this.init();
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.numberOfParticles = Math.floor((this.width * this.height) / 8000);
    this.init(); // Regerate particles to fill new space smoothly
  }

  handleParticles(context: CanvasRenderingContext2D) {
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }

  connectParticles(context: CanvasRenderingContext2D) {
    const maxDistance = 90;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          context.save();
          // Using purple #a855f7 theme -> rgb(168, 85, 247)
          const opacity = 1 - distance / maxDistance;
          context.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.4})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
}
