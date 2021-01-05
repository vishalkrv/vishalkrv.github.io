import { Box } from "@chakra-ui/react";
import Header from "../components/head";

export default function Main({ children }) {
  return (
    <Box h="100%">
      <Header title="This page is good"></Header>
      {children}
    </Box>
  );
}
