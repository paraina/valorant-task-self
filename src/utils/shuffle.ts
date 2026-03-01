export interface Assignment {
  player: string;
  task: string;
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Assigns shuffled tasks to players. If there are more players than tasks,
 * tasks cycle around. If there are more tasks than players, only the first
 * n tasks (where n = number of players) are used.
 */
export function assignTasks(players: string[], tasks: string[]): Assignment[] {
  const shuffledTasks = shuffleArray(tasks);
  return players.map((player, index) => ({
    player,
    task: shuffledTasks[index % shuffledTasks.length],
  }));
}
