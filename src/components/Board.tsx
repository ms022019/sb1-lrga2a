import React from 'react';
import { Square } from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

export function Board({ squares, onClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 gap-0">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}