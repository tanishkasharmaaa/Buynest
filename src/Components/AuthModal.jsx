import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

export function AuthModal({ isOpen, onClose }) {
  const { login, createUser } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ name: "", email: "", password: "" });
      setIsLogin(true);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isLogin) {
      login(form.email, form.password);
    } else {
      createUser(form.name, form.email, form.password);
    }

    onClose();
  };


  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={true}
      motionPreset="scale"
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">
          {isLogin ? "Login" : "Register"}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody pb="6">
          <VStack spacing="4">
            {!isLogin && (
              <Input
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            )}

            <Input
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <Button
              w="100%"
              bg="blue"
              color="white"
              _hover={{ bg: "blue.700" }}
              onClick={handleSubmit}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            <Text fontSize="sm">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </Text>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}