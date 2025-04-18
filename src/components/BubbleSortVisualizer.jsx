import React, { useState, useEffect } from "react";

// Sleep helper
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([8, 3, 5, 1, 6, 4, 2, 7]);
  const [swapping, setSwapping] = useState([]);

  const bubbleSort = async () => {
    let arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setSwapping([j, j + 1]);
        await sleep(400);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }

        await sleep(400);
        setSwapping([]);
      }
    }
  };

  useEffect(() => {
    bubbleSort();
  }, []);

  return (
    <div className="flex justify-center items-center mt-20 gap-6">
      {array.map((num, idx) => (
        <div
          key={idx}
          className={`
            w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold
            transition-all duration-500
            animate-float
            ${
              swapping.includes(idx)
                ? "bg-pink-500 scale-110 shadow-xl"
                : "bg-cyan-500"
            }
          `}
          style={{ transitionTimingFunction: "ease-in-out" }}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default BubbleSortVisualizer;
