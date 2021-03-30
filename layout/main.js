import { Box } from "@chakra-ui/react";
import Header from "../components/head";

export default function Main({ children, title, description }) {
  return (
    <Box h="100%">
      <Header title={title} description={description}></Header>
      {children}
    </Box>
  );
}
