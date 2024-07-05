import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from './HomeScreen'
import CommunityScreen from './CommunityScreen'
import SignUpScreen from './SignUpScreen'
import LogInScreen from './LogInScreen'
import LocatorScreen from './LocatorScreen'
import ProductsScreen from './ProductsScreen'
import Post from './components/Post'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocatorScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/post/:id" element={<Post />} />
          {/* <Route path="/locator" element={<LocatorScreen />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/community" element={<CommunityScreen />} /> */}
      </Routes>
    </Router>
  )
}
