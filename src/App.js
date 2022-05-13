import { Routes } from "./routes";
import { Toaster } from "react-hot-toast";

import GlobalStyle from "./styles/global";

import "./App.css";

function App() {
  return (
    <>
      <Toaster />
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;
