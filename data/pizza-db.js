// Pizza Database
const PizzaDatabase = {
    menuItems: [
        {
            id: 1,
            name: "Margherita",
            description: "Pomodoro San Marzano DOP fiordilatte di Agerola, olio Evo Monocultivar Peranzana basilico",
            price: "€6.50",
            category: ["classica", "senza-glutine"],
            tags: ["popular"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYmfVx4LN8rA343zEfsayV1W3o7A1NM5c1gz1T-xIBUc9TzCUM3P9CyNHV6rFCSPcOMyUguuxOe91xD5Ec5gNxW9ytNSeUqdsnjoM1iYbhduVTqIB3zDlMJa4EPo3dRgiR7gVPZP7D2znVYVpWpQ_z2ERkuMyxjAgEjBVuyBLt-7sswBVrGuc3Ld6qGzoIHfgCULimb6xdDBXPEfXdKlcTUrtUj6F8moDKzfcnjXtzSNijuPP3r_Id20eEPTx4NPkZS_R5cUWJ5oYi"
        },
        {
            id: 2,
            name: "Calzone",
            description: "Ricotta di bufala, fordilatte di Agerola. salame Napoli pomodoro San Marzano DOP, olio Evo Monocultivar Peranzana, basilico",
            price: "€10.00",
            category: ["classica", "Vegetariana"],
            tags: ["traditional", "Vegetariana"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SsdZRBl9wrH-3eLTIXGoTX11EVLNCVYntvp8UdVIgcHvQ38AbdX_Yd0p2FEIAP4Lnl8lzuGXMhX4j4bZAJcTyb24MpAx3t7T1E0oGNxTSiw8Ua_oLUdcOG-UVFzrVwGbks3RcaBT0zKda0Chwe7EjdnyrLfJXjoU41StjFt8BntUEIMUQfKe6nO7FlInC75lQYAoo9eQOSQbDIyL11fZR__isKhEqGIZ9NzwmystCOS1Y7d0KqBAXYNc-XqJRtiv6qw0ZXsuI-s_"
        },
        {
            id: 3,
            name: "Regina",
            description: "Pomodoro Sam Arzano DOP. Mozzarella di bufala Campana, olio Evo Monocultivar Peranzana, basilico",
            price: "€10.00",
            category: ["classica", "senza-glutine"],
            tags: ["hot", "senza-glutine"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
        },
        {
            id: 4,
            name: "Capricciosa",
            description: "Pomodoro San Marzano D.O.P. , fior di latte di Agerola, funghi champignon freschi, prosciutto cotto, salame Napoli, carciofini in olio Evo, olive di Gaeta denocciolate a mano*, olio Evo, basilico",
            price: "€11.00",
            category: ["Pizze-d'autore"],
            tags: ["gourmet", "cheese"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
        {
            id: 5,
            name: "Parmigiana",
            description: "Pomodoro San Marzano DOP, provola di Agerola, parmigiana di melanzane, grattugia di parmigiano reggiano 24 mesi DOP, olio Evo \"Monocultivar Peranzana\", basilico",
            price: "€10.00",
            category: ["Pizze-d'autore"],
            tags: ["premium", "senza-glutine"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZyKurSYt4p9lvXYQxfq-feEkyx7SkAdWmokbV46rNgR0OcCPJOCFtYWccZ6ePzmNEqsd0JdyDyB0WPovHf7TQpNh9O7vH7CN45gXrfbLk7NJomEJyx-vrnatvI290dBuaxcaKTIZejiB32HlyhGlGokDgj2vUTtE_YW9mxGCoXBIwu5V3POcAkWitks8CMEAJe1eKYxpU6Otjd2-7C2GuWJL6cFb4CCRhrybn4cepYFWJ-IjQXuN5wC4Duz7KY4r4j6_-0-BDBeD1"
        },
        {
            id: 6,
            name: "Regina dell'Orto",
            description: "Verdure di stagione saltate in padella, fiordilatte di Agerola, olio Evo \"Monocultivar Peranzana\" , basilico",
            price: "€9.00",
            category: ["classica"],
            tags: ["bestseller"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
        },
        {
            id: 7,
            name: "Rusticana",
            description: "Salsiccia di maialino nero di razza Casertana, patate al forno aromatizzate, provola di Agerola, olio Evo, basilico",
            price: "€10.00",
            category: ["Pizze-d'autore"],
            tags: ["healthy"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
        },
        {
            id: 8,
            name: "Marinara Pizzaingrammi",
            description: "Crema ai 3 pomodori,capperi di Salina,olive CAIAZZANE denocciolate a mano*, origano di Sicilia, acciughe del mar Cantabrico, pomodorini semi dry, olio Evo, basilico",
            price: "€11.00",
            category: ["Pizze-d'autore", "senza-glutine"],
            tags: ["healthy"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
        },
        {
            id: 9,
            name: "Nduja",
            description: "Pomodoro giallo del Vesuvio, provola di Agerola, salsiccia a punta di coltello, nduja di Spilinga, olio Evo \"Monocultivar Peranzana\", basilico",
            price: "€10.00",
            category: ["Pizze-d'autore"],
            tags: ["hearty", "protein"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
        },
        {
            id: 10,
            name: "Genovese",
            description: "Cipolle ramate di Montoro, spezzatino di muscolo di scottona, provola di Agerola,spolverata di Parmigiano Reggiano stagionato 18 mesi D.O.P. ,olio Evo,basilico",
            price: "€10.00",
            category: ["Pizze-d'autore", "senza-glutine"],
            tags: ["popular"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
        {
            id: 11,
            name: "New Polpetta",
            description: "Polpettine di manzo al Ragu’ Napoletano, provola di Agerola, ciuffi di ricotta di bufala, pepe cuvèe, olio evo \"Monocultivar Peranzana\", basilico",
            price: "€10.00",
            category: ["Pizze-d'autore"],
            tags: ["popular"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
        {
            id: 12,
            name: "Cacio e Pepe",
            description: "Crema di cacio con pepe cuvè,porchetta di Ariccia,fior di latte di Agerola,cipolle rosse essiccate al mosto cotto d’uva,basilico e olio Evo",
            price: "€12.00",
            category: ["classica", "senza-glutine"],
            tags: ["traditional"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SsdZRBl9wrH-3eLTIXGoTX11EVLNCVYntvp8UdVIgcHvQ38AbdX_Yd0p2FEIAP4Lnl8lzuGXMhX4j4bZAJcTyb24MpAx3t7T1E0oGNxTSiw8Ua_oLUdcOG-UVFzrVwGbks3RcaBT0zKda0Chwe7EjdnyrLfJXjoU41StjFt8BntUEIMUQfKe6nO7FlInC75lQYAoo9eQOSQbDIyL11fZR__isKhEqGIZ9NzwmystCOS1Y7d0KqBAXYNc-XqJRtiv6qw0ZXsuI-s_"
        },
        {
            id: 13,
            name: "Crudo di Parma",
            description: "Fior di latte di Agerola , rucola, prosciutto crudo di Parma, scaglie di parmigiano reggiano 24 mesi, olio Evo",
            price: "€12.00",
            category: ["classica", "senza-glutine"],
            tags: ["hot", "senza-glutine"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
        },
        {
            id: 14,
            name: "Capricciosa",
            description: "Pomodoro San Marzano D.O.P. , fior di latte di Agerola, funghi champignon freschi, prosciutto cotto, salame Napoli, carciofini in olio Evo, olive di Gaeta denocciolate a mano*, olio Evo, basilico",
            price: "€11.00",
            category: ["Pizze-d'autore"],
            tags: ["gourmet", "cheese"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
        {
            id: 15,
            name: "Salsiccia e Friarielli",
            description: "Salsiccia di maiale nero casertano, provola di agerola, friarielli secondo tradizione napoletana",
            price: "€11.00",
            category: ["Pizze-d'autore", "senza-glutine"],
            tags: ["premium", "senza-glutine"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZyKurSYt4p9lvXYQxfq-feEkyx7SkAdWmokbV46rNgR0OcCPJOCFtYWccZ6ePzmNEqsd0JdyDyB0WPovHf7TQpNh9O7vH7CN45gXrfbLk7NJomEJyx-vrnatvI290dBuaxcaKTIZejiB32HlyhGlGokDgj2vUTtE_YW9mxGCoXBIwu5V3POcAkWitks8CMEAJe1eKYxpU6Otjd2-7C2GuWJL6cFb4CCRhrybn4cepYFWJ-IjQXuN5wC4Duz7KY4r4j6_-0-BDBeD1"
        },
        {
            id: 16,
            name: "Pistacchio e Mortadella",
            description: "Crema di pistacchio di Sicilia, fiordilatte di Agerola, mortadella, granella di pistacchio, olio Evo \"Monocultivar Peranzana\" basilico",
            price: "€11.00",
            category: ["classica", "senza-glutine"],
            tags: ["bestseller"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
        },
        {
            id: 17,
            name: "Oro Viola",
            description: "Crema di patate viola, fior di latte di Agerola, prosciutto cotto affumicato, tartufo nero \"Mesentericum Campano\", olio Evo, basilico",
            price: "€15.00",
            category: ["Pizze-d'autore"],
            tags: ["healthy"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
        },
        {
            id: 18,
            name: "Fior di Canapa",
            description: "Pomodorino giallo del Vesuvio spadellato, fiordilatte di Agerola, capocollo di maialino nero di razza Casertana, canapaccio, cipolla croccante, olio Evo \"Monocultivar Peranzana\", basilico",
            price: "€11.00",
            category: ["Pizze-d'autore"],
            tags: ["healthy"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
        },
        {
            id: 19,
            name: "Cannellino Flegreo",
            description: "Pomodorino Cannellino Flegreo, mozzarella di bufala Campana, scaglie di Parmigiano Reggiano 18 mesi dop, gocce di pesto di basilico, olio Evo \"Monocultivar Paranzana\", basilico",
            price: "€10.00",
            category: ["Pizze-d'autore", "senza-glutine"],
            tags: ["hearty", "protein"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
        },
        {
            id: 20,
            name: "Mar Cantabrico",
            description: "Stacciata di bufala affumicata, pomodorini semi dry, acciughe del mar Cantabrico, olive taggiasche, origano di Sicilia, olio Evo \"Monocultivar Peranzana\", basilico",
            price: "€12.00",
            category: ["Pizze-d'autore"],
            tags: ["popular"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
                {
            id: 21,
            name: "Black Angus",
            description: "Focaccia con stracciata di bufala affumicata, rucola selvatica, Black Angus affumicato, lamina di lime , olio Evo \"Monocultivar Peranzana\"",
            price: "€11.00",
            category: ["Pizze-d'autore"],
            tags: ["popular"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
        {
            id: 22,
            name: "I love Tartare",
            description: "Tartare di gambero rosso,stracciata di bufala,bottarga di muggine, basilico cristallizzato",
            price: "€12.00",
            category: ["classica", "senza-glutine"],
            tags: ["traditional"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SsdZRBl9wrH-3eLTIXGoTX11EVLNCVYntvp8UdVIgcHvQ38AbdX_Yd0p2FEIAP4Lnl8lzuGXMhX4j4bZAJcTyb24MpAx3t7T1E0oGNxTSiw8Ua_oLUdcOG-UVFzrVwGbks3RcaBT0zKda0Chwe7EjdnyrLfJXjoU41StjFt8BntUEIMUQfKe6nO7FlInC75lQYAoo9eQOSQbDIyL11fZR__isKhEqGIZ9NzwmystCOS1Y7d0KqBAXYNc-XqJRtiv6qw0ZXsuI-s_"
        },
        {
            id: 33,
            name: "Montanara Rippasata",
            description: "Pizza prima fritta e poi al forno, ragu Napoletano, fior di latte di Agerola, pecorino Romano buccia nera D.O.P, olio Evo e basilico",
            price: "€12.00",
            category: ["classica"],
            tags: ["hot"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
        },
        {
            id: 34,
            name: "Ripieno Fritto",
            description: "Ricotta di bufala, ciccioli Napoletani, provola di Agerola, pepe",
            price: "€11.00",
            category: ["Pizze-d'autore"],
            tags: ["gourmet", "cheese"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
        },
        {
            id: 35,
            name: "La Pizza Cotoletta di gino Sorbillo",
            description: "Impasto impanato, scarola riccia condita, olive di Gaeta denocciolate a mano*, stracciata di bufala affumicata, pancia magra, zeste di lime, olio Evo, basilico",
            price: "€15.00",
            category: ["Pizze-d'autore"],
            tags: ["premium"],
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZyKurSYt4p9lvXYQxfq-feEkyx7SkAdWmokbV46rNgR0OcCPJOCFtYWccZ6ePzmNEqsd0JdyDyB0WPovHf7TQpNh9O7vH7CN45gXrfbLk7NJomEJyx-vrnatvI290dBuaxcaKTIZejiB32HlyhGlGokDgj2vUTtE_YW9mxGCoXBIwu5V3POcAkWitks8CMEAJe1eKYxpU6Otjd2-7C2GuWJL6cFb4CCRhrybn4cepYFWJ-IjQXuN5wC4Duz7KY4r4j6_-0-BDBeD1"
        }
    ],

    filterOptions: [
        { id: 'all', label: 'Tutti', active: true },
        { id: 'classica', label: 'Classica', active: false },
        { id: 'Pizze-d\'autore', label: 'Pizze d\'autore', active: false },
        { id: 'Vegetariana', label: 'Vegetariana', active: false },
        { id: 'senza-glutine', label: 'Senza glutine', active: false }
    ],

    getFilteredItems(activeFilters) {
        let filtered = this.menuItems;

        if (activeFilters.length > 0 && !activeFilters.includes('all')) {
            filtered = filtered.filter(item => 
                activeFilters.some(filter => item.category.includes(filter))
            );
        }

        return filtered;
    },

    getBadgeClass(category) {
        const badgeClasses = {
            'classica': 'badge-classica',
            'Pizze-d\'autore': 'badge-Pizze-dautore', 
            'Vegetariana': 'badge-Vegetariana',
            'senza-glutine': 'badge-senza-glutine'
        };
        return badgeClasses[category] || 'badge-classica';
    }
}; 