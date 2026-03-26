import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  VStack,
  Image,
  Text,
  HStack,
  Badge,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

export function ProductModal({ selectedProduct, isOpen, onClose }) {
  const { addToCart, showToastHandler } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      showToastHandler(
        "Login Required",
        "Please login to add items to cart",
        "error"
      );
      return;
    }

    addToCart(selectedProduct);

    showToastHandler(
      "Added to Cart",
      `${selectedProduct.title} added successfully`,
      "success"
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />

      <ModalContent borderRadius="xl">
        <ModalHeader>{selectedProduct?.title}</ModalHeader>
        <ModalCloseButton />

        {/* ✅ Scrollable Content */}
        <ModalBody maxH="60vh" overflowY="auto">
          <VStack align="start" spacing="4">
            <Image
              src={selectedProduct?.thumbnail}
              alt={selectedProduct?.title}
              w="100%"
              h="85%"
              borderRadius="md"
            />

            <Text fontSize="sm" color="gray.500">
              {selectedProduct?.brand} • {selectedProduct?.category}
            </Text>

            <HStack>
              <Text fontWeight="bold" color="blue.600">
                ${selectedProduct?.price}
              </Text>
              <Badge colorScheme="green">
                {Math.round(selectedProduct?.discountPercentage)}% OFF
              </Badge>
            </HStack>

            <Text fontSize="sm" color="gray.600">
              ⭐ {selectedProduct?.rating}
            </Text>

            <Badge
              colorScheme={
                selectedProduct?.stock > 0 ? "green" : "red"
              }
            >
              {selectedProduct?.availabilityStatus}
            </Badge>

            <Text>{selectedProduct?.description}</Text>

            <Text fontSize="sm" color="gray.500">
              SKU: {selectedProduct?.sku} | Weight:{" "}
              {selectedProduct?.weight}g
            </Text>

            <Text fontSize="sm" color="gray.500">
              Shipping: {selectedProduct?.shippingInformation}
            </Text>

            <Text fontSize="sm" color="gray.500">
              Warranty: {selectedProduct?.warrantyInformation}
            </Text>
          </VStack>
        </ModalBody>

        {/* ✅ STICKY BUTTON */}
        <ModalFooter
          bg="white"
          borderTop="1px solid #eee"
          position="sticky"
          bottom="0"
          zIndex="10"
        >
          <Button
            w="100%"
            bg="blue"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}