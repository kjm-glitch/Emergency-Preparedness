import { InventoryItem } from "@/types/inventory";

export const CATEGORY_EMOJIS: Record<string, string> = {
  "Water & Purification": "💧",
  "Core Staples": "🌾",
  "Proteins": "🥩",
  "Fruits & Vegetables": "🥫",
  "Fats & Cooking": "🫒",
  "Kid-Friendly & Snacks": "🍎",
  "Beverages & Comfort": "☕",
  "Dairy & Supplements": "💊",
  "Hygiene": "🧼",
  "Medical": "🩹",
  "Cleaning & Sanitation": "🧹",
  "Power & Light": "🔦",
  "Warmth & Shelter": "🏠",
  "Tools & Gear": "🔧",
  "Documents & Cash": "📋",
  "Kids' Comfort": "🎨",
  "Mom-Specific": "❤️",
};

export const CATEGORY_COLORS: Record<string, string> = {
  "Water & Purification": "#2b7cb8",
  "Core Staples": "#b8860b",
  "Proteins": "#a0522d",
  "Fruits & Vegetables": "#2e8b57",
  "Fats & Cooking": "#808000",
  "Kid-Friendly & Snacks": "#e06060",
  "Beverages & Comfort": "#8b6914",
  "Dairy & Supplements": "#6a5acd",
  "Hygiene": "#4682b4",
  "Medical": "#c0392b",
  "Cleaning & Sanitation": "#1abc9c",
  "Power & Light": "#f39c12",
  "Warmth & Shelter": "#7f5539",
  "Tools & Gear": "#888888",
  "Documents & Cash": "#34495e",
  "Kids' Comfort": "#e67e22",
  "Mom-Specific": "#c2185b",
};

export const CATEGORY_ORDER = [
  "Water & Purification",
  "Core Staples",
  "Proteins",
  "Fruits & Vegetables",
  "Fats & Cooking",
  "Kid-Friendly & Snacks",
  "Beverages & Comfort",
  "Dairy & Supplements",
  "Hygiene",
  "Medical",
  "Cleaning & Sanitation",
  "Power & Light",
  "Warmth & Shelter",
  "Tools & Gear",
  "Documents & Cash",
  "Kids' Comfort",
  "Mom-Specific",
];

let counter = 0;
function id(): string {
  counter++;
  return `item-${counter}`;
}

