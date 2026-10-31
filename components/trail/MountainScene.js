import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { careerTrail } from "../../data/trail";

/**
 * Topographic elevation formula creating a sculpted mountain ridge
 * Base Camp at (-18, 14.5), DBS Singapore at (4.2, -2.8), Summit at (14, -10.5)
 */
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

// Vantage Reality Capture Topographic Terrain Mesh with Height Coloring
function TerrainMesh() {
  const { geometry, wireGeometry } = useMemo(() => {
    const width = 90;
    const height = 90;
    const segments = 90;
    const geom = new THREE.PlaneGeometry(width, height, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    const cLow = new THREE.Color("#0a101a");
    const cMid = new THREE.Color("#131e2d");
    const cHigh = new THREE.Color("#1f3146");
    const cPeak = new THREE.Color("#314b68");

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const elev = getTerrainElevation(x, z);
      pos.setY(i, elev);

      // Height-based lithic color gradient
      const normH = Math.min(1, Math.max(0, elev / 18.5));
      const vertexColor = new THREE.Color();
      if (normH < 0.3) {
        vertexColor.lerpColors(cLow, cMid, normH / 0.3);
      } else if (normH < 0.75) {
        vertexColor.lerpColors(cMid, cHigh, (normH - 0.3) / 0.45);
      } else {
        vertexColor.lerpColors(cHigh, cPeak, (normH - 0.75) / 0.25);
      }

      colors[i * 3] = vertexColor.r;
      colors[i * 3 + 1] = vertexColor.g;
      colors[i * 3 + 2] = vertexColor.b;
    }

    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    const wire = new THREE.WireframeGeometry(geom);
    return { geometry: geom, wireGeometry: wire };
  }, []);

  return (
    <group>
      {/* Lithic terrain body with height gradient */}
      <mesh geometry={geometry}>
        <meshStandardMaterial
          vertexColors={true}
          roughness={0.82}
          metalness={0.08}
        />
      </mesh>
      {/* Restrained steel survey contour wireframe */}
      <lineSegments geometry={wireGeometry}>
        <lineBasicMaterial
          color="#34485e"
          transparent={true}
          opacity={0.32}
          depthWrite={false}
        />
      </lineSegments>
      {/* Coordinate Survey Grid Floor at datum y=0 */}
      <gridHelper
        args={[90, 45, "#25374c", "#101926"]}
        position={[0, 0.02, 0]}
      />
    </group>
  );
}

