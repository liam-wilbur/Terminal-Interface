import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  baseX: number; // Relative position (0-1) for responsive design
  baseY: number; // Relative position (0-1) for responsive design
}

export const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

        const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Update particle positions when screen resizes
    const updateParticlePositions = () => {
      particlesRef.current.forEach(particle => {
        particle.x = particle.baseX * canvas.width;
        particle.y = particle.baseY * canvas.height;
      });
    };

    // Initialize particles with space theme colors
    const initParticles = () => {
      const particleCount = 80;
      particlesRef.current = [];

      const colors = [
        "hsl(210, 40%, 98%)", // star-white
        "hsl(215, 20%, 70%)", // muted-foreground  
        "hsl(25, 95%, 55%)",  // mango
        "hsl(200, 95%, 50%)", // cosmic-blue
      ];

      for (let i = 0; i < particleCount; i++) {
        const baseX = Math.random();
        const baseY = Math.random();
        
        particlesRef.current.push({
          x: baseX * canvas.width,
          y: baseY * canvas.height,
          baseX,
          baseY,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Create a new particle when one goes off-screen
    const createNewParticle = () => {
      const colors = [
        "hsl(210, 40%, 98%)",
        "hsl(215, 20%, 70%)",
        "hsl(25, 95%, 55%)",
        "hsl(200, 95%, 50%)",
      ];
      
      // Spawn from random edge of screen
      const edge = Math.floor(Math.random() * 4);
      let baseX, baseY;
      
      switch (edge) {
        case 0: // Top
          baseX = Math.random();
          baseY = -0.05;
          break;
        case 1: // Right
          baseX = 1.05;
          baseY = Math.random();
          break;
        case 2: // Bottom
          baseX = Math.random();
          baseY = 1.05;
          break;
        case 3: // Left
          baseX = -0.05;
          baseY = Math.random();
          break;
        default:
          baseX = Math.random();
          baseY = Math.random();
      }
      
      return {
        x: baseX * canvas.width,
        y: baseY * canvas.height,
        baseX,
        baseY,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Set canvas size with responsive particle updates
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateParticlePositions(); // Update particle positions after resize
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    initParticles();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

             // Track particles to remove and replace
       const particlesToRemove: number[] = [];

       particlesRef.current.forEach((particle, index) => {
         // Check if particle is off-screen (with buffer)
         const buffer = 50;
         if (particle.x < -buffer || particle.x > canvas.width + buffer ||
             particle.y < -buffer || particle.y > canvas.height + buffer) {
           particlesToRemove.push(index);
           return; // Skip processing this particle
         }

         // Mouse interaction - subtle repulsion
         const dx = mouseRef.current.x - particle.x;
         const dy = mouseRef.current.y - particle.y;
         const distance = Math.sqrt(dx * dx + dy * dy);
         const maxDistance = 120;

         if (distance < maxDistance) {
           const force = (maxDistance - distance) / maxDistance;
           const angle = Math.atan2(dy, dx);
           
           // Gentle repulsion
           particle.vx -= Math.cos(angle) * force * 0.2;
           particle.vy -= Math.sin(angle) * force * 0.2;
         }

         // Update position
         particle.x += particle.vx;
         particle.y += particle.vy;

         // Update relative position for responsive design
         particle.baseX = particle.x / canvas.width;
         particle.baseY = particle.y / canvas.height;

         // Apply friction
         particle.vx *= 0.98;
         particle.vy *= 0.98;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        
        // Add subtle glow for star effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles to form constellations
        particlesRef.current.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxConnectionDistance = 100;

          if (distance < maxConnectionDistance) {
            const connectionStrength = (maxConnectionDistance - distance) / maxConnectionDistance;
            
            ctx.save();
            ctx.globalAlpha = connectionStrength * 0.3;
            ctx.strokeStyle = "hsl(210, 40%, 98%)"; // star-white
            ctx.lineWidth = connectionStrength * 1.5;
            ctx.shadowColor = "hsl(210, 40%, 98%)";
            ctx.shadowBlur = 5;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
                 });
       });

       // Remove off-screen particles and replace with new ones
       particlesToRemove.reverse().forEach(index => {
         particlesRef.current.splice(index, 1);
         particlesRef.current.push(createNewParticle());
       });

       animationRef.current = requestAnimationFrame(animate);
     };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex: 0 }} 
    />
  );
};