export const defaultInventory: InventoryItem[] = [
  // Water & Purification
  { id: id(), name: "Water Cases (40-packs)", category: "Water & Purification", targetQty: 18, onHand: 0, unit: "cases", expirationDate: null, shelfLife: "2+ years", notes: "1 gal/person/day min. 18 cases ≈ 2-week supply for 5" },
  { id: id(), name: "Water Filter (Berkey/LifeStraw)", category: "Water & Purification", targetQty: 1, onHand: 0, unit: "unit", expirationDate: null, shelfLife: "N/A", notes: "Long-term water purification solution" },
  { id: id(), name: "Bleach (unscented, regular)", category: "Water & Purification", targetQty: 3, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "1 year (rotate)", notes: "Water purification: 8 drops/gallon. Also sanitation" },

  // Core Staples
  { id: id(), name: "Rice (50 lb bags)", category: "Core Staples", targetQty: 3, onHand: 0, unit: "bags", expirationDate: null, shelfLife: "25+ years (Mylar)", notes: "Store in Mylar bags w/ O2 absorbers in 5-gal buckets" },
  { id: id(), name: "Dried Beans & Lentils (25 lb)", category: "Core Staples", targetQty: 5, onHand: 0, unit: "bags", expirationDate: null, shelfLife: "25+ years (Mylar)", notes: "Mix: pinto, black, lentils. Complete protein with rice" },
  { id: id(), name: "Oats (large canisters)", category: "Core Staples", targetQty: 5, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "2-3 years", notes: "No-cook option: overnight oats" },
  { id: id(), name: "Flour (25 lb bags)", category: "Core Staples", targetQty: 2, onHand: 0, unit: "bags", expirationDate: null, shelfLife: "1-2 yrs (5+ Mylar)", notes: "Bread, tortillas. Store in sealed buckets" },
  { id: id(), name: "Sugar (25 lb bags)", category: "Core Staples", targetQty: 1, onHand: 0, unit: "bags", expirationDate: null, shelfLife: "Indefinite", notes: "Calories, morale, preserving" },
  { id: id(), name: "Salt (bulk)", category: "Core Staples", targetQty: 2, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "Indefinite", notes: "Seasoning, preserving, electrolytes" },
  { id: id(), name: "Pasta (boxes)", category: "Core Staples", targetQty: 5, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "2-3 years", notes: "Comfort food base" },

  // Proteins
  { id: id(), name: "Canned Chicken (Kirkland multipacks)", category: "Proteins", targetQty: 5, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "3-5 years", notes: "Ready-to-eat protein" },
  { id: id(), name: "Canned Tuna (Kirkland multipacks)", category: "Proteins", targetQty: 5, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "3-5 years", notes: "Ready-to-eat protein" },
  { id: id(), name: "Peanut Butter (large jars)", category: "Proteins", targetQty: 10, onHand: 0, unit: "jars", expirationDate: null, shelfLife: "1-2 years", notes: "Calorie-dense, no cook, kid-approved" },
  { id: id(), name: "Canned Salmon", category: "Proteins", targetQty: 5, onHand: 0, unit: "cans", expirationDate: null, shelfLife: "3-5 years", notes: "Omega-3s, good for Mom's heart health" },
  { id: id(), name: "Spam / Canned Ham", category: "Proteins", targetQty: 8, onHand: 0, unit: "cans", expirationDate: null, shelfLife: "3-5 years", notes: "High calorie, versatile" },
  { id: id(), name: "Beef Jerky / Sticks (large bags)", category: "Proteins", targetQty: 5, onHand: 0, unit: "bags", expirationDate: null, shelfLife: "1-2 years", notes: "Kid-friendly, grab-and-go protein" },

  // Fruits & Vegetables
  { id: id(), name: "Canned Vegetables (cases)", category: "Fruits & Vegetables", targetQty: 4, onHand: 0, unit: "cases", expirationDate: null, shelfLife: "3-5 years", notes: "Green beans, corn, peas, tomatoes" },
  { id: id(), name: "Canned Fruit (cases)", category: "Fruits & Vegetables", targetQty: 3, onHand: 0, unit: "cases", expirationDate: null, shelfLife: "3-5 years", notes: "Peaches, pears, mandarins — morale boosters" },
  { id: id(), name: "Freeze-Dried Fruit (Kirkland)", category: "Fruits & Vegetables", targetQty: 8, onHand: 0, unit: "bags", expirationDate: null, shelfLife: "25+ years", notes: "Long shelf life, great snacking" },
  { id: id(), name: "Tomato Sauce / Paste (large cans)", category: "Fruits & Vegetables", targetQty: 10, onHand: 0, unit: "cans", expirationDate: null, shelfLife: "2-3 years", notes: "Base for countless meals" },
  { id: id(), name: "Jarred Pasta Sauce", category: "Fruits & Vegetables", targetQty: 8, onHand: 0, unit: "jars", expirationDate: null, shelfLife: "1-2 years", notes: "Comfort meals with pasta" },
  { id: id(), name: "Dried Fruit (craisins, mango, mixed)", category: "Fruits & Vegetables", targetQty: 5, onHand: 0, unit: "bags", expirationDate: null, shelfLife: "1-2 years", notes: "Feels like candy, actually nutritious" },

  // Fats & Cooking
  { id: id(), name: "Olive Oil (large bottles)", category: "Fats & Cooking", targetQty: 3, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "1-2 years", notes: "Rotate — oil doesn't last forever" },
  { id: id(), name: "Vegetable Oil (large bottles)", category: "Fats & Cooking", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "1-2 years", notes: "Cooking fat + calorie density" },
  { id: id(), name: "Coconut Oil", category: "Fats & Cooking", targetQty: 2, onHand: 0, unit: "jars", expirationDate: null, shelfLife: "2+ years", notes: "Long shelf life, versatile" },

  // Kid-Friendly & Snacks
  { id: id(), name: "Applesauce Pouches (24-packs)", category: "Kid-Friendly & Snacks", targetQty: 5, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "1-2 years", notes: "No utensils needed. Good for Mom if appetite low" },
  { id: id(), name: "Fruit Snacks (80-count boxes)", category: "Kid-Friendly & Snacks", targetQty: 4, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "1 year", notes: "Pure morale fuel for kids" },
  { id: id(), name: "Goldfish / Cheddar Crackers", category: "Kid-Friendly & Snacks", targetQty: 4, onHand: 0, unit: "cartons", expirationDate: null, shelfLife: "6-9 months", notes: "Comfort snack, familiar" },
  { id: id(), name: "Granola / Protein Bars (boxes)", category: "Kid-Friendly & Snacks", targetQty: 5, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "6-12 months", notes: "Portable meals when cooking isn't possible" },
  { id: id(), name: "GoGo squeeZ Veggie Pouches", category: "Kid-Friendly & Snacks", targetQty: 3, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "1 year", notes: "Sneaky veggie nutrition for kids" },
  { id: id(), name: "Pretzels / Animal Crackers", category: "Kid-Friendly & Snacks", targetQty: 4, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "6-12 months", notes: "Bland for upset stomachs, comforting" },
  { id: id(), name: "Variety Chip Bags (boxes)", category: "Kid-Friendly & Snacks", targetQty: 3, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "3-6 months", notes: "Short shelf life — rotate! Huge morale value" },
  { id: id(), name: "Trail Mix / Nuts (large containers)", category: "Kid-Friendly & Snacks", targetQty: 6, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "6-12 months", notes: "Calorie-dense snacking" },
  { id: id(), name: "Kirkland Mac & Cheese", category: "Kid-Friendly & Snacks", targetQty: 4, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "1-2 years", notes: "Ultimate comfort food" },

  // Beverages & Comfort
  { id: id(), name: "Honey (large bottles)", category: "Beverages & Comfort", targetQty: 4, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "Indefinite", notes: "Never expires. Sweetener + medicinal" },
  { id: id(), name: "Coffee", category: "Beverages & Comfort", targetQty: 4, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "1-2 years", notes: "Caffeine withdrawal in a crisis is miserable" },
  { id: id(), name: "Tea (variety)", category: "Beverages & Comfort", targetQty: 3, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "2+ years", notes: "Comfort, warmth, hydration" },
  { id: id(), name: "Hot Cocoa Mix", category: "Beverages & Comfort", targetQty: 3, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "1-2 years", notes: "Huge morale for kids and adults" },
  { id: id(), name: "Juice Boxes (cases)", category: "Beverages & Comfort", targetQty: 4, onHand: 0, unit: "cases", expirationDate: null, shelfLife: "6-12 months", notes: "Hydration kids will drink. Quick sugar if shaky" },

  // Dairy & Supplements
  { id: id(), name: "Powdered Milk (large cans)", category: "Dairy & Supplements", targetQty: 4, onHand: 0, unit: "cans", expirationDate: null, shelfLife: "2-10 years", notes: "Calcium for daughters + Mom. Cooking versatility" },
  { id: id(), name: "Shelf-Stable UHT Milk (cases)", category: "Dairy & Supplements", targetQty: 2, onHand: 0, unit: "cases", expirationDate: null, shelfLife: "6-12 months", notes: "Good transitional supply" },
  { id: id(), name: "Ensure / Meal Replacement Shakes", category: "Dairy & Supplements", targetQty: 4, onHand: 0, unit: "cases", expirationDate: null, shelfLife: "1 year", notes: "Critical for Mom if unwell or not eating" },
  { id: id(), name: "Adult Multivitamins", category: "Dairy & Supplements", targetQty: 3, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2 years", notes: "Fill nutritional gaps" },
  { id: id(), name: "Children's Multivitamins", category: "Dairy & Supplements", targetQty: 3, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2 years", notes: "If daughters are young" },
  { id: id(), name: "Vitamin C", category: "Dairy & Supplements", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2 years", notes: "Immune support" },
  { id: id(), name: "Calcium + Vitamin D", category: "Dairy & Supplements", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2 years", notes: "Especially for Mom" },

  // Hygiene
  { id: id(), name: "Toilet Paper (Kirkland 30-roll)", category: "Hygiene", targetQty: 4, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "Indefinite", notes: "All-female household = stock heavy" },
  { id: id(), name: "Feminine Pads (large boxes)", category: "Hygiene", targetQty: 4, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "Indefinite", notes: "Depending on daughters' ages" },
  { id: id(), name: "Tampons (large boxes)", category: "Hygiene", targetQty: 4, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "Indefinite", notes: "Stock both pads and tampons" },
  { id: id(), name: "Body Wipes / Baby Wipes", category: "Hygiene", targetQty: 6, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "2+ years", notes: "Your shower when water is limited" },
  { id: id(), name: "Toothpaste (multipacks)", category: "Hygiene", targetQty: 3, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "2 years", notes: "Dental infections without a dentist = dangerous" },
  { id: id(), name: "Toothbrushes (multipacks)", category: "Hygiene", targetQty: 3, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "Indefinite", notes: "" },
  { id: id(), name: "Bar Soap (Dr. Bronner's/bulk)", category: "Hygiene", targetQty: 8, onHand: 0, unit: "bars", expirationDate: null, shelfLife: "3+ years", notes: "Body, hands, even laundry" },
  { id: id(), name: "Shampoo & Conditioner", category: "Hygiene", targetQty: 3, onHand: 0, unit: "bottles ea", expirationDate: null, shelfLife: "2-3 years", notes: "Hair care = lice prevention + morale" },
  { id: id(), name: "Deodorant (multipacks)", category: "Hygiene", targetQty: 2, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "2+ years", notes: "Comfort and dignity" },
  { id: id(), name: "Hand Sanitizer (pump bottles)", category: "Hygiene", targetQty: 4, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2-3 years", notes: "When handwashing isn't easy" },

  // Medical
  { id: id(), name: "Comprehensive First Aid Kit", category: "Medical", targetQty: 2, onHand: 0, unit: "kits", expirationDate: null, shelfLife: "Check contents", notes: "Supplement with extra supplies below" },
  { id: id(), name: "Ibuprofen (Costco size)", category: "Medical", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2-3 years", notes: "Adult + children's if needed" },
  { id: id(), name: "Acetaminophen (Costco size)", category: "Medical", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2-3 years", notes: "Adult + children's liquid" },
  { id: id(), name: "Benadryl / Antihistamines", category: "Medical", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2 years", notes: "Allergic reactions, sleep aid. Adult + children's" },
  { id: id(), name: "Imodium (Anti-Diarrheal)", category: "Medical", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2 years", notes: "Dehydration from GI issues is real danger" },
  { id: id(), name: "Electrolyte Packets (Liquid IV etc)", category: "Medical", targetQty: 4, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "1-2 years", notes: "Critical for illness, heat, dehydration. All ages" },
  { id: id(), name: "Pepto-Bismol", category: "Medical", targetQty: 2, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "2 years", notes: "Diet changes = stomach upset guaranteed" },
  { id: id(), name: "Hydrocortisone Cream", category: "Medical", targetQty: 4, onHand: 0, unit: "tubes", expirationDate: null, shelfLife: "2 years", notes: "Bug bites, rashes, skin irritation" },
  { id: id(), name: "Neosporin / Antibiotic Ointment", category: "Medical", targetQty: 4, onHand: 0, unit: "tubes", expirationDate: null, shelfLife: "2-3 years", notes: "Infection prevention" },
  { id: id(), name: "Bandages & Gauze (assorted)", category: "Medical", targetQty: 3, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "Indefinite", notes: "Band-Aids, gauze rolls, medical tape, ACE wraps" },
  { id: id(), name: "Prescription Meds (90-day supply)", category: "Medical", targetQty: 1, onHand: 0, unit: "supply", expirationDate: null, shelfLife: "Varies", notes: "CRITICAL for Mom. Talk to doctors about buffer" },
  { id: id(), name: "Thermometer", category: "Medical", targetQty: 2, onHand: 0, unit: "units", expirationDate: null, shelfLife: "N/A", notes: "One can break" },

  // Cleaning & Sanitation
  { id: id(), name: "Heavy-Duty Trash Bags", category: "Cleaning & Sanitation", targetQty: 4, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "Indefinite", notes: "Waste management, rain protection, 100 uses" },
  { id: id(), name: "Ziploc Bags (gallon + quart)", category: "Cleaning & Sanitation", targetQty: 4, onHand: 0, unit: "boxes ea", expirationDate: null, shelfLife: "Indefinite", notes: "Food, waterproofing docs, organizing meds" },
  { id: id(), name: "Dish Soap", category: "Cleaning & Sanitation", targetQty: 3, onHand: 0, unit: "bottles", expirationDate: null, shelfLife: "Indefinite", notes: "" },
  { id: id(), name: "Laundry Detergent", category: "Cleaning & Sanitation", targetQty: 2, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "Indefinite", notes: "Bucket + plunger = manual washer" },
  { id: id(), name: "Disinfectant Wipes / Spray", category: "Cleaning & Sanitation", targetQty: 4, onHand: 0, unit: "containers", expirationDate: null, shelfLife: "1-2 years", notes: "Surface sanitation" },
  { id: id(), name: "Paper Towels", category: "Cleaning & Sanitation", targetQty: 3, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "Indefinite", notes: "" },
  { id: id(), name: "Aluminum Foil (heavy duty)", category: "Cleaning & Sanitation", targetQty: 4, onHand: 0, unit: "rolls", expirationDate: null, shelfLife: "Indefinite", notes: "Cooking, wrapping, signaling — dozen uses" },

  // Power & Light
  { id: id(), name: "Batteries AA (Kirkland bulk)", category: "Power & Light", targetQty: 4, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "10 years", notes: "Inventory your devices first" },
  { id: id(), name: "Batteries AAA (Kirkland bulk)", category: "Power & Light", targetQty: 3, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "10 years", notes: "" },
  { id: id(), name: "Flashlights", category: "Power & Light", targetQty: 7, onHand: 0, unit: "units", expirationDate: null, shelfLife: "N/A", notes: "1 per person + 2 extras" },
  { id: id(), name: "Headlamps", category: "Power & Light", targetQty: 3, onHand: 0, unit: "units", expirationDate: null, shelfLife: "N/A", notes: "Hands-free light is a game-changer" },
  { id: id(), name: "Emergency Candles (long-burn)", category: "Power & Light", targetQty: 3, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "Indefinite", notes: "Backup light, warmth, comfort" },
  { id: id(), name: "Lighters + Waterproof Matches", category: "Power & Light", targetQty: 5, onHand: 0, unit: "lighters+2 boxes", expirationDate: null, shelfLife: "5+ years", notes: "" },
  { id: id(), name: "Portable Power Banks", category: "Power & Light", targetQty: 3, onHand: 0, unit: "units", expirationDate: null, shelfLife: "N/A", notes: "Keep one phone alive for emergency info" },
  { id: id(), name: "Hand-Crank / Battery Radio", category: "Power & Light", targetQty: 1, onHand: 0, unit: "unit", expirationDate: null, shelfLife: "N/A", notes: "NOAA emergency broadcasts when cell goes down" },

  // Warmth & Shelter
  { id: id(), name: "Sleeping Bags or Heavy Blankets", category: "Warmth & Shelter", targetQty: 5, onHand: 0, unit: "units", expirationDate: null, shelfLife: "Indefinite", notes: "1 per person. Utah winters are brutal w/o heat" },
  { id: id(), name: "Emergency Mylar Blankets", category: "Warmth & Shelter", targetQty: 2, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "Indefinite", notes: "Lightweight, huge heat retention" },
  { id: id(), name: "Duct Tape", category: "Warmth & Shelter", targetQty: 4, onHand: 0, unit: "rolls", expirationDate: null, shelfLife: "Indefinite", notes: "Sealing, repairs, splinting — 1000 uses" },
  { id: id(), name: "Plastic Sheeting (thick mil)", category: "Warmth & Shelter", targetQty: 3, onHand: 0, unit: "rolls", expirationDate: null, shelfLife: "Indefinite", notes: "Window sealing for shelter-in-place (fallout)" },
  { id: id(), name: "Tarps (large)", category: "Warmth & Shelter", targetQty: 2, onHand: 0, unit: "tarps", expirationDate: null, shelfLife: "Indefinite", notes: "Shelter, ground cover, rain collection" },
  { id: id(), name: "N95 Masks", category: "Warmth & Shelter", targetQty: 2, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "5 years", notes: "Dust, smoke, airborne concerns" },

  // Tools & Gear
  { id: id(), name: "Manual Can Openers", category: "Tools & Gear", targetQty: 3, onHand: 0, unit: "units", expirationDate: null, shelfLife: "N/A", notes: "The most important tool you'll own" },
  { id: id(), name: "Work Gloves", category: "Tools & Gear", targetQty: 3, onHand: 0, unit: "pairs", expirationDate: null, shelfLife: "N/A", notes: "Debris, cleanup, firewood" },
  { id: id(), name: "Whistles", category: "Tools & Gear", targetQty: 5, onHand: 0, unit: "units", expirationDate: null, shelfLife: "N/A", notes: "1 per person — signaling if separated" },
  { id: id(), name: "Propane + Portable Camp Stove", category: "Tools & Gear", targetQty: 1, onHand: 0, unit: "setup", expirationDate: null, shelfLife: "N/A", notes: "Cooking when power is out" },
  { id: id(), name: "Paper Plates & Plastic Utensils", category: "Tools & Gear", targetQty: 3, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "Indefinite", notes: "Conserve water — no dishwashing" },
  { id: id(), name: "Notebook + Pens", category: "Tools & Gear", targetQty: 3, onHand: 0, unit: "sets", expirationDate: null, shelfLife: "Indefinite", notes: "Communication, lists, journaling, kids' activities" },

  // Documents & Cash
  { id: id(), name: "Cash in Small Bills", category: "Documents & Cash", targetQty: 1, onHand: 0, unit: "supply ($500-1000)", expirationDate: null, shelfLife: "N/A", notes: "ATMs don't work w/o power. Small bills only" },
  { id: id(), name: "Document Copies (waterproof bag)", category: "Documents & Cash", targetQty: 2, onHand: 0, unit: "sets", expirationDate: null, shelfLife: "N/A", notes: "Birth certs, IDs, insurance, meds. 1 home + 1 go-bag" },

  // Kids' Comfort
  { id: id(), name: "Coloring Books, Crayons, Card Games", category: "Kids' Comfort", targetQty: 3, onHand: 0, unit: "activity kits", expirationDate: null, shelfLife: "N/A", notes: "Boredom without screens hits hard" },
  { id: id(), name: "Glow Sticks (bulk)", category: "Kids' Comfort", targetQty: 2, onHand: 0, unit: "packs", expirationDate: null, shelfLife: "1-2 years", notes: "Nightlights + making a bad situation fun" },
  { id: id(), name: "Physical Books", category: "Kids' Comfort", targetQty: 10, onHand: 0, unit: "books", expirationDate: null, shelfLife: "N/A", notes: "Entertainment needing zero power" },

  // Mom-Specific
  { id: id(), name: "Backup Reading Glasses", category: "Mom-Specific", targetQty: 2, onHand: 0, unit: "pairs", expirationDate: null, shelfLife: "N/A", notes: "For Mom (and you if needed)" },
  { id: id(), name: "Non-Slip Socks/Shoes", category: "Mom-Specific", targetQty: 2, onHand: 0, unit: "pairs", expirationDate: null, shelfLife: "N/A", notes: "Fall prevention in dark/unfamiliar surfaces" },
  { id: id(), name: "Hand Warmers (bulk)", category: "Mom-Specific", targetQty: 2, onHand: 0, unit: "boxes", expirationDate: null, shelfLife: "3-5 years", notes: "Older adults lose body heat faster" },
];
