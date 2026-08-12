import React, { useEffect, useRef, useState } from 'react';

interface BlobConfig {
  id: number;
  gradient: string;
  width: number;
  height: number;
  baseX: number; // initial % of viewport width
  baseY: number; // initial % of viewport height
  freqX: number;
  freqY: number;
  ampX: number;
  ampY: number;
  phaseX: number;
  phaseY: number;
  blur: number;
  opacity: number;
  isCursorFollower?: boolean;
}

const BLOBS: BlobConfig[] = [
  {
    id: 1,
    gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', // Soft Coral Pink to Warm Peach
    width: 580,
    height: 580,
    baseX: 10,
    baseY: 15,
    freqX: 0.0006,
    freqY: 0.0008,
    ampX: 140,
    ampY: 120,
    phaseX: 0,
    phaseY: 1.2,
    blur: 75,
    opacity: 0.82,
  },
  {
    id: 2,
    gradient: 'linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)', // Mint Green to Soft Cyan
    width: 520,
    height: 520,
    baseX: 75,
    baseY: 10,
    freqX: 0.0007,
    freqY: 0.0005,
    ampX: 130,
    ampY: 150,
    phaseX: 2.1,
    phaseY: 0.5,
    blur: 70,
    opacity: 0.8,
  },
  {
    id: 3,
    gradient: 'linear-gradient(135deg, #D4B5FF 0%, #92FE9D 100%)', // Pastel Lavender to Soft Sky Blue
    width: 620,
    height: 620,
    baseX: 68,
    baseY: 65,
    freqX: 0.0005,
    freqY: 0.0007,
    ampX: 160,
    ampY: 140,
    phaseX: 1.1,
    phaseY: 3.2,
    blur: 85,
    opacity: 0.78,
  },
  {
    id: 4,
    gradient: 'linear-gradient(135deg, #FFE29F 0%, #FFA99F 100%)', // Buttercup Yellow to Rose
    width: 500,
    height: 500,
    baseX: 15,
    baseY: 72,
    freqX: 0.0008,
    freqY: 0.0006,
    ampX: 120,
    ampY: 130,
    phaseX: 3.5,
    phaseY: 2.0,
    blur: 70,
    opacity: 0.82,
  },
  {
    id: 5,
    gradient: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)', // Lavender Purple to Electric Blue
    width: 540,
    height: 540,
    baseX: 42,
    baseY: 32,
    freqX: 0.0006,
    freqY: 0.0009,
    ampX: 150,
    ampY: 110,
    phaseX: 0.8,
    phaseY: 4.1,
    blur: 80,
    opacity: 0.8,
  },
  {
    id: 6,
    gradient: 'linear-gradient(135deg, #FFD1FF 0%, #FEE140 100%)', // Sunset Peach to Golden Glow
    width: 460,
    height: 460,
    baseX: 82,
    baseY: 40,
    freqX: 0.0009,
    freqY: 0.0007,
    ampX: 110,
    ampY: 140,
    phaseX: 4.2,
    phaseY: 1.8,
    blur: 65,
    opacity: 0.76,
  },
  {
    id: 7,
    gradient: 'linear-gradient(135deg, #FF9A9E 0%, #D4B5FF 100%)', // Prominent Cursor Follower Orb
    width: 380,
    height: 380,
    baseX: 50,
    baseY: 50,
    freqX: 0,
    freqY: 0,
    ampX: 0,
    ampY: 0,
    phaseX: 0,
    phaseY: 0,
    blur: 60,
    opacity: 0.85,
    isCursorFollower: true,
  },
];

const DARK_BLOB_GRADIENTS = [
  'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)', // Vibrant Rose Pink to Electric Violet
  'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', // Glowing Cyan to Cobalt Blue
  'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)', // Bright Fuchsia to Hot Pink
  'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', // Neon Emerald to Cyan
  'linear-gradient(135deg, #f97316 0%, #f43f5e 100%)', // Sunset Orange to Crimson
  'linear-gradient(135deg, #eab308 0%, #f97316 100%)', // Amber Gold to Coral
  'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)', // Purple to Electric Cyan Cursor Orb
];

