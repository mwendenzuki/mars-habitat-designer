import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

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

const MissionSummary = ({ missionData }: MissionSummaryProps) => {
  const totalVolume =
    Math.PI *
    Math.pow(missionData.habitat.dimensions.diameter / 2, 2) *
    missionData.habitat.dimensions.height;
  const volumePerCrew = totalVolume / missionData.habitat.crewSize;
  const totalArea = Math.PI * Math.pow(missionData.habitat.dimensions.diameter / 2, 2);
  const usedArea = missionData.interior.zones.reduce((sum, zone) => sum + zone.area, 0);

  const readinessScore = () => {
    let score = 0;
    if (missionData.coordinates.lat !== 0 || missionData.coordinates.lng !== 0) score += 25;
    if (volumePerCrew >= 15 && volumePerCrew <= 25) score += 25;
    if (missionData.interior.zones.length >= 5) score += 25;
    if (usedArea / totalArea >= 0.6 && usedArea / totalArea <= 0.85) score += 25;
    return score;
  };

  const handleExport = () => {
    const data = JSON.stringify(missionData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mars-habitat-design.json";
    a.click();
    toast.success("Design exported successfully!");
  };

  const handleShare = () => {
    const shareText = `Check out my Mars Habitat Design!\n\nCrew: ${missionData.habitat.crewSize} | Duration: ${missionData.habitat.duration} days\nLocation: ${missionData.coordinates.lat}°N, ${missionData.coordinates.lng}°E`;
    
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

  const score = readinessScore();

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-gradient-mars">Mission Summary</h2>
        <p className="text-muted-foreground">
          Review your complete habitat design and mission parameters
        </p>
      </div>

      <Card className="glass-card p-8 border-2 border-accent/50 glow-secondary">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Mission Readiness Score</h3>
          <div className="text-right">
            <p className="text-5xl font-bold text-gradient-aurora">{score}%</p>
            <p className="text-sm text-muted-foreground">
              {score >= 75 ? "Ready for Mission" : score >= 50 ? "Needs Review" : "Incomplete"}
            </p>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all ${
              score >= 75 ? "bg-green-400" : score >= 50 ? "bg-yellow-400" : "bg-red-400"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Landing Site
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Latitude</span>
              <span className="font-bold">{missionData.coordinates.lat}° N</span>
            </div>
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Longitude</span>
              <span className="font-bold">{missionData.coordinates.lng}° E</span>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Habitat Configuration
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Type</span>
              <span className="font-bold capitalize">{missionData.habitat.type}</span>
            </div>
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Dimensions</span>
              <span className="font-bold">
                {missionData.habitat.dimensions.diameter}m × {missionData.habitat.dimensions.height}m
              </span>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Mission Parameters
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Crew Size</span>
              <span className="font-bold">{missionData.habitat.crewSize} astronauts</span>
            </div>
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-bold">{missionData.habitat.duration} days</span>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-accent" />
            Space Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Volume per Crew</span>
              <span className={`font-bold ${volumePerCrew >= 15 && volumePerCrew <= 25 ? 'text-green-400' : 'text-yellow-400'}`}>
                {volumePerCrew.toFixed(1)} m³
              </span>
            </div>
            <div className="flex justify-between p-3 bg-background/50 rounded-lg">
              <span className="text-muted-foreground">Space Utilization</span>
              <span className="font-bold">{((usedArea / totalArea) * 100).toFixed(0)}%</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Interior Zones</h3>
        {missionData.interior.zones.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No zones configured</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {missionData.interior.zones.map((zone) => (
              <div
                key={zone.id}
                className="p-3 bg-background/50 rounded-lg border border-border"
              >
                <p className="font-medium">{zone.name}</p>
                <p className="text-sm text-muted-foreground">{zone.area.toFixed(1)} m²</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button variant="hero" onClick={handleExport} className="group">
          <Download className="mr-2 group-hover:scale-110 transition-transform" />
          Export Design
        </Button>
        <Button variant="glass" size="lg" onClick={handleShare}>
          <Share2 className="mr-2" />
          Share Mission
        </Button>
      </div>
    </div>
  );
};

export default MissionSummary;
