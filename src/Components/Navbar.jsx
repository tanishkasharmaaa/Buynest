import React, { useContext, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  Box,
  Flex,
  Text,
  Button,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  VStack,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { AuthModal } from "../Components/AuthModal";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isAuthOpen, onOpen: onAuthOpen, onClose: onAuthClose } =
    useDisclosure();

  // Ref for final focus
  const btnRef = useRef();

  return (
    <>
      {/* Navbar */}
      <Box
        bg="white"
        color="black"
        px={{ base: 4, md: 8 }}
        py="4"
        position="sticky"
        top="0"
        zIndex="1500"
        boxShadow="sm"
      >
        <Flex align="center" justify="space-between" w="100%">
          {/* Logo */}
          <Flex align="center" gap="2">
            <Link to={'/'}><Image src="/Buynest white.svg" alt="logo" h="40px" /></Link>
          </Flex>

          {/* Desktop Links */}
          <Flex
            display={{ base: "none", md: "flex" }}
            align="center"
            justify="space-between"
            flex="1"
            ml="10"
          >
            <Flex align="center" gap="6">
              <Link to="/">
                <Text cursor="pointer">Home</Text>
              </Link>
              <Link to="/products">
                <Text cursor="pointer">Products</Text>
              </Link>
              <Link to="/trending">
                <Text cursor="pointer">Trending</Text>
              </Link>
              <Link to="/explore">
                <Text cursor="pointer">Explore</Text>
              </Link>
              {isLoggedIn && (
                <Link to="/cart">
                  <Text cursor="pointer">Cart</Text>
                </Link>
              )}
            </Flex>

            <Box>
              <Button
                bg="blue"
                color="white"
                size="sm"
                px="5"
                borderRadius="md"
                _hover={{ bg: "blue.700" }}
                onClick={() => {
                  if (isLoggedIn) logout();
                  else onAuthOpen();
                }}
              >
                {isLoggedIn ? "Logout" : "Login / Register"}
              </Button>
            </Box>
          </Flex>

          {/* Mobile Hamburger */}
          <IconButton
            bg='blue'
            ref={btnRef}
            display={{ base: "flex", md: "none" }}
            icon={<HamburgerIcon />}
            onClick={onOpen}
            aria-label="Open Menu"
            zIndex="1600"
          />
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left" 
        onClose={onClose}
        finalFocusRef={btnRef} 
        // size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image
              src="/Buynest white.svg"
              alt="logo"
              h="40px"
            />
          </DrawerHeader>

          <DrawerBody>
            <VStack align="start" spacing="5">
              <Link to="/" onClick={onClose}>
                <Text>Home</Text>
              </Link>
              <Link to="/products" onClick={onClose}>
                <Text>Products</Text>
              </Link>
              <Link to="/trending/all" onClick={onClose}>
                <Text>Trending</Text>
              </Link>
              <Link to="/explore" onClick={onClose}>
                <Text>Explore</Text>
              </Link>
              {isLoggedIn && (
                <Link to="/cart" onClick={onClose}>
                  <Text>Cart</Text>
                </Link>
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              bg={'blue'}
             
              onClick={() => {
                onClose();
                isLoggedIn ? logout() : onAuthOpen();
              }}
            >
              {isLoggedIn ? "Logout" : "Login / Register"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={onAuthClose} />
    </>
  );
}

export default Navbar