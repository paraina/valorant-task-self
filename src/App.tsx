import { useState } from 'react'
import { assignTasks, PlayerTask } from './utils/shuffle'
import Results from './components/Results'

const MAX_PLAYERS = 10

export default function App() {
  const [playerCount, setPlayerCount] = useState<number>(2)
  const [playerNames, setPlayerNames] = useState<string[]>(Array(MAX_PLAYERS).fill(''))
  const [tasksInput, setTasksInput] = useState<string>('')
  const [results, setResults] = useState<PlayerTask[] | null>(null)
  const [error, setError] = useState<string>('')

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count)
    setResults(null)
    setError('')
  }

  const handleNameChange = (index: number, value: string) => {
    const updated = [...playerNames]
    updated[index] = value
    setPlayerNames(updated)
  }

  const handleAssign = () => {
    const players = playerNames.slice(0, playerCount).filter((p) => p.trim() !== '')
    const tasks = tasksInput.split('\n').filter((t) => t.trim() !== '')

    if (players.length === 0) {
      setError('少なくとも1人のプレイヤー名を入力してください。')
      return
    }
    if (tasks.length === 0) {
      setError('少なくとも1つのタスクを入力してください。')
      return
    }

    setError('')
    setResults(assignTasks(players, tasks))
  }

  return (
    <div className="min-h-screen bg-val-bg px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-val-accent">
            TACTICAL ASSIGNMENT SYSTEM
          </div>
          <h1 className="text-4xl font-black uppercase tracking-widest text-val-text">
            VALORANT
          </h1>
          <div className="mx-auto mt-1 h-0.5 w-24 bg-val-accent" />
          <p className="mt-3 text-sm text-val-text/60">
            TASK CHALLENGE
          </p>
        </div>

        {/* Panel */}
        <div className="space-y-6 rounded-lg border border-val-border bg-val-dark p-6">
          {/* Player count */}
          <section>
            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-val-accent">
              プレイヤー人数
            </label>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: MAX_PLAYERS }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => handlePlayerCountChange(n)}
                  className={`h-9 w-9 rounded border text-sm font-bold transition-colors ${
                    playerCount === n
                      ? 'border-val-accent bg-val-accent text-white'
                      : 'border-val-border bg-val-bg text-val-text hover:border-val-accent/60'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </section>

          {/* Player names */}
          <section>
            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-val-accent">
              プレイヤー名
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: playerCount }, (_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 text-right text-xs font-bold text-val-accent">{i + 1}</span>
                  <input
                    type="text"
                    value={playerNames[i]}
                    onChange={(e) => handleNameChange(i, e.target.value)}
                    placeholder={`Player ${i + 1}`}
                    className="flex-1 rounded border border-val-border bg-val-bg px-3 py-2 text-sm text-val-text placeholder-val-text/30 outline-none transition-colors focus:border-val-accent"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Tasks input */}
          <section>
            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-val-accent">
              タスクリスト（1行に1タスク）
            </label>
            <textarea
              value={tasksInput}
              onChange={(e) => setTasksInput(e.target.value)}
              placeholder={'例:\nフラッシュを投げる\nスモークを炊く\n偵察する\nAサイトを守る'}
              rows={6}
              className="w-full rounded border border-val-border bg-val-bg px-3 py-2 text-sm text-val-text placeholder-val-text/30 outline-none transition-colors focus:border-val-accent resize-none"
            />
          </section>

          {/* Error */}
          {error && (
            <p className="rounded border border-val-accent/40 bg-val-accent/10 px-3 py-2 text-xs text-val-accent">
              {error}
            </p>
          )}

          {/* Assign button */}
          <button
            onClick={handleAssign}
            className="w-full rounded bg-val-accent py-3 text-sm font-black uppercase tracking-widest text-white transition-opacity hover:opacity-90 active:opacity-80"
          >
            タスクを割り振る
          </button>
        </div>

        {/* Results */}
        {results && <Results results={results} />}
      </div>
    </div>
  )
}
