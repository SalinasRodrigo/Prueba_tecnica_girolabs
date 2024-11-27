import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { SearchPage } from './pages/SearchPage'
import { MyHeader } from './components/MyHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <main>
        <MyHeader />
        <Routes>
          <Route
            path='/'
            element={<MainPage />}
          >
          </Route>
          <Route
            path='/search'
            element={<SearchPage />}
          >
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
