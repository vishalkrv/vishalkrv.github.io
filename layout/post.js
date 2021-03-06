import { Box } from "@chakra-ui/react";
import Header from "../components/head";

export default function Post({ children, title, description }) {
  return (
    <Box h="100%">
      <Header title={title} description={description}></Header>
      <Box pl={5} pr={5}>{children}</Box>
    </Box>
  );
}
