import { theme } from "@chakra-ui/react";

const customTheme = {
  ...theme,
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Nunito"
      },
    }),
  }
};

export default customTheme;