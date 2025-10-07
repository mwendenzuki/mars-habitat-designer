import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearningResources = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full overflow-hidden px-4 py-8 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/bg-milkyway.jpg)' }}
      >
        <div className="absolute inset-0 bg-background/75 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        {/* Page Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gradient-mars mb-16 text-center font-space">
          Learning Resources
        </h1>

        {/* Section 1: Building for the Void */}
        <section className="mb-20">
          <div className="glass-card p-8 rounded-lg space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-aurora mb-6 font-space">
              Building for the Void: Bizarre Realities of Space Architecture
            </h2>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Introduction: More Than Just Four Walls and a Roof</h3>
                <p className="leading-relaxed">
                  On Earth, building a house means contending with rain, wind, and gravity. In space, the challenges are of a different magnitude entirely. The environment outside is not just inhospitable; it is fundamentally incompatible with human life. A space habitat, therefore, must be more than a shelter—it is a self-contained, artificial recreation of Earth's environment, designed to protect its most precious payload: people.
                </p>
                <p className="leading-relaxed mt-4">
                  To create this sanctuary in the void, designers must overcome five primary environmental challenges that are unlike anything faced on our home planet. These are the fundamental problems that shape every aspect of a habitat's design, from its outer shell to its interior layout. The five challenges are:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>The nothingness of the vacuum</li>
                  <li>The hazard of orbital debris</li>
                  <li>The puzzle of varying gravity</li>
                  <li>The invisible danger of space radiation</li>
                  <li>The trouble with planetary dust</li>
                </ol>
                <p className="leading-relaxed mt-4">
                  Understanding these obstacles is the first step in appreciating the incredible engineering required to build a home among the stars. Let's begin with the most fundamental characteristic of space: its emptiness.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">1. The Nothingness That Bites: The Vacuum of Space</h3>
                <p className="leading-relaxed">
                  The most immediate difference between Earth and space is the absence of an atmosphere. Space is a hard vacuum, a vast emptiness with pressure far lower than anything achievable in a laboratory on Earth. This "nothingness" poses several critical design problems for a habitat.
                </p>
                <p className="leading-relaxed mt-4">
                  The most obvious consequence is the need for a pressurized environment for humans to survive. Without a strong, sealed enclosure maintaining an internal atmosphere, human life is impossible. Habitat pressures can vary, from the lower pressure found inside a spacesuit (around 4 psi) to the full sea-level pressure of Earth (14.7 psi) used on the International Space Station and Space Shuttle.
                </p>
                <p className="leading-relaxed mt-4">
                  Beyond simply containing air, the vacuum creates less obvious but equally important engineering challenges:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Outgassing Materials:</strong> In a vacuum, certain materials—especially polymers—can slowly release trapped gases. This process, known as outgassing, can change the material's characteristics and, more critically, contaminate sensitive surfaces like camera lenses or scientific instruments as the gas recondenses on them.</li>
                  <li><strong>Heat Transfer:</strong> On Earth, air moves heat around through convection (think of hot air rising). In the vacuum of space, there is no air and therefore no convection. This makes it much more difficult to dissipate excess heat from electronics and crew, requiring specialized thermal control systems.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">2. Cosmic Cannonballs: The Hazard of Orbital Debris</h3>
                <p className="leading-relaxed">
                  While often depicted as empty, the space around our planet—particularly Low Earth Orbit (LEO)—is increasingly crowded with tiny, fast-moving particles. This orbital debris poses a significant impact risk to any space habitat. The debris comes from two primary sources:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong>Meteoroids:</strong> These are naturally occurring space particles. While large meteoroids are rare, smaller ones can create a "sandblasting" effect on a habitat's exterior.</li>
                  <li><strong>Human-Generated Debris:</strong> This is a major and growing problem in LEO, resulting from decades of launches. It includes everything from flecks of paint to discarded rocket stages and fragments from satellite explosions.</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  This debris is exceptionally dangerous because of its incredible speed. In orbit, even a tiny particle can strike with the energy of a cosmic cannonball, capable of causing catastrophic damage to a pressurized habitat.
                </p>
                <p className="leading-relaxed mt-4">
                  To protect against this threat, habitats are designed with a "bumper," or an outer shell, that stands apart from the main pressurized structure. This shield is designed to absorb the initial impact, breaking up the high-velocity particle and dispersing its energy before it can penetrate the crew's living area.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">3. The Gravity Puzzle: Too Little, Too Different, or Man-Made</h3>
                <p className="leading-relaxed">
                  Gravity in space is not a single, simple concept. Depending on the mission, designers must account for completely different gravitational environments, each with its own opportunities and challenges.
                </p>
                
                <h4 className="text-xl font-semibold text-accent mt-6 mb-3">Microgravity (Floating in Orbit)</h4>
                <p className="leading-relaxed">
                  On orbital stations like the ISS or during long transit missions, crews experience microgravity.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                  <li><strong>Design Opportunity:</strong> The absence of a strong "up" and "down" allows designers to utilize the entire volume of a module, not just its floor area. The ISS is a prime example, with equipment and workstations lining every surface of its cylindrical modules.</li>
                  <li><strong>Design Challenge:</strong> Long-term exposure to microgravity has negative effects on the human body, causing muscle and bone deterioration. This requires dedicated countermeasures, like rigorous exercise regimes, to keep astronauts healthy.</li>
                </ul>

                <h4 className="text-xl font-semibold text-accent mt-6 mb-3">Partial Gravity (Walking on the Moon and Mars)</h4>
                <p className="leading-relaxed">
                  On the surface of the Moon or Mars, there is a clear sense of "up" and "down," but the gravitational force is much weaker than on Earth. This changes how humans move and interact with their environment, which directly impacts habitat design.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">4. Invisible Danger: Shielding from Space Radiation</h3>
                <p className="leading-relaxed">
                  Here on Earth, our planet's magnetic field acts as a powerful, invisible shield, protecting us from harmful radiation. In space, that protection is gone, exposing astronauts to a dangerous environment. There are two primary types of space radiation designers must account for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong>Galactic Cosmic Radiation (GCR):</strong> This is a continuous, low-level background radiation originating from high-energy events in deep space, such as supernovae. Shielding against it completely would require massive, impractical amounts of material.</li>
                  <li><strong>Solar Proton Events (SPEs):</strong> These are sudden, high-concentration bursts of radiation from solar flares on our own Sun. SPEs are the major concern, as an unprotected human exposed to a large event could receive a lethal dose.</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  The primary design solution is shielding. Because it is impractical to shield an entire habitat against the most intense SPEs, the common strategy is to include a dedicated "storm shelter." This is a smaller, heavily shielded area within the habitat where the crew can take cover for the duration of a dangerous solar event.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">5. The Trouble with Planetary Dust</h3>
                <p className="leading-relaxed">
                  For habitats designed to sit on the surface of the Moon or Mars, one of the most persistent and difficult challenges is dust. The surfaces of these worlds are covered in a layer of fine, abrasive particles that can wreak havoc on equipment and human health.
                </p>
                <p className="leading-relaxed mt-4">
                  The Apollo missions provided a stark lesson in the problematic nature of lunar dust. Described as being very abrasive, it clings to everything it touches. Astronauts found it contaminated their equipment, damaged mechanical systems, and, most concerningly, got inside the Lunar Module. Once inside, this dust can be harmful if inhaled into the crew's lungs.
                </p>
                <p className="leading-relaxed mt-4">
                  While Mars dust is less understood, it is also a significant design consideration. Therefore, a critical goal for any surface habitat is effective dust control. This involves designing systems, airlocks, and procedures specifically to limit the amount of planetary dust that gets tracked into the primary living environment.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Conclusion: Engineering a Sanctuary in Space</h3>
                <p className="leading-relaxed">
                  Building a home for humans in space requires solving a unique and formidable set of environmental problems. Designers must first build a pressurized shell to defeat the vacuum, then shield it from the constant threat of orbital debris. They must architect the interior to function in strange gravity fields—or create gravity where there is none. This habitat must also serve as a fortress against invisible radiation and, on other worlds, be an impregnable bastion against invasive, damaging dust.
                </p>
                <p className="leading-relaxed mt-4">
                  Solving these five challenges is not merely an academic exercise. It is the fundamental work that enables humanity to live, work, and explore beyond our home world, turning the hostile void of space into a place we can call home.
                </p>
              </div>
            </div>

            {/* Multimedia Section */}
            <div className="mt-12 space-y-6">
              <h3 className="text-2xl font-bold text-primary">Multimedia Resources</h3>
              
              {/* Note: Video placeholder - user only provided Group 2 video */}
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">Video content for this section coming soon</p>
              </div>

              {/* Download Transcript */}
              <div className="flex justify-center">
                <a href="/transcripts/group1-transcript.pdf" download>
                  <Button variant="hero" className="group">
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Download Full Transcript (PDF)
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Building for Mars */}
        <section className="mb-20">
          <div className="glass-card p-8 rounded-lg space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-aurora mb-6 font-space">
              Building for Mars: NASA's Most Counter-Intuitive Design Secrets for a Home in Space
            </h2>

            {/* Content */}
            <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Executive Summary</h3>
                <p className="leading-relaxed">
                  This document synthesizes key findings on the architectural framework, habitable volume requirements, and design principles for NASA's long-duration human exploration missions, as outlined in the Moon to Mars strategy. The overarching goal is to establish a sustained human presence on the Moon and prepare for the exploration of Mars, underpinned by a systematic, collaborative, and adaptable approach.
                </p>
                <p className="leading-relaxed mt-4">
                  A core principle of the architecture is to "architect from the right and execute from the left," meaning long-term Mars goals inform near-term lunar development. The architecture is structured into four campaign segments—Human Lunar Return, Foundational Exploration, Sustained Lunar Evolution, and Humans to Mars—and organized through a framework of integrated sub-architectures, including Habitation, Power, ISRU, and Robotics.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Defining Habitable Volume</h3>
                <p className="leading-relaxed">
                  A critical finding for habitat design is the establishment of a minimum Net Habitable Volume (NHV) based on a detailed, bottom-up analysis of crew functions. This study determined a minimum requirement of approximately <strong>28-29 m³ per crewmember</strong>. However, a practical case study applying these requirements to a realistic habitat design indicates that the actual required volume, accounting for access ways and packaging inefficiencies, is closer to <strong>37 m³ per crewmember</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Critical Design Principles</h3>
                <p className="leading-relaxed">
                  Extensive ground testing under the NextSTEP program has yielded crucial habitat design guidelines. A key conclusion is that <strong>a well-designed layout is more important than total volume</strong>. Critical design principles include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>The strict separation of "clean" areas (galley, science, medical) from "dirty" areas (hygiene, waste collection, exercise) to prevent cross-contamination</li>
                  <li>The implementation of reconfigurable modules with common interfaces to ensure flexibility across evolving missions</li>
                  <li>Inflatable habitat technology, utilizing multi-layer softgoods shells made of materials like Kevlar and Vectran, presents a promising solution for reducing launch volume and mass</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">The Moon to Mars Architectural Framework</h3>
                <p className="leading-relaxed">
                  NASA's Moon to Mars exploration effort is guided by a comprehensive architectural framework designed to translate broad strategic objectives into implementable programs. This framework ensures a cohesive and traceable approach to extending human presence into deep space.
                </p>
                
                <h4 className="text-xl font-semibold text-accent mt-6 mb-3">Strategic Vision and Methodology</h4>
                <p className="leading-relaxed">
                  The architecture is built on two complementary principles: "architect from the right and execute from the left." This means that the long-term goal of sending humans to Mars (the "right" end of the timeline) is used to define the complete set of capabilities needed. These capabilities are then developed and integrated in a progressive, left-to-right sequence, beginning with near-term lunar missions.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Campaign Segments</h3>
                <p className="leading-relaxed">
                  The overall campaign is broken down into four evolutionary segments that incrementally build capability:
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4 mt-4">
                  <li><strong>Human Lunar Return (HLR):</strong> Focuses on the initial Artemis missions to re-establish human presence on and around the Moon, demonstrating core transportation and life support systems.</li>
                  <li><strong>Foundational Exploration (FE):</strong> Builds on HLR to support increasingly complex and longer-duration missions, including excursions to diverse lunar sites and Mars-forward precursor missions that validate systems and operations.</li>
                  <li><strong>Sustained Lunar Evolution (SLE):</strong> Represents the "open canvas" end-state of a robust lunar economy, with continuous human and robotic presence supported by U.S. industry and international partners.</li>
                  <li><strong>Humans to Mars:</strong> Captures the capabilities, systems, and operations required for the initial human exploration of Mars, informed by the lessons and technologies developed during the lunar segments.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Inflatable Habitat Technology</h3>
                <p className="leading-relaxed">
                  Inflatable structures offer significant potential for reducing the launch volume and mass of large crewed habitats. The multi-layer softgoods shell is designed to provide structural integrity and environmental protection. The primary layers include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong>Liner:</strong> An inner, flame-resistant layer to protect the bladder from crew activity.</li>
                  <li><strong>Bladder:</strong> A polymeric gas barrier (often with redundant layers) that contains the internal atmosphere. It is oversized so it does not carry structural loads.</li>
                  <li><strong>Restraint Layer:</strong> The primary structural layer, woven from high-strength webbing (e.g., Vectran, Kevlar) that carries the pressure loads.</li>
                  <li><strong>MMOD Shield:</strong> A multi-material layup of ceramic fabric and foam to protect against micrometeoroid and orbital debris impacts.</li>
                  <li><strong>Thermal Protection Layer:</strong> Multi-Layer Insulation (MLI) to protect against the thermal extremes of space.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Critical Challenges for Human Mars Missions</h3>
                <p className="leading-relaxed">
                  The architecture for Mars presents unique and significant challenges, primarily due to the vast distances and mission durations of up to three years. Key challenges include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li><strong>Transportation Energy:</strong> The exponential increase in energy required for shorter transit times vs. the health risks of longer missions</li>
                  <li><strong>Crew Health and Performance:</strong> The profound health and performance risks to the crew over multi-year missions</li>
                  <li><strong>Communication Delay:</strong> The operational paradigm shift necessitated by communication delays of up to 22 minutes, which eliminate real-time ground support and rapid abort options</li>
                  <li><strong>No Rapid Abort:</strong> Unlike LEO (hours) or lunar (days) missions, a return to Earth from Mars can take months, regardless of the emergency</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Collaboration as a Cornerstone</h3>
                <p className="leading-relaxed">
                  Collaboration with international and commercial partners is a foundational principle of the Moon to Mars architecture. This approach distributes costs, shares risks, enhances capabilities, and fosters peaceful international cooperation. Key partnerships include ESA, CSA, JAXA, and commercial partners through programs like NextSTEP and CLPS.
                </p>
              </div>
            </div>

            {/* Multimedia Section */}
            <div className="mt-12 space-y-6">
              <h3 className="text-2xl font-bold text-primary">Multimedia Resources</h3>
              
              {/* Video Player */}
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <video
                  controls
                  className="w-full h-full"
                  poster="/placeholder.svg"
                >
                  <source src="/videos/building-for-mars.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Download Transcript */}
              <div className="flex justify-center">
                <a href="/transcripts/group2-transcript.pdf" download>
                  <Button variant="hero" className="group">
                    <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Download Full Transcript (PDF)
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LearningResources;
