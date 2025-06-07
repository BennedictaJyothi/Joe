import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 
import casual from "./assets/casual.jpg";
import evening from "./assets/evening.jpg";
import party from "./assets/party.jpg";
import formal from "./assets/formal.jpg";
import summer from "./assets/summer.jpg";
import winter from "./assets/winter.jpg";

function App() {
  const [cart, setCart] = useState([]);

  const dresses = [
    { name: "Casual Wear", price: "$49", size: "XS, S, M", image: casual },
    { name: "Evening Gown", price: "$129", size: "M, L, XL", image: evening },
    { name: "Party Dress", price: "$99", size: "S, M, L", image: party },
    { name: "Formal Suit", price: "$199", size: "M, L, XL", image: formal },
    { name: "Summer Dress", price: "$59", size: "XS, S, M", image: summer },
    { name: "Winter Coat", price: "$149", size: "M, L, XL", image: winter },
  ];


  const handleAddToCart = (item) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.name === item.name && cartItem.size === item.size
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <Router>
      <header className="bg-dark text-light text-center py-4 shadow-sm">
        <h1 className="display-4 text-warning">Fashion Boutique</h1>
        <nav className="mt-3">
          <Link to="/" className="btn btn-outline-warning mx-2">
            Home
          </Link>
          <Link to="/cart" className="btn btn-outline-warning mx-2">
            Cart ({cart.length})
          </Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div className="container my-5">
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {dresses.map((dress, index) => (
                  <DressCard key={index} dress={dress} />
                ))}
              </div>
            </div>
          }
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} setCart={setCart} />}
        />
        <Route
          path="/details/:name"
          element={<Details dresses={dresses} onAddToCart={handleAddToCart} />}
        />
      </Routes>

      <footer className="bg-dark text-light text-center py-4 shadow-sm">
        <p>© 2025 Fashion Boutique. All Rights Reserved.</p>
      </footer>
    </Router>
  );
}


function DressCard({ dress }) {
  const navigate = useNavigate();
  return (
    <div className="col">
      <div className="card border-0 rounded-3 h-100 shadow-lg hover-effect">
        <img
          src={dress.image}
          alt={dress.name}
          className="card-img-top rounded-top"
          style={{ height: "550px", objectFit: "cover", cursor: "pointer" }}
          onClick={() => navigate(`/details/${encodeURIComponent(dress.name)}`)}
        />
        <div className="card-body d-flex flex-column bg-light">
          <h5 className="card-title text-center text-dark">{dress.name}</h5>
          <p className="card-text text-center text-secondary">Price: {dress.price}</p>
          <p className="card-text text-center text-muted">Sizes: {dress.size}</p>
        </div>
      </div>
    </div>
  );
}
function Cart({ cart, setCart }) {
  const calculateTotal = () =>
    cart.reduce((total, item) => total + parseInt(item.price.slice(1)) * item.quantity, 0);

  const handleRemoveFromCart = (name) => {
    setCart(cart.filter((item) => item.name !== name));
  };

  const handleQuantityChange = (name, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map((item) =>
      item.name === name ? { ...item, quantity } : item
    ));
  };

  return (
    <div className="container my-5">
      <h2 className="text-dark">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                key={item.name}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-thumbnail"
                    style={{ width: "150px", height: "auto", marginRight: "10px" }}
                  />
                  <strong>{item.name}</strong> - {item.price}
                </div>
                <div>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
                    style={{ width: "60px", display: "inline-block", marginRight: "10px" }}
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveFromCart(item.name)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h4 className="mt-4">Total: ${calculateTotal()}</h4>
          <Link to="/" className="btn btn-warning mt-4">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

function Details({ dresses, onAddToCart }) {
  const { name } = useParams();
  const dress = dresses.find((dress) => dress.name === name);
  const [selectedSize, setSelectedSize] = useState("");

  if (!dress) {
    return (
      <div className="container my-5">
        <h2>Dress Not Found</h2>
      </div>
    );
  }
  const sizePrices = {
    XS: "$49",
    S: "$59",
    M: "$69",
    L: "$79",
    XL: "$89",
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    const selectedItem = {
      ...dress,
      size: selectedSize,
      price: sizePrices[selectedSize],
    };
    onAddToCart(selectedItem);
    alert(`${dress.name} (Size: ${selectedSize}) added to the cart!`);
  };

  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={dress.image}
            alt={dress.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-dark">{dress.name}</h2>
          <p>
            <strong>Description:</strong> A beautiful {dress.name.toLowerCase()} perfect for any occasion.
          </p>
          <p>
            <strong>Select Size:</strong>
          </p>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {Object.keys(sizePrices).map((size) => (
              <button
                key={size}
                className={`btn ${
                  selectedSize === size ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleSizeClick(size)}
              >
                Size {size}: {sizePrices[size]}
              </button>
            ))}
          </div>
          <button className="btn btn-success me-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link to="/" className="btn btn-warning">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
export default App;