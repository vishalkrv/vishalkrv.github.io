import Head from "next/head";
import {
  Flex,
  Link,
  Spacer,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRouter } from "next/router";

function Header({ title }) {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Flex
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        h={50}
        alignItems="center"
        pl={10}
        pr={10}
      >
        <Link onClick={() => router.push("/")}>
          <Text fontSize="2xl" fontWeight="700">
            Vishalkrv
          </Text>
        </Link>
        <Spacer></Spacer>
        <Link onClick={() => router.push("/")}>Home</Link>
        <Link ml="30px" onClick={() => router.push("/blog")}>
          Blog
        </Link>
        <IconButton
          ml={10}
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          colorScheme={colorMode === "light" ? "gray" : "yellow"}
        ></IconButton>
      </Flex>
    </>
  );
}

export default Header;
