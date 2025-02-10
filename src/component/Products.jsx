import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import SidebarUpdate from "./SidebarUpdate";
import Header from "./Header";
import Navbar from "./Navbar";
import PopUpCard from "./PopUpCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUpdateSidebarOpen, setIsUpdateSidebarOpen] = useState(false);
  const [productData, setProductData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    rating: 0,
    category: "snack_spices",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const categories = ["snack_spices", "fruits", "vegetable"];
      const responses = await Promise.all(
        categories.map((category) => axios.get(`http://localhost:3000/${category}`))
      );

      const allProducts = responses.flatMap((response, index) =>
        response.data.map((product) => ({ ...product, category: categories[index] }))
      );

      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Handle input changes in the sidebar forms
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/${productData.category}`, productData);
      setProducts([...products, response.data]);
      resetForm(); // Reset form
      setIsSidebarOpen(false); // Close sidebar
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!productData.id || !productData.category) {
      console.error("No product ID or category found for update!");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/${productData.category}/${productData.id}`, productData);
      setProducts(products.map((product) => 
        product.id === productData.id ? response.data : product
      ));
      resetForm(); // Reset form
      setIsUpdateSidebarOpen(false); // Close update sidebar
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id, category) => {
    try {
      await axios.delete(`http://localhost:3000/${category}/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setProductData({ id: "", name: "", description: "", price: "", image: "", rating: 0, category: "snack_spices" });
  };

  return (
    <>
    <Header/>
    <Navbar/>
    <PopUpCard/>
    <div className="container mt-5">
      <h2 className="text-center text-success fw-bold mb-4">Product List</h2>

      {/* Cart Icon to open add product sidebar */}
      <div
        className="cart-icon p-3 "
        onClick={() => {
          resetForm(); // Reset form before opening
          setIsSidebarOpen(true);
        }}
        style={{ position: "relative", top: "10px", right: "20px", cursor: "pointer" }}
      >
       <button className="btn btn-success  fw-bold"> Add Product <i className="bi-file-plus-fill text-light p-3" style={{ fontSize: "2rem", color: "black" }}></i></button> 
      </div>

      {/* Sidebar for adding product */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onSubmit={handleAddProduct}
        productData={productData}
        onInputChange={handleInputChange}
      />

      {/* Sidebar for updating product */}
      <SidebarUpdate
        isOpen={isUpdateSidebarOpen}
        onClose={() => setIsUpdateSidebarOpen(false)}
        onSubmit={handleUpdateProduct}
        productData={productData}
        onInputChange={handleInputChange}
      />

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
                  {/* Open update sidebar */}
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
                        category: product.category, // Ensure correct category is set
                      });
                      setIsUpdateSidebarOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id, product.category)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Products;
