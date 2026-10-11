import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { careerTrail } from "../../data/trail";

// Mathematical elevation creating sculpted mountain ridges matching the mockup
export function getTerrainElevation(x, z) {
  // 1. Sharp Summit Peak (Upper Right at x=14, z=-10.5)
  const distSummit = Math.hypot(x - 14, z - (-10.5));
  const summit = Math.max(0, 18.5 - distSummit * 1.18);

  // 2. Sharp Center-Foreground Crag Peak (at x=0.5, z=4.5)
  const distCrag = Math.hypot(x - 0.5, z - 4.5);
  const crag = Math.max(0, 8.8 - distCrag * 1.6);

  // 3. Main Ascent Ridge Spine (Base Camp (-19, 15) to Summit (14, -10.5))
  const dx = 14 - (-19);
  const dz = -10.5 - 15;
  const lenSq = dx * dx + dz * dz;
  const t = Math.max(0, Math.min(1, ((x - (-19)) * dx + (z - 15) * dz) / lenSq));

  const projX = -19 + t * dx;
  const projZ = 15 + t * dz;
  const distSpine = Math.hypot(x - projX, z - projZ);

  // Elevation progression along the ridge spine
  const spineHeight = 1.0 + Math.pow(t, 1.25) * 17.0;
  const ridgeWidth = 4.5 + (1 - t) * 5.0;
  const spineFactor = Math.exp(-Math.pow(distSpine / ridgeWidth, 2));
  const ridge = spineHeight * spineFactor;

  // 4. Secondary Right/Backdrop Ridge (around x=16, z=-18)
  const distBack = Math.hypot(x - 16, z - (-18));
  const backRidge = Math.max(0, 15.0 - distBack * 1.0);

  // 5. Left Spur Ridge for additional mass
  const distLeftSpur = Math.hypot(x - (-4), z - 0);
  const leftSpur = Math.max(0, 9.0 - distLeftSpur * 1.1) * 0.55;

  // 6. Right Spur Ridge for dramatic silhouette
  const distRightSpur = Math.hypot(x - 10, z - (-5));
  const rightSpur = Math.max(0, 11.0 - distRightSpur * 1.0) * 0.45;

  // 7. Distinct Ridge Fluting and Contour Striations
  const ridgeFluting =
    Math.sin(x * 0.42 + z * 0.28) * 1.4 * spineFactor +
    Math.cos(x * 0.6 - z * 0.42) * 0.9 * spineFactor +
    Math.sin(x * 0.25 - z * 0.5) * 0.6 * spineFactor;

  const fineDetails =
    Math.sin(x * 0.8) * Math.sin(z * 0.8) * 0.25 +
    Math.sin(x * 1.2 + z * 0.9) * 0.12;

  const total = Math.max(
    ridge + ridgeFluting + fineDetails,
    summit,
    crag,
    backRidge * 0.85,
    leftSpur,
    rightSpur
  );

  return Math.max(0.12, total);
}

