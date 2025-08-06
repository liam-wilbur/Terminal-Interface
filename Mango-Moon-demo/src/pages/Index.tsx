import VideoSection from "@/components/VideoSection";
import ProjectDetails from "@/components/ProjectDetails";
import { ParticleSystem } from "@/components/ParticleSystem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github, Rocket } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      {/* Animated Particle System Background */}
      <ParticleSystem />

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-mango rounded-full flex items-center justify-center shadow-glow-mango">
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-star-white">
              Mango Moon
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A voice-controlled 70s arcade-style Lunar Lander game built from scratch on Mango Pi hardware
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a 
              href="https://www.youtube.com/watch?v=Rgz2xvjeFv8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md text-sm font-semibold bg-orange-400/20 hover:bg-orange-400/30 border border-orange-400/30 text-orange-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Demo
            </a>
            <a 
              href="https://github.com/liam-wilbur/Mango-Moon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md text-sm font-semibold bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/30 text-blue-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          </div>
        </header>

        {/* Video Sections */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <Card className="bg-card/80 backdrop-blur-sm border-border relative">
            <a 
              href="https://github.com/liam-wilbur/Mango-Moon" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center h-9 rounded-md px-3 text-sm bg-orange-400/20 hover:bg-orange-400/30 border border-orange-400/30 text-orange-300 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </a>
            <CardContent className="p-8">
              <VideoSection
                title="Full Demo"
                videoUrl="https://www.youtube.com/watch?v=Rgz2xvjeFv8"
                description="Complete gameplay demonstration showing voice-controlled thrusters and rotary encoder steering"
              />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border relative">
            <a 
              href="https://github.com/liam-wilbur/Terminal-Interface" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center h-9 rounded-md px-3 text-sm bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/30 text-blue-300 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </a>
            <CardContent className="p-8">
              <VideoSection
                title="Terminal Interface Demo"
                videoUrl="https://www.youtube.com/watch?v=Rgz2xvjeFv8"
                description="Custom terminal interface and development tools built from scratch"
              />
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <Card className="bg-card/80 backdrop-blur-sm border-border">
          <CardContent className="p-8">
            <ProjectDetails />
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-border">
          <p className="text-muted-foreground">
            Built with ❤️ by Weston Keller & Liam Wilbur
          </p>
          <p className="text-sm text-muted-foreground/60 mt-2">
            Hardware Engineering Project • Mango Pi
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;