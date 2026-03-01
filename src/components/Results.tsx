import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { PlayerTask } from '../utils/shuffle'

interface ResultsProps {
  results: PlayerTask[]
}

export default function Results({ results }: ResultsProps) {
  const resultRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!resultRef.current) return
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#0f1923',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = 'valorant-task-challenge.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to capture image:', err)
    }
  }

  return (
    <div className="mt-8">
      {/* Capture area */}
      <div
        ref={resultRef}
        className="relative overflow-hidden rounded-lg border border-val-accent/40 bg-val-bg p-6"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          aria-hidden="true"
        >
          <span
            className="text-[120px] font-black uppercase tracking-widest text-val-accent/5 rotate-[-20deg]"
            style={{ userSelect: 'none' }}
          >
            VALORANT
          </span>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <div className="inline-block border-b-2 border-val-accent pb-2">
            <h2 className="text-2xl font-black uppercase tracking-widest text-val-text">
              VALORANT TASK CHALLENGE
            </h2>
          </div>
        </div>

        {/* Header row */}
        <div className="mb-2 grid grid-cols-[2rem_1fr_1fr] gap-4 px-3 text-xs font-bold uppercase tracking-widest text-val-accent">
          <span>#</span>
          <span>PLAYER</span>
          <span>TASK</span>
        </div>

        {/* Player rows */}
        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={index}
              className="grid grid-cols-[2rem_1fr_1fr] gap-4 rounded border border-val-border bg-val-dark px-3 py-3 text-sm"
            >
              <span className="font-black text-val-accent">{index + 1}</span>
              <span className="font-bold text-val-text">{result.player}</span>
              <span className="font-semibold text-val-text/80">{result.task}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Download button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded border border-val-accent/60 bg-val-dark px-6 py-2 text-sm font-bold uppercase tracking-wider text-val-text transition-colors hover:border-val-accent hover:bg-val-accent/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download Results
        </button>
      </div>
    </div>
  )
}
