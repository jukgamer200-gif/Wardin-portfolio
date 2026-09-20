import { HostingService, ProjectShowcase, ClientReview, SkillCategory } from '../types';

export const WARDIN_INFO = {
  name: 'Wardin',
  username: 'itzwardin09',
  discordTag: 'itzwardin09',
  discordDisplay: 'itzwardin09',
  discordId: '849201948201849201',
  status: 'online',
  customStatus: '5+ Years in Hosting & DDoS Protection ⚡',
  experienceYears: '5 Years',
  headline: 'Hosting, DDoS Protection & Minecraft Server Security',
  introTitle: 'iam wardin',
  introBio: "iam wardin and i have a 5 years of experience in hosting, ddos protection and Minecraft server ddos protection.",
  fullDescription: "iam wardin and i have a 5 years of experience in hosting, ddos protection and Minecraft server ddos protection. Specializing in high-performance bare metal & cloud game nodes, Layer 4/7 DDoS packet filtering, custom Minecraft proxy architectures, and zero-downtime server setups.",
  avatarUrl: '/assets/wardin_avatar.jpg',
  avatarFallback: '/assets/wardin_avatar_1789875446913.jpg',
  corePillars: [
    {
      title: 'Hosting Infrastructure',
      years: '5 Years Experience',
      desc: 'High-TPS game servers, dedicated nodes, Linux systems, and optimized Pterodactyl panels with continuous 24/7 uptime.',
      tag: '5+ Years Active',
    },
    {
      title: 'DDoS Protection & Mitigation',
      years: 'L4 / L7 Defense',
      desc: 'Deep packet inspection, custom BGP routing rules, SYN/UDP flood filtering, and high-throughput proxy protection.',
      tag: 'Shield Active',
    },
    {
      title: 'Minecraft Server DDoS Protection',
      years: 'Game Firewall',
      desc: 'Specialized TCPShield, Velocity proxies, bot filters, exploit mitigation, and zero-latency player traffic shielding.',
      tag: 'Multi-Tbps Guard',
    },
  ],
  stats: [
    { label: 'Years Experience', value: '5 Years' },
    { label: 'DDoS Protection', value: 'L4 / L7' },
    { label: 'Uptime Stability', value: '99.99%' },
    { label: 'Discord Username', value: '@itzwardin09' },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Hosting & Cloud Infrastructure',
    description: 'Bare metal, hypervisors, and distributed game networks configured for peak latency.',
    icon: 'HardDrive',
    skills: [
      { name: 'Pterodactyl Panel & Wings', level: 98, tag: 'Specialist' },
      { name: 'Linux System Admin (Ubuntu/Debian)', level: 95 },
      { name: 'Docker & Containerization', level: 92 },
      { name: 'Proxmox VE & KVM Hypervisors', level: 90 },
      { name: 'Anti-DDoS & Game Filter Tuning', level: 94, tag: 'Protected' },
      { name: 'Nginx, Caddy & Reverse Proxies', level: 90 },
    ],
  },
  {
    title: 'Minecraft Server Development',
    description: 'High-concurrency server networks, proxy clustering, and custom plugin integration.',
    icon: 'Boxes',
    skills: [
      { name: 'Paper / Purpur / Folia Performance', level: 98, tag: 'High FPS' },
      { name: 'Velocity & BungeeCord Proxies', level: 95 },
      { name: 'Redis / MySQL Multi-Server Sync', level: 92 },
      { name: 'Custom Spigot / Paper Plugins (Java)', level: 88 },
      { name: 'Server Economy & Permission Nodes', level: 96 },
    ],
  },
  {
    title: 'Discord Bots & Automation',
    description: 'Scalable automation bots with slash commands, ticket systems, and payment hooks.',
    icon: 'Bot',
    skills: [
      { name: 'Discord.js & Discord.py', level: 96, tag: 'Verified Dev' },
      { name: 'REST API & Webhook Pipelines', level: 92 },
      { name: 'PostgreSQL & MongoDB DBs', level: 90 },
      { name: 'Stripe / Tebex Store Integrations', level: 88 },
    ],
  },
  {
    title: 'Web & Fullstack Engineering',
    description: 'Interactive dashboard portals, billing gateways, and modern web applications.',
    icon: 'Code2',
    skills: [
      { name: 'React / Next.js / TypeScript', level: 92 },
      { name: 'Tailwind CSS & UI Polish', level: 95 },
      { name: 'Node.js & Express / Fastify', level: 94 },
      { name: 'Cloudflare Tunnels & DNS Automation', level: 96 },
    ],
  },
];

