import { Flex, Text } from "@chakra-ui/react";
import Main from "../layout/main";

export default function Home() {
  return (
    <Main>
      <Flex h="80%" justifyContent="center" alignItems="center">
        <Text fontSize="6xl">Blogging with Next.js</Text>
      </Flex>
    </Main>
  );
}
