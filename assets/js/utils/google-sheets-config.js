// Google Sheets Configuration
// Follow these steps to set up Google Sheets as your database:

// STEP 1: Create a Google Spreadsheet
// - Go to https://sheets.google.com
// - Create a new spreadsheet named "Pizzaingrammi Menu Database"
// - Share it with "Anyone with the link can view" (for public access)

// STEP 2: Set up your sheets (tabs)
// Create these 5 sheets in your spreadsheet:
// 1. pizzas
// 2. frittatinas  
// 3. beverages
// 4. desserts
// 5. app_data

// STEP 3: Get your Spreadsheet ID
// From the URL: https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
// Copy the ID between /d/ and /edit

// STEP 4: Update the SPREADSHEET_ID below
const GOOGLE_SHEETS_CONFIG = {
    SPREADSHEET_ID: '1sVGNJE8qM80ioyFWambJqPV5_lNS6xao1fqyZGrWWR0', // Replace with your actual ID
    API_KEY: 'AIzaSyDp2vbJHmqo9qSAnDoUYzp4XRAczFTxYeM', // Optional: for higher rate limits
    
    // Sheet names (must match exactly)
    SHEETS: {
        PIZZAS: 'pizzas',
        FRITTATINAS: 'frittatinas',
        BEVERAGES: 'beverages',
        DESSERTS: 'desserts',
        APP_DATA: 'app_data'
    },
    
    // Base URL for Google Sheets API
    BASE_URL: 'https://sheets.googleapis.com/v4/spreadsheets',
    
    // Column headers for each sheet (must match exactly)
    COLUMNS: {
        PIZZAS: ['id', 'name', 'description', 'price', 'category', 'tags', 'image'],
        FRITTATINAS: ['id', 'name', 'description', 'price', 'category', 'tags', 'image'],
        BEVERAGES: ['id', 'name', 'description', 'price', 'category', 'tags', 'image'],
        DESSERTS: ['id', 'name', 'description', 'price', 'category', 'tags', 'image'],
        APP_DATA: ['key', 'value', 'type']
    }
};

// STEP 5: Data Format Examples
/*
PIZZAS SHEET FORMAT:
| id | name | description | price | category | tags | image |
|----|------|-------------|-------|----------|------|-------|
| 1  | Margherita | Pomodoro San Marzano... | €6.50 | classica,senza-glutine | popular | https://... |

FRITTATINAS SHEET FORMAT:
| id | name | description | price | category | tags | image |
|----|------|-------------|-------|----------|------|-------|
| 1  | Frittatina Classica | Pasta fritta con... | €5.00 | classica | traditional | https://... |

BEVERAGES SHEET FORMAT:
| id | name | description | price | category | tags | image |
|----|------|-------------|-------|----------|------|-------|
| 1  | Coca Cola | Bevanda gassata... | €2.50 | soft-drinks | popular | https://... |

DESSERTS SHEET FORMAT:
| id | name | description | price | category | tags | image |
|----|------|-------------|-------|----------|------|-------|
| 1  | Tiramisu | Dolce tradizionale... | €6.00 | dolci | traditional | https://... |

APP_DATA SHEET FORMAT:
| key | value | type |
|-----|-------|------|
| menuCategories | Pizze,Bevande,Frittatine,Dessert | array |
| featuredItems | 1,2,3 | array |
| filterOptions | classica,senza-glutine,vegetariana | array |
*/

export default GOOGLE_SHEETS_CONFIG;
