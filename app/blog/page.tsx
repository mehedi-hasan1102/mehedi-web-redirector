import { getAllPosts } from '@/lib/blog';
import { BlogCard } from './BlogCard';
import styles from './blog.module.css';

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className={styles.blogPage}>
      {/* Gradient Orbs Background */}
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      {/* Header Section */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>
            Interface <span className={styles.accentText}>Journal</span>
          </h1>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className={styles.listSection}>
        {posts.length === 0 ? (
          <p className={styles.empty}>
            No posts yet. Add MDX files under content/blog.
          </p>
        ) : (
          <div className={styles.grid}>
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
