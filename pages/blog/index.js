import { Box, Flex, Text, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import Posts from "../../layout/posts";
import { getPosts } from "../../helpers";
import Link from "next/link";

export default function Blog({ posts }) {
  return (
    <Posts>
      <SimpleGrid mt={10} pl={5} pr={5} minChildWidth={280} spacing={10}>
        {posts.map((post) => (
          <Box key={post.title} cursor="pointer" border="solid" borderRadius={4} p={5} h={150}>
            <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
              <Text fontSize="2xl" textAlign="left">
                {post.title}
              </Text>
            </Link>
          </Box>
        ))}
      </SimpleGrid>
    </Posts>
  );
}

export async function getStaticProps() {
  const allPosts = await getPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}
