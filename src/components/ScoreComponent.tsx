// src/components/ScoreComponent.tsx
import React from 'react';

interface ScoreComponentProps {
  value: number;
  max: number;
}

const ScoreComponent: React.FC<ScoreComponentProps> = ({ value, max }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
        {value}/{max}
      </div>
      <div className="w-full h-2 bg-gray-300">
        <div
          className="h-full bg-green-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreComponent;

