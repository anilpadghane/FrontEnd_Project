import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./component/Home";
import Products from "./component/Products";
import Vegetable from "./component/Vegetable";
import SnackSpices from "./component/SnackSpices";
import Fruits from "./component/Fruits";
import MiddleImg from "./component/MiddleImg";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="vegetable" element={<Vegetable />} />
          <Route path="snackspices" element={<SnackSpices/>} />
          <Route path="fruits"   element={<Fruits/>}/>
          {/* Fallback 404 Route */}
          <Route path="*" element={<Home />} />
          <Route element={<MiddleImg/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
