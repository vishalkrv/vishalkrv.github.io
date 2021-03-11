import React from "react";
import {
  Text,
  Code,
  Divider,
  Link,
  List,
  Checkbox,
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

function getCoreProps(props) {
  return props["data-sourcepos"]
    ? { "data-sourcepos": props["data-sourcepos"] }
    : {};
}

export const defaults = {
  paragraph: (props) => {
    const { children } = props;
    return <Text my={5}>{children}</Text>;
  },
  emphasis: (props) => {
    const { children } = props;
    return <Text as="em">{children}</Text>;
  },
  blockquote: (props) => {
    const { children } = props;
    return (
      <Alert status="warning" variant="left-accent" borderRadius={4}>
        {children}
      </Alert>
    );
  },
  code: (props) => {
    const { language, value } = props;
    return (
      <Box
        marginTop={"var(--chakra-space-5)"}
        marginBottom={"var(--chakra-space-5)"}
      >
        <SyntaxHighlighter
          language={language}
          wrapLines="true"
          wrapLongLines="true"
          style={okaidia}
        >
          {value}
        </SyntaxHighlighter>
      </Box>
    );
  },
  delete: (props) => {
    const { children } = props;
    return <Text as="del">{children}</Text>;
  },
  thematicBreak: Divider,
  link: Link,
  img: Image,
  linkReference: Link,
  imageReference: Image,
  table: (props) => {
    const { children } = props;
    return (
      <TableContainer marginBottom={"var(--chakra-space-5)"}>
        <Table size='sm'>{children}</Table>
      </TableContainer>
    );
  },
  thead: (props) => {
    const { children } = props;
    return <Thead>{children}</Thead>;
  },
  tbody: (props) => {
    const { children } = props;
    return <Tbody>{children}</Tbody>;
  },
  tr: (props) => {
    const { children } = props;
    return <Tr>{children}</Tr>;
  },
  tableCell: (props) => {
    const { isHeader, children } = props;
    return isHeader ? <Th>{children}</Th> : <Td>{children}</Td>;
  },
  text: (props) => {
    const { children } = props;
    return <Text as="span">{children}</Text>;
  },
  list: (props) => {
    const { start, ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    if (start !== null && start !== 1 && start !== undefined) {
      attrs.start = start.toString();
    }
    let styleType = "disc";
    if (ordered) styleType = "decimal";
    if (depth === 1) styleType = "circle";
    return (
      <List
        as={ordered ? "ol" : "ul"}
        spacing={1}
        styleType={styleType}
        pl={5}
        {...attrs}
      >
        {children}
      </List>
    );
  },
  listItem: (props) => {
    const { children, checked } = props;
    let checkbox = null;
    if (checked !== null && checked !== undefined) {
      checkbox = (
        <Checkbox isChecked={checked} isReadOnly>
          {children}
        </Checkbox>
      );
    }
    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={checked !== null ? "none" : "inherit"}
      >
        {checkbox || children}
      </ListItem>
    );
  },
  definition: () => null,
  heading: (props) => {
    const { level, children } = props;
    const sizes = ["lg", "xl", "lg", "md", "sm", "xs"];
    return (
      <Heading
        my={2}
        as={`h${level}`}
        size={sizes[`${level}`]}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  inlineCode: (props) => {
    const { children } = props;
    return (
      <Code {...getCoreProps(props)} bg="none" color="purple.400">
        {children}
      </Code>
    );
  },
};

function ChakraUIRenderer(theme = defaults) {
  return {
    paragraph: theme.paragraph,
    emphasis: theme.emphasis,
    blockquote: theme.blockquote,
    code: theme.code,
    delete: theme.delete,
    thematicBreak: theme.thematicBreak,
    link: theme.link,
    img: theme.img,
    linkReference: theme.linkReference,
    imageReference: theme.imageReference,
    text: theme.text,
    table: theme.table,
    tableHead: theme.thead,
    tableBody: theme.tbody,
    tableRow: theme.tr,
    tableCell: theme.tableCell,
    list: theme.list,
    listItem: theme.listItem,
    definition: theme.definition,
    heading: theme.heading,
    inlineCode: theme.inlineCode,
  };
}

export default ChakraUIRenderer;
