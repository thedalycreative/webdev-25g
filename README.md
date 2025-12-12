# Quokka Squad 25g - Class Resource Website

Welcome to the class resource website for **Equinim College Intake 25g**! 🦘

## About This Site

This is a vibrant, beach-themed resource hub for the on-campus Diploma of IT Back End Web Development cohort. The site features:

- **Responsive Design** - Works on all devices (desktop, tablet, mobile)
- **Vibrant Beach Aesthetic** - Matches the "Quokka Squad" vibe with warm, earthy colors
- **Easy Updates** - Simple HTML structure for quick content updates
- **Interactive Features** - Live typing scoreboard with local storage

## Site Structure

```
webdev-25g/
├── index.html              # Homepage with overview and quick links
├── schedule.html           # Class schedule and term dates
├── typing-test.html        # Daily typing test scoreboard
├── resources.html          # Learning resources and tools
├── noticeboard.html        # Class noticeboard with feedback form
├── styles.css              # Main stylesheet
├── schedule.css            # Schedule page styles
├── typing-test.css         # Typing test page styles
├── resources.css           # Resources page styles
├── noticeboard.css         # Noticeboard page styles
├── typing-test.js          # Typing scoreboard functionality
├── noticeboard.js          # Noticeboard functionality
└── README.md               # This file
```

## Key Features

### 🏠 Homepage (`index.html`)
- Welcome message with Quokka Squad branding
- Course overview cards
- Class times and location info
- Quick links to all resources
- Contact information

### 📅 Schedule Page (`schedule.html`)
- Weekly class times (Mon, Tues, Fri 9am-2pm)
- Term dates for 2025-2026
- WA public holidays
- Typical class day timeline
- Important reminders

### 📌 Noticeboard (`noticeboard.html`)
- Students can post feedback, questions, and shout-outs
- Posts appear instantly on the board
- Optional name field for anonymity
- Clear all button for moderation

### ⌨️ Typing Test Scoreboard (`typing-test.html`)
- Students submit daily WPM and accuracy scores
- Live scoreboard with automatic ranking
- Class statistics (highest WPM, average, etc.)
- Data stored in browser (resets daily automatically)
- **No backend required** - all client-side!

### 🔗 Resources Page (`resources.html`)
- Essential class links
- Learning platforms and tutorials
- Design tools and assets
- VS Code extensions
- Practice challenges

## How to Update the Site

### Managing Noticeboard Posts

- Posts are stored in browser `localStorage`
- They persist until cleared via "Clear All"
- Each post includes type, timestamp, and optional name

### Updating Contact Information

1. Open `index.html`
2. Scroll to the contact section (around line 150)
3. Update email addresses, phone numbers, etc.

### Changing Colors

All colors are defined in `styles.css` at the top in CSS variables:

```css
:root {
    --primary-color: #ff8c42;      /* Sunset orange */
    --secondary-color: #4ecdc4;    /* Turquoise ocean */
    --accent-color: #ffd166;       /* Sandy yellow */
    --dark-accent: #06668d;        /* Deep ocean blue */
    --earth-tone: #95b46a;         /* Earthy green */
}
```

Simply change these hex values to update the entire color scheme!

### Updating Schedule/Term Dates

1. Open `schedule.html`
2. Find the term dates grid (around line 90)
3. Update dates, add new terms, or mark as current/upcoming

## Typing Test Scoreboard - How It Works

By default the typing test uses **localStorage** (per-device). You can enable **realtime shared scores** using Firebase Firestore:

- **Automatic Daily Reset** - Scores filter by today’s date
- **Realtime Updates** - Everyone sees new submissions instantly
- **No server needed** - Works on GitHub Pages
- **Live Statistics** - Highest WPM, average, counts

### Important Notes:
- Without Firebase, each student's browser stores their own view
- With Firebase enabled, the class shares a single realtime scoreboard
- Data for the typing test persists only for the current day (by filter)

### Future Enhancement Ideas:
- Add a backend (Node.js + MongoDB) for persistent storage
- Create teacher dashboard to download CSV of scores
- Add weekly/monthly statistics tracking

## Enable Realtime (Firebase)

1. Create a Firebase project and add a Web App.
2. Copy `firebase-config.sample.js` to `firebase-config.js` and paste your config.
3. In Firebase Console → Firestore, create the database in production mode.
4. Set security rules (basic example for class use):

```
rules_version = '2';
service cloud.firestore {
    match /databases/{database}/documents {
        match /typingScores/{doc} {
            allow read, write: if true; // For classroom demo. For production, restrict by auth.
        }
        match /noticeboard/{doc} {
            allow read, write: if true;
        }
    }
}
```

5. Deploy the site to GitHub Pages — realtime works immediately.

Collections used:
- `typingScores` documents: { name, wpm, accuracy, time, date, createdAt }
- `noticeboard` documents: { name, type, message, time, createdAt }

## Publishing the Site

### Option 1: GitHub Pages (Free & Easy)

1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings > Pages
4. Select branch: `main`, folder: `/root`
5. Your site will be live at: `https://yourusername.github.io/webdev-25g/`

### Option 2: Netlify (Free & Drag-Drop)

1. Go to [netlify.com](https://www.netlify.com/)
2. Drag your project folder onto the deployment zone
3. Site goes live instantly with a custom URL

### Option 3: Traditional Web Hosting

Upload all files to your hosting provider via FTP.

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Support

For technical questions or issues:
- **Trainer:** Tim - tim@equinimcollege.com
- **Mobile:** 0414 265 050

## Credits

Built with ❤️ for the Quokka Squad 25g
Equinim College - Diploma of IT Back End Web Development

---

**Last Updated:** December 3, 2025