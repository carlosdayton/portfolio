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
    this.baseRadius = Math.random() * 1.5 + 0.5; // Smaller particles
    this.radius = this.baseRadius;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.vx = Math.random() * 0.5 - 0.25; // Slower movement
    this.vy = Math.random() * 0.5 - 0.25;
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

    // Simplified drawing - no gradients, just solid color
    context.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0.6)`;
    context.fillRect(this.x - currentRadius, this.y - currentRadius, currentRadius * 2, currentRadius * 2);
  }

  update() {
    const dx = this.x - this.effect.mouse.x;
    const dy = this.y - this.effect.mouse.y;
    const distSq = dx * dx + dy * dy;
    const mouseRadiusSq = this.effect.mouse.radius * this.effect.mouse.radius;

    // Simplified physics - only push away from mouse
    if (distSq < mouseRadiusSq && distSq > 0) {
      const distance = Math.sqrt(distSq);
      const force = (this.effect.mouse.radius - distance) / this.effect.mouse.radius;
      const angle = Math.atan2(dy, dx);
      
      this.pushX += Math.cos(angle) * force * 0.5;
      this.pushY += Math.sin(angle) * force * 0.5;
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
