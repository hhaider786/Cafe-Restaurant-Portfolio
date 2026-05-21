export type MenuItem = {
  name: string;
  description: string;
  price: number;
  badges?: ("V" | "GF" | "🌶")[];
};

export type MenuData = {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
  drinks: MenuItem[];
};

export const menuData: MenuData = {
  breakfast: [
    { name: "Truffle Scrambled Eggs", description: "Free-range eggs, black truffle shavings, sourdough soldiers, chive butter", price: 22, badges: ["GF"] },
    { name: "Smoked Salmon Royale", description: "Scottish smoked salmon, soft poached egg, hollandaise, toasted brioche", price: 24 },
    { name: "Lumière Granola Bowl", description: "House-made granola, coconut yoghurt, seasonal berries, raw honey, mint", price: 16, badges: ["V", "GF"] },
    { name: "Avocado & Dukkah Toast", description: "Sourdough, crushed avocado, dukkah, pomegranate, radish, lemon", price: 18, badges: ["V"] },
    { name: "French Omelette", description: "Classic rolled omelette, comté cheese, wild mushrooms, fresh herbs", price: 19, badges: ["GF"] },
    { name: "Acai Power Bowl", description: "Acai blend, banana, granola, chia seeds, coconut flakes, agave", price: 15, badges: ["V", "GF"] },
  ],
  lunch: [
    { name: "Burrata & Heirloom Tomato", description: "Seasonal heirloom tomatoes, fresh burrata, aged balsamic, basil oil, focaccia", price: 22, badges: ["V", "GF"] },
    { name: "Pan-Seared Sea Bass", description: "Wild sea bass, roasted fennel, saffron beurre blanc, samphire, micro herbs", price: 32 },
    { name: "Duck Confit Salad", description: "Slow-cooked duck leg, frisée, pickled cherries, walnut dressing, candied pecans", price: 28 },
    { name: "Wild Mushroom Risotto", description: "Arborio rice, mixed wild mushrooms, parmesan, truffle oil, crispy sage", price: 24, badges: ["V", "GF"] },
    { name: "Wagyu Beef Burger", description: "7oz wagyu patty, aged cheddar, caramelised onion, truffle mayo, brioche bun", price: 29 },
    { name: "Roasted Beetroot Tart", description: "Caramelised beetroot, whipped goat cheese, candied walnuts, rocket, balsamic", price: 21, badges: ["V"] },
  ],
  dinner: [
    { name: "Foie Gras Torchon", description: "Duck foie gras, brioche toast, Sauternes jelly, fig compote, micro greens", price: 38 },
    { name: "Chateaubriand for Two", description: "28-day dry-aged prime tenderloin, béarnaise, bone marrow butter, truffle fries", price: 125 },
    { name: "Lobster Bisque", description: "Rich shellfish bisque, poached lobster tail, cognac cream, chive oil, croutons", price: 36 },
    { name: "Rack of Lamb", description: "French-trimmed rack, pistachio crust, ratatouille provençale, jus, rosemary", price: 58, badges: ["GF"] },
    { name: "Miso Black Cod", description: "Nobu-style miso-glazed black cod, pickled cucumber, edamame purée, sesame", price: 48, badges: ["GF"] },
    { name: "Mushroom Wellington", description: "Wild mushroom & lentil duxelles, puff pastry, roasted root vegetables, red wine jus", price: 38, badges: ["V"] },
  ],
  drinks: [
    { name: "Lumière Signature Cocktail", description: "Hennessy VS, lemon, honey, lavender, egg white, gold dust", price: 22 },
    { name: "Negroni Sbagliato", description: "Campari, sweet vermouth, Prosecco, orange peel", price: 18 },
    { name: "Sommelier's Red", description: "Curated Burgundy Pinot Noir, 2019 vintage — ask for today's selection", price: 24 },
    { name: "Sommelier's White", description: "Sancerre Sauvignon Blanc — crisp, mineral, elegant", price: 22 },
    { name: "Wagyu Old Fashioned", description: "Wagyu fat-washed bourbon, demerara, aromatic bitters, orange zest", price: 24 },
    { name: "Zero-Proof Elderflower", description: "Fever-Tree elderflower tonic, cucumber, mint, lime, rose", price: 12, badges: ["V", "GF"] },
  ],
};
