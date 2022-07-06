import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

export default function Fashion() {
  const [mens, setMens] = useState();
  const [womens, setWomens] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/men's clothing")
      .then((res) => res.json())
      .then((json) => setMens(json));
    fetch("https://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((json) => setWomens(json));
  }, []);

  return (
    <section className="main pt-16">
      <section className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>홈</li>
            <li>패션</li>
          </ul>
        </div>
        <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
            패션
          </h2>

          {(mens == null) | (womens == null) ? (
            <Loader></Loader>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
              {mens.map((a) => (
                <Link
                  to={`/product/${a.id}`}
                  key={a.id}
                  className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
                >
                  <figure className="flex h-80 bg-white overflow-hidden">
                    <img
                      className="transition-transform duration-300"
                      src={a.image}
                      alt="상품 이미지"
                    />
                  </figure>
                  <div className="card-body bg-gray-100 dark:bg-gray-700">
                    <p className="card-title text-base">{a.title}</p>
                    <p>{"$" + Math.round(a.price)}</p>
                  </div>
                </Link>
              ))}
              {womens.map((a) => (
                <Link
                  to={`/product/${a.id}`}
                  key={a.id}
                  className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
                >
                  <figure className="flex h-80 bg-white overflow-hidden">
                    <img
                      className="transition-transform duration-300"
                      src={a.image}
                      alt="상품 이미지"
                    />
                  </figure>
                  <div className="card-body bg-gray-100 dark:bg-gray-700">
                    <p className="card-title text-base">{a.title}</p>
                    <p>{"$" + Math.round(a.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </article>
      </section>
    </section>
  );
}
