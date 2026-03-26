// Components/Footer.jsx
import { Box, Text, Stack, VStack, Image, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Box bg="gray.200" color="white" py={{ base: 10, md: 16 }} px={{ base: 4, md: 16 }}>
      {/* Logo */}
      <Box textAlign="center" mb={{ base: 6, md: 12 }}>
        <Link to={'/'}>
        <Image src="/Buynest white.svg" alt="logo" h="40px" mx="auto" />
        </Link>
      </Box>

      {/* About Section */}
      <Text
        mb={{ base: 8, md: 12 }}
        fontSize={{ base: "sm", md: "md" }}
        textAlign="center"
        lineHeight="1.8"
        maxW="800px"
        mx="auto"
      >
        Buynest is your one-stop online store for fashion, accessories, and lifestyle products.
        We are committed to delivering high-quality, stylish items at affordable prices,
        ensuring a seamless shopping experience for every customer. Join thousands of happy
        shoppers who trust Buynest for their everyday needs.
      </Text>

      {/* Links Section */}
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        spacing={{ base: 8, md: 4 }}
        mb={{ base: 8, md: 12 }}
        textAlign={{ base: "left", md: "center" }}
      >
        {/* Quick Links */}
        <VStack align={{ base: "flex-start", md: "center" }} spacing={2}>
          <Text fontWeight="bold" fontSize="md">QUICK LINKS</Text>
          <Link to={'/'}><Text>Home</Text></Link>
          <Link to={'/products'}><Text>Products</Text></Link>
          <Link to={'/trending'}><Text>Trending</Text></Link>
          <Link to={'/explore'}><Text>Explore</Text></Link>
          <Link to={'/cart'}><Text>Cart</Text></Link>
        </VStack>

        {/* Follow Us */}
        <VStack align={{ base: "flex-start", md: "center" }} spacing={2}>
          <Text fontWeight="bold" fontSize="md">FOLLOW US</Text>
          <Text>Facebook</Text>
          <Text>Twitter</Text>
          <Text>LinkedIn</Text>
          <Text>Instagram</Text>
        </VStack>

        {/* Customer Care */}
        <VStack align={{ base: "flex-start", md: "center" }} spacing={2}>
          <Text fontWeight="bold" fontSize="md">CUSTOMER CARE</Text>
          <Text>Help Center</Text>
          <Text>Returns & Exchange</Text>
          <Text>Shipping Info</Text>
          <Text>FAQs</Text>
        </VStack>
      </Stack>

      <Divider borderColor="gray.600" mb={6} />

      {/* Contact Info */}
      <Text
        mb={4}
        fontSize={{ base: "sm", md: "md" }}
        textAlign="center"
      >
        Email: support@buynest.com | Phone: +91 9876543210 | Address: 123, MG Road
      </Text>

      {/* Copyright */}
      <Text fontSize="sm" color="gray.400" textAlign="center">
        © 2026 Buynest. All rights reserved. Terms of Service | Privacy Policy
      </Text>
    </Box>
  );
}