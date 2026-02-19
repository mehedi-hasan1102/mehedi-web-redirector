import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Callout, Img, CodeBlock, Pre } from '@/app/blog/components/mdx-components';
import { BackButton } from './BackButton';
import styles from './post.module.css';

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(dateString));

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.meta.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.meta.title} | Blog`,
    description: post.meta.excerpt,
  };
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    components: {
      Callout,
      Img,
      CodeBlock,
      pre: Pre,
    },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <main className={styles.postPage}>
     
      
      <section className={styles.hero}>
         <div className={`container ${styles.backButtonContainer}`}>
        <BackButton />
      </div>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.meta}>
            {post.meta.tags?.length ? (
              <div className={styles.tags}>
                {post.meta.tags.map((tag) => (
                  <span key={tag} className={styles.category}>
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            ) : null}
            <span className={styles.dateText}>{formatDate(post.meta.date)}</span>
          </div>
          <h1 className={styles.title}>{post.meta.title}</h1>
        </div>
      </section>

      <section className={`section-padding ${styles.contentSection}`}>
        <article className={`container ${styles.prose}`}>{content}</article>
      </section>
    </main>
  );
}