export const InteractiveBlobs: React.FC = () => {
  const blobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    // Shockwave State on Click
    let shockwave = 0;
    let clickX = mouseX;
    let clickY = mouseY;

    // Magnetic Offsets Lerp Tracking
    const magOffsets = BLOBS.map(() => ({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handlePointerDown = (e: MouseEvent) => {
      clickX = e.clientX;
      clickY = e.clientY;
      shockwave = 1.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);

    let animId: number;

    const animate = (time: number) => {
      // 1. Follower Orb Lerp
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;

      // 2. Shockwave Impulse Decay
      shockwave *= 0.92;
      if (shockwave < 0.001) shockwave = 0;

      const winW = window.innerWidth;
      const winH = window.innerHeight;

      BLOBS.forEach((blob, idx) => {
        const el = blobRefs.current[idx];
        if (!el) return;

        if (blob.isCursorFollower) {
          // Cursor Follower Orb Physics
          const posX = followerX - blob.width / 2;
          const posY = followerY - blob.height / 2;
          const scale = 1 + shockwave * 0.55;

          el.style.transform = `translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0px) scale(${scale.toFixed(3)})`;
        } else {
          // Ambient Sine Wave Floating Path
          const ambientX =
            (winW * blob.baseX) / 100 + Math.sin(time * blob.freqX + blob.phaseX) * blob.ampX;
          const ambientY =
            (winH * blob.baseY) / 100 + Math.cos(time * blob.freqY + blob.phaseY) * blob.ampY;

          // Magnetic Cursor Interaction (Attraction/Repulsion)
          const blobCenterX = ambientX + blob.width / 2;
          const blobCenterY = ambientY + blob.height / 2;
          const dx = blobCenterX - mouseX;
          const dy = blobCenterY - mouseY;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          const magneticRadius = 420;
          if (distToMouse < magneticRadius && distToMouse > 0) {
            const factor = (1 - distToMouse / magneticRadius);
            // Repulsion direction with spring weight
            magOffsets[idx].targetX = (dx / distToMouse) * factor * 160;
            magOffsets[idx].targetY = (dy / distToMouse) * factor * 160;
          } else {
            magOffsets[idx].targetX = 0;
            magOffsets[idx].targetY = 0;
          }

          // Smooth Lerp for Magnetic Shift
          magOffsets[idx].currentX += (magOffsets[idx].targetX - magOffsets[idx].currentX) * 0.08;
          magOffsets[idx].currentY += (magOffsets[idx].targetY - magOffsets[idx].currentY) * 0.08;

          // Click Shockwave Calculation
          const cdx = blobCenterX - clickX;
          const cdy = blobCenterY - clickY;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy) + 0.1;
          const shockFactor = Math.max(0, 1 - cdist / 900);
          const shockPushX = (cdx / cdist) * shockwave * 220 * shockFactor;
          const shockPushY = (cdy / cdist) * shockwave * 220 * shockFactor;
          const shockScale = 1 + shockwave * 0.4 * shockFactor;

          const finalX = ambientX + magOffsets[idx].currentX + shockPushX;
          const finalY = ambientY + magOffsets[idx].currentY + shockPushY;

          el.style.transform = `translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0px) scale(${shockScale.toFixed(3)})`;
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Layer 0: Base Background Color (#fafafa / #0a0f1d) */}
      <div className={`fixed inset-0 pointer-events-none -z-30 transition-colors duration-300 ${isDark ? 'bg-[#0a0f1d]' : 'bg-[#fafafa]'}`} />

      {/* Layer 1: Interactive Floating Pastel / Deep Indigo Gradient Blobs Container */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden -z-20"
        style={{ zIndex: 0 }}
      >
        {BLOBS.map((blob, idx) => (
          <div
            key={blob.id}
            ref={(el) => {
              blobRefs.current[idx] = el;
            }}
            className="absolute pointer-events-none will-change-transform animate-blob-morph"
            style={{
              width: `${blob.width}px`,
              height: `${blob.height}px`,
              background: isDark ? DARK_BLOB_GRADIENTS[idx % DARK_BLOB_GRADIENTS.length] : blob.gradient,
              filter: `blur(${blob.blur}px)`,
              opacity: isDark ? (blob.isCursorFollower ? 0.85 : 0.65) : blob.opacity,
              top: 0,
              left: 0,
              borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
              transition: 'background 0.5s ease, opacity 0.5s ease',
              animationDelay: `${idx * 1.5}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 2: Full-Screen Frosted Glass Overlay */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-300"
        style={{
          zIndex: 1,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          background: isDark ? 'rgba(10, 15, 29, 0.45)' : 'rgba(255, 255, 255, 0.45)',
        }}
      />
    </>
  );
};
