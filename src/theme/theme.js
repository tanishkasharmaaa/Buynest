import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: {
      50: "#E0E7FF",
      100: "#C7D2FE",
      200: "#A5B4FC",
      300: "#818CF8",
      400: "#6366F1",
      500: "#1E3A8A", // main dark blue
      600: "#162D6B",
      700: "#1E40AF",
    },

    neutral: {
      white: "#FFFFFF",
      lightGray: "#F9FAFB",
      gray: "#6B7280",
      border: "#E5E7EB",
      black: "#111827",
      dark: "#1F2937",
    },
  },

  styles: {
    global: {
      body: {
        bg: "neutral.lightGray",
        color: "neutral.black",
      },
    },
  },

  components: {
    Button: {
      baseStyle: {
        borderRadius: "8px",
        fontWeight: "500",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
        },
      },
    },

    Text: {
      baseStyle: {
        color: "neutral.black",
      },
    },
  },
});