import { useState, useEffect, useMemo, useCallback } from "react";
import { lazy, Suspense } from "react";
import { getProducts } from "../services/api";
import { ProductsCard } from "../Components/ProductsCard";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Pagination } from "../Components/Pagination";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  VStack,
  HStack,
  Select,
  Button,
  Badge,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ProductCardSkeleton } from "../Components/ProductCardSkeleton";

const ProductModal = lazy(() => import("../Components/ProductModal"));
const Footer = lazy(() => import("../Components/Footer"));

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currPage, setCurrPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ITEM_PER_PAGE = 20;

  const totalPages = Math.ceil(total / ITEM_PER_PAGE);

  useEffect(() => {
    const handleData = async () => {
      setLoading(true);
      try {
        const url = `https://dummyjson.com/products?limit=${ITEM_PER_PAGE}&skip=${currPage * ITEM_PER_PAGE}`
        const res = await getProducts(url);

        setData(res.resData.products);
        setTotal(res.resData.total);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    handleData();
  }, [currPage]);

const handleCardClick = useCallback((product) => {
  setSelectedProduct(product);
  onOpen();
}, [onOpen]);

  const sortedData = useMemo(() => {
  let temp = [...data];

  if (sortBy === "price-asc") {
    temp.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    temp.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating-desc") {
    temp.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "rating-asc") {
    temp.sort((a, b) => a.rating - b.rating);
  }

  return temp;
}, [data, sortBy]);

  const resetFilters = () => {
    setSortBy("");
  };
  return (
    <>
      <HStack mb="4" spacing="4" mt="4" pl={"5"}>
        <Text fontWeight="bold">Sort By:</Text>
        <Select
          w="200px"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
        </Select>
        <Button borderRadius={"none"} colorScheme="red" onClick={resetFilters}>
          Reset
        </Button>
      </HStack>

      <Box p={{ base: 4, md: 8 }}>
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


        {error && <Text color="red.500">{error}</Text>}

        {!loading && !error && (
          <>
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fit,minmax(250px,1fr))"
              gap="30px"
            >
              {sortedData.map((item) => (
                <Box
                  key={item.id}
                  cursor="pointer"
                >
                  <ProductsCard product={item} handleCardClick={handleCardClick}/>
                </Box>
              ))}
            </Box>

           
            <Pagination
              currPage={currPage}
              totalPages={totalPages}
              setCurrPage={setCurrPage}
            />
            <Suspense fallback={null}>
  {selectedProduct && (
    <ProductModal
      selectedProduct={selectedProduct}
      onClose={onClose}
      isOpen={isOpen}
    />
  )}
</Suspense>

          </>
        )}
      </Box>
      <br />
      <Suspense fallback={null}>
  <Footer />
</Suspense>
    </>
  );
}

export default Products