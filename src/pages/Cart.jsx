import { useContext, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { CartContext } from "../Context/CartContext";

const CheckoutModal = lazy(() => import("../Components/CheckoutModal"));
const Footer = lazy(() => import("../Components/Footer"));

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  }, [cart]);

  return (
    <>
      <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
        {cart.length === 0 ? (
          <VStack spacing="5" mt="20" textAlign="center">
            <Text fontSize="5xl">🛒</Text>

            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
              Your cart is empty
            </Text>

            <Text color="gray.500">
              Looks like you haven’t added anything yet
            </Text>

            <Button
              bg="blue.600"
              color="white"
              px="6"
              _hover={{ bg: "blue.700" }}
              onClick={() => (window.location.href = "/products")}
            >
              Go to Products
            </Button>
          </VStack>
        ) : (
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 6, md: 8 }}
            align="start"
          >
         
            <Box flex="2" w="100%">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                Shopping Cart
              </Text>

              <VStack spacing="4" align="stretch">
                {cart.map((item) => (
                  <Box
                    key={item.id}
                    p={{ base: 3, md: 4 }}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="sm"
                  >
                    <Flex direction={{ base: "column", sm: "row" }} gap="4">
                      <Image
                        src={item.thumbnail}
                        w={{ base: "100%", sm: "120px" }}
                        h={{ base: "150px", sm: "100px" }}
                        objectFit="cover"
                        borderRadius="md"
                      />

                      <Box flex="1">
                        <Text fontWeight="bold" noOfLines={1}>
                          {item.title}
                        </Text>

                        <Text fontSize="sm" color="gray.500">
                          {item.brand}
                        </Text>

                        <Text color="blue.600" mt="1" fontWeight="semibold">
                          ${item.price}
                        </Text>

                        {/* Actions */}
                        <HStack
                          mt="3"
                          spacing="3"
                          justify={{ base: "space-between", sm: "flex-start" }}
                        >
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Remove
                          </Button>
                        </HStack>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* 💳 RIGHT */}
            <Box
              flex="1"
              w="100%"
              bg="white"
              p={{ base: 4, md: 5 }}
              borderRadius="lg"
              boxShadow="sm"
              position={{ base: "static", lg: "sticky" }}
              top="90px"
            >
              <Text fontSize="lg" fontWeight="bold" mb="4">
                Order Summary
              </Text>

              <VStack spacing="3" align="stretch">
                <HStack justify="space-between">
                  <Text>Items</Text>
                  <Text>{cart.length}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Subtotal</Text>
                  <Text>${totalPrice.toFixed(2)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text>Shipping</Text>
                  <Text color="green.500">Free</Text>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="bold" color="blue.600">
                    ${totalPrice.toFixed(2)}
                  </Text>
                </HStack>

                <Button
                  bg="blue"
                  color="white"
                  mt="4"
                  size={{ base: "md", md: "lg" }}
                  _hover={{ bg: "blue.700" }}
                  onClick={onOpen}
                >
                  Proceed to Checkout
                </Button>
              </VStack>
            </Box>
          </Flex>
        )}
      </Box>

      <Suspense fallback={null}>
        <CheckoutModal
          isOpen={isOpen}
          onClose={onClose}
          total={totalPrice}
          clearCart={clearCart}
        />
      </Suspense>
      <br />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Cart