import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState,useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { Toast } from "./Toast";

export function ProductsCard({product,handleCardClick }) {
  const {addToCart,showToastHandler} = useContext(CartContext)
  const {isLoggedIn} = useContext(AuthContext)

  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="md"
      _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
      p="4"
    >
      {/* Product Image */}
      <Image
        src={product.thumbnail}
        alt={product.title}
        w="100%"
        h="200px"
        objectFit="cover"
        borderRadius="lg"
        
      />

      <VStack align="start" spacing="2" mt="3">
        {/* Title */}
        <Text fontWeight="bold" fontSize="md" noOfLines={1}>
          {product.title}
        </Text>

        {/* Brand + Category */}
        <Text fontSize="sm" color="gray.500">
          {product.brand} • {product.category}
        </Text>

        {/* Price + Discount */}
        <HStack>
          <Text fontWeight="bold" color="blue.600">
            ${product.price}
          </Text>
          <Badge colorScheme="green">
            {product.discountPercentage}% OFF
          </Badge>
        </HStack>

        {/* Rating */}
        <Text fontSize="sm" color="gray.600">
          ⭐ {product.rating}
        </Text>

        {/* Stock */}
        <Badge
          colorScheme={product.stock > 0 ? "green" : "red"}
        >
          {product.availabilityStatus}
        </Badge>

        <Button
        w="100%"
          bg="blue"
          color="white"
          _hover={{ bg: "blue.700" }}
          size="sm"
          mt="2"
         onClick={()=>handleCardClick(product)}>View Product</Button>

        {/* Button */}
        <Button
          w="100%"
          bg="blue"
          color="white"
          _hover={{ bg: "blue.700" }}
          size="sm"
          mt="0.1"
          onClick={() => {
    if (!isLoggedIn) {
      showToastHandler(
        "Login Required",
        "Please login to add items to cart",
        "error"
      );
      return;
    }

    addToCart(product);

    // showToastHandler(
    //   "Added to Cart",
    //   `${product.title} added successfully`,
    //   "success"
    // );
  }}
        >
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
}