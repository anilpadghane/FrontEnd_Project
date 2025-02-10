import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Navbar from "./Navbar";
import Home from "./Home";

const Vegetable = () => {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    rating: 0,
    category: "",
  });
  const [isUpdateSidebarOpen, setIsUpdateSidebarOpen] = useState(false);

  // Fetch data from JSON server
  useEffect(() => {
    axios
      .get("http://localhost:3000/vegetable") // Update URL based on your API
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/vegetable/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  // Handle updating product
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/vegetables/${productData.id}`, productData)
      .then(() => {
        setProducts(products.map((p) => (p.id === productData.id ? productData : p)));
        setIsUpdateSidebarOpen(false);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <>
    <Header/>
    <Navbar/>
    <Home/>
    
    <div className="container">
      <div className="row mt-4">
        {products.map((product) => (
          <div className="col-md-3 col-sm-5 mb-5" key={product.id}>
            <div className="card bg-white shadow-sm" style={{ width: "100%", border: "1px solid gray", borderRadius: "8px" }}>
              <div className="text-center">
                <img src={product.image} className="img-fluid" alt={product.name} style={{ height: "200px", objectFit: "cover", width: "80%" }} />
              </div>

              <div className="card-body text-center">
                <h5 className="fw-bold text-success">{product.name}</h5>
                <p className="text-muted">{product.description}</p>

                <div className="mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <i key={i} className={`bi ${i < product.rating ? "bi-star-fill text-warning" : "bi-star text-secondary"}`}></i>
                  ))}
                </div>

                <h5 className="text-dark fw-bold">${product.price}</h5>

                <div className="d-flex justify-content-center gap-2 mt-3">
                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => {
                      setProductData({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        image: product.image,
                        rating: product.rating,
                        category: product.category,
                      });
                      setIsUpdateSidebarOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Sidebar */}
      {isUpdateSidebarOpen && (
        <div className="update-sidebar">
          <h4>Update Product</h4>
          <form onSubmit={handleUpdateProduct}>
            <input type="text" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} placeholder="Name" />
            <input type="text" value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} placeholder="Description" />
            <input type="number" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} placeholder="Price" />
            <input type="text" value={productData.image} onChange={(e) => setProductData({ ...productData, image: e.target.value })} placeholder="Image URL" />
            <input type="number" value={productData.rating} onChange={(e) => setProductData({ ...productData, rating: e.target.value })} placeholder="Rating" />
            <button type="submit" className="btn btn-success">Save Changes</button>
            <button className="btn btn-secondary" onClick={() => setIsUpdateSidebarOpen(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
    
    </>
  );
};

export default Vegetable;
