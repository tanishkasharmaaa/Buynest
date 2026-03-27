import { createContext, useState, useEffect } from "react";
import { Toast } from "../Components/Toast";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem("login");
    return stored ? JSON.parse(stored) : false;
  });


  const [toast, setToast] = useState({
    show: false,
    title: "",
    message: "",
    type: "info",
  });


  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [user]);

 
  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

 
  const showToastHandler = (title, message, type = "info") => {
    setToast({
      show: true,
      title,
      message,
      type,
    });
  };


  const createUser = (name, email, password) => {
    const newUser = { name, email, password };
    setUser(newUser);

    showToastHandler(
      "Success",
      "User registered successfully ✅",
      "success"
    );
  };


  const login = (email, password) => {
    if (!user) {
      showToastHandler("Error", "No user found ❌", "error");
      return;
    }

    if (user.email === email && user.password === password) {
      setIsLoggedIn(true);

      showToastHandler(
        "Welcome 🎉",
        `Logged in as ${user.name}`,
        "success"
      );
    } else {
      showToastHandler("Error", "Invalid credentials ❌", "error");
    }
  };

 
 const logout = () => {
  setIsLoggedIn(false);

  localStorage.removeItem("login");

  showToastHandler("Bye 👋", "Logged out successfully", "info");
};
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        createUser,
        login,
        logout,
        showToastHandler
      }}
    >
      {children}

      <Toast
        title={toast.title}
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() =>
          setToast((prev) => ({ ...prev, show: false }))
        }
      />
    </AuthContext.Provider>
  );
};