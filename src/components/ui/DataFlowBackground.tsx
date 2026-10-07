import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";

function getOptions(isDark: boolean) {
  return {
    particleColor: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(28, 38, 125, 0.5)",
    lineColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(28, 38, 125, 0.12)",
    particleAmount: 50,
    defaultRadius: 2,
    variantRadius: 2,
    defaultSpeed: 0.5,
    variantSpeed: 0.5,
    linkRadius: 200,
  };
}

type CanvasOptions = ReturnType<typeof getOptions>;

class Particle {
  x: number;
  y: number;
  radius: number;
  speed: number;
  vector: { x: number; y: number };

  constructor(width: number, height: number, options: CanvasOptions) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = options.defaultRadius + Math.random() * options.variantRadius;
    this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
    const angle = Math.random() * Math.PI * 2;
    this.vector = {
      x: Math.cos(angle) * this.speed,
      y: Math.sin(angle) * this.speed,
    };
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  update(width: number, height: number) {
    this.x += this.vector.x;
    this.y += this.vector.y;
    if (this.x >= width || this.x <= 0) this.vector.x *= -1;
    if (this.y >= height || this.y <= 0) this.vector.y *= -1;
    this.x = Math.min(Math.max(this.x, 0), width);
    this.y = Math.min(Math.max(this.y, 0), height);
  }
}

export function DataFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const options = getOptions(theme === "dark");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrameId: number;
    let particles: Particle[] = [];

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
      particles = Array.from(
        { length: options.particleAmount },
        () => new Particle(canvas.width, canvas.height, options),
      );
    }

    function linkParticles() {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const distance = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y,
          );
          if (distance < options.linkRadius) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = options.lineColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    function drawStaticFrame() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.draw(ctx, options.particleColor));
      linkParticles();
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx, options.particleColor);
      });
      linkParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();

    if (prefersReducedMotion) {
      drawStaticFrame();
    } else {
      animate();
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
