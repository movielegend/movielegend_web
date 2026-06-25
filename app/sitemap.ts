import { type MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://movielegend.vn',
      lastModified: new Date()
    },
    {
      url: 'https://movielegend.vn/products',
      lastModified: new Date()
    },
    {
      url: 'https://movielegend.vn/cart',
      lastModified: new Date()
    },
    {
      url: 'https://movielegend.vn/account',
      lastModified: new Date()
    },
    {
      url: 'https://movielegend.vn/wishlist',
      lastModified: new Date()
    },
    {
      url: 'https://movielegend.vn/search',
      lastModified: new Date()
    },
    {
      url: 'https://movielegend.vn/contact',
      lastModified: new Date()
    }
  ];
}
