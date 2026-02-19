import { getAllPosts } from '@/lib/blog';
import { BlogCard } from './BlogCard';

export default function Blog() {
  const posts = getAllPosts();
  const orbBaseClass =
    'pointer-events-none absolute rounded-full opacity-40 blur-[120px]';

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)]">
      {/* Gradient Orbs Background */}
      <div
        className={`${orbBaseClass} left-[-10%] top-[10%] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(34,211,238,0.15),transparent_70%)]`}
      />
      <div
        className={`${orbBaseClass} right-[-15%] top-[50%] h-[600px] w-[600px] bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_70%)]`}
      />
      <div
        className={`${orbBaseClass} bottom-0 left-[30%] h-[400px] w-[400px] bg-[radial-gradient(circle,rgba(34,211,238,0.15),transparent_70%)]`}
      />

      {/* Header Section */}
      <section className="relative z-[1] mb-[clamp(2rem,4vw,4rem)] px-4 pb-12 pt-20 text-center min-[769px]:px-8 min-[769px]:pb-16 min-[769px]:pt-32">
        <div className="relative mx-auto max-w-[800px]">
          <h1 className="sectionTitleGlobal mb-4">
            Interface <span style={{ color: 'var(--accent)' }}>Journal</span>
          </h1>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative z-[1] mx-auto mb-[clamp(2rem,4vw,4rem)] max-w-[1400px] px-[clamp(1rem,4vw,4rem)]">
        {posts.length === 0 ? (
          <p className="p-8 text-center text-[var(--text-secondary)] [grid-column:1/-1]">
            No posts yet. Add MDX files under content/blog.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3 min-[1025px]:gap-[clamp(1rem,2vw,1.5rem)]">
            {posts.map((post, index) => (
              <BlogCard
                key={post.meta.slug}
                slug={post.meta.slug}
                title={post.meta.title}
                excerpt={post.meta.excerpt}
                date={post.meta.date}
                tags={post.meta.tags}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
