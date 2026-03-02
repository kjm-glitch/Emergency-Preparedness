// Soft warm palette based on #F6E8DF, #FEAE96, #FE979C, #013237
export const theme = {
  // Backgrounds
  pageBg: "#F6E8DF",
  cardBg: "#FFFFFF",
  cardBgHover: "#FFF8F4",
  headerBg: "#013237",
  inputBg: "#FFF8F4",

  // Accents
  peach: "#FEAE96",
  peachLight: "#FEAE9633",
  peachMuted: "#FEAE9622",
  pink: "#FE979C",
  pinkLight: "#FE979C33",
  pinkMuted: "#FE979C22",
  teal: "#013237",
  tealLight: "#01323711",

  // Text
  textPrimary: "#013237",
  textSecondary: "#5A6B6E",
  textMuted: "#9AACAF",
  textOnDark: "#F6E8DF",
  textOnDarkMuted: "#9AACAF",

  // Borders
  border: "#E8D5CA",
  borderLight: "#F0E0D6",

  // Status
  success: "#6DBB9E",
  successLight: "#6DBB9E22",
  warning: "#FEAE96",
  warningLight: "#FEAE9622",
  danger: "#FE979C",
  dangerLight: "#FE979C22",

  // Progress bar scale (soft gradient)
  progressLow: "#FE979C",
  progressMid: "#FEAE96",
  progressHigh: "#6DBB9E",
  progressFull: "#5AAD8C",
  progressEmpty: "#E8D5CA",
} as const;

export const categoryColors: Record<string, string> = {
  "Water & Purification": "#5BA4CF",
  "Core Staples": "#C4956A",
  "Proteins": "#B87D6B",
  "Fruits & Vegetables": "#6DBB9E",
  "Fats & Cooking": "#C4A84D",
  "Kid-Friendly & Snacks": "#FE979C",
  "Beverages & Comfort": "#B8906A",
  "Dairy & Supplements": "#9B8EC4",
  "Hygiene": "#7BADC4",
  "Medical": "#E08080",
  "Cleaning & Sanitation": "#6BB8A8",
  "Power & Light": "#E8B44C",
  "Warmth & Shelter": "#A07860",
  "Tools & Gear": "#8899A0",
  "Documents & Cash": "#6B8A94",
  "Kids' Comfort": "#FEAE96",
  "Mom-Specific": "#D4849A",
};
