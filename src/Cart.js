import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { increment, decrement, removeItem, removeAll } from "./store";

export default function Cart() {
  const [products, setProducts] = useState();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const cart = state.persistedReducer.cart;
  const [items, setItems] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  useEffect(() => {
    if (products != null) {
      const results = cart.map((a) => {
        const result = products.find((product) => {
          return a.id == product.id;
        });
        return result;
      });
      setItems(results);
    }
  }, [products, cart]);

  function findIdx(b) {
    return cart.findIndex((a) => {
      return a.id == b;
    });
  }

  useEffect(() => {
    if (items != null) {
      const prices = items.map((item) => {
        return Math.round(item.price) * cart[findIdx(item.id)].count;
      });

      const total = prices.reduce(function (a, b) {
        return a + b;
      }, 0);
      setTotalPrice(total.toLocaleString("en-US"));
    }
  }, [items]);

  return (
    <section className="main pt-16">
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>홈</li>
            <li>장바구니</li>
          </ul>
        </div>
        <div className="mt-6 md:mt-14 px-2 lg:px-0">
          {(cart == null) | ((cart !== null) & (cart.length == 0)) ? (
            <>
              <h1 className="text-2xl">장바구니에 물품이 없습니다.</h1>
              <Link to="/" className="btn btn-primary mt-10">
                담으러 가기
              </Link>
            </>
          ) : (
            <div></div>
          )}

          <div className="lg:flex justify-between mb-20">
            {items != null ? (
              <div>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="lg:flex lg:items-center mt-4 px-2 lg:px-0"
                  >
                    <Link to={`/product/${item.id}`}>
                      <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
                        <img
                          className="object-contain w-full h-48"
                          src={item.image}
                          alt={item.title}
                        />
                      </figure>
                    </Link>

                    <div className="card-body px-1 lg:px-12">
                      <h2 className="card-title">
                        <Link
                          to={`/product/${item.id}`}
                          className="link link-hover"
                        >
                          {item.title}
                        </Link>
                      </h2>
                      <p className="mt-2 mb-4 text-3xl">
                        $
                        {cart[findIdx(item.id)] != null &&
                          (
                            Math.round(item.price) *
                            cart[findIdx(item.id)].count
                          ).toLocaleString("en-US")}
                      </p>
                      <div className="card-actions">
                        <div className="btn-group">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              {
                                cart[findIdx(item.id)].count == 1
                                  ? dispatch(removeItem(item.id))
                                  : dispatch(decrement(item.id));
                              }
                            }}
                          >
                            -
                          </button>
                          <button className="btn btn-ghost no-animation">
                            {cart[findIdx(item.id)] != null &&
                              cart[findIdx(item.id)].count}
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              dispatch(increment(item.id));
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {(cart.length != 0) & (products == null) ? (
              <div className="w-full">
                <Loader></Loader>
              </div>
            ) : null}

            {cart.length != 0 && (
              <div className="self-start shrink-0 flex items-center mt-10 mb-20">
                <span className="text-xl md:text-2xl">
                  총 : ${(cart == null) | (cart.length == 0) ? 0 : totalPrice}
                </span>
                <label
                  htmlFor="confirm-modal"
                  className="modal-button btn btn-primary ml-5"
                  onClick={() => {}}
                >
                  구매하기
                </label>
              </div>
            )}
          </div>
        </div>
        <input type="checkbox" id="confirm-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">정말로 구매하시겠습니까?</h3>
            <p className="py-4">장바구니의 모든 상품들이 삭제됩니다.</p>
            <div className="modal-action">
              <label
                for="confirm-modal"
                className="btn btn-primary"
                data-cart="[object Object]"
                onClick={() => {
                  dispatch(removeAll());
                }}
              >
                네
              </label>
              <label for="confirm-modal" className="btn btn-outline">
                아니오
              </label>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
