
import React from "react";
import { Link } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import { useCart } from "../../context/CartContext";

const FREE_DELIVERY_LIMIT = 499;
const DELIVERY_CHARGE = 40;

const formatPrice = (price) =>
  `₹${Number(price || 0).toFixed(2)}`;

const ShopCart = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const deliveryCharge =
    cartItems.length === 0 || cartTotal >= FREE_DELIVERY_LIMIT
      ? 0
      : DELIVERY_CHARGE;

  const grandTotal = cartTotal + deliveryCharge;

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_LIMIT - cartTotal
  );

  return (
    <>
      <ScrollToTop />

      <section className="mb-lg-14 mb-8 mt-8">
        <div className="container">

          {/* Header */}
          <div className="card py-4 border-0 mb-5">
            <h1 className="fw-bold">My Shopping Cart</h1>

            <p className="mb-0 text-muted">
              {cartCount} items in your cart
            </p>
          </div>

          <div className="row">

            {/* Cart Products */}
            <div className="col-lg-8 col-md-7">

              {cartItems.length > 0 ? (
                <>
                  {/* Free delivery message */}
                  <div
                    className={`alert ${
                      cartTotal >= FREE_DELIVERY_LIMIT
                        ? "alert-success"
                        : "alert-info"
                    }`}
                    role="status"
                  >
                    {cartTotal >= FREE_DELIVERY_LIMIT ? (
                      <strong>
                        Congratulations! You have FREE delivery.
                      </strong>
                    ) : (
                      <>
                        Add products worth{" "}
                        <strong>
                          {formatPrice(remainingForFreeDelivery)}
                        </strong>{" "}
                        more to get FREE delivery.
                      </>
                    )}
                  </div>

                  {/* Cart list */}
                  <ul className="list-group list-group-flush">

                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item py-4 px-0"
                      >
                        <div className="row align-items-center">

                          {/* Product image */}
                          <div className="col-3 col-md-2">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name || item.title}
                                className="img-fluid rounded"
                                style={{
                                  width: "100%",
                                  height: "90px",
                                  objectFit: "contain",
                                }}
                              />
                            ) : (
                              <div
                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                style={{ height: "90px" }}
                              >
                                <i className="bi bi-basket fs-2 text-muted" />
                              </div>
                            )}
                          </div>

                          {/* Product details */}
                          <div className="col-5 col-md-5">

                            <h6 className="mb-1">
                              {item.name || item.title || "Product"}
                            </h6>

                            <small className="text-muted">
                              {item.category || "Grocery"}
                            </small>

                            <div className="mt-2">
                              <span className="fw-semibold">
                                {formatPrice(item.price)}
                              </span>
                              {" "}per item
                            </div>

                            <button
                              type="button"
                              className="btn btn-link text-danger p-0 mt-2 text-decoration-none small"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="bi bi-trash me-1" />
                              Remove
                            </button>

                          </div>

                          {/* Quantity controls */}
                          <div className="col-4 col-md-2">

                            <div className="d-flex align-items-center justify-content-center border rounded">

                              <button
                                type="button"
                                className="btn btn-sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>

                              <span className="fw-bold px-2">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                className="btn btn-sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                aria-label="Increase quantity"
                              >
                                +
                              </button>

                            </div>

                          </div>

                          {/* Item total */}
                          <div className="col-12 col-md-3 text-md-end mt-3 mt-md-0">

                            <strong>
                              {formatPrice(
                                Number(item.price || 0) *
                                item.quantity
                              )}
                            </strong>

                          </div>

                        </div>
                      </li>
                    ))}

                  </ul>

                  {/* Cart actions */}
                  <div className="d-flex justify-content-between flex-wrap gap-3 mt-4">

                    <Link
                      to="/Shop"
                      className="btn btn-outline-primary"
                    >
                      <i className="bi bi-arrow-left me-2" />
                      Continue Shopping
                    </Link>

                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={clearCart}
                    >
                      <i className="bi bi-trash me-2" />
                      Clear Cart
                    </button>

                  </div>
                </>
              ) : (

                /* Empty cart */
                <div className="card border-0 shadow-sm text-center p-5">

                  <i className="bi bi-cart-x display-1 text-muted" />

                  <h3 className="mt-3">
                    Your cart is empty!
                  </h3>

                  <p className="text-muted">
                    Add your favourite grocery products to get started.
                  </p>

                  <div>
                    <Link
                      to="/Shop"
                      className="btn btn-primary mt-3"
                    >
                      Start Shopping
                    </Link>
                  </div>

                </div>
              )}

            </div>

            {/* Order Summary */}
            <div className="col-lg-4 col-md-5 mt-5 mt-md-0">

              <div className="card shadow-sm border-0">

                <div className="card-body">

                  <h4 className="fw-bold mb-4">
                    Order Summary
                  </h4>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Items ({cartCount})</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <span>Delivery Charges</span>

                    {deliveryCharge === 0 ? (
                      <span className="text-success fw-bold">
                        FREE
                      </span>
                    ) : (
                      <strong>
                        {formatPrice(deliveryCharge)}
                      </strong>
                    )}
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="fw-bold">
                      Grand Total
                    </h5>

                    <h5 className="fw-bold text-success">
                      {formatPrice(grandTotal)}
                    </h5>
                  </div>

                  {cartItems.length > 0 && (
                    <Link
                      to="/ShopCheckOut"
                      className="btn btn-primary w-100"
                    >
                      Proceed to Checkout
                      <i className="bi bi-arrow-right ms-2" />
                    </Link>
                  )}

                  <div className="mt-3 text-center">
                    <small className="text-muted">
                      Safe and secure shopping
                    </small>
                  </div>

                </div>

              </div>

              {/* Delivery information */}
              <div className="card border-0 shadow-sm mt-4">

                <div className="card-body">

                  <h6 className="fw-bold">
                    <i className="bi bi-truck text-success me-2" />
                    Delivery Benefits
                  </h6>

                  <p className="small text-muted mb-0">
                    Get free delivery on orders above{" "}
                    {formatPrice(FREE_DELIVERY_LIMIT)}.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default ShopCart;
