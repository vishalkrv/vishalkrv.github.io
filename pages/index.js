import {
  Flex,
  Text,
  Box,
  Icon,
  SimpleGrid,
  Grid,
  GridItem,
  Table,
  Tr,
  Td,
  Tbody,
  Tooltip,
} from "@chakra-ui/react";
import {
  SiNodeDotJs,
  SiHtml5,
  SiCss3,
  SiReact,
  SiJavascript,
  SiWebpack,
  SiAngular,
  SiFlutter,
  SiMicrosoftazure,
  SiAmazonaws,
  SiGrunt,
  SiBootstrap,
  SiNextDotJs,
  SiJenkins,
  SiSass,
  SiGit,
  SiDart,
  SiGooglecloud,
} from "react-icons/si";
import Main from "../layout/main";

const toolchain = [
  [
    {
      icon: SiReact,
      color: "blue.400",
    },
    {
      icon: SiAngular,
      color: "red.400",
    },
    {
      icon: SiNextDotJs,
    },
    {
      icon: SiNodeDotJs,
      color: "green.300",
    },
    {
      icon: SiFlutter,
      color: "blue.400",
    },
    {
      icon: SiSass,
      color: "pink.300",
    },
    {
      icon: SiBootstrap,
      color: "purple.300",
    },
  ],
  [
    {},
    {
      icon: SiHtml5,
      color: "orange.400",
    },
    {
      icon: SiCss3,
      color: "blue.300",
    },
    {
      icon: SiJavascript,
      color: "yellow.300",
    },
    {
      icon: SiDart,
      color: "blue.300",
    },
    {
      icon: SiGit,
      color: "red.300",
    },
  ],
  [
    {},
    {},
    {
      icon: SiWebpack,
      color: "blue.300",
    },
    {
      icon: SiGrunt,
      color: "orange.300",
    },
    {
      icon: SiJenkins,
    },
  ],
  [
    {},
    {},
    {
      icon: SiMicrosoftazure,
      color: "blue.300",
    },
    {
      icon: SiAmazonaws,
      color: "orange.300",
    },
  ],
];

export default function Home() {
  return (
    <Main title="Vishalkrv | Full Stack Developer">
      <Flex
        h="80%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={100}
      >
        <Box as={Flex} flexDirection="row" alignItems="baseline">
          <Text fontSize="5xl">Hello, I'm </Text>
          <Text
            ml={5}
            fontSize="6xl"
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
          >
            Vishal
          </Text>
        </Box>
        <Flex>
          <Text fontSize="2xl" display="inline">
            A self motivated{" "}
            <Text
              fontSize="2xl"
              bgGradient="linear(to-r, teal.500,green.500)"
              bgClip="text"
              display="inline"
            >
              Full Stack Developer{" "}
            </Text>
            currently working with
            <Text
              display="inline"
              fontSize="2xl"
              bgGradient="linear(to-r, teal.500,green.500)"
              bgClip="text"
            >
              {" "}
              Accenture India
            </Text>{" "}
            building enterprise web application
          </Text>
        </Flex>
        <Flex mt={20} alignItems="center" flexDirection="column">
          <Text fontSize="xl">My toolchain</Text>
          <Table variant="unstyled">
            <Tbody>
              {toolchain.map((row, index) => (
                <Tr key={index}>
                  {row.map((cols, i) => (
                    <Td key={i}>
                      {cols.icon && (
                        <Tooltip
                          label={cols.icon.name.replace("Si", "")}
                          fontSize="md"
                        >
                          <Box as="span">
                            <Icon
                              as={cols.icon}
                              w={5}
                              h={5}
                              color={cols.color}
                              background={cols.background}
                            ></Icon>
                          </Box>
                        </Tooltip>
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Main>
  );
}
