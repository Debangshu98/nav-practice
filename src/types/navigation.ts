export type PageId = 'home' | 'projects' | 'analytics' | 'about' | 'contact'

export interface NavItem {
  id: PageId
  label: string
  description: string
  badge?: string
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    description: 'Overview, quick links, and platform highlights',
  },
  {
    id: 'projects',
    label: 'Projects',
    description: 'Explore active initiatives and product roadmaps',
    badge: '6',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Real-time performance metrics and traffic insights',
    badge: 'Live',
  },
  {
    id: 'about',
    label: 'About',
    description: 'Our story, core values, and engineering team',
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Get in touch with our team or browse FAQs',
  },
]
