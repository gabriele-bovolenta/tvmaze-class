import "./App.css";
import { AuthProvider } from "./Context/authContext";
import Router from "./Router/router";

function App() {
  return (
    <>
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </>
  );
}

export default App;
