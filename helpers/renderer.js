import React from "react";
import {
  Text,
  Code,
  Divider,
  Link,
  List,
  ListItem,
  Heading,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Alert,
  Box,
  TableContainer,
} from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

export const defaults = {
  p: ({ children }) => <Text my={5}>{children}</Text>,
  em: ({ children }) => <Text as="em">{children}</Text>,
  strong: ({ children }) => (
    <Text as="strong" fontWeight="bold">
      {children}
    </Text>
  ),
  blockquote: ({ children }) => (
    <Alert status="warning" variant="left-accent" borderRadius={4} my={4}>
      {children}
    </Alert>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    if (match) {
      return (
        <Box my={5}>
          <SyntaxHighlighter
            language={match[1]}
            style={okaidia}
            wrapLines={true}
            wrapLongLines={true}
          >
            {codeString}
          </SyntaxHighlighter>
        </Box>
      );
    }
    return (
      <Code bg="none" color="purple.400" {...props}>
        {children}
      </Code>
    );
  },
  del: ({ children }) => <Text as="del">{children}</Text>,
  hr: () => <Divider my={4} />,
  a: ({ href, children, ...props }) => (
    <Link href={href} color="teal.400" isExternal {...props}>
      {children}
    </Link>
  ),
  img: (props) => <Image maxW="100%" my={4} {...props} />,
  table: ({ children }) => (
    <TableContainer my={5}>
      <Table size="sm">{children}</Table>
    </TableContainer>
  ),
  thead: ({ children }) => <Thead>{children}</Thead>,
  tbody: ({ children }) => <Tbody>{children}</Tbody>,
  tr: ({ children }) => <Tr>{children}</Tr>,
  th: ({ children }) => <Th>{children}</Th>,
  td: ({ children }) => <Td>{children}</Td>,
  ul: ({ children }) => (
    <List spacing={1} styleType="disc" pl={5} my={2}>
      {children}
    </List>
  ),
  ol: ({ children }) => (
    <List as="ol" spacing={1} styleType="decimal" pl={5} my={2}>
      {children}
    </List>
  ),
  li: ({ children }) => <ListItem>{children}</ListItem>,
  h1: ({ children }) => (
    <Heading as="h1" size="2xl" my={4}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="xl" my={3}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="lg" my={3}>
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading as="h4" size="md" my={2}>
      {children}
    </Heading>
  ),
  h5: ({ children }) => (
    <Heading as="h5" size="sm" my={2}>
      {children}
    </Heading>
  ),
  h6: ({ children }) => (
    <Heading as="h6" size="xs" my={2}>
      {children}
    </Heading>
  ),
};

function ChakraUIRenderer(customTheme = {}) {
  return {
    ...defaults,
    ...customTheme,
  };
}

export default ChakraUIRenderer;
