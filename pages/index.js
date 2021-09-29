import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import client from "../apollo-client";

export default function Home({ podcasts }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Podcestera</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Podcestera!
          </a>
        </h1>
        {podcasts.map((podcast) => (
          <Link
            key={podcast.id}
            className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full"
            href={`podcasts/${podcast.slug}`}
          >
            <a
              href="https://nextjs.org/learn"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">{podcast.title} &rarr;</h3>
              {podcast.categories.map((category) => (
                <p key={category.id} className="mt-4 text-xl">
                  {category.title}
                </p>
              ))}
            </a>
          </Link>
        ))}
      </main>
    </div>
  );
}

export const getStaticProps = async (req, res) => {
  const { data } = await client.query({
    query: gql`
      query AllPodcastsQuery {
        podcasts {
          id
          slug
          title
          releaseDate
          description {
            html
          }
          categories {
            id
            title
          }
        }
      }
    `,
  });

  const { podcasts } = data;
  return {
    props: {
      podcasts,
    },
  };
};
