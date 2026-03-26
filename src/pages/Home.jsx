import { BannerCarousel } from "../Components/BannerCarousel";
import { RibbonBanner } from "../Components/RibbonBanner";
import { ProductsCarousel } from "../Components/ProductsCarousel";
import { ProductModal } from "../Components/ProductModal";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { Footer } from "../Components/Footer";

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

export function Home() {
     const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // This will be passed to ProductsCarousel
  const handleCardClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <>
      <BannerCarousel images={images} />
      <RibbonBanner
  text={"OUR BEST SELLING KITCHEN ACCESSORIES"}
  boxStyle={{
    backgroundColor: "blue",
  }}
/>
<ProductsCarousel category={"kitchen-accessories"} handleCardClick={handleCardClick}/>
<BannerCarousel images={images1} />
      <RibbonBanner
  text={"OUR BEST QUALITY MOBILE ACCESSORIES"}
  boxStyle={{
    backgroundColor: "blue",
  }}
/>
<ProductsCarousel category={"mobile-accessories"} handleCardClick={handleCardClick}/>
<Footer/>
{selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}