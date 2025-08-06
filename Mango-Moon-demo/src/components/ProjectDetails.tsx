const ProjectDetails = () => {
    return (
      <div className="space-y-8">
        {/* Project Description */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-mango">Project Description</h3>
          <p className="text-foreground leading-relaxed">
            A 70s Arcade Lunar Lander game with a twist... players activate the thrusters of their Mango Lander using their voice! 
            The custom controller allows precise rotation of the lander, which allows players to attempt landings on various plateaus, 
            craters, and lunar surfaces. Hardware uses a rotary encoder and KY-038 sound sensor for I/O.
          </p>
        </section>
  
        {/* Member Contributions */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-mango">Member Contributions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-cosmic-blue">Weston</h4>
              <p className="text-foreground leading-relaxed">
                Player physics/movement, Mango Lander / Moon / Explosion pixelart and animation, Bitmap reading functions, 
                Start/Win/Crash/OOB/Fuel Empty State control flow & display screens. Modeled and 3D printed controller.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-cosmic-blue">Liam</h4>
              <p className="text-foreground leading-relaxed">
                Rotary Encoder + Player rotation Logic, Mountain Drawing + Landing Zones, 
                Framebuffer/Redraw Issues, Zoom In Screen when near Landing Zone, Aesthetics, Game State Control.
              </p>
            </div>
          </div>
        </section>
  
        {/* Self Evaluation */}
        <section className="space-y-4">
          <h3 className="text-2xl font-bold text-mango">Self-Evaluation</h3>
          <p className="text-foreground leading-relaxed">
            We feel very happy with how many of our reach goals we were able to tackle! We feel that we struck a good balance 
            in the movement system between being fun to maneuver, responsive, and appropriately challenging. We're proud of the 
            aesthetics of the project, and the graphics performance choices we were able to implement to create smooth animation, 
            minimize the redrawn portion of the screen, and transition quickly between scenes. We learned a lot about the pipeline 
            for game state management, sprite instantiation / graphical redrawing, and creating satisfying interactions between 
            hardware and gameplay. The end product is something we are so proud of and excited to show off.
          </p>
        </section>
  
        {/* Technical References */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-mango">Technical References</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-cosmic-blue mb-3">Research</h4>
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-mango pl-4">
                  <p className="text-foreground leading-relaxed">
                    <strong>Physics Resources:</strong> Explored how game engines tie player movement/animation to frame rates. 
                    After implementing a traditional Newtonian acceleration→velocity→position pipeline, discovered that using 
                    a fixed time-step with custom positional scaling provided better control for angular movement and responsive controls.
                  </p>
                </div>
                <div className="border-l-2 border-cosmic-blue pl-4">
                  <p className="text-foreground leading-relaxed">
                    <strong>Bitmap Implementation:</strong> Referenced font.c bitmap implementation for sprite-drawing functions. 
                    Chose separate bitmap storage for varying dimensions based on game objects.
                  </p>
                </div>
                <div className="border-l-2 border-cosmic-purple pl-4">
                  <p className="text-foreground leading-relaxed">
                    <strong>Object-Oriented C:</strong> Since C isn't OOP, used structs to define game objects and create 
                    inheritances between game manager and player components.
                  </p>
                </div>
              </div>
            </div>
  
            <div>
              
              <div className="space-y-3 text-sm">
                <div className="border-l-2 border-mango pl-4">
                  <p className="text-foreground leading-relaxed">
                    <strong>Lunar Lander Inspiration:</strong> Based the project on the classic Atari Lunar Lander, 
                    using online versions for gameplay reference and mechanics understanding.
                  </p>
                </div>
                <div className="border-l-2 border-cosmic-blue pl-4">
                  <p className="text-foreground leading-relaxed">
                    <strong>Rotary Encoder State Machine:</strong> Implemented proper rotary encoder reading using state machine 
                    methodology, improving upon previous assignment work with better debouncing and input handling.
                  </p>
                </div>
                <div className="border-l-2 border-cosmic-purple pl-4">
                  <p className="text-foreground leading-relaxed">
                    <strong>Xiaolin Wu's Line Algorithm:</strong> Implemented antialiasing using Xiaolin Wu's algorithm 
                    after Gupta Sproull failed with slopes greater than 1.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default ProjectDetails;