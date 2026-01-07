# Giacomo Bertapelle - Portfolio

Professional portfolio showcasing expertise in 3D printing, e-commerce platforms, and technical innovation.

## Features

- **Interactive Project Documentation**: FDM Manufacturing Farm and Luna/r e-commerce platform
- **3D Visualizations**: Three.js powered interactive demonstrations
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Aesthetics**: Minimal dark theme with modern animations

## Local Development

### Quick Start

```bash
# Install dependencies (optional, uses npx)
npm install

# Start local server on http://localhost:3000
npm run dev
```

The site will automatically open in your default browser at `http://localhost:3000`

### Alternative Methods

**Using Python:**
```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

**Using Node.js http-server directly:**
```bash
npx http-server -p 3000 -o
```

**Using VS Code Live Server:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to link your project

### Manual Deployment

The site is a static HTML/CSS/JS application and can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## Project Structure

```
cv/
├── index.html              # Homepage
├── fdm-farm.html          # FDM Manufacturing Farm documentation
├── fdm-farm.css           # Shared styles for documentation pages
├── fdm-farm.js            # FDM farm interactive features
├── lunar.html             # Luna/r project documentation
├── lunar.js               # Luna/r interactive features
├── style.css              # Homepage styles
├── script.js              # Homepage interactions
├── project.css            # Legacy project page styles
├── admin.html             # Admin panel
└── vercel.json            # Vercel deployment configuration
```

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js
- **Animations**: GSAP, CSS animations
- **Fonts**: Inter, JetBrains Mono (Google Fonts)
- **Icons**: Unicode emoji

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Giacomo Bertapelle. All rights reserved.
