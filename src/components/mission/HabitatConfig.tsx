import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Ruler, Box } from "lucide-react";

interface HabitatConfigProps {
  config: {
    type: string;
    crewSize: number;
    duration: number;
    dimensions: { diameter: number; height: number };
  };
  onChange: (config: any) => void;
}

const HabitatConfig = ({ config, onChange }: HabitatConfigProps) => {
  const habitatTypes = [
    {
      id: "metallic",
      name: "Metallic Structure",
      description: "Traditional rigid structure with high durability",
      mass: "Heavy",
      deployment: "Complex",
    },
    {
      id: "inflatable",
      name: "Inflatable Module",
      description: "Lightweight expandable habitat for quick deployment",
      mass: "Light",
      deployment: "Easy",
    },
    {
      id: "insitu",
      name: "In-Situ Manufacturing",
      description: "Built on-site using Martian resources",
      mass: "Variable",
      deployment: "Extended",
    },
  ];

  const totalVolume = Math.PI * Math.pow(config.dimensions.diameter / 2, 2) * config.dimensions.height;
  const volumePerCrew = totalVolume / config.crewSize;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gradient-mars">Habitat Configuration</h2>
        <p className="text-muted-foreground">
          Design your habitat's exterior structure and specifications
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Structure Type</h3>
            <div className="space-y-3">
              {habitatTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => onChange({ ...config, type: type.id })}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    config.type === type.id
                      ? "border-primary bg-primary/10 glow-primary"
                      : "border-border hover:border-accent/50 bg-card/30"
                  }`}
                >
                  <h4 className="font-semibold mb-1">{type.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                  <div className="flex gap-4 text-xs">
                    <span className="text-muted-foreground">
                      Mass: <span className="text-foreground">{type.mass}</span>
                    </span>
                    <span className="text-muted-foreground">
                      Deployment: <span className="text-foreground">{type.deployment}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-6">Mission Parameters</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    Crew Size
                  </Label>
                  <span className="text-2xl font-bold text-primary">{config.crewSize}</span>
                </div>
                <Slider
                  value={[config.crewSize]}
                  onValueChange={([value]) =>
                    onChange({ ...config, crewSize: value })
                  }
                  min={2}
                  max={12}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    Mission Duration (days)
                  </Label>
                  <span className="text-2xl font-bold text-primary">{config.duration}</span>
                </div>
                <Slider
                  value={[config.duration]}
                  onValueChange={([value]) =>
                    onChange({ ...config, duration: value })
                  }
                  min={30}
                  max={900}
                  step={30}
                  className="w-full"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-6">Dimensions</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-accent" />
                    Diameter (meters)
                  </Label>
                  <span className="text-2xl font-bold text-primary">
                    {config.dimensions.diameter}m
                  </span>
                </div>
                <Slider
                  value={[config.dimensions.diameter]}
                  onValueChange={([value]) =>
                    onChange({
                      ...config,
                      dimensions: { ...config.dimensions, diameter: value },
                    })
                  }
                  min={5}
                  max={20}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Box className="w-4 h-4 text-accent" />
                    Height (meters)
                  </Label>
                  <span className="text-2xl font-bold text-primary">
                    {config.dimensions.height}m
                  </span>
                </div>
                <Slider
                  value={[config.dimensions.height]}
                  onValueChange={([value]) =>
                    onChange({
                      ...config,
                      dimensions: { ...config.dimensions, height: value },
                    })
                  }
                  min={3}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4">Habitat Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Total Volume</span>
                <span className="text-xl font-bold">{totalVolume.toFixed(1)} m³</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">Volume per Crew</span>
                <span className={`text-xl font-bold ${volumePerCrew >= 20 ? 'text-green-400' : volumePerCrew >= 15 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {volumePerCrew.toFixed(1)} m³
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                <span className="text-muted-foreground">NASA Standard</span>
                <span className="text-sm text-muted-foreground">15-25 m³/crew</span>
              </div>
              <div className={`p-4 rounded-lg border-2 ${
                volumePerCrew >= 15 && volumePerCrew <= 25
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-yellow-400 bg-yellow-400/10'
              }`}>
                <p className="text-sm">
                  {volumePerCrew >= 15 && volumePerCrew <= 25
                    ? '✓ Habitat meets NASA recommendations'
                    : volumePerCrew < 15
                    ? '⚠ Consider increasing habitat size'
                    : '⚠ Habitat may be oversized'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HabitatConfig;
