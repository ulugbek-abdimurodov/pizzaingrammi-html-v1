# 🍕 Pizzaingrammi - Menu App (Google Sheets + Google Photos)

A modern, responsive menu powered by Google Sheets (data) and Google Photos (images), built with a clean, modular architecture.

## 📁 Project Structure

```
pizzaingrammi-html-v1/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── modules/
│   │   │   ├── components.js
│   │   │   ├── filters.js
│   │   │   └── chatbot.js
│   │   ├── utils/
│   │   │   ├── google-sheets-config.js     # Spreadsheet ID, sheet names, column schema
│   │   │   ├── google-sheets-service.js    # Fetch + normalize + cache Google Sheets data
│   │   │   ├── database-manager.js         # Orchestrates current category, filtering, APIs
│   │   │   └── image-normalizer.js         # Auto-sizes Google Photos (lh3) URLs
│   │   └── app.js
│   └── images/
│       ├── pizzas/
│       ├── frittatine/
│       ├── beverages/
│       ├── desserts/
│       └── icons/
├── data/                                   # Optional sample data (not wired as fallback)
│   ├── pizza-db.js
│   ├── frittatina-db.js
│   ├── beverage-db.js
│   ├── dessert-db.js
│   └── data.js
├── index.html
└── readme.md
```

## 🏗️ Architecture Overview

### **Clean Architecture Implementation**

#### **1. Data Layer (`/data/`)**
- **`pizza-db.js`** - Pizza menu items with categories
- **`frittatina-db.js`** - Frittatina menu items
- **`beverage-db.js`** - Beverage menu items  
- **`dessert-db.js`** - Dessert menu items
- **`data.js`** - Core application data (featured items, menu categories)

#### **2. Application Layer (`/assets/js/`)**
- **`modules/`** - Feature-specific modules
  - `components.js` - UI components and rendering
  - `filters.js` - Filter management and category switching
  - `chatbot.js` - AI assistant functionality
- **`utils/`** - Utility functions
  - `google-sheets-config.js` - Spreadsheet config (ID, sheet names, schema)
  - `google-sheets-service.js` - Fetch + normalize + cache Google Sheets data
  - `database-manager.js` - Data orchestration, category, filtering
  - `image-normalizer.js` - Normalizes image URLs, auto-sizes Google Photos links
- **`app.js`** - Main application controller

#### **3. Presentation Layer (`/assets/`)**
- **`css/`** - Stylesheets
- **`images/`** - Image assets (organized by category)

## 🚀 Features

### **Menu Categories**
- 🍕 **Pizze** - Classic and signature pizzas
- 🥤 **Bevande** - Water, soft drinks, and alcoholic beverages
- 🍝 **Frittatine** - Traditional fried pasta dishes
- 🍰 **Dessert** - Italian desserts and gelato

### **Interactive Features**
- **Dynamic Filtering** - Filter items by category and dietary preferences
- **Category Switching** - Seamless navigation between menu categories
- **AI Chatbot** - Intelligent assistant for menu recommendations
- **Responsive Design** - Optimized for all device sizes

### **Professional Features**
- **Clean Architecture** - Separation of concerns with modular design
- **Google Sheets Data** - Live menu data from Sheets, cached in-browser
- **Google Photos Images** - Paste Google Photos image URLs directly into the sheet
- **Performance** - Auto-sized images (lh3) + batched fetching + caching

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Data**: Google Sheets API v4 (public read)
- **Images**: Google Photos CDN (lh3.googleusercontent.com)
- **Architecture**: Clean, modular design

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices
- 💻 Desktop computers
- 🖥️ Tablets

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional design
- **Smooth Animations** - Fade-in effects and transitions
- **Intuitive Navigation** - Easy category switching
- **Visual Hierarchy** - Clear information architecture

## 🔧 Development

