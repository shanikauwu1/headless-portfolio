// BubbleCanvas.js

import React, { useEffect, useRef } from "react";

const BubbleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const getResponsiveRadius = () => {
      const baseRadius = 210;
      if (window.innerWidth < 768) {
        return baseRadius * 0.6; // Reduce to 60% on mobile
      }
      return baseRadius;
    };

    const bubble = {
      x: width / 2,
      y: height / 2,
      radius: getResponsiveRadius(),
      vx: 1.1,
      vy: 0.6,
    };

    let mouse = {
      x: bubble.x,
      y: bubble.y,
      lastMoved: Date.now(),
    };

    let tick = 0;

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      bubble.radius = getResponsiveRadius(); // Recalculate radius
    });

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastMoved = Date.now();
    });

    function drawSmoothBlob(x, y, radius, wobble = 1, color1, color2) {
      const points = 40; // More points for smoother edges
      const angleStep = (Math.PI * 2) / points;
      const blobPoints = [];

      for (let i = 0; i < points; i++) {
        const angle = i * angleStep;
        const offset = Math.sin(tick * 0.05 + i * 0.5) * 10 * wobble;
        const px = x + Math.cos(angle) * (radius + offset);
        const py = y + Math.sin(angle) * (radius + offset);
        blobPoints.push({ x: px, y: py });
      }

      ctx.beginPath();

      for (let i = 0; i <= points; i++) {
        const p1 = blobPoints[i % points];
        const p2 = blobPoints[(i + 1) % points];
        const cx = (p1.x + p2.x) / 2;
        const cy = (p1.y + p2.y) / 2;

        if (i === 0) {
          ctx.moveTo(cx, cy);
        } else {
          ctx.quadraticCurveTo(p1.x, p1.y, cx, cy);
        }
      }

      ctx.closePath();

      const gradient = ctx.createRadialGradient(
        x,
        y,
        radius * 0.3,
        x,
        y,
        radius
      );
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);

      ctx.fillStyle = gradient;
      ctx.shadowColor = "rgba(0,0,0,0.05)";
      ctx.shadowBlur = 40;
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      const timeSinceMouse = Date.now() - mouse.lastMoved;
      const isMouseActive = timeSinceMouse < 2000;

      // Movement
      if (isMouseActive) {
        bubble.x += (mouse.x - bubble.x) * 0.05;
        bubble.y += (mouse.y - bubble.y) * 0.05;
      } else {
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        if (bubble.x < 0 || bubble.x > width) bubble.vx *= -1;
        if (bubble.y < 0 || bubble.y > height) bubble.vy *= -1;
      }

      const wobble = 1 + Math.sin(tick * 0.03) * 0.5;

      // Animate radius pulse
      const pulse = 1 + Math.sin(tick * 0.05) * 0.05; // Adjust 0.05 for intensity
      const dynamicRadius = bubble.radius * pulse;

      // Colors
      const colorStart = isMouseActive ? "#cd2028" : "#cd2028";
      const colorEnd = isMouseActive ? "#cd2028" : "#cd2028";

      drawSmoothBlob(
        bubble.x,
        bubble.y,
        dynamicRadius,
        wobble,
        colorStart,
        colorEnd
      );

      tick++;
      requestAnimationFrame(animate);
    }

    animate();

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("resize", () => {});
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default BubbleCanvas;
