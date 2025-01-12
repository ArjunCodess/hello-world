import { useState, useEffect } from 'react'

export function TimeDisplay() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const timeString = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
    // Split time into main time and AM/PM
    const [mainTime, period] = timeString.split(' ')
    return (
      <>
        <span>{mainTime}</span>
        <span className="text-muted-foreground ml-4">{period}</span>
      </>
    )
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="text-center w-full">
      <h1 className="text-8xl font-bold mb-2 transition-colors flex items-center justify-center">
        {formatTime(time)}
      </h1>
      <h2 className="text-3xl text-muted-foreground mb-8">
        {formatDate(time)}
      </h2>
    </div>
  )
} 