import { HStack, Button } from "@chakra-ui/react";

export function Pagination({ currPage, totalPages, setCurrPage }) {
  return (
    <HStack spacing="2" justify="center" mt="8">
      
      {/* Prev */}
      <Button
        bg="blue"
        onClick={() => setCurrPage((prev) => prev - 1)}
        isDisabled={currPage === 0}
      >
        Prev
      </Button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          onClick={() => setCurrPage(i)}
          bg={currPage === i ? "blue" : "gray.200"}
          color={currPage === i ? "white" : "black"}
        >
          {i + 1}
        </Button>
      ))}

      {/* Next */}
      <Button
        bg="blue"
        onClick={() => setCurrPage((prev) => prev + 1)}
        isDisabled={currPage === totalPages - 1}
      >
        Next
      </Button>
    </HStack>
  );
}