import { useState, useEffect } from "react";

interface Quote {
  text: string;
  author: string;
}

const QUOTES: Quote[] = [
  {
    text: "We learn to walk by falling down. If we never fell down, we would never walk.",
    author: "Robert Kiyosaki",
  },
  {
    text: "Be the change that you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  {
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas Edison",
  },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
  },
  {
    text: "To live is the rarest thing in the world. Most people exist, that is all.",
    author: "Oscar Wilde",
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "You must be the master of your own destiny.",
    author: "Napoleon Hill",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Courage is resistance to fear, mastery of fear—not absence of fear.",
    author: "Mark Twain",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
    author: "Jordan Belfort",
  },
  {
    text: "Don't count the days, make the days count.",
    author: "Muhammad Ali",
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
  {
    text: "Keep your face always toward the sunshine—and shadows will fall behind you.",
    author: "Walt Whitman",
  },
  {
    text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
    author: "Jimmy Dean",
  },
  {
    text: "Do what you love and the money will follow.",
    author: "Marsha Sinetar",
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller",
  },
  {
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser",
  },
  { text: "Fall seven times and stand up eight.", author: "Japanese Proverb" },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis",
  },
  {
    text: "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.",
    author: "Jamie Paolinetti",
  },
  {
    text: "Don't let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "Failure is simply the opportunity to begin again, this time more intelligently.",
    author: "Henry Ford",
  },
  {
    text: "The man who moves a mountain begins by carrying away small stones.",
    author: "Confucius",
  },
  {
    text: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
  },
  {
    text: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  { text: "An unexamined life is not worth living.", author: "Socrates" },
];

export function QuoteDisplay() {
  const [quote, setQuote] = useState<Quote>(() => {
    // Get a random quote for initial render
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  });

  useEffect(() => {
    // Change quote every 10 minutes
    const quoteTimer = setInterval(() => {
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setQuote(randomQuote);
    }, 10 * 60 * 1000);

    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto min-h-[100px] flex items-center justify-center">
      <blockquote className="relative">
        <p className="text-xl italic mb-2 transition-opacity">"{quote.text}"</p>
        <footer className="text-sm text-muted-foreground">
          — {quote.author}
        </footer>
      </blockquote>
    </div>
  );
}
