import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'lineside - blog',
  description:
    'linesideの公式ブログです。日常の何気ない出来事から、技術的な事まで幅広く発信しています。',
  href: 'https://lineside-blog.vercel.app',
  author: 'lineside',
  locale: 'ja-JP',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/project',
    label: 'project',
  },
  {
    href: '/tags',
    label: 'tags',
  }
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/lineside0418',
    label: 'GitHub',
  },
  {
    href: 'https://twitter.com/_lineside_',
    label: 'Twitter',
  },
  {
    href: 'mailto:maincraft0418yuta@gmail.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
