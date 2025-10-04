import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Info } from "lucide-react";
import { toast } from "sonner";

interface SurfaceMappingProps {
  coordinates: { lat: number; lng: number };
  onChange: (coords: { lat: number; lng: number }) => void;
}

const SurfaceMapping = ({ coordinates, onChange }: SurfaceMappingProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simple Mars globe visualization
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.4;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Mars sphere
    const gradient = ctx.createRadialGradient(
      centerX - radius * 0.3,
      centerY - radius * 0.3,
      radius * 0.1,
      centerX,
      centerY,
      radius
    );
    gradient.addColorStop(0, "#ff6b4a");
    gradient.addColorStop(0.5, "#c73e2f");
    gradient.addColorStop(1, "#8b2118");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Add surface details
    ctx.fillStyle = "rgba(139, 69, 19, 0.3)";
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * radius * 0.8;
      const x = centerX + Math.cos(angle + rotation.y) * distance;
      const y = centerY + Math.sin(angle + rotation.x) * distance * 0.5;
      const size = Math.random() * 20 + 5;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw selected coordinates marker
    if (coordinates.lat !== 0 || coordinates.lng !== 0) {
      const markerAngle = (coordinates.lng * Math.PI) / 180 + rotation.y;
      const markerLat = (coordinates.lat * Math.PI) / 180 + rotation.x;
      const markerX = centerX + Math.cos(markerAngle) * radius * 0.7;
      const markerY = centerY + Math.sin(markerLat) * radius * 0.7 * 0.5;

      ctx.fillStyle = "#00ffff";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(markerX, markerY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw marker pulse
      ctx.strokeStyle = "rgba(0, 255, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(markerX, markerY, 12, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw poles
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.arc(centerX, centerY - radius, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX, centerY + radius, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }, [rotation, coordinates]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01,
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Convert click to coordinates (simplified)
    const relX = (x - centerX) / (canvas.width / 2);
    const relY = (y - centerY) / (canvas.height / 2);

    const lng = Math.round(relX * 180);
    const lat = Math.round(relY * 90);

    onChange({ lat, lng });
    toast.success(`Landing site selected: ${lat}°N, ${lng}°E`);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gradient-mars">Mars Surface Mapping</h2>
        <p className="text-muted-foreground">
          Explore Mars and select your ideal landing coordinates
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 lg:col-span-2">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg cursor-move bg-background/50"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleCanvasClick}
          />
          <p className="text-sm text-muted-foreground text-center mt-4">
            Click to select coordinates • Drag to rotate
          </p>
        </Card>

        <div className="space-y-4">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Selected Coordinates</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Latitude</p>
                <p className="text-2xl font-bold text-primary">
                  {coordinates.lat}° N
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Longitude</p>
                <p className="text-2xl font-bold text-primary">
                  {coordinates.lng}° E
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Site Conditions</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Terrain Type</span>
                <span className="font-medium">Plains</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Elevation</span>
                <span className="font-medium">-2,500m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunlight</span>
                <span className="font-medium text-green-400">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Resources</span>
                <span className="font-medium text-green-400">Ice Nearby</span>
              </div>
            </div>
          </Card>

          <Button 
            variant="default" 
            className="w-full"
            onClick={() => {
              if (coordinates.lat === 0 && coordinates.lng === 0) {
                toast.error("Please select a landing site first");
              } else {
                toast.success("Landing site confirmed!");
              }
            }}
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurfaceMapping;
