import { AppRoutes } from "./routes/AppRoutes";
import  Navbar  from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <AppRoutes />
      {/* <Footer /> */}
    </>
  );
}

export default App;