// Precision Vantage Survey Trail Line (Chromatic Lime Active Track)
function SurfaceTrail({ curvePoints }) {
  const { ribbonGeom, haloGeom } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tube = new THREE.TubeGeometry(curve, 220, 0.08, 8, false);
    const halo = new THREE.TubeGeometry(curve, 220, 0.2, 8, false);
    return { ribbonGeom: tube, haloGeom: halo };
  }, [curvePoints]);

  return (
    <group>
      {/* Core active lime trail line */}
      <mesh geometry={ribbonGeom}>
        <meshBasicMaterial color="#caff3c" />
      </mesh>
      {/* Subtle survey line radiance */}
      <mesh geometry={haloGeom}>
        <meshBasicMaterial
          color="#caff3c"
          transparent={true}
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// Lidar Airborne Survey Point Cloud along the ridge
function LidarSurveyCloud() {
  const points = useMemo(() => {
    const count = 320;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cLime = new THREE.Color("#caff3c");
    const cSteel = new THREE.Color("#56789b");

    for (let i = 0; i < count; i++) {
      const t = Math.random();
      // Interpolate along ridge spine from (-18, 14.5) to (14, -10.5)
      const rx = -18 + t * (14 - (-18)) + (Math.random() - 0.5) * 6;
      const rz = 14.5 + t * (-10.5 - 14.5) + (Math.random() - 0.5) * 6;
      const groundY = getTerrainElevation(rx, rz);
      const ry = groundY + 0.3 + Math.random() * 2.8;

      pos[i * 3] = rx;
      pos[i * 3 + 1] = ry;
      pos[i * 3 + 2] = rz;

      const col = Math.random() > 0.4 ? cSteel : cLime;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geom;
  }, []);

  return (
    <points geometry={points}>
      <pointsMaterial
        size={0.16}
        vertexColors={true}
        transparent={true}
        opacity={0.65}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Survey Station Waypoint Benchmark Marker & Labels
function WaypointMarker({ waypoint, position, isSelected, onClick, index, total }) {
  const isSummit = index === total - 1;
  const prismRef = useRef();

  useFrame((_, delta) => {
    if (prismRef.current) {
      prismRef.current.rotation.y += delta * (isSelected ? 1.8 : 0.6);
    }
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Benchmark survey target ring on terrain */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.52, 32]} />
        <meshBasicMaterial
          color={isSelected ? "#caff3c" : "#4a5d73"}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={isSelected ? 0.95 : 0.45}
        />
      </mesh>

      {/* Vertical survey rod / theodolite plumb mast */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.85, 8]} />
        <meshBasicMaterial color={isSelected ? "#caff3c" : "#71859b"} />
      </mesh>

      {/* Rotating survey prism target */}
      <mesh ref={prismRef} position={[0, 0.9, 0]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshBasicMaterial color={isSelected ? "#caff3c" : "#8aa0b5"} />
      </mesh>

      {/* Active Station Vertical Laser Beam */}
      {isSelected && (
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 3.2, 8]} />
          <meshBasicMaterial
            color="#caff3c"
            transparent={true}
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Summit survey beacon */}
      {isSummit && (
        <mesh position={[0, 1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.65, 32]} />
          <meshBasicMaterial
            color="#caff3c"
            side={THREE.DoubleSide}
            transparent={true}
            opacity={0.65}
          />
        </mesh>
      )}

      {/* Floating Waypoint Label Badge */}
      <Html
        position={[0, isSelected ? 2.5 : 1.6, 0]}
        center
        distanceFactor={28}
        zIndexRange={[100, 0]}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
          }}
          className="cursor-pointer select-none whitespace-nowrap"
        >
          {isSelected ? (
            /* Active Waypoint Badge */
            <div className="flex flex-col items-center">
              <div className="px-3 py-1.5 rounded instrument-panel border border-accent text-accent text-xs num flex items-center gap-2 ticks shadow-xl backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <span className="font-semibold text-ink">{waypoint.company || waypoint.label}</span>
                <span className="text-accent font-mono font-medium">▲ {waypoint.elevation}</span>
              </div>
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-accent" />
            </div>
          ) : (
            /* Inactive Waypoint Tag */
            <div className="px-2.5 py-1 rounded instrument-panel border border-rule text-ink-2 text-xs num hover:border-accent hover:text-ink flex items-center gap-1.5 transition-colors duration-150 backdrop-blur-md">
              <span className="text-muted text-[11px] font-mono">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-medium">{waypoint.company ? waypoint.company : waypoint.label}</span>
              <span className="text-accent/90 text-[11px] font-mono">
                {waypoint.elevation}
              </span>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// Camera tracking rig smoothly framing active waypoint
function CameraRig({ activePosition, activeIndex }) {
  const targetLook = useRef(new THREE.Vector3(0.5, 9.0, -2));

  useFrame(({ camera }) => {
    const [ax, ay, az] = activePosition;
    const progress = Math.min(1, Math.max(0, ay / 18.5));

    // Dynamic camera position adjusting elevation with waypoint climb
    const desiredCamX = -10 + progress * 3;
    const desiredCamY = 13 + progress * 5;
    const desiredCamZ = 42 - progress * 8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredCamX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredCamY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredCamZ, 0.04);

    const desiredLookX = ax * 0.35 + 1.5;
    const desiredLookY = ay * 0.45 + 5.5;
    const desiredLookZ = az * 0.35 - 2;

    targetLook.current.x = THREE.MathUtils.lerp(targetLook.current.x, desiredLookX, 0.04);
    targetLook.current.y = THREE.MathUtils.lerp(targetLook.current.y, desiredLookY, 0.04);
    targetLook.current.z = THREE.MathUtils.lerp(targetLook.current.z, desiredLookZ, 0.04);

    camera.lookAt(targetLook.current);
  });

  return null;
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

  // Construct serpentine S-curve trail hugging the mountain surface
  const curvePoints = useMemo(() => {
    const baseSpline = [
      // 01: Base Camp
      new THREE.Vector3(-18.0, 0, 14.5),
      new THREE.Vector3(-16.5, 0, 13.0),
      new THREE.Vector3(-15.0, 0, 12.5),

      // S-curve between 01→02
      new THREE.Vector3(-13.8, 0, 12.0),
      new THREE.Vector3(-12.5, 0, 10.0),
      new THREE.Vector3(-11.5, 0, 9.5),

      // 02: Early Route
      new THREE.Vector3(-10.5, 0, 8.5),

      // S-curve between 02→03
      new THREE.Vector3(-9.2, 0, 7.0),
      new THREE.Vector3(-7.8, 0, 5.0),
      new THREE.Vector3(-6.2, 0, 5.8),
      new THREE.Vector3(-4.8, 0, 6.5),
      new THREE.Vector3(-3.5, 0, 5.5),

      // 03: Camp 1
      new THREE.Vector3(-2.5, 0, 4.5),

      // S-curve between 03→04
      new THREE.Vector3(-1.5, 0, 3.8),
      new THREE.Vector3(-0.2, 0, 2.5),
      new THREE.Vector3(0.8, 0, 1.0),
      new THREE.Vector3(1.5, 0, -0.5),
      new THREE.Vector3(2.5, 0, -1.0),
      new THREE.Vector3(3.5, 0, -2.0),

      // 04: DBS Singapore
      new THREE.Vector3(4.2, 0, -2.8),

      // S-curve between 04→05
      new THREE.Vector3(5.0, 0, -3.5),
      new THREE.Vector3(5.8, 0, -5.0),
      new THREE.Vector3(6.8, 0, -6.2),
      new THREE.Vector3(7.5, 0, -5.5),
      new THREE.Vector3(8.2, 0, -6.0),
      new THREE.Vector3(8.8, 0, -6.8),

      // 05: AI & Exploration
      new THREE.Vector3(9.2, 0, -7.2),

      // S-curve between 05→06
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

    return sampled.map((pt) => {
      const y = getTerrainElevation(pt.x, pt.z) + 0.18;
      return new THREE.Vector3(pt.x, y, pt.z);
    });
  }, []);

  const activePos = waypointPositions[activeWaypointIndex] || [0, 5, 0];

  return (
    <Canvas
      camera={{ position: [-10, 13, 42], fov: 38 }}
      style={{ width: "100%", height: "100%", background: "#080c14" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} color="#141d2a" />
      <directionalLight position={[-18, 32, 22]} intensity={1.4} color="#d8e7f8" />
      <directionalLight position={[20, 10, -15]} intensity={0.8} color="#385270" />
      <pointLight position={[activePos[0], activePos[1] + 1.5, activePos[2]]} intensity={1.2} color="#caff3c" distance={16} />

      {/* Subtle stellar field */}
      <Stars radius={70} depth={40} count={1200} factor={2.2} saturation={0} fade />

      {/* Camera Tracking Rig */}
      <CameraRig activePosition={activePos} activeIndex={activeWaypointIndex} />

      {/* Topographic Terrain Wireframe & Body */}
      <TerrainMesh />

      {/* Lidar Ridge Survey Particles */}
      <LidarSurveyCloud />

      {/* Chromatic Lime Survey Trail Line */}
      <SurfaceTrail curvePoints={curvePoints} />

      {/* Waypoint Station Benchmark Markers & Badges */}
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
