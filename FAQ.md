# ❓ Frequently Asked Questions (FAQ)

## 📥 Installation Questions

### Q: I downloaded the file, now what?

**A:** Find "Stitch Weather-1.0.0.dmg" in your Downloads folder. Double-click it, then drag the app icon to the Applications folder.

### Q: Why does it say "from an unidentified developer"?

**A:** This is normal! The app isn't signed with an Apple Developer certificate (costs $99/year). Right-click the app → "Open" to launch it safely.

### Q: Is it safe to open?

**A:** Yes! The code is open-source on GitHub. You can review it yourself or have someone check it. The security warning is just because I haven't paid Apple $99/year for a developer certificate.

### Q: I double-clicked but it won't open!

**A:** On first launch, you MUST right-click → "Open" (not double-click). This is a macOS security feature for unsigned apps.

### Q: It says "App is damaged"

**A:** Run this in Terminal:

```bash
xattr -cr "/Applications/Stitch Weather.app"
```

Then try opening again.

### Q: How do I open Terminal?

**A:** Press **⌘ + Space** (Command + Space), type "Terminal", press Enter.

---

## 💻 Usage Questions

### Q: How do I move the widget?

**A:** Click anywhere on the widget (except Stitch!) and drag it to your desired location.

### Q: Can I minimize it?

**A:** Yes! Click the yellow button (traffic light) in the top-left corner.

### Q: How do I close it?

**A:** Click the red button (traffic light) in the top-left corner.

### Q: The widget is always on top of other windows!

**A:** That's by design! It's meant to be a widget that stays visible. You can minimize it with the yellow button if needed.

### Q: What happens when I click Stitch?

**A:** Try it! Stitch has a special message for you! 💙🌺

### Q: The weather isn't showing / stuck loading

**A:**

- Check your internet connection
- The free API has rate limits - wait a few minutes and restart the app
- Make sure you're not behind a strict firewall

---

## 🌍 Weather Questions

### Q: Can I change the city from Chicago?

**A:** Not in v1.0.0, but it's planned for v1.1.0! Currently it only shows Chicago weather.

### Q: Can I change from Fahrenheit to Celsius?

**A:** Not yet, but it's coming in v1.1.0!

### Q: How often does the weather update?

**A:** The weather data updates automatically when you reopen the app or after a few minutes.

### Q: Is the weather accurate?

**A:** Yes! It uses OpenWeatherMap API, which is used by many professional weather apps.

---

## 🖥️ System Questions

### Q: What macOS version do I need?

**A:** macOS 10.15 (Catalina) or newer. Check your version: Apple menu → "About This Mac"

### Q: How much space does it take?

**A:** About 290 MB on your hard drive.

### Q: Will it slow down my Mac?

**A:** No! It uses very little memory and CPU. It's lighter than having a browser tab open.

### Q: Does it work on M1/M2/M3 Macs?

**A:** Currently built for Intel Macs (x64). M1/M2/M3 support coming soon (will run via Rosetta for now).

### Q: Can I use it on Windows or Linux?

**A:** Not yet! Currently Mac-only, but Electron supports cross-platform - might add Windows/Linux later!

---

## 🔧 Technical Questions

### Q: Is it free?

**A:** Yes! Completely free and open-source!

### Q: Can I see the code?

**A:** Yes! It's on GitHub: https://github.com/MarselErlan/v0-stitch-weather-popup

### Q: Can I modify it?

**A:** Yes! It's open-source. Clone the repo and customize it however you want!

### Q: How do I uninstall it?

**A:**

1. Quit the app (red button)
2. Go to Applications folder
3. Drag "Stitch Weather" to Trash
4. Empty Trash

### Q: Does it collect my data?

**A:** No! It only fetches weather data from OpenWeatherMap. No personal data is collected or sent anywhere.

### Q: Can it run automatically when I start my Mac?

**A:** Not built-in yet, but you can add it to Login Items:

1. System Settings → Users & Groups
2. Login Items → Click "+"
3. Select Stitch Weather from Applications

---

## 💰 Cost Questions

### Q: Is it really free?

**A:** Yes! No payments, no subscriptions, no ads, no in-app purchases!

### Q: Why is it free?

**A:** It's a fun personal project! Sharing is caring! 💙

### Q: Can I donate?

**A:** Not accepting donations right now, but starring ⭐ the GitHub repo is always appreciated!

---

## 🐛 Problem Solving

### Q: The app crashed!

**A:**

1. Try restarting it
2. If it keeps crashing, check for updates
3. Report the issue on GitHub with details

### Q: Weather shows "Loading..." forever

**A:**

- Check your internet connection
- The API might be rate-limited - wait 10 minutes
- Try quitting and reopening the app

### Q: The colors look weird

**A:** Make sure you're using Light Mode on macOS. Dark mode support coming soon!

### Q: Stitch looks stretched/squished

**A:** Take a screenshot and report it on GitHub - this shouldn't happen!

---

## 📱 Updates & Future

### Q: How do I update to a new version?

**A:**

1. Download the new version from GitHub releases
2. Quit the old app
3. Install the new version (replaces the old one)

### Q: Will there be automatic updates?

**A:** Planned for v1.2.0!

### Q: What features are coming next?

**A:**

- 📍 Choose your own city
- 🌡️ °F/°C toggle
- 🎨 Custom themes
- 📊 Week forecast
- 🌙 Dark mode support
- 🔔 Weather alerts
- 🤖 Auto-updates

### Q: Can I request a feature?

**A:** Yes! Open an issue on GitHub with your idea!

---

## 🙋 Still Need Help?

- **GitHub Issues:** https://github.com/MarselErlan/v0-stitch-weather-popup/issues
- **Email:** [Your Email]
- **Twitter/X:** [Your Handle]

**Remember: Ohana means family, and family means nobody gets left behind!** 🌺💙

---

_Last Updated: November 1, 2025_
