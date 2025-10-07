import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SurfaceMapping from "@/components/mission/SurfaceMapping";
import HabitatConfig from "@/components/mission/HabitatConfig";
import InteriorLayout from "@/components/mission/InteriorLayout";
import MissionSummary from "@/components/mission/MissionSummary";

type MissionStep = "surface" | "habitat" | "interior" | "summary";

const steps: { id: MissionStep; title: string; description: string }[] = [
  {
    id: "surface",
    title: "Surface Mapping",
    description: "Select landing coordinates on Mars",
  },
  {
    id: "habitat",
    title: "Habitat Design",
    description: "Configure exterior structure",
  },
  {
    id: "interior",
    title: "Interior Layout",
    description: "Plan functional zones",
  },
  {
    id: "summary",
    title: "Mission Summary",
    description: "Review and export design",
  },
];

const MissionDesigner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<MissionStep>("surface");
  const [missionData, setMissionData] = useState({
    coordinates: { lat: 0, lng: 0 },
    habitat: {
      type: "metallic",
      crewSize: 4,
      duration: 500,
      dimensions: { diameter: 10, height: 5 },
    },
    interior: {
      zones: [] as Array<{ id: string; name: string; area: number }>,
    },
  });

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-mars.jpg)' }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      </div>

      {/* Progress Stepper */}
      <div className="glass-card border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      index < currentStepIndex
                        ? "bg-primary border-primary text-primary-foreground glow-primary"
                        : index === currentStepIndex
                        ? "bg-accent border-accent text-accent-foreground glow-secondary animate-pulse-glow"
                        : "bg-muted border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center hidden md:block">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-4 transition-colors ${
                      index < currentStepIndex ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {currentStep === "surface" && (
            <SurfaceMapping
              coordinates={missionData.coordinates}
              onChange={(coords) =>
                setMissionData((prev) => ({ ...prev, coordinates: coords }))
              }
            />
          )}
          {currentStep === "habitat" && (
            <HabitatConfig
              config={missionData.habitat}
              onChange={(habitat) =>
                setMissionData((prev) => ({ ...prev, habitat }))
              }
            />
          )}
          {currentStep === "interior" && (
            <InteriorLayout
              zones={missionData.interior.zones}
              habitatDimensions={missionData.habitat.dimensions}
              onChange={(zones) =>
                setMissionData((prev) => ({
                  ...prev,
                  interior: { zones },
                }))
              }
            />
          )}
          {currentStep === "summary" && (
            <MissionSummary missionData={missionData} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 max-w-6xl mx-auto">
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2" />
              Back to Home
            </Button>
            {currentStepIndex > 0 && (
              <Button variant="glass" onClick={handleBack}>
                <ArrowLeft className="mr-2" />
                Previous Step
              </Button>
            )}
          </div>

          {currentStep !== "summary" && (
            <Button onClick={handleNext}>
              Next Step
              <ArrowRight className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionDesigner;
