/** Fisher-Yates shuffle – returns a new shuffled array. */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export interface Assignment {
  player: string;
  task: string;
}

/**
 * Assigns tasks to players.
 * If there are more players than tasks the extra players get no task.
 * If there are more tasks than players the extra tasks are ignored.
 */
export function assignTasks(players: string[], tasks: string[]): Assignment[] {
  const shuffled = shuffleArray(tasks);
  return players.map((player, i) => ({
    player,
    task: shuffled[i] ?? '—',
  }));
}
