// BannerCarousel.jsx
import { Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BannerCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <Box
      width="100vw"
      height="520px"
      position="relative"
      overflow="hidden"
    >
      {images.map((item, index) => (
        <Image
          key={index}
          src={item.img}
          alt={`banner-${index}`}
          onClick={() => handleClick(item.link)}
          cursor="pointer"
          width="100%"
          height="520px"
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"
          transition="opacity 1s ease-in-out"
          opacity={index === currentIndex ? 1 : 0}
          zIndex={index === currentIndex ? 1 : 0}
        />
      ))}
    </Box>
  );
}