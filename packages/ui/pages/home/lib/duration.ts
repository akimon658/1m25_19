const msPerSecond = 1000
const msPerMinute = msPerSecond * 60
const msPerHour = msPerMinute * 60

export const formatDurationMs = (durationMs: number): string => {
  let remainingMs = durationMs

  const hours = Math.floor(remainingMs / msPerHour)
  remainingMs %= msPerHour

  const minutes = Math.floor(remainingMs / msPerMinute)
  remainingMs %= msPerMinute

  const seconds = Math.floor(remainingMs / msPerSecond)

  return new Intl.DurationFormat().format({
    hours,
    minutes,
    seconds,
  })
}
