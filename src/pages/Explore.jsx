import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Image,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Navbar } from "../Components/Navbar";
import { ProductsCard } from "../Components/ProductsCard";
import { getProducts } from "../services/api";
import { ProductModal } from "../Components/ProductModal";
import { ProductCardSkeleton } from "../Components/ProductCardSkeleton";

export function Explore() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔍 Handle Search
  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const url = `https://dummyjson.com/products/search?q=${query}`;
        const res = await getProducts(url);

        setData(res.resData.products);
        console.log(res.resData.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchSearch, 500); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <>
      <Box p={{ base: 4, md: 8 }}>
        {/* 🔍 Search Bar */}
        <Input
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="lg"
          borderRadius="full"
          bg="gray.100"
          _focus={{
            bg: "white",
            borderColor: "blue.500",
          }}
        />

        {/* ⏳ Loading */}
        {loading && (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fit,minmax(250px,1fr))"
            gap="30px"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </Box>
        )}

        {/* 🎬 Default GIF (before search) */}
        {!query && (
          <Box textAlign="center" mt="10">
            <Image
              src="https://mohit-foodstore.netlify.app/assets/search-item.gif"
              alt="search"
              mx="auto"
              w="50%"
              opacity="0.9"
            />
            <Text mt="4" color="gray.500">
              Search for something amazing ✨
            </Text>
          </Box>
        )}

        {/* ❌ No Results */}
        {query && !loading && data.length === 0 && (
          <Text mt="6" textAlign="center" color="gray.500">
            No results found 😔
          </Text>
        )}

        {/* 🛍 Results */}
        {!loading && data.length > 0 && (
          <Box
            mt="6"
            display="grid"
            gap="25px"
            gridTemplateColumns={{
              base: "repeat(auto-fit, minmax(200px, 1fr))", // mobile
              sm: "repeat(auto-fit, minmax(220px, 1fr))", // small screens
              md:
                data?.length <= 4
                  ? "repeat(5, 1fr)"
                  : "repeat(auto-fit, minmax(250px, 1fr))", // tablets & larger
            }}
          >
            {data?.map((item) => (
              <ProductsCard
                key={item.id}
                product={item}
                handleCardClick={handleCardClick}
              />
            ))}
          </Box>
        )}
      </Box>
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          onClose={onClose}
          isOpen={isOpen}
        />
      )}
    </>
  );
}
