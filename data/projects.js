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
    gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
    borderGlow: "border-cyan-500/40",
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
    gradient: "from-pink-500/20 via-purple-600/10 to-transparent",
    borderGlow: "border-pink-500/40",
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
    gradient: "from-violet-500/20 via-indigo-600/10 to-transparent",
    borderGlow: "border-violet-500/40",
    wireframeType: "globe",
    githubUrl: "https://github.com/vishalkrv",
  },
];

export const digitalToolchain = [
  { name: "React", key: "react", iconName: "SiReact", color: "#61DAFB", gauge: [35, 60, 45, 80, 95] },
  { name: "Angular", key: "angular", iconName: "SiAngular", color: "#DD0031", gauge: [20, 40, 50, 45, 60] },
  { name: "Node.js", key: "node", iconName: "SiNodedotjs", color: "#339933", gauge: [40, 65, 75, 85, 90] },
  { name: "Python", key: "python", iconName: "SiPython", color: "#3776AB", gauge: [30, 50, 70, 80, 88] },
  { name: "HTML5", key: "html5", iconName: "SiHtml5", color: "#E34F26", gauge: [60, 75, 80, 90, 95] },
  { name: "CSS3", key: "css3", iconName: "SiCss", color: "#1572B6", gauge: [55, 70, 80, 85, 92] },
  { name: "JavaScript", key: "js", iconName: "SiJavascript", color: "#F7DF1E", gauge: [60, 80, 85, 92, 98] },
  { name: "Docker", key: "docker", iconName: "SiDocker", color: "#2496ED", gauge: [40, 60, 75, 85, 90] },
  { name: "AWS", key: "aws", iconName: "FaAws", color: "#FF9900", gauge: [30, 55, 70, 85, 95] },
  { name: "Cloud", key: "cloud", iconName: "SiGooglecloud", color: "#4285F4", gauge: [40, 60, 70, 80, 85] },
  { name: "Bootstrap", key: "bootstrap", iconName: "SiBootstrap", color: "#7952B3", gauge: [40, 55, 60, 50, 40] },
  { name: "Sass", key: "sass", iconName: "SiSass", color: "#CC6699", gauge: [50, 65, 75, 70, 60] },
  { name: "Git", key: "git", iconName: "SiGit", color: "#F05032", gauge: [60, 75, 85, 90, 95] },
];

