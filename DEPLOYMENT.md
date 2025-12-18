# Deployment Guide

## ✅ Local Server Running

Your portfolio is now running locally at:
**http://localhost:3000**

The server will continue running until you stop it (Ctrl+C in the terminal).

---

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI** (one-time setup):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from the project directory**:
```bash
cd c:\Users\user\Desktop\cv
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? (Select your account)
   - Link to existing project? **N**
   - Project name? **giacomo-bertapelle-portfolio** (or your choice)
   - In which directory is your code located? **./** (press Enter)
   - Want to override settings? **N**

5. **Your site will be deployed!** You'll get:
   - Preview URL (e.g., `giacomo-bertapelle-portfolio-xxx.vercel.app`)
   - Production URL (after confirmation)

6. **Deploy to production**:
```bash
vercel --prod
```

### Option 2: Vercel Web Interface

1. **Go to** [vercel.com](https://vercel.com)

2. **Sign up/Login** with GitHub, GitLab, or Bitbucket

3. **Click "Add New Project"**

4. **Import Git Repository**:
   - First, initialize git in your project:
   ```bash
   cd c:\Users\user\Desktop\cv
   git init
   git add .
   git commit -m "Initial commit: Portfolio with FDM Farm and Luna/r projects"
   ```
   
   - Create a repository on GitHub
   - Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

5. **Import the repository** in Vercel

6. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: **./**
   - Build Command: (leave empty)
   - Output Directory: **./**

7. **Click "Deploy"**

Your site will be live at `your-project-name.vercel.app`

---

## 🔧 Alternative Deployment Options

### Netlify

1. **Drag and Drop**:
   - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `cv` folder
   - Your site is live!

2. **Netlify CLI**:
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages

1. **Create `.github/workflows/deploy.yml`**:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

2. **Push to GitHub** and enable GitHub Pages in repository settings

---

## 📝 Custom Domain Setup (Vercel)

After deployment:

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `giacomobertapelle.com`)
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

---

## 🔄 Update Deployment

### Vercel CLI:
```bash
cd c:\Users\user\Desktop\cv
vercel --prod
```

### Git-based (if connected to GitHub):
```bash
git add .
git commit -m "Update portfolio"
git push
```
Vercel will automatically redeploy!

---

## 📊 Monitoring

After deployment, you can:
- View analytics in Vercel dashboard
- Monitor performance metrics
- Check deployment logs
- Set up custom redirects

---

## ⚠️ Important Notes

1. **Email Links**: Update email addresses in:
   - `fdm-farm.html` (floating CTA and conclusion)
   - `lunar.html` (floating CTA and conclusion)
   - `index.html` (contact section)

2. **Analytics**: Consider adding:
   - Google Analytics
   - Vercel Analytics (built-in)
   - Plausible Analytics

3. **SEO**: The site is already optimized with:
   - Meta descriptions
   - Semantic HTML
   - Proper heading hierarchy
   - Fast loading times

---

## 🆘 Troubleshooting

**Local server not starting?**
```bash
# Try a different port
npx http-server -p 8080

# Or use Python
python -m http.server 3000
```

**Vercel deployment fails?**
- Check `vercel.json` is present
- Ensure all file paths are correct
- Verify no syntax errors in HTML/CSS/JS

**3D visualizations not working?**
- Check browser console for errors
- Ensure Three.js CDN is accessible
- Verify JavaScript files are loading

---

## 📞 Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

For portfolio questions:
- Email: contact@giacomobertapelle.com
