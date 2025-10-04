import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Zone {
  id: string;
  name: string;
  area: number;
  color: string;
}

interface InteriorLayoutProps {
  zones: Array<{ id: string; name: string; area: number }>;
  habitatDimensions: { diameter: number; height: number };
  onChange: (zones: Array<{ id: string; name: string; area: number }>) => void;
}

const zoneTemplates = [
  { name: "Sleeping Quarters", color: "#4a90e2", minArea: 4 },
  { name: "Hygiene Station", color: "#50c878", minArea: 3 },
  { name: "Galley/Food Prep", color: "#ff6b6b", minArea: 5 },
  { name: "Recreation Area", color: "#ffd93d", minArea: 6 },
  { name: "Life Support", color: "#a78bfa", minArea: 8 },
  { name: "Medical Bay", color: "#ec4899", minArea: 4 },
  { name: "Laboratory", color: "#14b8a6", minArea: 10 },
  { name: "Storage", color: "#94a3b8", minArea: 5 },
  { name: "Airlock", color: "#f59e0b", minArea: 3 },
];

const InteriorLayout = ({ zones, habitatDimensions, onChange }: InteriorLayoutProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  const totalArea = Math.PI * Math.pow(habitatDimensions.diameter / 2, 2);
  const usedArea = zones.reduce((sum, zone) => sum + zone.area, 0);
  const availableArea = totalArea - usedArea;

  const addZone = () => {
    if (!selectedTemplate) {
      toast.error("Please select a zone type first");
      return;
    }

    const template = zoneTemplates.find((t) => t.name === selectedTemplate);
    if (!template) return;

    if (template.minArea > availableArea) {
      toast.error("Not enough space for this zone");
      return;
    }

    const newZone = {
      id: Math.random().toString(36).substr(2, 9),
      name: template.name,
      area: template.minArea,
    };

    onChange([...zones, newZone]);
    toast.success(`${template.name} added`);
    setSelectedTemplate("");
  };

  const removeZone = (id: string) => {
    onChange(zones.filter((z) => z.id !== id));
    toast.success("Zone removed");
  };

  const updateZoneArea = (id: string, area: number) => {
    onChange(
      zones.map((z) => (z.id === id ? { ...z, area: Math.max(1, area) } : z))
    );
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gradient-mars">Interior Layout</h2>
        <p className="text-muted-foreground">
          Plan functional zones and optimize your habitat's interior space
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Floor Plan</h3>
            <div className="relative bg-background/50 rounded-lg p-8 min-h-[400px] border-2 border-dashed border-border">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                {/* Habitat outline */}
                <circle
                  cx="200"
                  cy="200"
                  r="180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                />
                
                {/* Zones visualization */}
                {zones.map((zone, index) => {
                  const template = zoneTemplates.find((t) => t.name === zone.name);
                  const angle = (index / zones.length) * 2 * Math.PI;
                  const radius = Math.sqrt((zone.area / totalArea) * 180 * 180);
                  const x = 200 + Math.cos(angle) * (180 - radius);
                  const y = 200 + Math.sin(angle) * (180 - radius);
                  
                  return (
                    <g key={zone.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r={radius}
                        fill={template?.color || "#666"}
                        opacity="0.6"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        className="text-xs fill-white font-medium pointer-events-none"
                      >
                        {zone.name}
                      </text>
                      <text
                        x={x}
                        y={y + 15}
                        textAnchor="middle"
                        className="text-xs fill-white/80 pointer-events-none"
                      >
                        {zone.area.toFixed(1)} m²
                      </text>
                    </g>
                  );
                })}

                {zones.length === 0 && (
                  <text
                    x="200"
                    y="200"
                    textAnchor="middle"
                    className="text-muted-foreground text-sm"
                  >
                    Add zones to begin layout design
                  </text>
                )}
              </svg>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Space Utilization</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Used Space</span>
                  <span className="font-medium">
                    {usedArea.toFixed(1)} / {totalArea.toFixed(1)} m²
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      usedArea / totalArea > 0.9
                        ? "bg-red-400"
                        : usedArea / totalArea > 0.7
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                    style={{ width: `${(usedArea / totalArea) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Available Space</span>
                <span className="text-xl font-bold text-primary">
                  {availableArea.toFixed(1)} m²
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Add Zone</h3>
            <div className="space-y-4">
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full p-3 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="">Select zone type...</option>
                {zoneTemplates.map((template) => (
                  <option key={template.name} value={template.name}>
                    {template.name} (min {template.minArea}m²)
                  </option>
                ))}
              </select>
              <Button onClick={addZone} className="w-full">
                <Plus className="mr-2 w-4 h-4" />
                Add Zone
              </Button>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Current Zones</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {zones.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No zones added yet
                </p>
              ) : (
                zones.map((zone) => {
                  const template = zoneTemplates.find((t) => t.name === zone.name);
                  return (
                    <div
                      key={zone.id}
                      className="p-3 rounded-lg border border-border bg-background/50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: template?.color }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{zone.name}</p>
                          <input
                            type="number"
                            value={zone.area}
                            onChange={(e) =>
                              updateZoneArea(zone.id, parseFloat(e.target.value))
                            }
                            className="w-20 px-2 py-1 text-sm rounded bg-background border border-border mt-1"
                            step="0.5"
                            min={template?.minArea || 1}
                          />
                          <span className="text-xs text-muted-foreground ml-2">m²</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeZone(zone.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteriorLayout;
