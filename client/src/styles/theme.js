import { mode } from "@chakra-ui/theme-tools";
import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

const colors = {
  brand: {
    default_dark: "#1a212b",
    greenDark: "#00ffb3",
    greenLight: "#4bffc9",
    // 100: "#011e3c",
    // 200: "#071b2e",
  },
};
const inputSelectStyles = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: "#245b53",
        },
        borderColor: "#245b53",
        border: "1px",
        _hover: "transparent",
      },
    },
  },
  sizes: {
    lg: {
      field: {
        borderRadius: "sm",
      },
    },
  },
};

const brandRing = {
  _focus: {
    ring: 1,
    ringColor: "#245b53",
  },
};

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("blackAlpha.100", "brand.default_dark")(props),
    },
  }),
};

export const theme = extendTheme(
  {
    styles,
    colors,

    components: {
      Input: { ...inputSelectStyles },
      Select: { ...inputSelectStyles },
      Checkbox: {
        baseStyle: {
          control: {
            borderRadius: "3px",
            borderColor: "brand.greenDark",
            border: "1px",

            ...brandRing,
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Checkbox"],
  }),
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select"],
  })
);
