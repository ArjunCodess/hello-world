import { useState, useEffect } from 'react'

interface Quote {
  text: string
  author: string
}

export function ClockHeader() {
  const [time, setTime] = useState(new Date())
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' })
  const [isLoadingQuote, setIsLoadingQuote] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fetchQuote = async () => {
    try {
      setIsLoadingQuote(true)
      const response = await fetch('https://api.quotable.io/random?maxLength=120')
      const data = await response.json()
      setQuote({ text: data.content, author: data.author })
    } catch (error) {
      console.error('Failed to fetch quote:', error)
      setQuote({
        text: "Every moment is a fresh beginning.",
        author: "T.S. Eliot"
      })
    } finally {
      setIsLoadingQuote(false)
    }
  }

  useEffect(() => {
    fetchQuote() // Initial fetch
    const quoteTimer = setInterval(fetchQuote, 10 * 60 * 1000) // Fetch every 10 minutes
    return () => clearInterval(quoteTimer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
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
    <div className="text-center mb-12">
      <h1 className="text-6xl font-bold mb-2 transition-colors">
        {formatTime(time)}
      </h1>
      <h2 className="text-2xl text-muted-foreground mb-8">
        {formatDate(time)}
      </h2>
      <div className="max-w-2xl mx-auto min-h-[100px] flex items-center justify-center">
        {isLoadingQuote ? (
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-96 mb-2"></div>
            <div className="h-3 bg-muted rounded w-24 mx-auto"></div>
          </div>
        ) : (
          <blockquote className="relative">
            <p className="text-xl italic mb-2 transition-opacity">"{quote.text}"</p>
            <footer className="text-sm text-muted-foreground">
              — {quote.author}
            </footer>
          </blockquote>
        )}
      </div>
    </div>
  )
} 