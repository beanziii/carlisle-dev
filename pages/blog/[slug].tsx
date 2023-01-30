import Head from 'next/head';
import { fetchPostData, transformPostData } from '../../lib/helpers';
import { GetStaticProps, GetStaticPaths } from 'next';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

interface BlogsPostProps {
  post: {
    slug: string;
    title: string;
    coverImageURL?: string;
    author: { name: string; url: string };
    content: any; // this needs to be fixed
    date: string;
  };
}

function BlogPost({ post }: BlogsPostProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="mx-auto">
        <div className="mb-8">
          <h1>{post.title}</h1>
          <p className="mt-2 text-base">
            By {post.author.name} on {post.date}
          </p>

          {post.coverImageURL ? (
            <div className="relative mt-8 h-96 w-full">
              <Image
                src={post.coverImageURL}
                alt={`Cover image for ${post.title}`}
                fill
                className="rounded-md object-cover"
                priority
                sizes="768px"
              />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="prose prose-invert max-w-none rounded-md bg-slate-900/50 p-8 md:prose-lg lg:prose-xl">
          <PortableText value={post.content} />
        </div>
      </section>
    </>
  );
}

export default BlogPost;

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params!;

  const query = await fetchPostData(
    `*[_type == "post" && slug.current == "${params.slug}"]`
  );

  if (query.length === 0) {
    return {
      notFound: true,
    };
  }

  const post = await transformPostData(query[0]);

  return {
    props: { post },
    revalidate: 60,
  };
};

type Query = { slug: { current: string } }[];

export const getStaticPaths: GetStaticPaths = async () => {
  const query: Query = await fetchPostData(
    '*[_type == "post"] {slug{current}}'
  );

  const paths = query.map((slug) => {
    return { params: { slug: slug.slug.current } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};
