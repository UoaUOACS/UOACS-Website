export const formatLikes = (likes: number): string => {
  if (likes < 1000) return `${likes}`
  if (likes < 10000) return `${(likes / 1000).toFixed(1).replace(/\.0$/, "")}k`
  return `${Math.round(likes / 1000)}k`
}
