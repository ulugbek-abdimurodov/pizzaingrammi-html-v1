# Pizzaingrammi - Pizza Ordering App

A modern, responsive pizza ordering application built with vanilla JavaScript, HTML5, and Tailwind CSS.

## 🏗️ Project Structure

```
pizzaingrammi/
├── index.html          # Main HTML structure
├── css/
│   └── styles.css      # Custom styles and responsive design
├── js/
│   ├── app.js          # Main application logic
│   ├── components.js   # UI component generators
│   ├── data.js         # Data management and pizza menu
│   └── filters.js      # Filter functionality
└── README.md           # Project documentation
```

## ✨ Features

### Core Functionality
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Advanced Filtering**: Filter by category (classica, Specialità, Vegana, senza-glutine, Spicy)
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Interactive UI**: Hover effects, button animations, and visual feedback

### User Experience
- **Keyboard Shortcuts**: 
  - `Ctrl/Cmd + R`: Reset all filters
- **Visual Feedback**: Success notifications and loading states
- **Cart Integration**: Add to cart functionality (ready for backend integration)

### Technical Features
- **Modular Architecture**: Clean separation of concerns
- **Component-Based UI**: Reusable UI components
- **Event-Driven**: Efficient event handling and delegation
- **Performance Optimized**: Smooth animations
- **Accessibility**: Semantic HTML and keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - runs directly in the browser

### Installation
1. Clone or download the project files
2. Ensure all files maintain the directory structure shown above
3. Open `index.html` in your web browser

### Development
The project uses vanilla JavaScript with no build process required. Simply edit the files and refresh your browser.

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- **Mobile**: < 640px
- **Tablet**: 640px - 768px  
- **Desktop**: > 768px

### Mobile Features
- Touch-friendly interface
- Optimized layouts for small screens
- Swipe-friendly navigation
- Collapsible filter options

## 🍕 Pizza Data Structure

Each pizza item includes:
```javascript
{
    id: 1,
    name: "Margherita",
    description: "classica pizza with tomato sauce, mozzarella, and basil.",
    price: "€5.99",
    category: ["classica"],
    tags: ["popular"],
    image: "https://example.com/image.jpg"
}
```

### Categories
- **classica**: Traditional pizza recipes
- **Specialità**: Gourmet and unique combinations
- **Vegana**: Plant-based options
- **senza-glutine**: Celiac-friendly options
- **Spicy**: Heat lovers' choices

## 🔧 Customization

### Adding New Pizzas
Edit `js/data.js` and add items to the `menuItems` array:

```javascript
{
    id: 11,
    name: "Your Pizza",
    description: "Your description here",
    price: "€X.XX",
    category: ["Specialità"], // Array of categories
    tags: ["custom"], // Array of tags
    image: "your-image-url"
}
```

### Styling
- Main styles: `css/styles.css`
- Tailwind classes: Used throughout HTML templates
- Custom animations: Defined in CSS with JavaScript triggers

### Adding New Filters
1. Add filter option to `PizzaData.filterOptions` in `js/data.js`
2. Update pizza items with the new category
3. Add corresponding badge class in CSS if needed

## 🎨 Design System

### Color Palette
- **Primary Background**: `#232010` (Dark brown)
- **Secondary Background**: `#494222` (Medium brown)
- **Accent Color**: `#eec80b` (Golden yellow)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#cbc190` (Light beige)

### Typography
- **Primary Font**: Plus Jakarta Sans
- **Fallback**: Noto Sans, sans-serif
- **Weights**: 400, 500, 700, 800

## 🚀 Performance

- **Lazy Loading**: Images load as needed
- **Debounced Search**: Prevents excessive API calls
- **Efficient Filtering**: Optimized array operations
- **Smooth Animations**: 60fps transitions
- **Minimal Bundle**: No external dependencies except Tailwind CDN

## 🔮 Future Enhancements

### Planned Features
- [ ] Shopping cart persistence
- [ ] User authentication
- [ ] Order tracking
- [ ] Payment integration
- [ ] Favorites system
- [ ] Location-based delivery
- [ ] Multi-language support
- [ ] Dark/light theme toggle

### Technical Improvements
- [ ] Service Worker for offline support
- [ ] Image optimization and lazy loading
- [ ] Bundle optimization for production
- [ ] Unit testing setup
- [ ] E2E testing with Cypress
- [ ] TypeScript conversion
- [ ] PWA capabilities

## 📧 API Integration Ready

The application is structured to easily integrate with a backend API:

- **Menu Items**: Replace `PizzaData.menuItems` with API calls
- **Search**: Backend search endpoint integration
- **Cart**: RESTful cart operations
- **Orders**: Order submission and tracking
- **Authentication**: User login/logout flows

## 🧪 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Pizzaingrammi** - Bringing authentic Italian pizza to your doorstep! 🍕