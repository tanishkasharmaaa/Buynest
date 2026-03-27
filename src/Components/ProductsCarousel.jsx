import { useState, useEffect } from "react";
import { Box, Spinner, Text, Button } from "@chakra-ui/react";

function ProductsCarousel({ category = "Kitchen-accessories", handleCardClick }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <Spinner size="xl" display="block" mx="auto" mt="6" />;
  if (error)
    return (
      <Text color="red.500" textAlign="center" mt="6">
        {error}
      </Text>
    );

  return (
    <Box w="100%" overflow="hidden" py="4" px={{ base: 2, md: 8 }}>
      <Box
        display="flex"
        gap="20px"
        overflowX="auto"
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
          "msOverflowStyle": "none",
          "scrollbarWidth": "none",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            minW={{ base: "200px", md: "220px" }}
            flex="0 0 auto"
            bg="white"
            borderRadius="md"
            boxShadow="md"
            cursor="pointer"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            h="350px" 
          >
            <Box h="180px" overflow="hidden">
              <img
                src={product.thumbnail || product.images?.[0]}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", 
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
              />
            </Box>

            <Box p="3" textAlign="center" flex="1" display="flex" flexDirection="column" justifyContent="space-between">
              <div>
                <h3 style={{ fontWeight: "600", fontSize: "1.2rem" }}>{product.title}</h3>
                <p style={{ marginTop: "5px", color: "gray" }}>{product.category}</p>
              </div>
              <div>
                <p style={{ color: "green", fontSize: "1.4rem", marginTop: "10px", fontWeight: "500" }}>
                  ${product.price}
                </p>
                <Button
                  w="100%"
                  bg="blue"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  size="sm"
                  mt="2"
                  onClick={() => handleCardClick(product)}
                >
                  View Product
                </Button>
              </div>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProductsCarousel