import { blogsData } from "@/data/blogs";

export async function generateMetadata({ params }) {
  // Next.js 15 fix: await params
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  const pageUrl = `https://portfolio-omega-five-sz84sz7cb9.vercel.app/blogs/${blog.slug}`;

  return {
    title: blog.seo.title,
    description: blog.seo.description,
    keywords: blog.seo.keywords,
    openGraph: {
      title: blog.seo.title,
      description: blog.seo.description,
      url: pageUrl,
      siteName: "Nitesh Portfolio & Tech Blog",
      images: [
        {
          url: blog.ogImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.seo.title,
      description: blog.seo.description,
      images: [blog.ogImage],
    },
  };
}

export default function BlogLayout({ children }) {
  return <>{children}</>;
}