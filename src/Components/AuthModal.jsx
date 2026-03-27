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
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

 
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ name: "", email: "", password: "" });
      setIsLogin(true);
      setMessage("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setMessage("Please fill all fields");
      return;
    }

    if (isLogin) {
      
      login(form.email, form.password);
      onClose();
    } else {
      
      createUser(form.name, form.email, form.password);

      setIsLogin(true);
      setMessage("Account created! Please login.");

      
      setForm((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign="center">
          {isLogin ? "Login" : "Register"}
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody pb="6">
          <VStack spacing="4">
            {/* Message */}
            {message && (
              <Text
                color={message.includes("Account") ? "green.500" : "red.500"}
                fontSize="sm"
                textAlign="center"
              >
                {message}
              </Text>
            )}

            
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
              _hover={{ bg: "blue.600" }}
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
                onClick={() => {
                  setIsLogin(!isLogin);
                  setMessage("");
                }}
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