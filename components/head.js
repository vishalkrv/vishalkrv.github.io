import Head from "next/head";
import NextLink from "next/link";
import {
  Flex,
  Link,
  Spacer,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

function Header({ title = "", description = "" }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>{title ? `${title} | Vishalkrv` : "Vishalkrv"}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta charSet="UTF-8" />
        <meta property="og:image" content="/og_image.png" />
        <meta property="og:title" content="Vishal | Full Stack Professional" />
        <meta
          property="og:description"
          content="A self motivated Full Stack Professional currently working with DBS Singapore as a Senior SRE member"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Flex
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        h={50}
        alignItems="center"
        pl={10}
        pr={10}
      >
        <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          <Text fontSize="2xl" fontWeight="700">
            Vishalkrv
          </Text>
        </Link>
        <Spacer />
        <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
          Home
        </Link>
        <Link
          as={NextLink}
          ml="30px"
          href="/blog"
          _hover={{ textDecoration: "none" }}
        >
          Blog
        </Link>
        <IconButton
          ml={10}
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          colorScheme={colorMode === "light" ? "gray" : "yellow"}
          aria-label="Toggle color mode"
        />
      </Flex>
    </>
  );
}

export default Header;
