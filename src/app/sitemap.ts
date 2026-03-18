import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://project-forge-pro.vercel.app/',
      priority: 1,
    },
    {
      url: 'https://project-forge-pro.vercel.app/projects',
      priority: 0.9,
    },
    {
      url: 'https://project-forge-pro.vercel.app/categories',
      priority: 0.8,
    },
    {
      url: 'https://project-forge-pro.vercel.app/ai-suggester',
      priority: 0.9,
    },
  ];
}