// Glowing Cyan/Teal Wireframe Mountain Mesh
function TerrainMesh() {
  const { geometry, wireGeometry } = useMemo(() => {
    const width = 90;
    const height = 90;
    const segments = 90;
    const geom = new THREE.PlaneGeometry(width, height, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, getTerrainElevation(x, z));
    }
    geom.computeVertexNormals();

    const wire = new THREE.WireframeGeometry(geom);
    return { geometry: geom, wireGeometry: wire };
  }, []);

  return (
    <group>
      {/* Dark mountain body */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#010810"
          roughness={0.95}
          metalness={0.1}
        />
      </mesh>
      {/* Electric cyan wireframe grid - sci-fi holographic look */}
      <lineSegments geometry={wireGeometry}>
        <lineBasicMaterial
          color="#00e8f0"
          transparent={true}
          opacity={0.6}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// Thin glowing trail line snuggled to the mountain surface
function SurfaceTrail({ curvePoints }) {
  const { ribbonGeom, haloGeom } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tube = new THREE.TubeGeometry(curve, 220, 0.10, 8, false);
    const halo = new THREE.TubeGeometry(curve, 220, 0.22, 8, false);
    return { ribbonGeom: tube, haloGeom: halo };
  }, [curvePoints]);

  return (
    <group>
      {/* Core bright pink line */}
      <mesh geometry={ribbonGeom}>
        <meshBasicMaterial color="#ff0080" />
      </mesh>
      {/* Soft neon aura */}
      <mesh geometry={haloGeom}>
        <meshBasicMaterial
          color="#ff1493"
          transparent={true}
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Waypoint Marker & Labels matching the mockup
function WaypointMarker({ waypoint, position, isSelected, onClick, index, total }) {
  const isSummit = index === total - 1;
  const isBase = index === 0;

  return (
    <group position={position} onClick={onClick}>
      {/* Surface glowing ring */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.62, 32]} />
        <meshBasicMaterial
          color="#00f5ff"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={isSelected ? 0.95 : 0.65}
        />
      </mesh>

      {/* Flag pole */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.95, 8]} />
        <meshBasicMaterial color="#00f5ff" />
      </mesh>

      {/* Flag banner */}
      <mesh position={[0.16, 0.85, 0]}>
        <boxGeometry args={[0.28, 0.18, 0.015]} />
        <meshBasicMaterial color="#00f5ff" />
      </mesh>

      {/* Radiant Summit Aura */}
      {isSummit && (
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial
            color="#ff3399"
            transparent={true}
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Floating Waypoint Label Badge */}
      <Html
        position={[0, isSelected ? 2.5 : 1.7, 0]}
        center
        distanceFactor={28}
        zIndexRange={[100, 0]}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
          }}
          className="cursor-pointer select-none font-mono whitespace-nowrap transition-transform hover:scale-105"
        >
          {isSelected ? (
            /* Highlighted Active Waypoint Badge with downward pointer arrow */
            <div className="flex flex-col items-center">
              <div className="px-3.5 py-1.5 rounded-lg bg-space-950/95 border-2 border-cyan-400 text-cyan-200 text-xs font-bold shadow-[0_0_22px_rgba(0,245,255,0.7)] flex items-center space-x-1.5">
                <span className="text-cyan-400 font-extrabold">✕</span>
                <span>{waypoint.company || waypoint.label}</span>
              </div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-cyan-400 shadow-[0_0_10px_#00f5ff]" />
            </div>
          ) : (
            /* Clean Pill Badge matching mockup */
            <div className="px-2.5 py-0.5 rounded-md bg-space-950/90 border border-cyan-500/50 text-slate-200 text-[11px] shadow-sm flex items-center space-x-1 hover:border-cyan-400">
              <span className="text-cyan-400 font-bold">
                {String(index + 1).padStart(2, "0")}:
              </span>
              <span>{waypoint.label || waypoint.role}</span>
              <span className="text-[10px] text-slate-400">
                ({waypoint.elevation})
              </span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

export default function MountainScene({
  activeWaypointIndex = 0,
  onSelectWaypoint,
}) {
  // Waypoint coordinate anchors along the ridge with natural curvature
  const waypointAnchors = useMemo(() => {
    return [
      new THREE.Vector3(-18.0, 0, 14.5), // 01: Base Camp (1,200m)
      new THREE.Vector3(-10.5, 0, 8.5),  // 02: Early Route (2,100m)
      new THREE.Vector3(-2.5, 0, 4.5),   // 03: Camp 1 (3,000m)
      new THREE.Vector3(4.2, 0, -2.8),   // 04: DBS Singapore (3,900m)
      new THREE.Vector3(9.2, 0, -7.2),   // 05: AI & Exploration (4,700m)
      new THREE.Vector3(14.0, 0, -10.5), // 06: The Summit (5,300m)
    ];
  }, []);

  // Compute exact waypoint positions directly on the mountain surface
  const waypointPositions = useMemo(() => {
    return waypointAnchors.map((pt) => [
      pt.x,
      getTerrainElevation(pt.x, pt.z) + 0.15,
      pt.z,
    ]);
  }, [waypointAnchors]);

  // Construct serpentine S-curve trail that hugs the mountain surface
  // Between each waypoint pair, the trail gently swings ±1.5-2.0 units
  // in z (perpendicular to the slope direction) to create visible switchbacks
  const curvePoints = useMemo(() => {
    const baseSpline = [
      // 01: Base Camp
      new THREE.Vector3(-18.0, 0, 14.5),
      new THREE.Vector3(-16.5, 0, 13.0),
      new THREE.Vector3(-15.0, 0, 12.5),

      // S-curve between 01→02: swing toward viewer (+z) then back (-z)
      new THREE.Vector3(-13.8, 0, 12.0),
      new THREE.Vector3(-12.5, 0, 10.0),
      new THREE.Vector3(-11.5, 0, 9.5),

      // 02: Early Route
      new THREE.Vector3(-10.5, 0, 8.5),

      // S-curve between 02→03: swing away (-z) then toward viewer (+z)
      new THREE.Vector3(-9.2, 0, 7.0),
      new THREE.Vector3(-7.8, 0, 5.0),
      new THREE.Vector3(-6.2, 0, 5.8),
      new THREE.Vector3(-4.8, 0, 6.5),
      new THREE.Vector3(-3.5, 0, 5.5),

      // 03: Camp 1
      new THREE.Vector3(-2.5, 0, 4.5),

      // S-curve between 03→04: swing toward viewer (+z) then away (-z)
      new THREE.Vector3(-1.5, 0, 3.8),
      new THREE.Vector3(-0.2, 0, 2.5),
      new THREE.Vector3(0.8, 0, 1.0),
      new THREE.Vector3(1.5, 0, -0.5),
      new THREE.Vector3(2.5, 0, -1.0),
      new THREE.Vector3(3.5, 0, -2.0),

      // 04: DBS Singapore
      new THREE.Vector3(4.2, 0, -2.8),

      // S-curve between 04→05: swing away (-z) then toward viewer (+z)
      new THREE.Vector3(5.0, 0, -3.5),
      new THREE.Vector3(5.8, 0, -5.0),
      new THREE.Vector3(6.8, 0, -6.2),
      new THREE.Vector3(7.5, 0, -5.5),
      new THREE.Vector3(8.2, 0, -6.0),
      new THREE.Vector3(8.8, 0, -6.8),

      // 05: AI & Exploration
      new THREE.Vector3(9.2, 0, -7.2),

      // S-curve between 05→06: swing toward viewer (+z) then to summit
      new THREE.Vector3(10.0, 0, -7.5),
      new THREE.Vector3(10.8, 0, -8.0),
      new THREE.Vector3(11.8, 0, -9.0),
      new THREE.Vector3(12.5, 0, -9.5),
      new THREE.Vector3(13.2, 0, -10.0),

      // 06: Summit
      new THREE.Vector3(14.0, 0, -10.5),
    ];

    const spline = new THREE.CatmullRomCurve3(baseSpline);
    const sampled = spline.getPoints(200);

    // Clamp every sampled point directly onto the mountain terrain surface
    return sampled.map((pt) => {
      const y = getTerrainElevation(pt.x, pt.z) + 0.18;
      return new THREE.Vector3(pt.x, y, pt.z);
    });
  }, []);

  return (
    <Canvas
      camera={{ position: [-8, 15, 46], fov: 38 }}
      style={{ width: "100%", height: "100%", background: "#050a14" }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => {
        camera.lookAt(0.5, 9.0, -2);
      }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[-15, 30, 20]} intensity={1.6} color="#00f5ff" />
      <pointLight position={[3, 11, -1]} intensity={1.2} color="#ff0080" distance={22} />

      {/* Starry Night Sky */}
      <Stars radius={70} depth={40} count={2200} factor={3.5} saturation={0.5} fade />

      {/* Mountain Terrain Wireframe */}
      <TerrainMesh />

      {/* Curving Glowing Trail hugging the terrain */}
      <SurfaceTrail curvePoints={curvePoints} />

      {/* Waypoint Markers & Mockup Badges */}
      {careerTrail.map((wp, index) => {
        const pos = waypointPositions[index] || [0, 0, 0];
        return (
          <WaypointMarker
            key={wp.id}
            waypoint={wp}
            position={pos}
            index={index}
            total={careerTrail.length}
            isSelected={activeWaypointIndex === index}
            onClick={() => onSelectWaypoint && onSelectWaypoint(index)}
          />
        );
      })}
    </Canvas>
  );
}
