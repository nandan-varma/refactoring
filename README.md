# AI Code Refactoring Tool

An intelligent code refactoring tool powered by Gemini AI that helps developers improve code quality, readability, and maintainability using best practices.

## Features

- 🤖 **AI-Powered Refactoring**: Leverages Gemini AI to analyze and refactor your code
- ⚡ **Real-time Streaming**: Watch your code being refactored in real-time
- 📋 **One-Click Copy**: Easily copy the refactored code to your clipboard
- ⌨️ **Keyboard Shortcuts**: Quick refactoring with Cmd/Ctrl+Enter
- 🎨 **Clean Interface**: Minimal, distraction-free UI with dark mode support
- 🔄 **Error Handling**: Graceful error recovery with clear user feedback

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Gemini AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd refactoring
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Gemini AI API key to `.env.local`:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Paste your code** into the left textarea
2. **Click "Refactor Code"** or press `Cmd+Enter` (Mac) / `Ctrl+Enter` (Windows/Linux)
3. **Watch the AI refactor** your code in real-time on the right panel
4. **Copy the result** with the Copy button

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **AI SDK**: [@ai-sdk/react](https://sdk.vercel.ai) for streaming AI responses
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **AI Model**: Google Gemini AI
- **Language**: TypeScript

## Project Structure

```
refactoring/
├── app/
│   ├── api/
│   │   └── refactor/
│   │       └── route.ts       # API endpoint for refactoring
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Main refactoring interface
├── public/                    # Static assets
└── package.json
```

## Development

This project uses:
- [Next.js App Router](https://nextjs.org/docs/app) for rendering and routing
- [AI SDK](https://sdk.vercel.ai/docs) for streaming chat responses
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load [Geist](https://vercel.com/font) fonts
- [Tailwind CSS](https://tailwindcss.com/docs) for styling

## Deployment

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your `GEMINI_API_KEY` environment variable
4. Deploy!

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Gemini AI Documentation](https://ai.google.dev/docs)

## License

MIT
