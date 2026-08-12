export interface Skill {
  name: string;
  category: 'Frontend & UI' | 'Languages' | 'Cloud & DevOps' | 'Backend' | 'Databases';
  level: number; // 0 to 100
  iconName: string;
  description: string;
  highlight: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  demoType: 'wallet' | 'bot' | 'cloud';
  stats: { label: string; value: string }[];
}

export interface FeatureSection {
  title: string;
  items: string[];
}

export interface FreelanceProject {
  id: string;
  title: string;
  category: string;
  clientUrl: string;
  description: string;
  executiveSummary?: string;
  keyFeatures: string[];
  featureSections?: FeatureSection[];
  techStack: string[];
  previewTheme: 'dark-luxury' | 'gold-resort' | 'warm-hospitality' | 'navy-lodging' | 'villa-luxury';
  badge: string;
  thumbnailSeed: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  badge?: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface ThreeSceneConfig {
  geometry: 'torusKnot' | 'icosahedron' | 'sphere' | 'particles';
  wireframe: boolean;
  particleDensity: number;
  rotationSpeed: number;
  colorScheme: 'cyan' | 'purple' | 'dual';
}
