import { useEffect, useState, useMemo } from "react"; 
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  useDisclosure
} from "@chakra-ui/react";
import { lazy, Suspense } from "react";
import { getProducts } from "../services/api";
import { ProductsCard } from "../Components/ProductsCard";
import { Pagination } from "../Components/Pagination";
import { ProductCardSkeleton } from "../Components/ProductCardSkeleton";

const ProductModal = lazy(() => import("../Components/ProductModal"));
const Footer = lazy(()=>import("../Components/Footer"))

function Trending() {
  const { category: paramCategory } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [category, setCategory] = useState("all");
  const [currPage, setCurrPage] = useState(0);
  const [tabIndex, setTabIndex] = useState(0); 
  const [categories, setCategories] = useState([]); 

  const ITEM_PER_PAGE = 20;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `https://dummyjson.com/products?limit=194`;
        const res = await getProducts(url);
        setData(res.resData.products);

       
        const fetchedCategories = ["all", ...new Set(res.resData.products.map((item) => item.category))];
        setCategories(fetchedCategories);

       
        if (paramCategory && fetchedCategories.includes(paramCategory)) {
          setCategory(paramCategory);
          setTabIndex(fetchedCategories.indexOf(paramCategory));
        } else {
          setCategory("all");
          setTabIndex(0);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [paramCategory]);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const filteredData = useMemo(() => {
  return category === "all"
    ? data
    : data.filter((item) => item.category === category);
}, [data, category]);

 const totalPages = Math.ceil(filteredData.length / ITEM_PER_PAGE);
const paginatedData = useMemo(() => {
  return filteredData.slice(
    currPage * ITEM_PER_PAGE,
    currPage * ITEM_PER_PAGE + ITEM_PER_PAGE
  );
}, [filteredData, currPage]);


  useEffect(() => {
    setCurrPage(0);
  }, [category]);

  if (categories.length === 0) return null;

  return (
    <>
      
      <Box bg="white" position="sticky" top="70px" zIndex="100" boxShadow="sm" p="3">
        <Tabs
          variant="unstyled"
          index={tabIndex} 
          onChange={(index) => {
            setCategory(categories[index]);
            setTabIndex(index);
          }}
        >
          <TabList
            display="flex"
            gap="10px"
            overflowX="auto"
            sx={{ "&::-webkit-scrollbar": { display: "none" } }}
          >
            {categories.map((cat) => (
              <Tab
                key={cat}
                px="5"
                py="2"
                borderRadius="full"
                fontWeight="500"
                textTransform="capitalize"
                whiteSpace="nowrap"
                transition="all 0.3s ease"
                _selected={{ color: "white" }}
                _hover={{ transform: "translateY(-2px)" }}
              >
                {category === cat && (
                  <Box
                    position="absolute"
                    inset="0"
                    bg="blue"
                    borderRadius="full"
                    zIndex="-1"
                    transition="all 0.35s ease"
                  />
                )}
                {cat}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Box>

      {/* Loading */}
      {loading && (
        <Box display="grid" gridTemplateColumns="repeat(auto-fit,minmax(250px,1fr))" gap="30px">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Box>
      )}

      {/* Error */}
      {error && (
        <Text color="red.500" textAlign="center">{error}</Text>
      )}

      {/* Products */}
      {!loading && !error && (
        <>
          <Box
           mt="6"
            display="grid"
            gap="25px"
            gridTemplateColumns={{
              base: "repeat(auto-fit, minmax(200px, 1fr))", 
              sm: "repeat(auto-fit, minmax(220px, 1fr))", 
              md:
                data?.length <= 3
                  ? "repeat(5, 1fr)"
                  : "repeat(auto-fit, minmax(250px, 1fr))", 
            }}
          >
            {paginatedData.map((item) => (
              <ProductsCard
                key={item.id}
                product={item}
                handleCardClick={handleCardClick}
              />
            ))}
          </Box>
          <Pagination currPage={currPage} totalPages={totalPages} setCurrPage={setCurrPage} />
        </>
      )}
      <Suspense fallback={null}>{selectedProduct && (
        <ProductModal selectedProduct={selectedProduct} onClose={onClose} isOpen={isOpen} />
      )}</Suspense>
      <br />
      <Footer/>
    </>
  );
}

export default Trending