import { RoutesPage } from "./routes";
import { AuthProvider } from "./context/Auth";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />

      <RoutesPage />
    </AuthProvider>
  );
}

export default App;
