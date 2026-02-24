import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Users from './pages/Users'
import Products from './pages/Products'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="products" element={<Products />} />
        <Route path="*" element={<p>Page not found</p>} /> {/* catch-all route */}
      </Route>
    </Routes>
  )
}

export default App