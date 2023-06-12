import dWebsiteBotIcon from '../../images/svg/social/robot.svg'
import discordIcon from '../../images/svg/social/discord.svg'
import twitterIcon from '../../images/svg/social/twitter.svg'

export const MAIN_NAV_BAR_ITEMS = [
  { label: 'Hot', link: '/hot', id: 'navbar-hot' },
  { label: 'New', link: '/new', id: 'navbar-new' },
]

export const MAIN_NAV_BAR_SOCIAL_ITEMS = [
  {
    link: 'https://twitter.com/dwebsitesbot',
    class: 'twitter-icon',
    altLabel: 'Latest dWebsites bot',
    icon: dWebsiteBotIcon,
  },
  { link: 'https://discord.gg/9c2EWzjFzY', class: 'discord-icon', altLabel: 'Our Discord', icon: discordIcon },
  { link: 'https://twitter.com/e_steroids', class: 'twitter-icon', altLabel: 'Our Twitter', icon: twitterIcon },
]
