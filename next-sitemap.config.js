/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.arigioaudioeiluminacion.com.mx',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/dashboard/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/admin' },
    ],
    additionalSitemaps: [
      'https://www.arigioaudioeiluminacion.com.mx/sitemap.xml',
    ],
  },
};
