import type { Assignment } from '../utils/shuffle';

interface ResultsDisplayProps {
  assignments: Assignment[];
}

const RANK_COLORS = [
  '#ff4655',
  '#ff6b35',
  '#f7c59f',
  '#ffffc7',
  '#b5ead7',
];

export default function ResultsDisplay({ assignments }: ResultsDisplayProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[#ff4655]/30 bg-[#0f1923] p-6">
      {/* Watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        aria-hidden="true"
      >
        <span
          className="text-[180px] font-black leading-none tracking-widest text-[#ff4655]/5 uppercase"
          style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}
        >
          V
        </span>
      </div>

      {/* Title */}
      <h2
        className="mb-6 text-center text-2xl font-black uppercase tracking-[0.2em] text-[#ff4655]"
        style={{ fontFamily: 'Impact, Arial Black, sans-serif', letterSpacing: '0.25em' }}
      >
        VALORANT TASK CHALLENGE
      </h2>

      {/* Divider */}
      <div className="mb-6 h-px bg-gradient-to-r from-transparent via-[#ff4655] to-transparent" />

      {/* Assignments */}
      <div className="relative z-10 space-y-3">
        {assignments.map((assignment, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded border border-[#ece8e1]/10 bg-[#1a2634] px-4 py-3"
          >
            {/* Rank number */}
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black"
              style={{
                background: RANK_COLORS[index % RANK_COLORS.length] + '20',
                border: `1px solid ${RANK_COLORS[index % RANK_COLORS.length]}`,
                color: RANK_COLORS[index % RANK_COLORS.length],
              }}
            >
              {index + 1}
            </span>

            {/* Player name */}
            <span className="w-32 shrink-0 truncate font-bold uppercase tracking-wider text-[#ece8e1]">
              {assignment.player}
            </span>

            {/* Separator */}
            <span className="text-[#ff4655]/60">▶</span>

            {/* Task */}
            <span className="flex-1 text-[#ece8e1]/80">{assignment.task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
