# Ground Zero Gym - Elite Fitness Website

A modern, high-performance, single-page landing website for an elite gym, built with cutting-edge web technologies.

## Features
- **Immersive Parallax Hero Section**: Scroll-driven animations that create a stunning visual experience.
- **Dynamic Statistics Counter**: Animated number counters that trigger when scrolled into view.
- **Service & Membership Showcase**: Glassmorphic, modern cards to display offerings.
- **Responsive Design**: Fully mobile optimized with an interactive mobile menu.
- **Custom Cursor & Noise Overlay**: For a premium, cinematic feel.

## Tech Stack
- React 19
- Vite
- Tailwind CSS v4
- Motion (Framer Motion)
- Lucide React (Icons)

## Quick Start
To get the project running locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy the example environment file and add your Gemini API key if you plan to utilize AI integrations.
   ```bash
   cp .env.example .env.local
   ```
   *Note: Ensure your `.env.local` contains `GEMINI_API_KEY=your_api_key_here`.*

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment
This project is configured out-of-the-box for seamless Vercel deployment. 
Simply push to your repository and connect it to Vercel without needing any custom runtime configuration.
