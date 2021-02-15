import { Box, Text } from "@chakra-ui/react";

const Calendar = ({ date }) => {
  const temp = new Date(date);
  const month = temp.toString().slice(4, 7);
  const year = temp.getFullYear()
  const colors = [
    "red",
    "teal",
    "yellow",
    "blue",
    "cyan",
    "purple",
    "pink",
    "orange",
    "red",
    "teal",
    "yellow",
    "blue",
  ];
  return (
    <Box borderRadius="10" minW={14}>
      <Box borderTopLeftRadius={5} borderTopRightRadius={5} fontFamily="Kalam" background={`${colors[temp.getMonth()]}.400`} textAlign="center">
        {month}'{year.toString().slice(2,4)}
      </Box>
      <Box borderBottomLeftRadius={5} borderBottomRightRadius={5} background="gray.100">
        <Text textAlign="center" fontFamily="Kalam" color="black" fontSize="xl">
          {temp.getDate()}
        </Text>
      </Box>
    </Box>
  );
};

export default Calendar;
