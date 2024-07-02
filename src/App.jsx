import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from './HomeScreen'
import CommunityScreen from './CommunityScreen'

export default function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<CommunityScreen />} /> 
          {/* <Route path="signup" element={<SignUpScreen />} />
          <Route path="locator" element={<LocatorScreen />} />
          <Route path="products" element={<ProductsScreen />} /> */}
          {/* <Route path="community" element={<CommunityScreen />} /> */}
      </Routes>
    </Router>
  )
}
