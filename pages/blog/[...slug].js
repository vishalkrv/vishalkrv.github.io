import { Flex, Text, Box, Heading, Spacer } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Post from "../../layout/post";
import { getPostBySlug, getPosts } from "../../helpers";
import ShareBtns from "../../components/share";
import ChakraUIRenderer from "../../helpers/renderer";

export default function Blog({ title, subtitle, content, author, readTime, date, slug }) {
  const formatDate = (date) => {
    const temp = new Date(date);
    const month = temp.toString().slice(4, 7);
    const year = temp.getFullYear();
    return `${month} ${temp.getDate()} ${year} `;
  };
  return (
    <Post title={title} description={subtitle}>
      <Flex alignItems="center" mt={10} flexDirection="column">
        <Flex alignItems="flex-start" flexDirection="column" maxW={650}>
          <Heading as="h1" fontSize="4xl">
            {title}
          </Heading>
          <Text fontSize="lg" color="gray.500" mt={2}>
            {subtitle}
          </Text>
          <Flex mt={5} w="100%" minW={450}>
            <Flex flexDirection="column">
              <Text>{author.name}</Text>
              <Text fontSize="xs" color="gray.600" fontWeight="bold">
                {formatDate(date)} - {readTime}
              </Text>
            </Flex>
            <Spacer></Spacer>
            <ShareBtns title={title} link={`http://vishalkrv.com/blog/${slug}`}></ShareBtns>
          </Flex>
          <Box mt={5}>
            <ReactMarkdown
              renderers={ChakraUIRenderer()}
              children={content}
              plugins={[gfm]}
              skipHtml={false}
            ></ReactMarkdown>
          </Box>
        </Flex>
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
