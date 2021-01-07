import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Post from "../../layout/post";
import { getPostBySlug, getPosts } from "../../helpers";

export default function Blog(props) {
  console.log(props);
  return (
    <Post>
      <Flex h="80%" justifyContent="center" alignItems="center">
        <Text fontSize="6xl">Blogging with Post</Text>
      </Flex>
    </Post>
  );
}

export async function getStaticProps(context) {
  console.log("context===>", context);
  return {
    props: await getPostBySlug(context.params.slug),
  };
}

export async function getStaticPaths() {
  let paths = await getPosts();
  console.log("paths===>", paths);
  paths = paths.map((post) => {
    params: {
      slug: post.slug;
    }
  });
  console.log("pa===>", paths);
  return {
    paths: paths,
    fallback: false,
  };
}
