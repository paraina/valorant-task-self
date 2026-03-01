import React from 'react';
import type { Assignment } from '../utils/shuffle';

interface ResultsBoardProps {
  assignments: Assignment[];
  boardRef: React.RefObject<HTMLDivElement | null>;
}

const ACCENT = '#ff4655';
const BG = '#0f1923';
const TEXT = '#ece8e1';

const agentColors = [
  '#ff4655', '#00d4aa', '#ffd700', '#c084fc', '#60a5fa',
  '#f97316', '#34d399', '#fb7185', '#a78bfa', '#38bdf8',
];

export default function ResultsBoard({ assignments, boardRef }: ResultsBoardProps) {
  return (
    <div
      ref={boardRef}
      style={{ backgroundColor: BG, color: TEXT, fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" }}
      className="relative overflow-hidden rounded-lg p-8 w-full"
    >
      {/* Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        style={{ opacity: 0.04 }}
      >
        <span
          style={{
            fontSize: 'clamp(80px,18vw,180px)',
            fontWeight: 900,
            letterSpacing: '0.05em',
            color: ACCENT,
            textTransform: 'uppercase',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          VALORANT
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mb-8">
        <div
          className="inline-block text-xs font-bold tracking-widest uppercase mb-2"
          style={{ color: ACCENT }}
        >
          ◆ TASK CHALLENGE ◆
        </div>
        <h2
          className="text-3xl font-black uppercase tracking-widest"
          style={{ color: TEXT }}
        >
          VALORANT TASK CHALLENGE
        </h2>
        <div
          className="mt-3 mx-auto"
          style={{ width: 80, height: 3, backgroundColor: ACCENT }}
        />
      </div>

      {/* Header row */}
      <div
        className="relative z-10 grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-widest mb-2 px-4"
        style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT}44` }}
      >
        <span className="col-span-1 text-center">#</span>
        <span className="col-span-4">Player</span>
        <span className="col-span-7">Task</span>
      </div>

      {/* Assignment rows */}
      <div className="relative z-10 flex flex-col gap-2">
        {assignments.map((a, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-4 items-center px-4 py-3 rounded"
            style={{
              backgroundColor: i % 2 === 0 ? '#1a2530' : '#16202a',
              borderLeft: `3px solid ${agentColors[i % agentColors.length]}`,
            }}
          >
            <span
              className="col-span-1 text-center font-black text-sm"
              style={{ color: agentColors[i % agentColors.length] }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="col-span-4 font-bold text-sm truncate" style={{ color: TEXT }}>
              {a.player}
            </span>
            <span
              className="col-span-7 text-sm font-medium truncate"
              style={{ color: '#b8b4ae' }}
            >
              {a.task}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        className="relative z-10 text-center mt-6 text-xs tracking-widest uppercase"
        style={{ color: `${TEXT}44` }}
      >
        valorant-task-self
      </div>
    </div>
  );
}
