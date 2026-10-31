/**
 * Featured Expeditions (Projects) & Digital Toolchain Configuration
 */

export const featuredProjects = [
  {
    id: "sre-infrastructure",
    title: "Scalable SRE Infrastructure",
    description: "High-altitude enterprise reliability framework: automated canary releases, chaos engineering, and sub-second multi-region disaster recovery.",
    stats: {
      uptime: "99.99%",
      role: "Cloud SRE",
    },
    tags: ["Visual", "Cloud SRE", "Kubernetes", "Prometheus"],
    wireframeType: "mountain",
    githubUrl: "https://github.com/vishalkrv",
  },
  {
    id: "ai-trail-mapping",
    title: "AI Trail Mapping App",
    description: "Neural network powered elevation modeling and procedural terrain generation for backcountry route planning and contour navigation.",
    stats: {
      terrain: "3D Mesh",
      accuracy: "High Res",
    },
    tags: ["Python", "Mapbox", "Three.js", "AI"],
    wireframeType: "contour",
    githubUrl: "https://github.com/vishalkrv",
  },
  {
    id: "globe-tracker",
    title: "Globe Tracker App",
    description: "Interactive WebGL globe tracking wilderness coordinates, GPS trail telemetry, and flight paths in real-time.",
    stats: {
      gps: "Live Feed",
      sync: "Sub-second",
    },
    tags: ["React", "Node", "WebGL", "GPS"],
    wireframeType: "globe",
    githubUrl: "https://github.com/vishalkrv",
  },
];

export const digitalToolchain = [
  { name: "React", key: "react", iconName: "SiReact", gauge: [35, 60, 45, 80, 95] },
  { name: "Angular", key: "angular", iconName: "SiAngular", gauge: [20, 40, 50, 45, 60] },
  { name: "Node.js", key: "node", iconName: "SiNodedotjs", gauge: [40, 65, 75, 85, 90] },
  { name: "Python", key: "python", iconName: "SiPython", gauge: [30, 50, 70, 80, 88] },
  { name: "HTML5", key: "html5", iconName: "SiHtml5", gauge: [60, 75, 80, 90, 95] },
  { name: "CSS3", key: "css3", iconName: "SiCss", gauge: [55, 70, 80, 85, 92] },
  { name: "JavaScript", key: "js", iconName: "SiJavascript", gauge: [60, 80, 85, 92, 98] },
  { name: "Docker", key: "docker", iconName: "SiDocker", gauge: [40, 60, 75, 85, 90] },
  { name: "AWS", key: "aws", iconName: "FaAws", gauge: [30, 55, 70, 85, 95] },
  { name: "Cloud", key: "cloud", iconName: "SiGooglecloud", gauge: [40, 60, 70, 80, 85] },
  { name: "Bootstrap", key: "bootstrap", iconName: "SiBootstrap", gauge: [40, 55, 60, 50, 40] },
  { name: "Sass", key: "sass", iconName: "SiSass", gauge: [50, 65, 75, 70, 60] },
  { name: "Git", key: "git", iconName: "SiGit", gauge: [60, 75, 85, 90, 95] },
];
