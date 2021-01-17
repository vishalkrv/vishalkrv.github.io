import { Box, Flex, Text, List, ListItem } from "@chakra-ui/react";
import Posts from "../../layout/posts";
import { getPosts } from "../../helpers";
import Link from "next/link";

export default function Blog({ posts }) {
  return (
    <Posts>
      <Flex h="80%" justifyContent="center" alignItems="center">
        <List spacing={5}>
          {posts.map((post) => (
            <ListItem key={post.title} cursor="pointer">
              <Link href={`/blog/${encodeURIComponent(post.slug)}`}>
                <Text fontSize="3xl" textAlign="left">
                  {post.title}
                </Text>
              </Link>
            </ListItem>
          ))}
        </List>
      </Flex>
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
