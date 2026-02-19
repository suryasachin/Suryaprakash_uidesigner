# Surya Sachin — UI/UX Designer Portfolio

A professional, animated React portfolio with:
- ✦ GSAP-style CSS animations
- 🌗 Dark / Light theme toggle
- 🎯 3D tilt hero banner with opacity boxes
- ⬇ Resume download section
- 🎨 Running tools marquee animation
- 📁 Project cards in zig-zag layout
- 🤖 AI agent contact page (Claude-powered)
- 📧 Email: suryasachin477@gmail.com
- 📱 Phone: +91 94894 23 900
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Professional button animations (hover + ripple click effect)
- Custom cursor (desktop)

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm start
```

### 3. Build for production
```bash
npm run build
```

---

## 📁 Project Structure

```
surya-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   ├── Navbar.js       ← Nav + Theme toggle + Mobile menu
│   │   │   └── Navbar.css
│   │   ├── Hero/
│   │   │   ├── Hero.js         ← Banner with 3D tilt animation
│   │   │   └── Hero.css
│   │   ├── Resume/
│   │   │   ├── Resume.js       ← Download resume section
│   │   │   └── Resume.css
│   │   ├── Tools/
│   │   │   ├── Tools.js        ← Running tools marquee animation
│   │   │   └── Tools.css
│   │   ├── Projects/
│   │   │   ├── Projects.js     ← Zig-zag project cards
│   │   │   └── Projects.css
│   │   ├── Contact/
│   │   │   ├── Contact.js      ← Contact form + AI chat agent
│   │   │   └── Contact.css
│   │   ├── Footer/
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   └── Cursor.js           ← Custom cursor (desktop)
│   ├── data/
│   │   └── index.js            ← Projects, tools, stats data
│   ├── hooks/
│   │   └── useTheme.js         ← Dark/light theme hook
│   ├── styles/
│   │   └── global.css          ← CSS variables, animations, utilities
│   ├── App.js
│   └── index.js
└── package.json
```

---

## ✏️ Customisation

### Change your resume PDF
Place your resume as `public/resume.pdf` and update `Resume.js`:
```js
link.href = '/resume.pdf';
```

### AI Agent (Claude API)
The contact page uses Claude API via the Anthropic endpoint.
The AI already knows your email `suryasachin477@gmail.com` and phone `+91 94894 23 900`.
No API key config needed when deployed on Claude.ai compatible host.

### Add your real projects
Edit `src/data/index.js` — update the `PROJECTS` array with your actual work.

### Update social links
Edit `src/components/Footer/Footer.js` to add your real Dribbble/Behance/LinkedIn URLs.

---

## 🎨 Design Tokens (CSS Variables)

All colours and theme values live in `src/styles/global.css` under `:root` (dark) and `[data-theme="light"]`.
Swap `--accent`, `--accent-pink`, `--accent-mint` to instantly rebrand the entire portfolio.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| react | UI framework |
| react-dom | DOM rendering |
| gsap | Animation library (optional advanced usage) |
| react-scripts | CRA toolchain |

---

Built with 💜 for Surya Sachin
