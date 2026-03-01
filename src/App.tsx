import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ResultsBoard from './components/ResultsBoard';
import { assignTasks } from './utils/shuffle';
import type { Assignment } from './utils/shuffle';

const MAX_PLAYERS = 10;
const ACCENT = '#ff4655';
const BG_DEEP = '#0a1118';
const BG = '#0f1923';
const TEXT = '#ece8e1';
const BORDER = '#1e2d3d';

const DEFAULT_TASKS = `エントリーフラッグ（先頭入場）
スモークを焚く
フラッシュを投げる
インフォ収集（偵察）
アンカー（後方守備）
デュエルを挑む
ユーティリティを温存
ドローン偵察
クロスファイアを張る
爆弾解除サポート`;

export default function App() {
  const [playerCount, setPlayerCount] = useState(3);
  const [playerNames, setPlayerNames] = useState<string[]>(
    Array.from({ length: MAX_PLAYERS }, (_, i) => `Player ${i + 1}`)
  );
  const [taskText, setTaskText] = useState(DEFAULT_TASKS);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
  };

  const handleNameChange = (index: number, value: string) => {
    setPlayerNames((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleAssign = () => {
    const players = playerNames.slice(0, playerCount).map((n, i) => n.trim() || `Player ${i + 1}`);
    const tasks = taskText
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);
    if (tasks.length === 0) {
      alert('タスクを1つ以上入力してください。');
      return;
    }
    setAssignments(assignTasks(players, tasks));
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDownload = async () => {
    if (!boardRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(boardRef.current, {
        backgroundColor: BG,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = 'valorant-tasks.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Image capture failed:', e);
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <div style={{ backgroundColor: BG, minHeight: '100vh', color: TEXT }}>
      {/* Header */}
      <header
        style={{ backgroundColor: BG_DEEP, borderBottom: `2px solid ${ACCENT}` }}
        className="py-6 px-6 text-center"
      >
        <div style={{ color: ACCENT }} className="text-xs font-bold tracking-widest uppercase mb-1">
          ◆ TACTICAL OPERATIONS ◆
        </div>
        <h1 className="text-4xl font-black uppercase tracking-widest" style={{ color: TEXT }}>
          VALORANT TASK CHALLENGE
        </h1>
        <p className="mt-2 text-sm" style={{ color: '#8b9ba8' }}>
          プレイヤーにタスクをランダムに割り振るシステム
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">
        {/* Step 1: Player Setup */}
        <section
          style={{ backgroundColor: BG_DEEP, border: `1px solid ${BORDER}` }}
          className="rounded-lg p-6"
        >
          <h2 className="text-lg font-black uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
            01 — プレイヤー設定
          </h2>

          {/* Player count selector */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#8b9ba8' }}>
              人数を選択
            </label>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: MAX_PLAYERS }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => handlePlayerCountChange(n)}
                  className="w-10 h-10 rounded font-black text-sm transition-all"
                  style={{
                    backgroundColor: playerCount === n ? ACCENT : '#1e2d3d',
                    color: playerCount === n ? '#fff' : TEXT,
                    border: `1px solid ${playerCount === n ? ACCENT : BORDER}`,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Player name inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: playerCount }, (_, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="text-xs font-bold w-6 text-right shrink-0"
                  style={{ color: ACCENT }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <input
                  type="text"
                  value={playerNames[i]}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  className="flex-1 rounded px-3 py-2 text-sm font-medium outline-none focus:ring-2"
                  style={{
                    backgroundColor: '#1a2530',
                    color: TEXT,
                    border: `1px solid ${BORDER}`,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Step 2: Task Input */}
        <section
          style={{ backgroundColor: BG_DEEP, border: `1px solid ${BORDER}` }}
          className="rounded-lg p-6"
        >
          <h2 className="text-lg font-black uppercase tracking-widest mb-4" style={{ color: ACCENT }}>
            02 — タスクリスト
          </h2>
          <label className="block text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#8b9ba8' }}>
            タスクを1行につき1つ入力（改行区切り）
          </label>
          <textarea
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            rows={10}
            className="w-full rounded px-3 py-2 text-sm font-medium outline-none resize-y focus:ring-2"
            style={{
              backgroundColor: '#1a2530',
              color: TEXT,
              border: `1px solid ${BORDER}`,
              lineHeight: '1.8',
            }}
          />
          <p className="mt-2 text-xs" style={{ color: '#8b9ba8' }}>
            {taskText.split('\n').filter((t) => t.trim()).length} 件のタスク
          </p>
        </section>

        {/* Assign Button */}
        <button
          onClick={handleAssign}
          className="w-full py-4 rounded font-black text-base uppercase tracking-widest transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: ACCENT, color: '#fff', letterSpacing: '0.15em' }}
        >
          ◆ タスクを割り振る ◆
        </button>

        {/* Results */}
        {assignments.length > 0 && (
          <section id="results-section" className="flex flex-col gap-4">
            <h2 className="text-lg font-black uppercase tracking-widest" style={{ color: ACCENT }}>
              03 — 割り当て結果
            </h2>
            <ResultsBoard assignments={assignments} boardRef={boardRef} />
            <button
              onClick={handleDownload}
              disabled={isCapturing}
              className="w-full py-3 rounded font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
              style={{
                backgroundColor: 'transparent',
                color: ACCENT,
                border: `2px solid ${ACCENT}`,
                letterSpacing: '0.1em',
              }}
            >
              {isCapturing ? '処理中...' : '↓ Download Results — 結果を画像として保存'}
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