export const HOSTING_SERVICES: HostingService[] = [
  {
    id: 'mc-nodes',
    title: 'Minecraft Network Infrastructure',
    tagline: 'Zero-tps-drop architecture for Survival, Skyblock & Hub networks.',
    icon: 'Boxes',
    popular: true,
    specs: [
      'Ryzen 9 7950X / 9950X Extreme Cores',
      'Velocity Proxy Load Balancing Setup',
      'Aikars Flags & Spark Profiler Optimized',
      'Custom Anti-Bot & TCP Shield Setup',
    ],
  },
  {
    id: 'pterodactyl-setup',
    title: 'Pterodactyl & Daemon Deployment',
    tagline: 'Complete game panel deployment with auto-SSL, SSL wings, and custom billing.',
    icon: 'Cpu',
    specs: [
      'Multi-node Wings Cluster Configuration',
      'Automated Daily Offsite Backups (S3/R2)',
      'Subdomain Manager & Port Allocations',
      'Custom Nest / Egg Provisioning',
    ],
  },
  {
    id: 'discord-bots',
    title: 'Custom Discord Systems & 24/7 Hosting',
    tagline: 'High-uptime containerized Discord bots tailored to your community.',
    icon: 'Bot',
    specs: [
      'Sharded Gateway Connection',
      'Automated Ticket Transcripts & Logging',
      'Custom Role Gateways & Verification',
      'Live Uptime Heartbeat & Sentry Error Logging',
    ],
  },
  {
    id: 'vps-management',
    title: 'Full Linux SysAdmin & Hardening',
    tagline: 'End-to-end security audits, firewall setups, and performance tuning.',
    icon: 'Shield',
    specs: [
      'UFW / IPTables Game-Port Rules',
      'SSH Key Enforcement & Port Relocation',
      'SWAP & RAM Optimization scripts',
      'Prometheus + Grafana Monitoring Dashboards',
    ],
  },
];

export const PROJECTS_SHOWCASE: ProjectShowcase[] = [
  {
    id: 'vortex-mc',
    title: 'VortexCraft Network Cluster',
    category: 'Minecraft Infrastructure',
    role: 'Lead DevOps & Hosting Architect',
    description: 'Engineered a 12-server cluster handling 450+ concurrent players at steady 20.0 TPS with Redis cross-sync.',
    metrics: '20.0 Constant TPS • 450 Peak Players',
    tags: ['Purpur 1.21', 'Velocity', 'Redis', 'Ryzen 9 7950X'],
  },
  {
    id: 'nexus-bot',
    title: 'NexusGuard Discord Suite',
    category: 'Discord Bot',
    role: 'Fullstack Bot Developer',
    description: 'Multi-guild moderation, auto-antiraid verification, and integrated PayPal/Stripe donation licensing bot.',
    metrics: '65,000+ Users Protected • 18ms Response',
    tags: ['Discord.js v14', 'TypeScript', 'Prisma', 'Docker'],
  },
  {
    id: 'pterosync',
    title: 'PteroSync Auto-Node Deployer',
    category: 'Automation Tool',
    role: 'Creator & Maintainer',
    description: 'Automated bash CLI and web dashboard to spin up hardened Pterodactyl Wings nodes in under 3 minutes.',
    metrics: '1,400+ Deployments Executed',
    tags: ['Bash', 'Node.js', 'Docker', 'Linux Security'],
  },
  {
    id: 'wardin-cloud',
    title: 'Wardin Cloud Monitoring Edge',
    category: 'Sysadmin Dashboard',
    role: 'System Engineer',
    description: 'Centralized uptime monitor alerting on Discord when any node latency spikes or packet drops occur.',
    metrics: '99.992% System Reliability',
    tags: ['Grafana', 'Prometheus', 'Webhooks', 'Nginx'],
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [];

