# Random Prompts Generator - Chrome Extension

A powerful Chrome extension that generates creative prompts for writing, AI art, blogging, fantasy worldbuilding, persuasive essays, and character names. Perfect for overcoming creative blocks and sparking inspiration instantly.

![Extension Preview](icons/icon128.png)

## Features

- **6 Categories of Prompts:**
  - 📝 **Writing** - Complex story prompts with unique conflicts and plot twists
  - 🎨 **AI Art** - Professional prompts for MidJourney, DALL-E, and Stable Diffusion
  - 📰 **Blog** - SEO-optimized blog post ideas with compelling hooks
  - 👑 **Fantasy** - Detailed worldbuilding prompts with unique magic systems
  - ⚡ **Persuasive** - Thought-provoking topics for essays and debates
  - ✨ **Names** - Fantasy character names from various cultures

- **Instant Generation** - Click once to generate a new prompt
- **Copy to Clipboard** - One-click copying of any prompt
- **Save Favorites** - Save prompts for later use
- **Offline Support** - Works without internet connection
- **No Data Collection** - Your prompts stay private

## Installation

### Method 1: Install from Chrome Web Store (Coming Soon)
*The extension is being prepared for submission to the Chrome Web Store.*

### Method 2: Install as Developer Extension (Current Method)

1. **Download the Extension**
   - Download or clone this repository
   - Navigate to the `random-prompts-chrome-extension` folder

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `random-prompts-chrome-extension` folder
   - The extension should now appear in your extensions list

5. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in the Chrome toolbar
   - Find "Random Prompts Generator"
   - Click the pin icon to keep it visible in your toolbar

## Usage

### Generating Prompts

1. Click the extension icon in your Chrome toolbar
2. Select a category from the tabs (Writing, AI Art, Blog, etc.)
3. Click "Generate Prompt" button
4. Your prompt will appear in the result area

### Managing Prompts

- **Copy**: Click the "Copy" button to copy the prompt to your clipboard
- **Save**: Click "Save" to add the prompt to your saved list
- **Regenerate**: Click "Regenerate" to generate a new prompt in the same category

### Saved Prompts

- Saved prompts are stored locally in Chrome's storage
- View your saved prompts in the "Saved Prompts" section
- Delete individual prompts by clicking the trash icon
- Clear all saved prompts with the "Clear All" button

## File Structure

```
random-prompts-chrome-extension/
├── manifest.json           # Extension configuration
├── popup.html             # Main popup interface
├── icons/                 # Extension icons
│   ├── icon16.png        # 16x16 toolbar icon
│   ├── icon32.png        # 32x32 toolbar icon
│   ├── icon48.png        # 48x48 extension page icon
│   └── icon128.png       # 128x128 web store icon
├── css/
│   └── popup.css         # Popup styling
├── js/
│   └── popup.js          # Main extension logic
└── README.md             # This file
```

## Development

### Prerequisites

- Node.js (for icon generation scripts)
- Google Chrome or Chromium browser

### Building Icons

If you need to regenerate the icons:

```bash
# Generate SVG icons
node generate-icons.cjs

# Generate PNG icons
node create-png-icons.cjs
```

### Testing

1. Make changes to the extension files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the Random Prompts Generator card
4. Test your changes by opening the extension popup

### Debugging

- **View Console Logs**: Right-click the extension popup → Inspect
- **Check Manifest Errors**: Look for errors on the `chrome://extensions/` page
- **Test Storage**: Use Chrome DevTools to inspect `chrome.storage.local`

## Preparing for Chrome Web Store Submission

### Checklist

- [x] Manifest v3 compliant
- [x] All required icons (16, 32, 48, 128)
- [x] Privacy policy (no data collection)
- [x] Clear description and screenshots
- [ ] Enhanced icons (consider professional design)
- [ ] Screenshot images for store listing
- [ ] Promotional tiles (440x280, 920x680, 1400x560)

### Creating a Production Build

1. **Review and update manifest.json**
   - Ensure version number is correct
   - Update description if needed

2. **Create better icons** (Optional but recommended)
   - Design custom icons matching your brand
   - Use tools like Figma, Adobe Illustrator, or Canva
   - Ensure icons are clear and recognizable at all sizes

3. **Create ZIP package**
   ```bash
   cd random-prompts-chrome-extension
   zip -r random-prompts-extension.zip * -x "*.cjs" "*.svg" "generate-icons.cjs" "create-png-icons.cjs" "preview.html"
   ```

4. **Test the ZIP**
   - Upload to `chrome://extensions/` in Developer Mode
   - Test all functionality
   - Check for console errors

### Chrome Web Store Submission

1. Create a [Chrome Web Store Developer account](https://chrome.google.com/webstore/devconsole/)
2. Pay the one-time $5 registration fee
3. Upload the ZIP file
4. Fill in store listing details:
   - Detailed description
   - Screenshots (1280x800 or 640x400)
   - Promotional images
   - Category: Productivity
   - Privacy policy (can link to main site)
5. Submit for review

## Known Limitations

- Icons are basic placeholders - consider upgrading for production
- No cloud sync of saved prompts (uses local storage only)
- Maximum 5 saved prompts displayed (older ones are stored but hidden)

## Future Enhancements

- [ ] Cloud sync for saved prompts
- [ ] Export saved prompts to various formats (JSON, TXT, Markdown)
- [ ] Custom prompt templates
- [ ] Prompt history with search
- [ ] Categories customization
- [ ] Keyboard shortcuts
- [ ] Dark mode support
- [ ] Multi-language support

## Troubleshooting

### Extension won't load
- Ensure Developer Mode is enabled
- Check that all files are present in the folder
- Look for errors on the extensions page

### Prompts not generating
- Check the browser console for errors (right-click → Inspect)
- Verify popup.js is loading correctly
- Try removing and re-adding the extension

### Icons not showing
- Ensure all PNG files are present in the icons/ folder
- Check that icon paths in manifest.json are correct
- Try regenerating icons with the provided scripts

## License

This extension is part of the Random Prompts Generator project.

## Credits

- Based on [randomprompts.org](https://randomprompts.org)
- Built with Manifest V3 for modern Chrome extensions
- Uses vanilla JavaScript for maximum compatibility

## Support

For issues, questions, or suggestions:
- Visit [randomprompts.org](https://randomprompts.org)
- Open an issue on the main repository
- Check the FAQ on the website

## Changelog

### Version 1.0.0 (Initial Release)
- ✨ Six prompt categories
- 💾 Save and manage prompts
- 📋 One-click copying
- 🎨 Clean, modern UI
- 🔒 Privacy-focused (no data collection)
- ⚡ Instant generation
- 💻 Offline support

---

Made with ❤️ for the creative community
