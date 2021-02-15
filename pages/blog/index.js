import {
  Box,
  Flex,
  Text,
  List,
  ListItem,
  SimpleGrid,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import Calendar from "../../components/calendar";
import Posts from "../../layout/posts";
import { getPosts } from "../../helpers";
import { BiTime } from "react-icons/bi";
import Link from "next/link";

export default function Blog({ posts }) {
  return (
    <Posts
      title="Blog"
      description="I try to give shape to my thoughts, my learning and my exepriences here."
    >
      <Flex justifyContent="center" mt={10}>
        <List spacing={8}>
          {posts.map((post, index) => (
            <Link
              key={`${post.title}_${index}`}
              href={`/blog/${encodeURIComponent(post.slug)}`}
            >
              <ListItem cursor="pointer">
                <Flex>
                  <Calendar date={post.date}></Calendar>
                  <Flex ml={15} flexDirection="column">
                    <Flex>
                      <Text fontSize="xl" textAlign="left" width={600}>
                        {post.title}
                      </Text>
                      <Spacer></Spacer>
                      <Flex alignItems="center" fontSize="xs">
                        <Icon as={BiTime}></Icon>
                        <Text ml={2}>{post.readTime}</Text>
                      </Flex>
                    </Flex>
                    <Text fontSize="xs" color="gray.500" maxW={500} isTruncated>
                      {post.subtitle}
                    </Text>
                  </Flex>
                </Flex>
              </ListItem>
            </Link>
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
