import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { increment, addItem } from "./store";

export default function Product() {
  let { id } = useParams();
  const [product, setProduct] = useState();
  const [checked, setChecked] = useState();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const cart = state.persistedReducer.cart;

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, [id]);

  useEffect(() => {
    if (product != null) {
      setChecked(new Array(Math.floor(product.rating.rate / 0.5)).fill(true));
    }
  }, [product]);

  const addToCart = () => {
    const result = cart.find((a) => {
      return a.id == id;
    });

    if (result == null) {
      dispatch(addItem({ id: Number(id), count: 1 }));
    } else {
      dispatch(increment(id));
    }
  };

  return (
    <section className="main pt-16">
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        {product == null ? (
          <Loader></Loader>
        ) : (
          <div>
            <div className="text-sm breadcrumbs">
              <ul>
                <li>
                  {(product.category == "men's clothing") |
                  (product.category == "women's clothing")
                    ? "패션"
                    : product.category == "jewelery"
                    ? "액세서리"
                    : product.category == "electronics" && "디지털"}
                </li>
                <li>{product.title}</li>
              </ul>
            </div>
            <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
              <figure
                className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image"
                data-v-73581b5a
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain w-full h-72"
                ></img>
              </figure>
              <div className="card-body px-1 lg:px-12">
                <h2 className="card-title">
                  {product.title}
                  <span className="badge badge-accent ml-2">NEW</span>
                </h2>
                <p>{product.description}</p>
                <div className="flex items-center mt-3">
                  {checked && (
                    <>
                      <div className="rating rating-half">
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                          disabled
                          checked={checked[0]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                          disabled
                          checked={checked[1]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                          disabled
                          checked={checked[2]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                          disabled
                          checked={checked[3]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                          disabled
                          checked={checked[4]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                          disabled
                          checked={checked[5]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                          disabled
                          checked={checked[6]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                          disabled
                          checked={checked[7]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-1"
                          disabled
                          checked={checked[8]}
                        />
                        <input
                          type="radio"
                          name="rating-10"
                          className="bg-yellow-400 cursor-default mask mask-star-2 mask-half-2"
                          disabled
                          checked={checked[9]}
                        />
                      </div>
                    </>
                  )}

                  <div className="ml-2">
                    {product.rating.rate +
                      " / " +
                      product.rating.count +
                      " 참여"}
                  </div>
                </div>
                <p className="mt-2 mb-4 text-3xl">
                  ${Math.round(product.price).toLocaleString("en-US")}
                </p>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={addToCart}>
                    장바구니에 담기
                  </button>
                  <Link to="/cart" className="btn btn-outline ml-1">
                    장바구니로 이동
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
}
