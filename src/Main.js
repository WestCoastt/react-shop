import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Main() {
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products?limit=12`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <>
      <section className="main pt-16">
        <Carousel
          className="carousel-container"
          infiniteLoop
          autoPlay
          showThumbs={false}
          showStatus={false}
        >
          <div className="carousel-slide">
            <div className="carousel-description absolute left-auto right-auto bottom-1/3 mb-10 text-left w-full lg:container px-4 md:px-10">
              <h2 className="text-2xl lg:text-4xl font-bold text-white">
                물빠진 청바지!
              </h2>
              <p className="my-2 text-white">
                이제 막 도착한 패션 청바지를 구경해 보세요.
              </p>
              <Link className="btn btn-sm lg:btn-md mt-3" to="/fashion">
                바로가기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
            <img src="/assets/fashion.jpeg" alt="fashion" />
          </div>
          <div className="carousel-slide">
            <div className="carousel-description absolute left-auto right-auto bottom-1/3 mb-10 text-left w-full lg:container px-4 md:px-10">
              <h2 className="text-2xl lg:text-4xl font-bold text-white">
                신속한 업무처리!
              </h2>
              <p className="my-2 text-white">
                다양한 디지털 상품을 둘러보세요.
              </p>
              <a className="btn btn-sm lg:btn-md mt-3" href="/digital">
                바로가기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
            <img src="/assets/digital.jpeg" alt="digital" />
          </div>
          <div className="carousel-slide">
            <div className="carousel-description absolute left-auto right-auto bottom-1/3 mb-10 text-left w-full lg:container px-4 md:px-10">
              <h2 className="text-2xl lg:text-4xl font-bold text-white">
                신선한 식품!
              </h2>
              <p className="my-2 text-white">
                농장 직배송으로 더욱 신선한 식료품을 만나보세요.
              </p>
              <Link className="btn btn-sm lg:btn-md mt-3" to="/grocery">
                바로가기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
            <img src="/assets/grocery.jpeg" alt="grocery" />
          </div>
        </Carousel>

        <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mt-10 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
            패션
          </h2>
          {products == null ? (
            <Loader></Loader>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
              {products.slice(0, 4).map((a) => (
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
        </section>
        <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
            액세서리
          </h2>
          {products == null ? (
            <Loader></Loader>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
              {products.slice(4, 8).map((a) => (
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
        </section>
        <section className="pt-6 lg:pt-12 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
          <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
            디지털
          </h2>
          {products == null ? (
            <Loader></Loader>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list">
              {products.slice(8, 12).map((a) => (
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
        </section>
      </section>
    </>
  );
}
