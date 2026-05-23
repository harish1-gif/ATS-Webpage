/**
 * Loading Text Configuration for AGZUS Pages
 * Each page has unique futuristic status words and premium taglines
 */

export type LoaderType =
  | "home"
  | "services"
  | "contact"
  | "about"
  | "portfolio"
  | "blog"
  | "careers"
  | "admin"
  | "client"
  | "technologies"
  | "default";

export const loadingTextConfig: Record<LoaderType, string[]> = {
  home: [
    "INITIALIZING CORE",
    "BOOTING AI SYSTEM",
    "ACTIVATING GRID",
    "SYNCHRONIZING DATA",
    "LAUNCHING EXPERIENCE",
  ],
  services: [
    "LOADING MODULES",
    "DEPLOYING SERVICES",
    "CONNECTING SYSTEMS",
    "INITIALIZING STACK",
    "SCALING NETWORK",
  ],
  contact: [
    "CONNECTING SIGNAL",
    "ESTABLISHING LINK",
    "TRANSMITTING DATA",
    "OPENING CHANNEL",
    "SYNCHRONIZING CONTACT",
  ],
  about: [
    "LOADING BLUEPRINT",
    "SCANNING PROFILE",
    "INITIALIZING TIMELINE",
    "BUILDING STRUCTURE",
    "ACCESSING CORE",
  ],
  portfolio: [
    "RENDERING SHOWCASE",
    "LOADING PROJECTS",
    "VISUALIZING WORK",
    "GENERATING DISPLAY",
    "OPENING GALLERY",
  ],
  blog: [
    "LOADING INSIGHTS",
    "FETCHING ARTICLES",
    "INITIALIZING CONTENT",
    "STREAMING KNOWLEDGE",
    "OPENING FEED",
  ],
  careers: [
    "SCANNING TALENT",
    "CONNECTING FUTURE",
    "OPENING POSITIONS",
    "BUILDING TEAM",
    "LOADING OPPORTUNITIES",
  ],
  admin: [
    "AUTHORIZING ACCESS",
    "INITIALIZING CONSOLE",
    "SECURING NETWORK",
    "LOADING CONTROL",
    "VERIFYING SYSTEM",
  ],
  client: [
    "LOADING INSIGHTS",
    "FETCHING ARTICLES",
    "INITIALIZING CONTENT",
    "STREAMING KNOWLEDGE",
    "OPENING FEED",
  ],
  technologies: [
    "LOADING INSIGHTS",
    "FETCHING ARTICLES",
    "INITIALIZING CONTENT",
    "STREAMING KNOWLEDGE",
    "OPENING FEED",
  ],
  default: [
    "INITIALIZING SYSTEM",
    "LOADING INTERFACE",
    "SYNCHRONIZING DATA",
    "ACTIVATING PROTOCOL",
    "PREPARING EXPERIENCE",
  ],
};

/**
 * Premium Rotating Taglines for Loading Screens
 * Elegant, stylish compliments with futuristic energy
 * Displayed with soft gray/silver text and subtle violet glow
 */
export const premiumTaglines = [
  "You're looking fire",
  "You're illegally attractive",
  "Bro woke up and chose beauty",
  "Certified eye-catcher",
  "You're glowing harder than my future",
  "You didn't dress up… you upgraded",
  "Looking smoother than butter",
  "Looking like a whole WiFi signal — full connection",
];

export function getLoadingText(loaderType: LoaderType): string[] {
  return loadingTextConfig[loaderType] || loadingTextConfig.default;
}

export function getPremiumTaglines(): string[] {
  return premiumTaglines;
}
