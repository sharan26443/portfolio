import React, { useRef, useState, useEffect } from 'react';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Strength of magnetic pull / tilt
  glowColor?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  id?: string;
}

export const MagneticCard: React.FC<MagneticCardProps> = ({
  children,
  className = '',
  intensity = 1.0,
  glowColor = 'rgba(240, 216, 206, 0.15)',
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isRecoiling, setIsRecoiling] = useState(false);

  const targetTransform = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const currentTransform = useRef({ rx: 0, ry: 0, tx: 0, ty: 0 });
  const animFrameId = useRef<number | null>(null);

  // Smooth lerp animation loop
  useEffect(() => {
    const updatePhysics = () => {
      // Lerp current values toward targets
      currentTransform.current.rx += (targetTransform.current.rx - currentTransform.current.rx) * 0.12;
      currentTransform.current.ry += (targetTransform.current.ry - currentTransform.current.ry) * 0.12;
      currentTransform.current.tx += (targetTransform.current.tx - currentTransform.current.tx) * 0.12;
      currentTransform.current.ty += (targetTransform.current.ty - currentTransform.current.ty) * 0.12;

      const { rx, ry, tx, ty } = currentTransform.current;
      setTransformStyle(
        `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0px)`
      );

      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate normalized 3D tilt angles & magnetic translate pull
    const tiltX = -(mouseY / (rect.height / 2)) * 8 * intensity;
    const tiltY = (mouseX / (rect.width / 2)) * 8 * intensity;
    const transX = (mouseX / (rect.width / 2)) * 6 * intensity;
    const transY = (mouseY / (rect.height / 2)) * 6 * intensity;

    targetTransform.current = { rx: tiltX, ry: tiltY, tx: transX, ty: transY };

    // Inner glow position
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: glowX, y: glowY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    targetTransform.current = { rx: 0, ry: 0, tx: 0, ty: 0 };
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsRecoiling(true);
    // Elastic recoil pulse
    targetTransform.current = {
      rx: targetTransform.current.rx * -1.8,
      ry: targetTransform.current.ry * -1.8,
      tx: targetTransform.current.tx * -2,
      ty: targetTransform.current.ty * -2,
    };

    setTimeout(() => {
      setIsRecoiling(false);
      targetTransform.current = { rx: 0, ry: 0, tx: 0, ty: 0 };
    }, 280);

    if (onClick) onClick(e);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: transformStyle,
        transition: isRecoiling ? 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-3xl transition-shadow duration-300 ${className}`}
    >
      {/* Dynamic Cursor Inner Light Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-500 z-10"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};
