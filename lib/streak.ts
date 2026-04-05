export function calculateStreak(completions: { date: Date }[]): number {
    if (completions.length === 0) return 0
  
    // sort completions newest first
    const sorted = completions
      .map(c => new Date(c.date))
      .sort((a, b) => b.getTime() - a.getTime())
  
    // get today and yesterday
    const today = new Date()
    today.setHours(0, 0, 0, 0)
  
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
  
    // most recent completion
    const latest = new Date(sorted[0])
    latest.setHours(0, 0, 0, 0)
  
    // if latest completion is not today or yesterday → streak is 0
    if (latest < yesterday) return 0
  
    // count consecutive days
    let streak = 1
    for (let i = 1; i < sorted.length; i++) {
      const current = new Date(sorted[i])
      current.setHours(0, 0, 0, 0)
  
      const prev = new Date(sorted[i - 1])
      prev.setHours(0, 0, 0, 0)
  
      const diffDays = Math.round(
        (prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24)
      )
  
      if (diffDays === 1) {
        streak++   // consecutive day ✅
      } else {
        break      // gap found, stop counting ❌
      }
    }
  
    return streak
  }