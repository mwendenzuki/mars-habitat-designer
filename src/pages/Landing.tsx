import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Home, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-landing.jpg)' }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 z-10">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold text-gradient-mars font-space">
                Mars Habitat Designer
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Design, visualize, and situate your space habitat for missions on Mars. 
                Explore the surface, configure your station, and plan the perfect interior layout.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                variant="hero" 
                onClick={() => navigate('/mission')}
                className="group"
              >
                Start Your Mission
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => navigate('/learn')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Globe className="w-12 h-12 text-primary/40" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <Home className="w-12 h-12 text-accent/40" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-aurora font-space">
            Three-Stage Mission Design
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-lg hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 glow-primary">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Surface Mapping</h3>
              <p className="text-muted-foreground">
                Explore Mars in 3D and select the ideal landing coordinates. 
                Analyze terrain, resources, and environmental conditions.
              </p>
            </div>

            <div className="glass-card p-8 rounded-lg hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6 glow-secondary">
                <Home className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Habitat Design</h3>
              <p className="text-muted-foreground">
                Configure your habitat's exterior structure, dimensions, and materials. 
                Choose between metallic, inflatable, or in-situ designs.
              </p>
            </div>

            <div className="glass-card p-8 rounded-lg hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 glow-primary">
                <Layout className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Interior Layout</h3>
              <p className="text-muted-foreground">
                Plan functional zones with drag-and-drop simplicity. 
                Optimize space for sleeping, hygiene, recreation, and life support.
              </p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Button 
              variant="hero" 
              onClick={() => navigate('/mission')}
              className="group"
            >
              Begin Design Process
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
