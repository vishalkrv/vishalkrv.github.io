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

  // 3. Main Ascent Ridge Spine (Line connecting Base Camp (-19, 15) to Summit (14, -10.5))
  const dx = 14 - (-19);
  const dz = -10.5 - 15;
  const lenSq = dx * dx + dz * dz;
  const t = Math.max(0, Math.min(1, ((x - (-19)) * dx + (z - 15) * dz) / lenSq));

  const projX = -19 + t * dx;
  const projZ = 15 + t * dz;
  const distSpine = Math.hypot(x - projX, z - projZ);

  // Elevation progression along the ridge spine
  const spineHeight = 1.0 + Math.pow(t, 1.25) * 17.0;
  const ridgeWidth = 4.8 + (1 - t) * 5.2;
  const spineFactor = Math.exp(-Math.pow(distSpine / ridgeWidth, 2));
  const ridge = spineHeight * spineFactor;

  // 4. Secondary Right/Backdrop Ridge (around x=16, z=-18)
  const distBack = Math.hypot(x - 16, z - (-18));
  const backRidge = Math.max(0, 15.0 - distBack * 1.0);

  // 5. Distinct Ridge Fluting and Contour Striations (creates authentic mountain ridges)
  const ridgeFluting =
    Math.sin(x * 0.42 + z * 0.28) * 1.2 * spineFactor +
    Math.cos(x * 0.6 - z * 0.42) * 0.7 * spineFactor;

  const fineDetails = Math.sin(x * 0.8) * Math.sin(z * 0.8) * 0.22;

  const total = Math.max(
    ridge + ridgeFluting + fineDetails,
    summit,
    crag,
    backRidge * 0.85
  );

  return Math.max(0.12, total);
}

// Glowing Cyan/Teal Wireframe Mountain Mesh
function TerrainMesh() {
  const { geometry, wireGeometry } = useMemo(() => {
    const width = 90;
    const height = 90;
    const segments = 85;
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
          color="#020914"
          roughness={0.92}
          metalness={0.2}
        />
      </mesh>
      {/* Electric cyan wireframe grid */}
      <lineSegments geometry={wireGeometry}>
        <lineBasicMaterial
          color="#00f5ff"
          transparent={true}
          opacity={0.45}
        />
      </lineSegments>
    </group>
  );
}

// Curving Glowing Pink Trail Ribbon snuggled tight to the mountain surface
function SurfaceTrail({ curvePoints }) {
  const { ribbonGeom, haloGeom } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tube = new THREE.TubeGeometry(curve, 180, 0.22, 8, false);
    const halo = new THREE.TubeGeometry(curve, 180, 0.45, 8, false);
    return { ribbonGeom: tube, haloGeom: halo };
  }, [curvePoints]);

  return (
    <group>
      {/* Glowing hot-pink ribbon */}
      <mesh geometry={ribbonGeom}>
        <meshBasicMaterial color="#ff0080" />
      </mesh>
      {/* Soft neon aura */}
      <mesh geometry={haloGeom}>
        <meshBasicMaterial
          color="#ff1493"
          transparent={true}
          opacity={0.42}
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
          color={isSelected || isBase ? "#00f5ff" : "#ff0080"}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={isSelected ? 0.95 : 0.65}
        />
      </mesh>

      {/* Flag pole */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.95, 8]} />
        <meshBasicMaterial color={isSelected ? "#00f5ff" : "#ff0080"} />
      </mesh>

      {/* Flag banner */}
      <mesh position={[0.16, 0.85, 0]}>
        <boxGeometry args={[0.28, 0.18, 0.015]} />
        <meshBasicMaterial color={isSelected ? "#00f5ff" : "#ff0080"} />
      </mesh>

      {/* Radiant Summit Pink Aura */}
      {isSummit && (
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.9, 16, 16]} />
          <meshBasicMaterial
            color="#ff0080"
            transparent={true}
            opacity={0.5}
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
                <span className="text-pink-400 font-extrabold">✕</span>
                <span>{waypoint.company || waypoint.label}</span>
              </div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-cyan-400 shadow-[0_0_10px_#00f5ff]" />
            </div>
          ) : (
            /* Clean Pill Badge matching mockup */
            <div className="px-2.5 py-0.5 rounded-md bg-space-950/90 border border-pink-500/50 text-slate-200 text-[11px] shadow-sm flex items-center space-x-1 hover:border-cyan-400">
              <span className="text-pink-400 font-bold">
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

  // Construct curving S-curve switchback trail snuggled tight to the mountain surface
  const curvePoints = useMemo(() => {
    const baseSpline = [
      new THREE.Vector3(-18.0, 0, 14.5), // 01
      new THREE.Vector3(-14.2, 0, 11.5),
      new THREE.Vector3(-10.5, 0, 8.5),  // 02
      new THREE.Vector3(-6.2, 0, 6.0),
      new THREE.Vector3(-2.5, 0, 4.5),   // 03
      new THREE.Vector3(0.5, 0, 1.0),    // Curve around crag
      new THREE.Vector3(2.0, 0, -0.5),   // S-curve switchback loop
      new THREE.Vector3(4.2, 0, -2.8),   // 04: DBS Singapore
      new THREE.Vector3(6.5, 0, -5.0),
      new THREE.Vector3(9.2, 0, -7.2),   // 05
      new THREE.Vector3(11.8, 0, -9.0),
      new THREE.Vector3(14.0, 0, -10.5), // 06: Summit
    ];

    const spline = new THREE.CatmullRomCurve3(baseSpline);
    const sampled = spline.getPoints(140);

    // Clamp every sampled point directly onto the mountain terrain surface
    return sampled.map((pt) => {
      const y = getTerrainElevation(pt.x, pt.z) + 0.16;
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
      <ambientLight intensity={0.5} />
      <directionalLight position={[-15, 30, 20]} intensity={1.5} color="#00f5ff" />
      <pointLight position={[3, 11, -1]} intensity={2.6} color="#ff0080" distance={40} />

      {/* Starry Night Sky */}
      <Stars radius={70} depth={40} count={2200} factor={3.5} saturation={0.5} fade />

      {/* Mountain Terrain Wireframe */}
      <TerrainMesh />

      {/* Curving Glowing Pink Trail Ribbon hugging the terrain */}
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
