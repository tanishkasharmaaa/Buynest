import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Input,
  Image,
  Text,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { ProductsCard } from "../Components/ProductsCard";
import { getProducts } from "../services/api";
import { ProductCardSkeleton } from "../Components/ProductCardSkeleton";

const ProductModal = lazy(() => import("../Components/ProductModal"));
const Footer = lazy(() => import("../Components/Footer"));

function Explore() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setData([]);
      return;
    }

    const controller = new AbortController();

    const fetchSearch = async () => {
      setLoading(true);
      try {
        const url = `https://dummyjson.com/products/search?q=${query}`;
        const res = await getProducts(url, controller.signal);

        setData(res.resData.products);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err);
        }
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchSearch, 500);

    return () => {
      clearTimeout(delay);
      controller.abort(); 
    };
  }, [query]);

  const handleCardClick = useCallback(
    (product) => {
      setSelectedProduct(product);
      onOpen();
    },
    [onOpen],
  );

  return (
    <>
      <Box p={{ base: 4, md: 8 }}>
       
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

        {query && !loading && data.length === 0 && (
          <Text mt="6" textAlign="center" color="gray.500">
            No results found 😔
          </Text>
        )}

       
        {!loading && data.length > 0 && (
          <Box
            mt="6"
            display="grid"
            gap="25px"
            gridTemplateColumns={{
              base: "repeat(auto-fit, minmax(200px, 1fr))",
              sm: "repeat(auto-fit, minmax(220px, 1fr))",
              md:
                data?.length <= 4
                  ? "repeat(5, 1fr)"
                  : "repeat(auto-fit, minmax(250px, 1fr))",
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
      <Suspense fallback={null}>
        {selectedProduct && (
          <ProductModal
            selectedProduct={selectedProduct}
            onClose={onClose}
            isOpen={isOpen}
          />
        )}
      </Suspense>
      <br />
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Explore