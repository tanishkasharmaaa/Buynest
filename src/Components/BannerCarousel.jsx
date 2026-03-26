import { Box, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function BannerCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const handleClick = (link) => {
    navigate(link);
  };

  return (
    <Box
      w="100%"                     // ✅ fixed (no horizontal scroll issue)
      h={{ base: "200px", sm: "300px", md: "400px", lg: "520px" }} // ✅ responsive height
      position="relative"
      overflow="hidden"
      borderRadius={{ base: "md", md: "xl" }} // ✅ nice UI
    >
      {images.map((item, index) => (
        <Image
          key={index}
          src={item.img}
          alt={`banner-${index}`}
          onClick={() => handleClick(item.link)}
          cursor="pointer"
          w="100%"
          h="100%"
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"
          transition="opacity 0.8s ease-in-out"
          opacity={index === currentIndex ? 1 : 0}
          zIndex={index === currentIndex ? 1 : 0}
        />
      ))}
    </Box>
  );
}