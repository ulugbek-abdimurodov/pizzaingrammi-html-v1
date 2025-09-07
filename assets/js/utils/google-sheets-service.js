// Google Sheets Service
// Handles all communication with Google Sheets API

import GOOGLE_SHEETS_CONFIG from './google-sheets-config.js';

class GoogleSheetsService {
    constructor() {
        this.config = GOOGLE_SHEETS_CONFIG;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Fetch data from a specific sheet
    async fetchSheetData(sheetName) {
        try {
            // Check cache first
            const cached = this.getCachedData(sheetName);
            if (cached) {
                console.log(`Using cached data for ${sheetName}`);
                return cached;
            }

            // Build the URL
            const url = this.buildSheetUrl(sheetName);
            console.log(`Fetching data from ${sheetName}...`);

            // Fetch data
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Process the data
            const processedData = this.processSheetData(data, sheetName);
            
            // Cache the processed data
            this.cacheData(sheetName, processedData);
            
            return processedData;

        } catch (error) {
            console.error(`Error fetching ${sheetName} data:`, error);
            throw error;
        }
    }

    // Build the Google Sheets API URL
    buildSheetUrl(sheetName) {
        const { SPREADSHEET_ID, API_KEY } = this.config;
        
        if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
            throw new Error('Please update SPREADSHEET_ID in google-sheets-config.js');
        }

        let url = `${this.config.BASE_URL}/${SPREADSHEET_ID}/values/${sheetName}?valueRenderOption=UNFORMATTED_VALUE`;
        
        if (API_KEY && API_KEY !== 'YOUR_GOOGLE_API_KEY_HERE') {
            url += `&key=${API_KEY}`;
        }

        return url;
    }

    // Process raw sheet data into structured format
    processSheetData(data, sheetName) {
        if (!data.values || data.values.length < 2) {
            console.warn(`No data found in ${sheetName} sheet, returning empty array`);
            return [];
        }

        const [headers, ...rows] = data.values;
        
        // Validate headers
        const expectedHeaders = this.config.COLUMNS[sheetName.toUpperCase()];
        if (!this.validateHeaders(headers, expectedHeaders)) {
            throw new Error(`Invalid headers in ${sheetName} sheet. Expected: ${expectedHeaders.join(', ')}`);
        }

        // Filter out empty rows
        const validRows = rows.filter(row => 
            row && row.some(cell => cell !== '' && cell !== null && cell !== undefined)
        );
        
        console.log(`📊 ${sheetName} sheet: ${validRows.length} valid rows found`);

        // Convert rows to objects
        const items = validRows.map((row, index) => {
            const item = {};
            headers.forEach((header, colIndex) => {
                let value = row[colIndex] || '';
                
                // Process special fields
                if (header === 'category' && typeof value === 'string') {
                    value = value.split(',').map(cat => cat.trim());
                } else if (header === 'tags' && typeof value === 'string') {
                    value = value.split(',').map(tag => tag.trim());
                } else if (header === 'id') {
                    value = parseInt(value) || index + 1;
                }
                
                item[header] = value;
            });
            return item;
        });

        return items;
    }

    // Validate that sheet headers match expected format
    validateHeaders(headers, expectedHeaders) {
        if (!Array.isArray(headers) || !Array.isArray(expectedHeaders)) {
            return false;
        }
        
        return expectedHeaders.every(header => 
            headers.includes(header)
        );
    }

    // Cache management
    cacheData(key, data) {
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }

    getCachedData(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }

        return cached.data;
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }

    // Fetch all menu data at once
    async fetchAllMenuData() {
        try {
            const [pizzas, frittatinas, beverages, desserts, appData] = await Promise.all([
                this.fetchSheetData(this.config.SHEETS.PIZZAS),
                this.fetchSheetData(this.config.SHEETS.FRITTATINAS),
                this.fetchSheetData(this.config.SHEETS.BEVERAGES),
                this.fetchSheetData(this.config.SHEETS.DESSERTS),
                this.fetchSheetData(this.config.SHEETS.APP_DATA)
            ]);

            return {
                pizzas,
                frittatinas,
                beverages,
                desserts,
                appData: this.processAppData(appData)
            };
        } catch (error) {
            console.error('Error fetching all menu data:', error);
            throw error;
        }
    }

    // Process app data into structured format
    processAppData(appDataRows) {
        const appData = {};
        console.log('🔍 Processing app data:', appDataRows);

        if (!Array.isArray(appDataRows) || appDataRows.length === 0) {
            console.warn('App data is not an array or empty, returning empty object');
            return appData;
        }

        const looksLikeObjects = typeof appDataRows[0] === 'object' && !Array.isArray(appDataRows[0]);

        if (looksLikeObjects) {
            // Expect shape: [{ key, value, type }, ...]
            const valid = appDataRows.filter(r => r && r.key && r.value && r.type);
            console.log('✅ Valid object rows found:', valid.length);

            valid.forEach((row, index) => {
                const { key, value, type } = row;
                try {
                    if (type === 'array') {
                        appData[key] = String(value).split(',').map(item => item.trim()).filter(Boolean);
                    } else if (type === 'number') {
                        const n = typeof value === 'number' ? value : (parseFloat(value) || parseInt(value));
                        appData[key] = isNaN(n) ? null : n;
                    } else {
                        appData[key] = value;
                    }
                    console.log(`✅ Processed object row ${index}: ${key} = ${value} (${type})`);
                } catch (error) {
                    console.warn(`Error processing object row ${index}:`, error, row);
                }
            });
        } else {
            // Fallback: expect array-of-arrays: [[key,value,type], ...]
            const valid = appDataRows.filter(row => row && Array.isArray(row) && row.length >= 3 && row[0] && row[1] && row[2]);
            console.log('✅ Valid array rows found:', valid.length);

            valid.forEach((row, index) => {
                const [key, value, type] = row;
                try {
                    if (type === 'array') {
                        appData[key] = String(value).split(',').map(item => item.trim()).filter(Boolean);
                    } else if (type === 'number') {
                        const n = typeof value === 'number' ? value : (parseFloat(value) || parseInt(value));
                        appData[key] = isNaN(n) ? null : n;
                    } else {
                        appData[key] = value;
                    }
                    console.log(`✅ Processed array row ${index}: ${key} = ${value} (${type})`);
                } catch (error) {
                    console.warn(`Error processing array row ${index}:`, error, row);
                }
            });
        }

        console.log('🎯 Final app data:', appData);
        return appData;
    }

    // Refresh data (clear cache and fetch fresh)
    async refreshData(sheetName) {
        this.cache.delete(sheetName);
        return await this.fetchSheetData(sheetName);
    }

    // Refresh all data
    async refreshAllData() {
        this.clearCache();
        return await this.fetchAllMenuData();
    }
}

export default GoogleSheetsService;
