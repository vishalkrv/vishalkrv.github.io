import { Flex, Text, Box, Heading, Spacer } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import Post from "../../layout/post";
import { getPostBySlug, getPosts } from "../../helpers";
import ShareBtns from "../../components/share";
import ChakraUIRenderer from "../../helpers/renderer";

export default function Blog({ title, subtitle, content, author, readTime, date, slug }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const temp = new Date(dateString);
    const month = temp.toString().slice(4, 7);
    const year = temp.getFullYear();
    return `${month} ${temp.getDate()} ${year} `;
  };

  const authorName = typeof author === "object" ? author?.name || "Vishal" : author || "Vishal";
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

  return (
    <Post title={title} description={subtitle}>
      <Flex alignItems="center" mt={10} flexDirection="column">
        <Flex alignItems="flex-start" flexDirection="column" maxW={750} w="100%">
          <Heading as="h1" fontSize="4xl">
            {title}
          </Heading>
          <Text fontSize="lg" color="gray.500" mt={2}>
            {subtitle}
          </Text>
          <Flex mt={5} w="100%" minW={[280, 450]}>
            <Flex flexDirection="column">
              <Text>{authorName}</Text>
              <Text fontSize="xs" color="gray.600" fontWeight="bold">
                {formatDate(date)} - {readTime}
              </Text>
            </Flex>
            <Spacer />
            <ShareBtns title={title} link={`https://vishalkrv.github.io/blog/${slugPath}`} />
          </Flex>
          <Box mt={5} mb={100} w="100%">
            <ReactMarkdown
              components={ChakraUIRenderer()}
              remarkPlugins={[gfm]}
            >
              {content}
            </ReactMarkdown>
          </Box>
        </Flex>
      </Flex>
    </Post>
  );
}

export async function getStaticProps({ params }) {
  const postData = getPostBySlug(params.slug);
  return {
    props: postData,
  };
}

export async function getStaticPaths() {
  const data = getPosts();
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
