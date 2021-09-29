import gql from "graphql-tag";
import Link from "next/link";
import React from "react";
import client from "../../apollo-client";

export default function PodcastDetailPage({ podcast }) {
  return (
    <>
      <Link href="/">
        <div className="pl-16 pt-8 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span className="text-pink-600 font-semibold">Go Back</span>
        </div>
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <figure>
          <figcaption>Listen to {podcast.title}</figcaption>
          <audio controls src={podcast.record.url}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </figure>
        <div
          className="max-w-3xl mt-6"
          dangerouslySetInnerHTML={{ __html: podcast.description.html }}
        />

        <span className="text-purple-600">
          {podcast.isAdult ? "Not Appropriate" : "Appropriate."}
        </span>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query AllPodcastsQuery {
        podcasts {
          slug
        }
      }
    `,
  });

  const paths = data.podcasts.map((podcast) => ({
    params: { slug: podcast.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const { data, errors } = await client.query({
    query: gql`
      query PodcastDetailQuery($slug: String!) {
        __typename
        podcast(where: { slug: $slug }) {
          id
          title
          isAdult
          releaseDate
          description {
            html
          }
          record {
            id
            url
          }
        }
      }
    `,
    variables: {
      slug,
    },
  });

  return {
    props: {
      podcast: data.podcast,
    },
    revalidate: 10,
  };
}
