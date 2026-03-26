import { Box, Text } from "@chakra-ui/react";

export function RibbonBanner({ text, boxStyle, textStyle }) {
  return (
    <Box
      position="relative"
      overflow="hidden"
      width="100%"
      h={{ base: "60px", md: "90px" }}
      bg={boxStyle?.backgroundColor || "#0077ff"}
      boxShadow="0 4px 6px rgba(0,0,0,0.2)"
      display="flex"
      alignItems="center"
    >
      <Box
        as="span"
        display="inline-block"
        whiteSpace="nowrap"
        animation="scrollTicker 20s linear infinite"
        minW="100%"
      >
        {/* Repeat text twice for seamless scroll */}
        <Text
          as="span"
          fontSize={{ base: "1.2rem", md: "2rem", lg: "4rem" }}
          fontWeight="700"
          color="white"
          letterSpacing="1px"
          mr="10"
          {...textStyle}
        >
          {text} ●
        </Text>
        <Text
          as="span"
          fontSize={{ base: "1.2rem", md: "2rem", lg: "4rem" }}
          fontWeight="700"
          color="white"
          letterSpacing="1px"
          mr="10"
          {...textStyle}
        >
          {text} ●
        </Text>
      </Box>

      {/* Animation */}
      <style>
        {`
          @keyframes scrollTicker {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </Box>
  );
}