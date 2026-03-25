import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/routes/seller/', 
        '/routes/profile/', 
        '/routes/success', 
        '/routes/checkOut',
        '/routes/login',
        '/routes/register'
      ],
    },
    sitemap: 'https://nextrade-web-uygulamasi.vercel.app/sitemap.xml',
  };
}