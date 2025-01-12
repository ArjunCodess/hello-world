# Hello World - A Modern New Tab Extension

![Hello World - A Modern New Tab Extension](/public/screenshot.png)

A beautiful and functional new tab extension that combines productivity tools with curated content feeds. Stay organized and informed every time you open a new tab.

## Features

### Time & Inspiration
- Large, elegant clock display with seconds
- Current date display
- Daily inspirational quotes

### Productivity Tools
- **Todo List**: Keep track of your daily tasks
- **Quick Notes**: Capture thoughts and ideas instantly
- Collapsible sections for a clean interface

### Content Feeds
- **Product Hunt Integration**: 
  - View top 3 trending products
  - Product thumbnails and vote counts
  - Direct links to product pages

- **Dev.to Integration**:
  - Latest posts from the dev community
  - Article thumbnails and author info
  - Quick access to full articles

### Design & UX
- Clean, modern interface
- Dark/light theme support
- Responsive two-column layout
- Smooth animations and transitions
- Collapsible sections for customizable view

## Installation & Usage

1. Clone the repository
    ```bash
    git clone [repository-url]
    cd hello-world
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Configure Product Hunt API
    - Get your API key from [Product Hunt API Dashboard](https://www.producthunt.com/v2/oauth/applications)
    - Open `src/components/widgets/content-feed.tsx`
    - Replace the `PRODUCT_HUNT_API_KEY` value with your API key:
    ```typescript
    const PRODUCT_HUNT_API_KEY = 'your-api-key-here';
    ```

4. Build the extension
    ```bash
    npm run build
    ```

5. Load in Chrome
    - Open Chrome and navigate to `chrome://extensions/`
    - Enable "Developer mode" in the top right
    - Click "Load unpacked"
    - Select the `dist` folder from the project directory

## Development

To start development server:
```bash
npm run dev
```

## Tech Stack
- React + TypeScript
- Tailwind CSS
- shadcn/ui color system
- Product Hunt GraphQL API
- Dev.to REST API

## API Configuration
- **Product Hunt API**: Required for product feed. Replace the API key in `content-feed.tsx`
- **Dev.to API**: No key required, uses public API

## Contributing
Feel free to submit issues and enhancement requests.

## License
MIT License - feel free to use this project however you'd like.

---
Made with ❤️ for better productivity 