// Data Management Module
const PizzaData = {
    // Pizza menu items with categories and attributes
    menuItems: [
        {
            id: 1,
            name: "Margherita",
            description: "Classic pizza with tomato sauce, mozzarella, and basil.",
            price: "€5.99",
            category: ["classic"],
            tags: ["popular"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYmfVx4LN8rA343zEfsayV1W3o7A1NM5c1gz1T-xIBUc9TzCUM3P9CyNHV6rFCSPcOMyUguuxOe91xD5Ec5gNxW9ytNSeUqdsnjoM1iYbhduVTqIB3zDlMJa4EPo3dRgiR7gVPZP7D2znVYVpWpQ_z2ERkuMyxjAgEjBVuyBLt-7sswBVrGuc3Ld6qGzoIHfgCULimb6xdDBXPEfXdKlcTUrtUj6F8moDKzfcnjXtzSNijuPP3r_Id20eEPTx4NPkZS_R5cUWJ5oYi"
        },
        {
            id: 2,
            name: "Marinara",
            description: "Traditional pizza with tomato sauce, garlic, and oregano.",
            price: "€4.99",
            category: ["classic", "vegan"],
            tags: ["traditional", "vegan"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SsdZRBl9wrH-3eLTIXGoTX11EVLNCVYntvp8UdVIgcHvQ38AbdX_Yd0p2FEIAP4Lnl8lzuGXMhX4j4bZAJcTyb24MpAx3t7T1E0oGNxTSiw8Ua_oLUdcOG-UVFzrVwGbks3RcaBT0zKda0Chwe7EjdnyrLfJXjoU41StjFt8BntUEIMUQfKe6nO7FlInC75lQYAoo9eQOSQbDIyL11fZR__isKhEqGIZ9NzwmystCOS1Y7d0KqBAXYNc-XqJRtiv6qw0ZXsuI-s_"
        },
        {
            id: 3,
            name: "Diavola",
            description: "Spicy pizza with tomato sauce, mozzarella, and spicy salami.",
            price: "€8.99",
            category: ["classic", "spicy"],
            tags: ["hot", "spicy"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
        },
        {
            id: 4,
            name: "Quattro Formaggi",
            description: "Four cheese blend: mozzarella, gorgonzola, parmesan, provolone.",
            price: "€12.99",
            category: ["specialty"],
            tags: ["gourmet", "cheese"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
        {
            id: 5,
            name: "Truffle Mushroom",
            description: "Gourmet pizza with truffle oil, mixed mushrooms, and mozzarella.",
            price: "€15.99",
            category: ["specialty", "gluten-free"],
            tags: ["premium", "gluten-free"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZyKurSYt4p9lvXYQxfq-feEkyx7SkAdWmokbV46rNgR0OcCPJOCFtYWccZ6ePzmNEqsd0JdyDyB0WPovHf7TQpNh9O7vH7CN45gXrfbLk7NJomEJyx-vrnatvI290dBuaxcaKTIZejiB32HlyhGlGokDgj2vUTtE_YW9mxGCoXBIwu5V3POcAkWitks8CMEAJe1eKYxpU6Otjd2-7C2GuWJL6cFb4CCRhrybn4cepYFWJ-IjQXuN5wC4Duz7KY4r4j6_-0-BDBeD1"
        },
        {
            id: 6,
            name: "Pepperoni Supreme",
            description: "Loaded with pepperoni, bell peppers, and extra cheese.",
            price: "€10.99",
            category: ["classic", "spicy"],
            tags: ["bestseller", "spicy"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
        },
        {
            id: 7,
            name: "Vegan Delight",
            description: "Plant-based pizza with vegan cheese, tomatoes, and vegetables.",
            price: "€9.99",
            category: ["specialty", "vegan", "gluten-free"],
            tags: ["healthy", "vegan", "gluten-free"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
        },
        {
            id: 8,
            name: "Hawaiian Paradise",
            description: "Tropical pizza with ham, pineapple, and mozzarella.",
            price: "€11.99",
            category: ["specialty"],
            tags: ["tropical", "sweet"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
        },
        {
            id: 9,
            name: "Meat Lovers",
            description: "Hearty pizza with pepperoni, sausage, ham, and bacon.",
            price: "€14.99",
            category: ["specialty"],
            tags: ["hearty", "protein"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
        },
        {
            id: 10,
            name: "Buffalo Chicken",
            description: "Spicy buffalo chicken with ranch sauce and red onions.",
            price: "€13.99",
            category: ["specialty", "spicy"],
            tags: ["chicken", "spicy", "american"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        }
    ],

    // Featured items data
    featuredItems: [
        {
            id: "featured-1",
            title: "Pizza of the Day",
            description: "Enjoy our daily special pizza at a discounted price.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGAPbZ39PyoD98IvOeqBztNFFsrCAQp_v8g7r5GKHO7czaNnMbHnfE-QXkiuqhbY5Xbi96Fl3nsls_xpSI9EFAU-XWbkjpKcW3kEKS-096wt3R4I707ogCK4qSozPk_gJw45dOE-NpiS0d3RJwrW6sMcnQcNq_a6erOy_eqRYrkQJ8sfkUt_ezJNVSlKQ-o5Md17iOCnNEr6e_uNRT6jwgyHyUHEm4LazDMlBj4xCBQChCIDCt1ipfc_2T4aQgEyIBq7aVJX0df3mp"
        },
        {
            id: "featured-2",
            title: "Special Offer",
            description: "Get a free side with any large pizza order.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuABH9_S7PmJXjaWdJ4htCBbktBtfAaI69Ed9CMiUEzFB6XhO0VdDrswoHubX5Twsr67IoFlmu6vVgx_RalaJYTwWQybOR1uhODTlFo3VLVICoUBxpToc_ebSatx2jcQoqr_5HAzMpFb2wPL9xmnUewK2ell2TcPpu91193Bd8OjINdYwm7yr4OIOJvEvQ4cXhqKFKw2ysv9z1hX4MnQ4gpch4cUUbDLIjU6y4Dpfs7CBQE3AYwIxGp64Szudgz1yXHvgdLR2QlSWvDw"
        },
        {
            id: "featured-3",
            title: "New on the Menu",
            description: "Try our latest pizza creation with unique toppings.",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9_xQ0vt3-p_kZ1ketd2HeFUaq1xJBUEyJCO-IjYJx-3m-nZQYI81L1HK17o2XVLbPpd7tsUmAPxJluud5g97j-FOHYAqzz5GGReZuc8ohPDo7E6E4njr641s-5V-eGNG6VfKisPNKPh7_0FEews0ydEDG2GuqTBahYHAHgMNk6uxFFEztA7RLLhdZa8diAjpU3yS2RlvV1OSm2kZxYiMSbSfxYd5TVjluYKCkZ9QxlmLrVPiZvvLjArRvvvrX3nfcN9CBWf9Rmdrn"
        }
    ],

    // Filter options
    filterOptions: [
        { id: 'all', label: 'All', active: true },
        { id: 'classic', label: 'Classic', active: false },
        { id: 'specialty', label: 'Specialty', active: false },
        { id: 'vegan', label: 'Vegan', active: false },
        { id: 'gluten-free', label: 'Gluten-free', active: false },
        { id: 'spicy', label: 'Spicy', active: false }
    ],

    // Menu categories
    menuCategories: [
        {
            id: 'pizzas',
            label: 'Pizzas',
            active: true,
            icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOzBxYAGjiUL--dz4GaCvPMEu6zlB_TOHf46sq-Wp5AeANX8kqrbVBclxR6OSH_mj2Pkj5WYhw9dKXW58pl6EaK93FO22325wUYSP93IseaGlAOxllyLBCUzwxK7rMygrM83aZhCAksWFqkZXXB1T9xxg0_yi7oClS6QGv3hYgY_Qogkp7dDJMNRFiljkF8WbewlagJTjWkMjmR5HBhBHhxFV_ToxuY3aL0wgGxCVBm71XDPCHk_QAT5GpZPfUjbUGHHsHmTeYyOnM'
        },
        {
            id: 'beverages',
            label: 'Beverages',
            active: false,
            icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGk6RVGFR4_qZrKEJbNjHYC6FxXq9bXEz7Jue21Ajo9g0J93qmrmY0GIKRlpXBcP4GEk3dM5a_pgnvarHYx5TEcFRd-Nu54lgGKvBK4aluSvht8f3FCK2jzsykaJejrwAyWDr70Sf_hCsjGGmrlmlrn1uyGGyy03SFlSEx3KJHsprqYw7a87DGuS7fwmuSYNFEb9Z45e8Flc5y3yIIe5fY9iJT0wBjvidtiyPGa4jMYz7aHsnt_QVhQq_nQO-kM9GCvYdnD_7J124l'
        },
        {
            id: 'frittatinas',
            label: 'Frittatinas',
            active: false,
            icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0BhfUAfjRZcmysDs33FaYEYacvbXAUSxQyS-Op1450aBA89CWFihuXH8iuCeFmnVcgD0KoaQp1_EXVBFUa1EY41OhinsmhCA8YTMUcRS2maidPVVAX8VwoSwW1llzxVifpJL0qtT1nSUgXXLQukTmwP9cdNZDTTwHb7WQX6SqhV6bR2Es7rPKtlXP8XjinpPitSW5c71WapRyKG7LauoECP5FDuC_1vjMuem61oreguVJFsTQ7BGsIg8O6DwutkL2TKQqsB6cOj4S'
        },
        {
            id: 'desserts',
            label: 'Desserts',
            active: false,
            icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChHQ8n-yoTAG8RHisLQrXHLpUKk8PdyCCyRZJ6EXpupFmEkTdpHhGjdmvZTU3NNXm4VXwbyp9JGHWQA1542ml_0o9e1SY_qtuE_K_iEPqYx8Y1uOK139m1_RBBmRChhPS0c9Z-LgFRqXOjG08E9n9-IUr1QiGtxqBD8L_Eh8VXKlpcJ6hBEe3OsRICOjpjnh5jjcwAaVZCl21uzwm00oIXtiF-MQVuLD2RxSK3e0Rdqw4jOUVI4JvEqBxdbMyu9kZ6Ox2XKXoFCAAN'
        }
    ],

    // Helper methods
    getFilteredItems(activeFilters) {
        let filtered = this.menuItems;

        // Apply category filters
        if (activeFilters.length > 0 && !activeFilters.includes('all')) {
            filtered = filtered.filter(item => 
                activeFilters.some(filter => item.category.includes(filter))
            );
        }

        return filtered;
    },

    getBadgeClass(category) {
        const badgeClasses = {
            'classic': 'badge-classic',
            'specialty': 'badge-specialty', 
            'vegan': 'badge-vegan',
            'gluten-free': 'badge-gluten-free',
            'spicy': 'badge-spicy'
        };
        return badgeClasses[category] || 'badge-classic';
    }
};