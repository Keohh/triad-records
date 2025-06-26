import React, { useEffect, useRef, useState } from "react";

const PETAL_COUNT = 40;
const WAVE_SIZE = 8;
const WAVE_INTERVAL = 1200; // ms between waves

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const CherryBlossomPetals = () => {
  const [activePetals, setActivePetals] = useState([]);
  const petalsRef = useRef([]);

  useEffect(() => {
    let wave = 0;
    let released = 0;
    let timeouts = [];
    function releaseWave() {
      const start = released;
      const end = Math.min(released + WAVE_SIZE, PETAL_COUNT);
      setActivePetals((prev) => [
        ...prev,
        ...Array.from({ length: end - start }, (_, i) => start + i)
      ]);
      released = end;
      wave++;
      if (released < PETAL_COUNT) {
        timeouts.push(setTimeout(releaseWave, WAVE_INTERVAL));
      }
    }
    releaseWave();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    activePetals.forEach((i) => {
      const petal = petalsRef.current[i];
      if (petal && !petal._animated) {
        const fallDuration = random(8, 16);
        const fallDelay = random(0, 2);
        const xStart = random(0, 100);
        const xEnd = xStart + random(-10, 10);
        petal.animate([
          { transform: `translate(${xStart}vw, -10vh) rotate(${random(-30,30)}deg)`, opacity: 1 },
          { transform: `translate(${xEnd}vw, 110vh) rotate(${random(0,360)}deg)`, opacity: 0.7 }
        ], {
          duration: fallDuration * 1000,
          delay: fallDelay * 1000,
          iterations: Infinity,
          easing: "linear"
        });
        petal._animated = true;
      }
    });
  }, [activePetals]);

  return (
    <div className="petal-container" style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 2 }}>
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={el => petalsRef.current[i] = el}
          className="cherry-petal"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 32,
            height: 32,
            opacity: activePetals.includes(i) ? 0 : 0,
            pointerEvents: "none"
          }}
        >
          {/* SVG for a cherry blossom petal */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2 C18 8, 30 10, 16 30 C2 10, 14 8, 16 2 Z"
              fill="#F8BBD0"
              stroke="#E57399"
              strokeWidth="1.2"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CherryBlossomPetals; 