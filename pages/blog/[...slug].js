import { Flex, Text, Image, Box } from "@chakra-ui/react";
import ReactMarkdown from 'react-markdown';
import gfm from "remark-gfm";
import Post from "../../layout/post";
import { getPostBySlug, getPosts } from "../../helpers";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

export default function Blog({ title, content }) {
  return (
    <Post>
      <Flex
        h="80%"
        // justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Text fontSize="6xl">{title}</Text>
        <ReactMarkdown
          renderers={ChakraUIRenderer()}
          source={content}
          plugins={[gfm]}
          escapeHtml={false}
        ></ReactMarkdown>
      </Flex>
    </Post>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: await getPostBySlug(params.slug),
  };
}

export async function getStaticPaths() {
  let data = await getPosts();
  const paths = data.map(({ slug }) => ({
    params: {
      slug: [slug],
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
