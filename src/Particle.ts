import type { Effect } from './Effect';

export class Particle {
  effect: Effect;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  pushX: number;
  pushY: number;
  baseRadius: number;
  
  hue: number;
  saturation: number;
  lightness: number;

  constructor(effect: Effect) {
    this.effect = effect;
    this.baseRadius = Math.random() * 2 + 0.5;
    this.radius = this.baseRadius;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.pushX = 0;
    this.pushY = 0;

    // Random HSL color around a specific hue to make it look premium
    this.hue = Math.floor(Math.random() * 40 + 260); // 260-300 range (Purple to Magenta)
    this.saturation = Math.floor(Math.random() * 30 + 70); // 70-100%
    this.lightness = Math.floor(Math.random() * 30 + 50); // 50-80%
  }

  draw(context: CanvasRenderingContext2D) {
    const currentRadius = this.baseRadius * this.effect.glowSize;
    if (currentRadius <= 0) return;

    context.beginPath();
    context.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
    
    // Radial gradient for plasma glow effect
    const gradient = context.createRadialGradient(this.x, this.y, currentRadius * 0.1, this.x, this.y, currentRadius);
    gradient.addColorStop(0, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 1)`);
    gradient.addColorStop(1, `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0)`);
    
    context.fillStyle = gradient;
    context.fill();
  }

  update() {
    const dx = this.x - this.effect.mouse.x;
    const dy = this.y - this.effect.mouse.y;
    const distance = Math.hypot(dx, dy);

    if (distance < this.effect.mouse.radius) {
      const force = this.effect.mouse.radius / distance;
      const angle = Math.atan2(dy, dx);
      
      // Vortex fluid effect: pushes outwards while rotating tangentially
      let pushX = Math.cos(angle) * force;
      let pushY = Math.sin(angle) * force;
      
      // Add strong tangential rotation if pressed (creates stronger swirls)
      if (this.effect.mouse.pressed) {
         pushX += Math.cos(angle + Math.PI/2) * force * 2;
         pushY += Math.sin(angle + Math.PI/2) * force * 2;
      } else {
         pushX += Math.cos(angle + Math.PI/2) * force * 0.5;
         pushY += Math.sin(angle + Math.PI/2) * force * 0.5;
      }
      
      this.pushX += pushX * 0.1;
      this.pushY += pushY * 0.1;
    }

    // Apply viscosity as friction
    this.pushX *= this.effect.viscosity;
    this.pushY *= this.effect.viscosity;

    this.x += this.pushX + this.vx;
    this.y += this.pushY + this.vy;

    const currentRadius = this.baseRadius * this.effect.glowSize;

    // Wrap around borders for continuous fluid feel
    if (this.x < -currentRadius) this.x = this.effect.width + currentRadius;
    if (this.x > this.effect.width + currentRadius) this.x = -currentRadius;
    if (this.y < -currentRadius) this.y = this.effect.height + currentRadius;
    if (this.y > this.effect.height + currentRadius) this.y = -currentRadius;
  }
}
