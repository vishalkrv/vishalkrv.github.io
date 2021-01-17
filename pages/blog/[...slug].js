import { Flex, Text, Image, Box } from "@chakra-ui/react";
// import {ReactMarkdown} from 'react-markdown';
const ReactMarkdownWithHtml = require("react-markdown/with-html");
import gfm from "remark-gfm";
import Post from "../../layout/post";
import { getPostBySlug, getPosts } from "../../helpers";

const renderers = {
  table: (content) => {
    return (
      <div>Hello</div>
    );
  },
  image: ({ src, alt, title }) => {
    return (
      <Box boxSize="md">
        <Image src={src} title={title} alt={alt} />
      </Box>
    );
  },
};

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
        <ReactMarkdownWithHtml
          renderers={renderers}
          plugins={[gfm]}
          children={content}
        ></ReactMarkdownWithHtml>
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
