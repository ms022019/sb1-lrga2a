import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export function Square({ value, onClick }: SquareProps) {
  return (
    <button
      className="w-16 h-16 border border-gray-400 flex items-center justify-center text-2xl font-bold"
      onClick={onClick}
    >
      {value}
    </button>
  );
}