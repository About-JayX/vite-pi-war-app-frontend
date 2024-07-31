const ServerUrl = typeof window !== 'undefined' ? location.href : ''
export default {
  '/': {
    title: 'Pi War 𝜋',
    description: 'Pi War 𝜋: A Web3-Powered Telegram Game.',
    keywords: 'Pi War',
    author: 'Pi War',
    opengraph: [
      {
        image: `${ServerUrl}banner.png`,
        url: ServerUrl,
        type: 'website',
      },
    ],
    twitter: [
      {
        card: 'summary_large_image',
        image: `${ServerUrl}banner.png`,
        site: 'Pi War',
        creator: 'Pi War',
      },
    ],
  },
}
