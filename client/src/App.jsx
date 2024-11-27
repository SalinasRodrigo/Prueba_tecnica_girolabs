import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { SearchPage } from './pages/SearchPage'
import { MyHeader } from './components/MyHeader'
import { CartProvider } from './context/cart'

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <main>
          <MyHeader />
          <Routes>
            <Route
              path='/main'
              element={<MainPage />}
            >
            </Route>
            <Route
              path='/'
              element={<SearchPage />}
            >
            </Route>
          </Routes>
        </main>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
