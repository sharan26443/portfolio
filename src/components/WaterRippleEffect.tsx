import React, { useEffect, useRef } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  lineWidth: number;
  color: string;
  distort: number;
}

interface WavePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

export const WaterRippleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const wavePointsRef = useRef<WavePoint[]>([]);
  const lastMousePos = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Create a new expanding water ripple at (x, y)
    const addRipple = (x: number, y: number, isStrong = false) => {
      const colors = [
        'rgba(240, 216, 206, ', // Blush Peach
        'rgba(226, 217, 243, ', // Soft Lavender
        'rgba(250, 248, 245, ', // Warm Cream
        'rgba(180, 220, 200, ', // Gentle Sage Glow
      ];
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];

      // Primary ring ripple
      ripplesRef.current.push({
        id: Date.now() + Math.random(),
        x,
        y,
        radius: 2,
        maxRadius: isStrong ? 180 + Math.random() * 80 : 100 + Math.random() * 40,
        opacity: isStrong ? 0.9 : 0.6,
        speed: isStrong ? 3.5 : 2.2,
        lineWidth: isStrong ? 3 : 1.8,
        color: selectedColor,
        distort: Math.random() * 0.3 + 0.1,
      });

      // Secondary echo ripple ring
      setTimeout(() => {
        ripplesRef.current.push({
          id: Date.now() + Math.random(),
          x,
          y,
          radius: 2,
          maxRadius: isStrong ? 140 : 70,
          opacity: isStrong ? 0.6 : 0.4,
          speed: isStrong ? 2.8 : 1.8,
          lineWidth: 1.2,
          color: selectedColor,
          distort: Math.random() * 0.2,
        });
      }, 120);

      // Splash water droplets
      const dropletCount = isStrong ? 12 : 6;
      for (let i = 0; i < dropletCount; i++) {
        const angle = (Math.PI * 2 * i) / dropletCount + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 2.5 + 1;
        wavePointsRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          size: Math.random() * 3 + 1.5,
          color: selectedColor,
        });
      }
    };

    // Global Click & Touch Listener (triggers ripple anywhere on screen or button)
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      addRipple(clientX, clientY, true);
    };

    // Global Mouse Move Listener (water motion trailing wave)
    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn soft liquid motion ripples when moving cursor at moderate speed
      if (dist > 15 && now - lastMousePos.current.time > 50) {
        addRipple(e.clientX, e.clientY, false);
        lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);

    // Animation Loop
    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw and update expanding water ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += r.speed;
        r.opacity *= 0.965; // Smooth fade out

        if (r.radius >= r.maxRadius || r.opacity < 0.01) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        
        // Draw slightly organic distorted water wave circle
        const points = 32;
        for (let p = 0; p <= points; p++) {
          const angle = (Math.PI * 2 * p) / points;
          const offset = Math.sin(angle * 6 + r.radius * 0.1) * r.distort * (r.radius * 0.08);
          const currentR = r.radius + offset;
          const px = r.x + Math.cos(angle) * currentR;
          const py = r.y + Math.sin(angle) * currentR;

          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.closePath();
        ctx.strokeStyle = `${r.color}${r.opacity})`;
        ctx.lineWidth = r.lineWidth;
        ctx.shadowColor = r.color.includes('240') ? '#f0d8ce' : '#e2d9f3';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Subtle glowing fill inside wave
        ctx.fillStyle = `${r.color}${r.opacity * 0.08})`;
        ctx.fill();

        ctx.restore();
      }

      // 2. Draw and update water spray droplets
      for (let i = wavePointsRef.current.length - 1; i >= 0; i--) {
        const p = wavePointsRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life -= 0.035;

        if (p.life <= 0) {
          wavePointsRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.life * 0.8})`;
        ctx.shadowColor = '#f0d8ce';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
