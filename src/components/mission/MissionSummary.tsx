import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars, Text } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2, Eye, EyeOff, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import * as THREE from "three";

interface MissionSummaryProps {
  missionData: {
    coordinates: { lat: number; lng: number };
    habitat: {
      type: string;
      crewSize: number;
      duration: number;
      dimensions: { diameter: number; height: number };
    };
    interior: {
      zones: Array<{ id: string; name: string; area: number }>;
    };
  };
}

// Mars Terrain Component
const MarsTerrain = ({ coordinates }: { coordinates: { lat: number; lng: number } }) => {
  return (
    <group>
      {/* Mars Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial 
          color="#c1440e"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Landing Site Marker */}
      <mesh position={[coordinates.lng / 10, 0.2, coordinates.lat / 10]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Coordinate Rings */}
      <mesh position={[coordinates.lng / 10, 0.05, coordinates.lat / 10]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Habitat Structure Component
const HabitatStructure = ({ 
  type, 
  dimensions, 
  showInterior 
}: { 
  type: string; 
  dimensions: { diameter: number; height: number };
  showInterior: boolean;
}) => {
  const radius = dimensions.diameter / 2;
  const height = dimensions.height;
  
  const getMaterial = () => {
    switch (type) {
      case "metallic":
        return (
          <meshStandardMaterial 
            color="#8b9dc3"
            metalness={0.8}
            roughness={0.2}
            transparent={showInterior}
            opacity={showInterior ? 0.3 : 1}
          />
        );
      case "inflatable":
        return (
          <meshStandardMaterial 
            color="#e8e8e8"
            metalness={0.1}
            roughness={0.8}
            transparent={showInterior}
            opacity={showInterior ? 0.3 : 1}
          />
        );
      case "in-situ":
        return (
          <meshStandardMaterial 
            color="#c1440e"
            metalness={0.2}
            roughness={0.9}
            transparent={showInterior}
            opacity={showInterior ? 0.3 : 1}
          />
        );
      default:
        return <meshStandardMaterial color="#ffffff" />;
    }
  };

  return (
    <group position={[0, height / 2, 0]} castShadow>
      {/* Main Habitat Structure */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        {getMaterial()}
      </mesh>
      
      {/* Airlock Module */}
      <mesh position={[radius + 0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 1.5, 16]} />
        {getMaterial()}
      </mesh>
    </group>
  );
};

// Interior Zones Visualization
const InteriorZones = ({ 
  zones, 
  dimensions 
}: { 
  zones: Array<{ id: string; name: string; area: number }>;
  dimensions: { diameter: number; height: number };
}) => {
  const radius = dimensions.diameter / 2;
  const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f7b731", "#5f27cd", "#00d2d3"];
  
  return (
    <group position={[0, dimensions.height / 2, 0]}>
      {zones.map((zone, index) => {
        const angle = (index / zones.length) * Math.PI * 2;
        const distance = radius * 0.6;
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const size = Math.sqrt(zone.area) / 5;
        
        return (
          <group key={zone.id} position={[x, 0, z]}>
            <mesh>
              <boxGeometry args={[size, 0.1, size]} />
              <meshStandardMaterial 
                color={colors[index % colors.length]}
                transparent
                opacity={0.7}
              />
            </mesh>
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {zone.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

// Main Scene Component
const MissionScene = ({ missionData, showInterior }: { missionData: MissionSummaryProps["missionData"]; showInterior: boolean }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[15, 10, 15]} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b4a" />
      
      {/* Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Scene Elements */}
      <MarsTerrain coordinates={missionData.coordinates} />
      <HabitatStructure 
        type={missionData.habitat.type}
        dimensions={missionData.habitat.dimensions}
        showInterior={showInterior}
      />
      {showInterior && (
        <InteriorZones 
          zones={missionData.interior.zones}
          dimensions={missionData.habitat.dimensions}
        />
      )}
    </>
  );
};

const MissionSummary = ({ missionData }: MissionSummaryProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showInterior, setShowInterior] = useState(false);

  const handleExportImage = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "mars-habitat-render.png";
          a.click();
          URL.revokeObjectURL(url);
          toast.success("Visualization exported successfully!");
        }
      });
    }
  };

  const handleShare = () => {
    const shareText = `Check out my Mars Habitat Design!\n\nCrew: ${missionData.habitat.crewSize} | Duration: ${missionData.habitat.duration} days\nLocation: ${missionData.coordinates.lat}°N, ${missionData.coordinates.lng}°E\nType: ${missionData.habitat.type}\nZones: ${missionData.interior.zones.length}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Mars Habitat Design",
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success("Design details copied to clipboard!");
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(missionData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mars-habitat-design.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Design data exported!");
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gradient-mars">Mission Visualization</h2>
        <p className="text-muted-foreground">
          Explore your complete habitat design in immersive 3D
        </p>
      </div>

      {/* 3D Visualization Canvas */}
      <Card className="glass-card p-4 overflow-hidden">
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden bg-background/50">
          <Canvas
            ref={canvasRef}
            shadows
            gl={{ preserveDrawingBuffer: true }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <MissionScene missionData={missionData} showInterior={showInterior} />
            </Suspense>
          </Canvas>
          
          {/* Controls Overlay */}
          <div className="absolute top-4 left-4 glass-card p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
            </p>
          </div>
        </div>
      </Card>

      {/* Mission Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Landing Site</p>
          <p className="text-lg font-bold">{missionData.coordinates.lat}°N, {missionData.coordinates.lng}°E</p>
        </Card>
        <Card className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Habitat Type</p>
          <p className="text-lg font-bold capitalize">{missionData.habitat.type}</p>
        </Card>
        <Card className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Crew Size</p>
          <p className="text-lg font-bold">{missionData.habitat.crewSize} astronauts</p>
        </Card>
        <Card className="glass-card p-4">
          <p className="text-sm text-muted-foreground">Interior Zones</p>
          <p className="text-lg font-bold">{missionData.interior.zones.length} zones</p>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Button 
          variant={showInterior ? "default" : "glass"}
          onClick={() => setShowInterior(!showInterior)}
          className="group"
        >
          {showInterior ? <EyeOff className="mr-2" /> : <Eye className="mr-2" />}
          {showInterior ? "Hide" : "Show"} Interior
        </Button>
        <Button variant="hero" onClick={handleExportImage} className="group">
          <Download className="mr-2 group-hover:scale-110 transition-transform" />
          Export Image
        </Button>
        <Button variant="glass" onClick={handleExportData}>
          <Download className="mr-2" />
          Export Data
        </Button>
        <Button variant="glass" onClick={handleShare}>
          <Share2 className="mr-2" />
          Share Mission
        </Button>
      </div>
    </div>
  );
};

export default MissionSummary;
