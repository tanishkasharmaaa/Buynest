import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  VStack,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutModal({ isOpen, onClose, total, clearCart }) {
  const [status, setStatus] = useState("idle"); 
 

  const navigate = useNavigate();

  const handlePayment = () => {
    setStatus("processing");

    setTimeout(() => {
      setStatus("success");

      setTimeout(() => {
        clearCart();     
        onClose();
        navigate("/");   
      }, 1500);
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader textAlign="center">
          {status === "success"
            ? "Payment Successful 🎉"
            : "Secure Checkout"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb="6">
          <VStack spacing="5">
            {status === "idle" && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Total: ${total.toFixed(2)}
                </Text>

                <Text fontSize="sm" color="gray.500">
                  This is a demo payment. No real money will be charged.
                </Text>

                <Button
                  w="100%"
                  bg="blue"
                  color="white"
                  _hover={{ bg: "blue.700" }}
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
              </>
            )}

            {status === "processing" && (
              <>
                <Spinner size="xl" color="blue.600" />
                <Text>Processing your payment...</Text>
              </>
            )}

            {status === "success" && (
              <>
                <Text fontSize="2xl">✅</Text>
                <Text fontWeight="bold">
                  Payment Completed Successfully!
                </Text>
              </>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CheckoutModal