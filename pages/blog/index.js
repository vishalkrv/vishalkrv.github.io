import { Box, Flex, Text } from "@chakra-ui/react";
import Posts from "../../layout/posts";
import { getPosts } from "../../helpers";
import Link from "next/link";

export default function Blog({ posts }) {
  return (
    <Posts>
      <Flex
        h="80%"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {posts.map((post) => (
          <Box key={post.title} cursor="pointer">
            <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
              <Text fontSize="3xl">{post.title}</Text>
            </Link>
          </Box>
        ))}
      </Flex>
    </Posts>
  );
}

export async function getStaticProps() {
  const allPosts = await getPosts();
  return {
    props: {
      posts: allPosts,
      title: "Hello World",
      description: "Hello Description",
    },
  };
}
