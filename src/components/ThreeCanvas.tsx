import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WaterRippleImpulse {
  x: number;
  y: number;
  startTime: number;
  maxRadius: number;
  speed: number;
  amplitude: number;
}

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const ripplesRef = useRef<WaterRippleImpulse[]>([]);
  const mouseHoverPos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup with Soft Pastel Background & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xe4efe9, 0.02);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3.5, 11);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Vibrant Soft Pastel Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Lavender Point Light (#E0C3FC)
    const lavenderLight = new THREE.PointLight(0xe0c3fc, 9, 45);
    lavenderLight.position.set(10, 10, 8);
    scene.add(lavenderLight);

    // Soft Peach / Coral Point Light (#FFD1FF)
    const peachLight = new THREE.PointLight(0xffd1ff, 8, 45);
    peachLight.position.set(-10, -4, 8);
    scene.add(peachLight);

    // Sky Blue Directional Light (#A1C4FD)
    const skyBlueLight = new THREE.DirectionalLight(0xa1c4fd, 4.5);
    skyBlueLight.position.set(0, 12, -4);
    scene.add(skyBlueLight);

    // Mint Accent Point Light (#C2E9FB)
    const mintLight = new THREE.PointLight(0xc2e9fb, 6, 35);
    mintLight.position.set(0, 6, 12);
    scene.add(mintLight);

    // 5. Build High-Density Liquid Fluid Surface Plane (128 x 128 resolution)
    const PLANE_SIZE = 34;
    const SEGMENTS = 128;
    const planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, SEGMENTS, SEGMENTS);

    // Store initial vertex positions
    const posAttr = planeGeometry.attributes.position;
    const vertexCount = posAttr.count;
    const initialPositions = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount * 3; i++) {
      initialPositions[i] = posAttr.array[i];
    }

    // Dynamic Iridescent Pastel Vertex Gradient Colors
    // Lavender (#e0c3fc), Soft Peach (#ffd1ff), Sky Blue (#a1c4fd), Mint (#c2e9fb)
    const colors = new Float32Array(vertexCount * 3);
    const colorLavender = new THREE.Color(0xe0c3fc);
    const colorPeach = new THREE.Color(0xffd1ff);
    const colorSky = new THREE.Color(0xa1c4fd);
    const colorMint = new THREE.Color(0xc2e9fb);

    for (let i = 0; i < vertexCount; i++) {
      const vx = initialPositions[i * 3];
      const vy = initialPositions[i * 3 + 1];

      const nx = vx / (PLANE_SIZE / 2);
      const ny = vy / (PLANE_SIZE / 2);
      const dist = Math.sqrt(nx * nx + ny * ny);

      // Organic blend of vibrant pastels
      const c = colorSky.clone().lerp(colorLavender, Math.min(1, dist * 0.7));
      if (nx > 0) {
        c.lerp(colorPeach, nx * 0.5);
      } else {
        c.lerp(colorMint, Math.abs(nx) * 0.5);
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    planeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // High Quality Physical Liquid Sheen Material
    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfdfbfb,
      metalness: 0.25,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 0.95,
      flatShading: false,
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });

    const waterMesh = new THREE.Mesh(planeGeometry, waterMaterial);
    waterMesh.rotation.x = -Math.PI / 2.3; // Tilted fluid surface perspective
    waterMesh.position.set(0, -1.0, 0);
    scene.add(waterMesh);

    // Raycaster for Pointer Move & Click Interaction
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-999, -999);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObject(waterMesh);

      if (intersects.length > 0) {
        const hit = intersects[0].point;
        const localHit = waterMesh.worldToLocal(hit.clone());
        mouseHoverPos.current = { x: localHit.x, y: localHit.y, active: true };
      } else {
        mouseHoverPos.current.active = false;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObject(waterMesh);

      if (intersects.length > 0) {
        const hit = intersects[0].point;
        const localHit = waterMesh.worldToLocal(hit.clone());

        // Dispatch expanding radial shockwave impulse
        ripplesRef.current.push({
          x: localHit.x,
          y: localHit.y,
          startTime: clock.getElapsedTime(),
          maxRadius: 20,
          speed: 9.0,
          amplitude: 0.85,
        });

        if (ripplesRef.current.length > 12) {
          ripplesRef.current.shift();
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let animFrameId: number;

    const animate = () => {
      const time = clock.getElapsedTime();
      const currentPos = planeGeometry.attributes.position;
      const activeRipples = ripplesRef.current;
      const hover = mouseHoverPos.current;

      // Filter expired shockwaves
      ripplesRef.current = activeRipples.filter((r) => {
        const elapsed = time - r.startTime;
        return elapsed * r.speed < r.maxRadius;
      });

      // Update plane vertex heights
      for (let i = 0; i < vertexCount; i++) {
        const vx = initialPositions[i * 3];
        const vy = initialPositions[i * 3 + 1];

        // Fluid continuous rolling waves
        let z =
          Math.sin(vx * 0.35 + time * 2.0) * 0.3 +
          Math.cos(vy * 0.4 + time * 1.7) * 0.28 +
          Math.sin((vx + vy) * 0.25 + time * 2.4) * 0.18 +
          Math.cos(Math.sqrt(vx * vx + vy * vy) * 0.45 - time * 2.2) * 0.14;

        // Pointer hover ripple displacement
        if (hover.active) {
          const dx = vx - hover.x;
          const dy = vy - hover.y;
          const distToMouse = Math.sqrt(dx * dx + dy * dy);

          if (distToMouse < 6.5) {
            const hoverFactor = Math.cos((distToMouse / 6.5) * Math.PI) * 0.5 + 0.5;
            z += Math.sin(distToMouse * 2.8 - time * 6.5) * 0.4 * hoverFactor;
          }
        }

        // Pointer down radial shockwave expansion
        for (let r = 0; r < activeRipples.length; r++) {
          const rip = activeRipples[r];
          const elapsed = time - rip.startTime;
          const currentRadius = elapsed * rip.speed;

          const dx = vx - rip.x;
          const dy = vy - rip.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const ringDiff = Math.abs(dist - currentRadius);
          if (ringDiff < 2.8) {
            const decay = Math.max(0, 1 - dist / rip.maxRadius);
            const ringFactor = Math.cos((ringDiff / 2.8) * (Math.PI / 2));
            z += Math.sin((dist - currentRadius) * 3.8) * rip.amplitude * ringFactor * decay;
          }
        }

        currentPos.setZ(i, z);
      }

      currentPos.needsUpdate = true;
      planeGeometry.computeVertexNormals();

      // Floating Camera Sway
      camera.position.x = Math.sin(time * 0.2) * 0.6;
      camera.position.y = 3.5 + Math.cos(time * 0.25) * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);

      planeGeometry.dispose();
      waterMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-auto -z-10 overflow-hidden"
    />
  );
};
