import React, { useEffect } from 'react';

export const DOMMagneticPhysics: React.FC = () => {
  useEffect(() => {
    const selector = '.hero-title, .stat-card, nav button, header a, .magnetic-element, .glass-panel, .glass-panel-hover, button, .project-card';
    
    const mousePos = { x: -1000, y: -1000 };
    const elementStates = new Map<
      HTMLElement,
      {
        currentTx: number;
        currentTy: number;
        currentRx: number;
        currentRy: number;
        targetTx: number;
        targetTy: number;
        targetRx: number;
        targetRy: number;
      }
    >();

    const updateElementList = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
      elements.forEach((el) => {
        if (!elementStates.has(el)) {
          elementStates.set(el, {
            currentTx: 0,
            currentTy: 0,
            currentRx: 0,
            currentRy: 0,
            targetTx: 0,
            targetTy: 0,
            targetRx: 0,
            targetRy: 0,
          });
        }
      });
    };

    updateElementList();
    const interval = setInterval(updateElementList, 2000);

    const THRESHOLD = 250; // 250px attraction distance threshold

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      elementStates.forEach((state, el) => {
        if (!document.body.contains(el)) {
          elementStates.delete(el);
          return;
        }

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = mousePos.x - centerX;
        const deltaY = mousePos.y - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < THRESHOLD) {
          const factor = 1 - distance / THRESHOLD;

          // Magnetic physics formula: translate3d(dx * 0.2px, dy * 0.2px, 0) rotateX(-dy * 0.05deg) rotateY(dx * 0.05deg)
          state.targetTx = deltaX * 0.2 * factor;
          state.targetTy = deltaY * 0.2 * factor;
          state.targetRx = -deltaY * 0.05 * factor;
          state.targetRy = deltaX * 0.05 * factor;
        } else {
          state.targetTx = 0;
          state.targetTy = 0;
          state.targetRx = 0;
          state.targetRy = 0;
        }
      });
    };

    const handleMouseLeave = () => {
      elementStates.forEach((state) => {
        state.targetTx = 0;
        state.targetTy = 0;
        state.targetRx = 0;
        state.targetRy = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let animId: number;

    const animate = () => {
      elementStates.forEach((state, el) => {
        // Smooth spring/damping lerp back to origin or target
        state.currentTx += (state.targetTx - state.currentTx) * 0.12;
        state.currentTy += (state.targetTy - state.currentTy) * 0.12;
        state.currentRx += (state.targetRx - state.currentRx) * 0.12;
        state.currentRy += (state.targetRy - state.currentRy) * 0.12;

        const hasTransform =
          Math.abs(state.currentTx) > 0.01 ||
          Math.abs(state.currentTy) > 0.01 ||
          Math.abs(state.currentRx) > 0.01 ||
          Math.abs(state.currentRy) > 0.01;

        if (hasTransform) {
          el.style.transform = `translate3d(${state.currentTx.toFixed(2)}px, ${state.currentTy.toFixed(2)}px, 0px) rotateX(${state.currentRx.toFixed(2)}deg) rotateY(${state.currentRy.toFixed(2)}deg)`;
          el.style.willChange = 'transform';
        } else if (el.style.willChange === 'transform') {
          el.style.transform = '';
          el.style.willChange = '';
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
      elementStates.forEach((_, el) => {
        if (document.body.contains(el)) {
          el.style.transform = '';
          el.style.willChange = '';
        }
      });
    };
  }, []);

  return null;
};
