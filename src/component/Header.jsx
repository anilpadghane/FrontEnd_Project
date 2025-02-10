
import logo from '../Assests/logo.png'
import './Header.css'

const Header = () => {
 
  return (
    <header className="d-flex align-items-center justify-content-between px-4 py-3 ">
      {/* Logo */}
      <div className="d-flex align-items-center">
        <img
          src={logo}
          alt="Logo"
          className="me-2"
          style={{ width: "180px", height: "30px" }}
        />
        
      </div>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mx-2">
  <div className="input-group" style={{ maxWidth: '600px', width: '100%' }}>
    {/* Dropdown for Product Categories */}
    <select
        className="form-select"
        style={{
          maxWidth: '150px',
          borderRadius: 0,
          border: '1px solidrgb(109, 109, 110)',
          color: 'grey', // Grey text for placeholder
         
          backgroundColor: 'white', // Light background for an attractive appearance
        }}
        aria-label="Search Category"
        defaultValue="placeholder"
      >
      <option value="all" defaultValue>
        Category
      </option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="books">Books</option>
      <option value="home-appliances">Home Appliances</option>
    </select>

    {/* Text Input for Search */}
    <input
      type="text"
      className="form-control border-start-0 border-end-0"
      style={{
        borderRadius: 0, // Remove rounded corners
      }}
      placeholder="Search products..."
      aria-label="Search"
    />

    {/* Search Button */}
    <button
      className="btn border-start-0"
      type="button"
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ced4da',
        borderRadius: 0, // Remove rounded corners
      }}
    >
      <i className="bi bi-search" />
    </button>
  </div>
</div>


      {/* Right Icons */}
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-link text-dark" aria-label="Login">
          <i className="bi bi-person icon"  ></i>
        </button>
        <button className="btn btn-link text-dark" aria-label="Wishlist">
          <i className='bi bi-heart icon-heart'  />
        </button>
        <button  className="btn btn-link text-dark" aria-label="Cart">
          <i className="bi bi-cart3 icon" />
        </button>
      </div>
    </header>
  )
}

export default Header
