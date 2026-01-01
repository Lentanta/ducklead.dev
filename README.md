# 🦆 DuckLead

My personal website built with Astro.
Features a blog system, interactive elements, and a fully automated deployment pipeline.

> "Own a farm, lead a flock of ducks" - The philosophy behind DuckLead

## 🚀 Tech Stack

- **Framework**: [Astro 5.15.1](https://astro.build)
- **Styling**: [Tailwind CSS 4.1.17](https://tailwindcss.com)
- **Package Manager**: [pnpm 9.15.2](https://pnpm.io)
- **Creative Coding**: [p5.js](https://p5js.org)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com)
- **Deployment**: Docker + Nginx + GitHub Actions
- **Icons**: [Remix Icon](https://remixicon.com)

## 📦 Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm 9 or higher (or npm/yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ducklead-website.git
cd ducklead-website
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:4321](http://localhost:4321) in your browser

## 🛠️ Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build locally
```

### Adding Blog Posts

Create a new `.md` file in `src/pages/posts/`:

```markdown
---
title: "Your Post Title"
createdAt: "2025-01-01"
layout: "../../layouts/PostPageLayout.astro"
---

Your content here...
```

## 🐳 Deployment

### Docker

Build and run with Docker:

```bash
# Build the image
docker build -t ducklead-website .

# Run the container
docker run -p 3000:80 ducklead-website
```

### GitHub Actions (Automated)

The project includes a GitHub Actions workflow that automatically:

1. Builds a Docker image on push to `main`
2. Pushes the image to Docker Hub
3. Deploys to your VPS via SSH

To set up automated deployment:

1. Add these secrets to your GitHub repository:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token
   - `VPS_HOST`: Your VPS IP address
   - `VPS_USERNAME`: SSH username
   - `VPS_SSH_KEY`: SSH private key

2. Update `.github/workflows/build.yml` with your Docker Hub repository name

3. Push to main branch - deployment happens automatically!

---

Made with ❤️ by [Tam (Lentanta)](https://github.com/lentanta)
Feel free to star the repo if you find it useful.
