import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { MyHeader } from "./components/MyHeader";
import { CartProvider } from "./context/cart";
import { ProductPage } from "./pages/ProductPage";
import { ProductProvider } from "./context/product";

function App() {
  return (
    <BrowserRouter>
      <main>
        <ProductProvider>
          <CartProvider>
            <MyHeader />
            <Routes>
              <Route path="/" element={<SearchPage />}></Route>
              <Route path="/product/:id" element={<ProductPage />}></Route>
            </Routes>
          </CartProvider>
        </ProductProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
