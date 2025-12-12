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

The typing test uses **localStorage** to save scores:

- **Automatic Daily Reset** - Scores from previous days are automatically cleared
- **Real-time Updates** - New submissions appear immediately
- **No Database Needed** - All data stored in the browser
- **Live Statistics** - Calculates highest WPM, average, etc. automatically

### Important Notes:
- Each student's browser stores their own view of the scores
- To see all class scores, students need to be submitting on the same device OR
- Consider sharing screen during class to show the live scoreboard
- Data persists only for the current day

### Future Enhancement Ideas:
- Add a backend (Node.js + MongoDB) for persistent storage
- Create teacher dashboard to download CSV of scores
- Add weekly/monthly statistics tracking

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