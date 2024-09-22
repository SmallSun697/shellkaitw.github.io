import type { SiteConfig } from '$lib/types/site'

export const site: SiteConfig = {
  protocol: import.meta.env.URARA_SITE_PROTOCOL ?? import.meta.env.DEV ? 'http://' : 'https://',
  domain: import.meta.env.URARA_SITE_DOMAIN ?? 'shellkaitw.github.io',
  title: "Shellkai's Blog",
  subtitle: 'Learning from experience.',
  lang: 'zh-TW',
  description: 'Copyright © ShellkaiTW 2024 - All right reserved\tPowered by SvelteKit/Urara',
  author: {
    avatar: '/assets/profile.jpg',
    name: 'Shellkai Huang',
    status: '🦾',
    bio: '喜歡玩點伺服器，搞點刷機 & Root #Skills39',
    // pnpm install @iconify-json/simple-icons
    metadata: [
      {
        icon: 'i-simple-icons-github',
        link: 'https://github.com/ShellkaiTW'
      },
      {
        icon: 'i-simple-icons-instagram',
        link: 'https://instagram.com/shellkai__2006'
      }
    ]
  },
  themeColor: '#3D4451'
}
