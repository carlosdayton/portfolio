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
    this.numberOfParticles = Math.floor((this.width * this.height) / 30000); // Reduced significantly
    this.mouse = {
      x: -1000,
      y: -1000,
      pressed: false,
      radius: 150, // Reduced radius
    };
    this.viscosity = 0.95; // Increased for less movement
    this.glowSize = 1.5; // Reduced glow

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
    this.numberOfParticles = Math.floor((this.width * this.height) / 30000);
    this.init(); 
  }

  handleParticles(context: CanvasRenderingContext2D) {
    // Skip connections completely for better performance
    
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }

  connectParticles() {
    // Disabled for performance - can be re-enabled if needed
    return;
  }
}