### **Local Development (avoid CORS with file://)**
Serve over HTTP (not file://). Any simple server works:

```bash
# Python 3 (recommended)
python3 -m http.server 5173 -b 127.0.0.1

# Or Node (http-server)
npx http-server -p 5173 -a 127.0.0.1
```

Open http://127.0.0.1:5173 in your browser.

If you see CORS errors loading module scripts, you’re likely using file://. Switch to an HTTP server as above.

#### Refresh Sheets Cache
The app caches sheet data for ~5 minutes. To force refresh after editing the sheet:
1) Open DevTools Console
2) Run:
```js
await dbManager.refreshData()
```
3) Reload the page

### **File Organization**
- **Database files** are in `/data/` for easy maintenance
- **JavaScript modules** are organized by functionality
- **CSS** is centralized in `/assets/css/`
- **Images** are categorized in `/assets/images/`

## 📊 Google Sheets Setup

Edit `assets/js/utils/google-sheets-config.js`:
- Set `SPREADSHEET_ID` (from your Sheets URL `/d/<ID>/edit`)
- Optionally set `API_KEY` for higher rate limits
- Sheet tabs must exist and match: `pizzas`, `frittatinas`, `beverages`, `desserts`, `app_data`

Expected columns per tab (first row):
- pizzas/frittatinas/beverages/desserts:
  - `id`, `name`, `description`, `price`, `category`, `tags`, `image`
  - category/tags can be comma-separated (converted to arrays)
- app_data:
  - `key`, `value`, `type` (type: `array` | `number` | `string`)

Example app_data rows:
- menuCategories | Pizze,Bevande,Frittatine,Dessert | array
- featuredItems | 1,2,3 | array

## 🖼️ Images: Google Photos (for non-coders)

In the sheet’s `image` column, paste a direct image URL:
- Open the photo in Google Photos
- Right-click the photo and select “Copy image address”
- The URL must start with `https://lh3.googleusercontent.com/...`

The app auto-sizes Google Photos links for performance.

Notes:
- Do not paste `photos.app.goo.gl/...` (that’s an HTML share page, not an image)
- Use a desktop browser to get “Copy image address”
- Alternatives: Google Drive public link (converted to `uc?id=...`) or host under `assets/images`

## 🎯 Key Benefits

1. **Modular Design** - Easy to maintain and extend
2. **Performance** - Optimized loading and rendering
3. **Scalability** - Easy to add new categories and features
4. **Professional** - Clean, organized codebase
5. **User Experience** - Intuitive and responsive interface

## 🚀 Future Enhancements

- [ ] Add loyalty cart functionality
- [ ] Implement loyalty program with administration
- [ ] Add user authentication
- [ ] Add admin panel for menu management

---

**Built with ❤️ for Pizzaingrammi**

---

## 🔐 Google API Key: Leak remediation and prevention

If a Google API Key was exposed (e.g., detected by GitGuardian), do the following:

1) Rotate the key
- In Google Cloud Console → Credentials, create a new API key.
- Delete the leaked key, or disable it immediately.

2) Restrict the new key
- Application restrictions: HTTP referrers (web sites)
- Add only your production domains (e.g., example.com, *.example.com)
- API restrictions: enable only the “Google Sheets API”.

3) Remove the key from the codebase/history
- Ensure no API key string appears in source files.
- If committed in history, use GitHub’s tools (e.g., GitHub Secret Scanning remediation or BFG Repo-Cleaner) to purge history.

4) Provide the key at runtime (do not commit it)
- Option A (meta tag, set by your hosting):
  ```html
  <!-- Add in <head> only on the deployed site -->
  <meta name="google-api-key" content="YOUR_PRODUCTION_KEY" />
  ```
- Option B (inline runtime config):
  ```html
  <script>
    window.__ENV = { GOOGLE_API_KEY: 'YOUR_PRODUCTION_KEY' };
  </script>
  ```

This project reads the key from `window.__ENV.GOOGLE_API_KEY` or `<meta name="google-api-key">`. If neither is present, it will call the Sheets API without a key (may hit lower rate limits).

5) Verify
- Deploy, load the site, and confirm requests to Sheets include `key=...` and referrer restriction works.