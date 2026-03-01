/**
 * Shuffles an array using the Fisher-Yates algorithm.
 * Returns a new array (does not mutate the original).
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export interface PlayerTask {
  player: string
  task: string
}

/**
 * Assigns tasks to players randomly.
 * If there are more players than tasks, extra players receive "No task assigned".
 * If there are more tasks than players, only the first N tasks (after shuffle) are used.
 */
export function assignTasks(players: string[], tasks: string[]): PlayerTask[] {
  const validPlayers = players.filter((p) => p.trim() !== '')
  const validTasks = tasks.filter((t) => t.trim() !== '')

  const shuffledTasks = shuffleArray(validTasks)

  return validPlayers.map((player, index) => ({
    player: player.trim(),
    task: shuffledTasks[index] !== undefined ? shuffledTasks[index].trim() : 'No task assigned',
  }))
}
