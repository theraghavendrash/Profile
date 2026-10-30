import { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useReducedMotion from '../hooks/useReducedMotion';

interface WireframeMeshProps {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  onSceneClick: () => void;
  pulseTrigger: number;
  isDark?: boolean;
  isPaused?: boolean;
}

function WireframeMesh({
  isMobile,
  prefersReducedMotion,
  pulseTrigger,
  isDark = false,
  isPaused = false
}: WireframeMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  // Lower detail on mobile: 1 subdivision (42 vertices) on mobile vs 2 (162 vertices) on desktop
  const detail = isMobile ? 1 : 2;
  const wireColor = isDark ? '#e4e4e7' : '#111111';

  // Geometry definition
  const { outerLines, targetPosOuter, scatterPosOuter } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.6, detail);
    const wireGeo = new THREE.WireframeGeometry(geo);
    const targetPos = Float32Array.from(wireGeo.attributes.position.array);
    const scatterPos = new Float32Array(targetPos.length);

    // Deterministic pseudo-random scatter positions for smooth outward assembly
    for (let i = 0; i < targetPos.length; i += 3) {
      const x = targetPos[i];
      const y = targetPos[i + 1];
      const z = targetPos[i + 2];
      const len = Math.hypot(x, y, z) || 1;
      const seed = i * 17;
      const factor = 2.4 + ((seed % 13) / 13) * 1.6;
      const jitterX = (((seed * 7) % 19) / 19 - 0.5) * 1.4;
      const jitterY = (((seed * 11) % 23) / 23 - 0.5) * 1.4;
      const jitterZ = (((seed * 13) % 29) / 29 - 0.5) * 1.4;

      scatterPos[i] = (x / len) * factor + jitterX;
      scatterPos[i + 1] = (y / len) * factor + jitterY;
      scatterPos[i + 2] = (z / len) * factor + jitterZ;
    }

    return { outerLines: wireGeo, targetPosOuter: targetPos, scatterPosOuter: scatterPos };
  }, [detail]);

  const { vertexPoints, targetPosPoints, scatterPosPoints } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.6, detail);
    const targetPos = Float32Array.from(geo.attributes.position.array);
    const scatterPos = new Float32Array(targetPos.length);

    for (let i = 0; i < targetPos.length; i += 3) {
      const x = targetPos[i];
      const y = targetPos[i + 1];
      const z = targetPos[i + 2];
      const len = Math.hypot(x, y, z) || 1;
      const seed = i * 23;
      const factor = 2.6 + ((seed % 17) / 17) * 1.5;
      const jitterX = (((seed * 5) % 13) / 13 - 0.5) * 1.2;
      const jitterY = (((seed * 9) % 17) / 17 - 0.5) * 1.2;
      const jitterZ = (((seed * 15) % 23) / 23 - 0.5) * 1.2;

      scatterPos[i] = (x / len) * factor + jitterX;
      scatterPos[i + 1] = (y / len) * factor + jitterY;
      scatterPos[i + 2] = (z / len) * factor + jitterZ;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(Float32Array.from(scatterPos), 3)
    );

    return { vertexPoints: pointsGeo, targetPosPoints: targetPos, scatterPosPoints: scatterPos };
  }, [detail]);

  const innerLines = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.95, 0);
    return new THREE.WireframeGeometry(geo);
  }, []);

  // Animation state refs
  const assembleTimer = useRef<number>(prefersReducedMotion ? 1.5 : 0);
  const isFullyAssembled = useRef<boolean>(prefersReducedMotion);
  const currentPulse = useRef<number>(1.0);
  const pulseVelocity = useRef<number>(0);
  const rotImpulse = useRef<number>(0);

  // Smooth mouse tilt angles (lerp state)
  const currentTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const baseRotation = useRef<{ x: number; y: number }>({ x: 0.2, y: 0 });

  // Handle pulse trigger changes
  useEffect(() => {
    if (pulseTrigger > 0 && !prefersReducedMotion) {
      // Trigger instant expansion then damp back
      currentPulse.current = 1.2;
      pulseVelocity.current = 0.05;
      rotImpulse.current = 0.4;
    }
  }, [pulseTrigger, prefersReducedMotion]);

  useFrame((state, delta) => {
    // Pause animation calculations when off-screen or tab hidden
    if (isPaused || !groupRef.current) return;

    // 1. First-load assembly animation (0s -> 1.5s)
    if (!isFullyAssembled.current && !prefersReducedMotion) {
      assembleTimer.current += delta;
      const t = Math.min(assembleTimer.current / 1.5, 1.0);
      // Smooth cubic ease-out
      const ease = 1 - Math.pow(1 - t, 3);

      // Interpolate outer wireframe positions
      const posOuter = outerLines.attributes.position;
      const arrOuter = posOuter.array as Float32Array;
      for (let i = 0; i < targetPosOuter.length; i++) {
        arrOuter[i] = THREE.MathUtils.lerp(scatterPosOuter[i], targetPosOuter[i], ease);
      }
      posOuter.needsUpdate = true;

      // Interpolate vertex points positions
      const posPts = vertexPoints.attributes.position;
      const arrPts = posPts.array as Float32Array;
      for (let i = 0; i < targetPosPoints.length; i++) {
        arrPts[i] = THREE.MathUtils.lerp(scatterPosPoints[i], targetPosPoints[i], ease);
      }
      posPts.needsUpdate = true;

      // Scale up inner core during assembly
      if (innerRef.current) {
        innerRef.current.scale.setScalar(Math.max(0.001, ease));
      }

      if (t >= 1.0) {
        // Lock strictly to target coordinates
        posOuter.array.set(targetPosOuter);
        posOuter.needsUpdate = true;
        posPts.array.set(targetPosPoints);
        posPts.needsUpdate = true;
        isFullyAssembled.current = true;
      }
    }

    if (prefersReducedMotion) {
      groupRef.current.rotation.x = 0.25;
      groupRef.current.rotation.y = 0.35;
      groupRef.current.scale.setScalar(1.0);
      return;
    }

    // 2. Pulse dynamics (spring / damping back to 1.0)
    currentPulse.current = THREE.MathUtils.lerp(currentPulse.current, 1.0, delta * 8.5);
    rotImpulse.current = THREE.MathUtils.lerp(rotImpulse.current, 0, delta * 6);

    const netScale = currentPulse.current;
    groupRef.current.scale.setScalar(netScale);

    // 3. Slow continuous rotation with extra impulse on click
    const rotSpeedY = 0.14 + rotImpulse.current;
    const rotSpeedX = 0.07 + rotImpulse.current * 0.5;
    baseRotation.current.y += delta * rotSpeedY;
    baseRotation.current.x += delta * rotSpeedX;

    // 4. Smooth mouse easing (lerp toward pointer)
    const targetTiltX = state.pointer.y * -0.42;
    const targetTiltY = state.pointer.x * 0.42;

    currentTilt.current.x = THREE.MathUtils.lerp(
      currentTilt.current.x,
      targetTiltX,
      delta * 4.5
    );
    currentTilt.current.y = THREE.MathUtils.lerp(
      currentTilt.current.y,
      targetTiltY,
      delta * 4.5
    );

    groupRef.current.rotation.x = baseRotation.current.x + currentTilt.current.x;
    groupRef.current.rotation.y = baseRotation.current.y + currentTilt.current.y;
  });

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe: thin dark lines or light lines in dark mode */}
      <lineSegments geometry={outerLines}>
        <lineBasicMaterial color={wireColor} transparent opacity={isDark ? 0.9 : 0.85} linewidth={1} />
      </lineSegments>

      {/* Inner Invariant Core Geometry */}
      <group ref={innerRef}>
        <lineSegments geometry={innerLines}>
          <lineBasicMaterial color={wireColor} transparent opacity={isDark ? 0.45 : 0.32} linewidth={1} />
        </lineSegments>

        {/* Center Anchor Point in Deep Indigo (#4F46E5) */}
        <mesh>
          <sphereGeometry args={[isMobile ? 0.06 : 0.07, isMobile ? 12 : 16, isMobile ? 12 : 16]} />
          <meshBasicMaterial color="#4F46E5" />
        </mesh>
      </group>

      {/* Vertex Nodes: tiny points with lower detail / size on mobile */}
      <points geometry={vertexPoints}>
        <pointsMaterial
          size={isMobile ? 0.035 : 0.05}
          color={wireColor}
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [pulseCount, setPulseCount] = useState<number>(0);
  const prefersReducedMotion = useReducedMotion();
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState<boolean>(() => {
    return typeof document !== 'undefined' ? document.visibilityState !== 'hidden' : true;
  });

  // Track dark mode class on documentElement
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  // Responsive mobile detail switch
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause when hero is off-screen using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pause when the browser tab is hidden / inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState !== 'hidden');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const handleClick = useCallback(() => {
    if (!prefersReducedMotion) {
      setPulseCount((prev) => prev + 1);
    }
  }, [prefersReducedMotion]);

  // Combined pause state: active only when tab is visible AND hero is in viewport
  const shouldAnimate = isIntersecting && isDocumentVisible;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="w-full h-full relative cursor-pointer select-none"
      aria-label="Interactive 3D topological wireframe model. Click to pulse."
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'default'
        }}
        frameloop={shouldAnimate ? 'always' : 'never'}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1}
      >
        <WireframeMesh
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
          onSceneClick={handleClick}
          pulseTrigger={pulseCount}
          isDark={isDark}
          isPaused={!shouldAnimate}
        />
      </Canvas>
    </div>
  );
}

export default HeroScene;
