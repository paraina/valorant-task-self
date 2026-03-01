import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ResultsDisplay from './components/ResultsDisplay';
import { assignTasks, type Assignment } from './utils/shuffle';

const MIN_PLAYERS = 1;
const MAX_PLAYERS = 10;

export default function App() {
  const [playerCount, setPlayerCount] = useState(5);
  const [playerNames, setPlayerNames] = useState<string[]>(Array(5).fill(''));
  const [tasksText, setTasksText] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  function handlePlayerCountChange(count: number) {
    setPlayerCount(count);
    setPlayerNames((prev) => {
      const next = [...prev];
      while (next.length < count) next.push('');
      return next.slice(0, count);
    });
    setAssignments([]);
    setError('');
  }

  function handlePlayerNameChange(index: number, value: string) {
    setPlayerNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleAssign() {
    setError('');
    const players = playerNames.map((n) => n.trim()).filter(Boolean);
    if (players.length === 0) {
      setError('プレイヤー名を少なくとも1人入力してください。');
      return;
    }
    const tasks = tasksText
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);
    if (tasks.length === 0) {
      setError('タスクを少なくとも1つ入力してください。');
      return;
    }
    setAssignments(assignTasks(players, tasks));
  }

  async function handleDownload() {
    if (!resultsRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#0f1923',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'valorant-task-challenge.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1923] px-4 py-10 text-[#ece8e1]" style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif" }}>
      <div className="mx-auto max-w-2xl space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1
            className="text-5xl font-black uppercase tracking-[0.3em] text-[#ece8e1]"
            style={{ fontFamily: 'Impact, Arial Black, sans-serif' }}
          >
            VALORANT
          </h1>
          <p className="mt-1 text-sm font-bold uppercase tracking-[0.5em] text-[#ff4655]">
            Task Assignment System
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#ff4655] to-transparent" />
        </header>

        {/* Player count selector */}
        <section className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#ff4655]">
            Players ({MIN_PLAYERS}–{MAX_PLAYERS})
          </label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: MAX_PLAYERS }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => handlePlayerCountChange(n)}
                className={`h-10 w-10 rounded border text-sm font-bold transition-colors ${
                  playerCount === n
                    ? 'border-[#ff4655] bg-[#ff4655] text-white'
                    : 'border-[#ece8e1]/20 bg-[#1a2634] text-[#ece8e1]/60 hover:border-[#ff4655]/60 hover:text-[#ece8e1]'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        {/* Player name inputs */}
        <section className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#ff4655]">
            Player Names
          </label>
          <div className="grid grid-cols-2 gap-3">
            {playerNames.map((name, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 text-right text-xs font-bold text-[#ff4655]/60">{i + 1}</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handlePlayerNameChange(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  maxLength={20}
                  className="flex-1 rounded border border-[#ece8e1]/20 bg-[#1a2634] px-3 py-2 text-sm font-bold uppercase tracking-wider text-[#ece8e1] placeholder-[#ece8e1]/30 outline-none transition-colors focus:border-[#ff4655]"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Task input */}
        <section className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-widest text-[#ff4655]">
            Tasks (one per line)
          </label>
          <textarea
            value={tasksText}
            onChange={(e) => setTasksText(e.target.value)}
            rows={6}
            placeholder={"Entry Frag\nSupport\nSentinel\nController\nInitiator"}
            className="w-full rounded border border-[#ece8e1]/20 bg-[#1a2634] px-4 py-3 text-sm text-[#ece8e1] placeholder-[#ece8e1]/30 outline-none transition-colors focus:border-[#ff4655] resize-none"
          />
        </section>

        {/* Error */}
        {error && (
          <p className="rounded border border-[#ff4655]/40 bg-[#ff4655]/10 px-4 py-2 text-sm text-[#ff4655]">
            {error}
          </p>
        )}

        {/* Assign button */}
        <button
          onClick={handleAssign}
          className="w-full rounded border border-[#ff4655] bg-[#ff4655] py-3 text-sm font-black text-white transition-colors hover:bg-[#ff4655]/80 active:scale-[0.98]"
        >
          タスクを割り振る
        </button>

        {/* Results */}
        {assignments.length > 0 && (
          <section className="space-y-4">
            <div ref={resultsRef}>
              <ResultsDisplay assignments={assignments} />
            </div>

            {/* Download button */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full rounded border border-[#ece8e1]/30 bg-transparent py-3 text-sm font-black uppercase tracking-[0.2em] text-[#ece8e1] transition-colors hover:border-[#ece8e1] disabled:opacity-50"
            >
              {downloading ? 'Generating...' : '⬇ Download Results'}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
