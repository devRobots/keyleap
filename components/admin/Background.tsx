"use client";

import React, { useRef, useEffect } from 'react';

interface RainDrop {
  y: number;
  character: string;
}

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const characterSet = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 16;
    
    let frameCount = 0;
    const speedDivider = 3;

    let columns: number;
    let drops: RainDrop[] = [];

    const getRandomCharacter = () => characterSet[Math.floor(Math.random() * characterSet.length)];

    const initializeDrops = () => {
      drops = [];
      columns = Math.floor(window.innerWidth / fontSize);
      for (let i = 0; i < columns; i++) {
        drops.push({
          y: Math.floor(Math.random() * (canvas.height / fontSize)),
          character: getRandomCharacter(),
        });
      }
    };
    
    const setupCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.imageSmoothingEnabled = false;
      initializeDrops();
    };

    setupCanvasDimensions();

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      const updatePositionsThisFrame = (frameCount % speedDivider === 0);

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        ctx.fillText(drop.character, i * fontSize, drop.y * fontSize);

        if (updatePositionsThisFrame) {
          if (drop.y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = { ...drop, y: 0, character: getRandomCharacter() };
          } else {
            drops[i] = { ...drop, y: drop.y + 1, character: getRandomCharacter() };
          }
        }
      }
      frameCount++;
    };

    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setupCanvasDimensions();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#000000',
      }}
    />
  );
};

export default Background;