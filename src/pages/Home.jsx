import { lazy, Suspense } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const BannerCarousel = lazy(() => import("../Components/BannerCarousel"));
const RibbonBanner = lazy(() => import("../Components/RibbonBanner"));
const ProductsCarousel = lazy(() => import("../Components/ProductsCarousel"));
const ProductModal = lazy(() => import("../Components/ProductModal"));
const Footer = lazy(() => import("../Components/Footer"));

const images = [
  { img: "/img1.jpg", link: "/trending/furniture" },
  { img: "/img2.jpg", link: "/trending/womens-dresses" },
  { img: "/img3.png", link: "/trending/fragrances" },
  { img: "/img4.jpg", link: "/trending/mobile-accessories" },
];

const images1 = [
  { img: "/img4.jpg", link: "/trending/mobile-accessories" },
  { img: "/img3.png", link: "/trending/fragrances" },
  { img: "/img2.jpg", link: "/trending/women-dresses" },
  { img: "/img1.jpg", link: "/trending/furniture" },
];

function Home() {
     const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // This will be passed to ProductsCarousel
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <>
      <Suspense fallback={null}>
  <BannerCarousel images={images} />
</Suspense>

<Suspense fallback={null}>
  <RibbonBanner
  text={"OUR BEST SELLING KITCHEN ACCESSORIES"}
  boxStyle={{
    backgroundColor: "blue",
  }}
/>
<ProductsCarousel category={"kitchen-accessories"} handleCardClick={handleCardClick}/>
</Suspense>
      

<Suspense fallback={null}>
  <BannerCarousel images={images1} />
</Suspense>

<Suspense fallback={null}>
   <RibbonBanner
  text={"OUR BEST QUALITY MOBILE ACCESSORIES"}
  boxStyle={{
    backgroundColor: "blue",
  }}
/>
<ProductsCarousel category={"mobile-accessories"} handleCardClick={handleCardClick}/>
</Suspense>


<Suspense fallback={null}>
  {selectedProduct && (
    <ProductModal
      selectedProduct={selectedProduct}
      isOpen={isOpen}
      onClose={onClose}
    />
  )}
</Suspense>

<Suspense>
  <Footer/>
</Suspense>
    </>
  );
}

export default Home