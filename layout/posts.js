import { Box } from "@chakra-ui/react";
import Header from "../components/head";

export default function Posts({ children, title }) {
  return (
    <Box h="100%">
      <Header title={title}></Header>
      {children}
    </Box>
  );
}
