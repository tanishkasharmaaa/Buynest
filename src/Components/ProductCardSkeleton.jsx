import { Box, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";

export function ProductCardSkeleton() {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      p="4"
    >
      {/* Image Skeleton */}
      <Skeleton height="200px" borderRadius="lg" />

      <VStack align="start" mt="4" spacing="3">
        {/* Title */}
        <Skeleton height="16px" width="80%" />

        {/* Brand */}
        <Skeleton height="12px" width="60%" />

        {/* Price */}
        <Skeleton height="14px" width="40%" />

        {/* Rating */}
        <Skeleton height="12px" width="50%" />

        {/* Button */}
        <Skeleton height="32px" width="100%" borderRadius="md" />
      </VStack>
    </Box>
  );
}