
import React from "react";
import Swal from "sweetalert2";

import { useCart } from "../context/CartContext";

import product1 from "../images/category-baby-care.jpg";
import product2 from "../images/category-atta-rice-dal.jpg";
import product3 from "../images/category-bakery-biscuits.jpg";
import product4 from "../images/category-chicken-meat-fish.jpg";
import product5 from "../images/category-cleaning-essentials.jpg";
import product6 from "../images/category-dairy-bread-eggs.jpg";
import product7 from "../images/category-instant-food.jpg";
import product8 from "../images/category-pet-care.jpg";
import product9 from "../images/category-snack-munchies.jpg";
import product10 from "../images/category-tea-coffee-drinks.jpg";

const products = [
  {
    id: "popular-1",
    name: "Haldiram's Sev Bhujia",
    category: "Snack & Munchies",
    price: 18,
    oldPrice: 24,
    image: product1,
    rating: 4.5,
    reviews: 149,
    badge: "Sale",
  },
  {
    id: "popular-2",
    name: "NutriChoice Digestive",
    category: "Bakery & Biscuits",
    price: 24,
    image: product2,
    rating: 4.5,
    reviews: 25,
  },
  {
    id: "popular-3",
    name: "Cadbury 5 Star Chocolate",
    category: "Bakery & Biscuits",
    price: 32,
    oldPrice: 35,
    image: product3,
    rating: 5,
    reviews: 469,
    badge: "14%",
  },
  {
    id: "popular-4",
    name: "Onion Flavour Potato",
    category: "Snack & Munchies",
    price: 3,
    oldPrice: 5,
    image: product4,
    rating: 3.5,
    reviews: 456,
    badge: "Hot",
  },
  {
    id: "popular-5",
    name: "Salted Instant Popcorn",
    category: "Instant Food",
    price: 13,
    oldPrice: 18,
    image: product5,
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "popular-6",
    name: "Blueberry Greek Yogurt",
    category: "Dairy, Bread & Eggs",
    price: 18,
    oldPrice: 24,
    image: product6,
    rating: 4.5,
    reviews: 85,
  },
  {
    id: "popular-7",
    name: "Britannia Cheese Slices",
    category: "Dairy, Bread & Eggs",
    price: 24,
    image: product7,
    rating: 4.5,
    reviews: 90,
  },
  {
    id: "popular-8",
    name: "Kellogg's Original Cereals",
    category: "Instant Food",
    price: 32,
    oldPrice: 35,
    image: product8,
    rating: 4.5,
    reviews: 120,
  },
  {
    id: "popular-9",
    name: "Slurrp Millet Chocolate",
    category: "Snack & Munchies",
    price: 3,
    oldPrice: 5,
    image: product9,
    rating: 4,
    reviews: 65,
  },
  {
    id: "popular-10",
    name: "Amul Butter - 500 g",
    category: "Dairy, Bread & Eggs",
    price: 13,
    oldPrice: 18,
    image: product10,
    rating: 4.5,
    reviews: 150,
  },
];

const ProductItem = () => {
  const {
    cartItems,
    addToCart,
    updateQuantity,
  } = useCart();

  const handleAddClick = (product) => {
    addToCart(product);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `${product.name} added to cart`,
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    });
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    return item ? item.quantity : 0;
  };

  return (
    <section className="my-lg-14 my-8">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <div className="section-head text-center mt-8">
              <h3
                className="h3style"
                data-title="Popular Products"
              >
                Popular Products
              </h3>

              <div className="wt-separator bg-primarys" />
              <div className="wt-separator2 bg-primarys" />
            </div>
          </div>
        </div>

        <div className="row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3">
          {products.map((product) => {
            const quantity = getCartQuantity(product.id);

            return (
              <div className="col fade-zoom" key={product.id}>
                <div className="card card-product h-100">
                  <div className="card-body">
                    <div className="text-center position-relative">
                      {product.badge && (
                        <div className="position-absolute top-0 start-0">
                          <span
                            className={`badge ${
                              product.badge === "Hot"
                                ? "bg-danger"
                                : product.badge === "Sale"
                                ? "bg-danger"
                                : "bg-success"
                            }`}
                          >
                            {product.badge}
                          </span>
                        </div>
                      )}

                      <img
                        src={product.image}
                        alt={product.name}
                        className="mb-3 img-fluid"
                      />

                      <div className="card-product-action">
                        <button
                          type="button"
                          className="btn-action"
                          title="Quick View"
                          onClick={() =>
                            Swal.fire({
                              title: product.name,
                              text: `Price: ₹${product.price}`,
                              imageUrl: product.image,
                              imageWidth: 180,
                              imageAlt: product.name,
                              confirmButtonText: "Close",
                            })
                          }
                        >
                          <i className="bi bi-eye" />
                        </button>

                        <button
                          type="button"
                          className="btn-action"
                          title="Wishlist"
                          onClick={() =>
                            Swal.fire(
                              "Wishlist",
                              "Wishlist integration will be implemented next.",
                              "info"
                            )
                          }
                        >
                          <i className="bi bi-heart" />
                        </button>

                        <button
                          type="button"
                          className="btn-action"
                          title="Compare"
                          onClick={() =>
                            Swal.fire(
                              "Compare",
                              "Product comparison will be implemented later.",
                              "info"
                            )
                          }
                        >
                          <i className="bi bi-arrow-left-right" />
                        </button>
                      </div>
                    </div>

                    <div className="text-small mb-1">
                      <span className="text-muted">
                        <small>{product.category}</small>
                      </span>
                    </div>

                    <h2 className="fs-6">
                      <span className="text-inherit text-decoration-none">
                        {product.name}
                      </span>
                    </h2>

                    <div>
                      <small className="text-warning">
                        {Array.from(
                          { length: 5 },
                          (_, index) => (
                            <i
                              key={index}
                              className={
                                index + 1 <= Math.floor(product.rating)
                                  ? "bi bi-star-fill"
                                  : index < product.rating
                                  ? "bi bi-star-half"
                                  : "bi bi-star"
                              }
                            />
                          )
                        )}
                      </small>

                      <span className="text-muted small">
                        {" "}
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div>
                        <span className="text-dark">
                          ₹{product.price}
                        </span>

                        {product.oldPrice && (
                          <span className="text-decoration-line-through text-muted ms-2">
                            ₹{product.oldPrice}
                          </span>
                        )}
                      </div>

                      {quantity === 0 ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleAddClick(product)}
                        >
                          <i className="bi bi-plus-lg me-1" />
                          Add
                        </button>
                      ) : (
                        <div
                          className="d-flex align-items-center border rounded"
                          style={{ gap: "12px", padding: "4px 8px" }}
                        >
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                quantity - 1
                              )
                            }
                            aria-label={`Decrease ${product.name}`}
                          >
                            −
                          </button>

                          <span className="fw-bold">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                quantity + 1
                              )
                            }
                            aria-label={`Increase ${product.name}`}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductItem;
