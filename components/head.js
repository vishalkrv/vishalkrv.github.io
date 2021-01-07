import Head from "next/head";
import { Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Header({ title }) {
  const router = useRouter();
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
        <Text fontSize="2xl" fontWeight="700">
          Blogging
        </Text>
        <Spacer></Spacer>
        <Link onClick={() => router.push("/")}>Home</Link>
        <Link ml="30px" onClick={() => router.push("/blog")}>
          Blog
        </Link>
      </Flex>
    </>
  );
}

export default Header;
