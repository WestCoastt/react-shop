import React, { useState, useEffect, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Accessory from "./Accessory";
import Cart from "./Cart";
import Digital from "./Digital";
import Fashion from "./Fashion";
import Footer from "./Footer";
import Main from "./Main";
import NotFound from "./NotFound";
import Product from "./Product";

function App() {
  const state = useSelector((state) => state);
  const cart = state.persistedReducer.cart;
  const [theme, setTheme] = useState(localStorage.theme);
  const [darkCheck, setDarkCheck] = useState();
  const [products, setProducts] = useState();
  const [titles, setTitles] = useState([]);
  const sideMenu = useRef();
  const search = useRef();

  const [text, setText] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  useEffect(() => {
    if (products != null) {
      if (text != "") {
        const filtered = products.filter((a) => {
          return a.title.toLowerCase().includes(text);
        });
        setTitles(filtered);
      } else {
        setTitles([]);
      }
    }
  }, [text]);

  {
    !theme && (localStorage.theme = "dark");
  }

  const darkMode = () => {
    theme == "dark"
      ? (localStorage.theme = "light") && setTheme("light")
      : (localStorage.theme = "dark") && setTheme("dark");
  };

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.setAttribute("class", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkCheck(false);
    } else {
      document.documentElement.setAttribute("class", "");
      document.documentElement.setAttribute("data-theme", "light");
      setDarkCheck(true);
    }
  }, [theme]);

  let itemCount = 0;

  cart.map((a) => {
    itemCount += a.count;
  });

  // const counts = cart.map((a) => {
  //   return a.count;
  // });

  // console.log(cart);

  return (
    <>
      <input
        type="checkbox"
        id="side-menu"
        className="drawer-toggle"
        ref={sideMenu}
      ></input>
      <section className="drawer-content">
        <div className="fixed z-10 w-full navbar shadow-lg bg-white dark:bg-neutral text-neutral-content">
          <div className="flex w-full xl:container xl:m-auto">
            <label
              htmlFor="side-menu"
              className="flex-none lg:hidden btn btn-square btn-ghost w-10 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-gray-700 dark:stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <h1 className="shrink-0 flex md:flex-none flex-1 mx-1 sm:mx-2">
              <Link
                to="/"
                className="text-lg text-gray-700 dark:text-white font-bold whitespace-nowrap"
              >
                React Shop
              </Link>
            </h1>
            <div className="flex-none hidden md:flex md:flex-1 ml-2">
              <Link
                to="/fashion"
                className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
              >
                패션
              </Link>
              <Link
                to="/accessory"
                className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
              >
                액세서리
              </Link>
              <Link
                to="/digital"
                className="btn btn-ghost btn-sm rounded-btn text-gray-700 dark:text-white"
              >
                디지털
              </Link>
            </div>
            <div className="flex items-center px-2">
              <label className="swap swap-rotate mr-2 sm:mr-4">
                <input type="checkbox" checked={darkCheck} onClick={darkMode} />
                <svg
                  className="swap-off fill-white w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path>
                </svg>
                <svg
                  className="swap-on fill-black w-7 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path>
                </svg>
              </label>
              <div className="dropdown">
                <button
                  type="button"
                  className="flex sm:hidden w-10 sm:w-auto mx-0 px-0 sm:mx-2 sm:px-2 btn btn-ghost js-search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-gray-700 dark:stroke-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
                <input
                  type="text"
                  ref={search}
                  placeholder="검색"
                  onChange={(e) => setText(e.target.value)}
                  className="fixed left-0 top-4 -z-10 opacity-0 sm:opacity-100 sm:static sm:flex w-full input input-ghost focus:outline-0 rounded-none sm:rounded bg-gray-300 dark:bg-gray-600 !text-gray-800 dark:!text-white sm:transform-none transition-all js-searchInput"
                />

                <ul className="!fixed left-0 sm:!absolute sm:top-14 menu dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600">
                  {titles.map((a) => (
                    <li key={a.id}>
                      <Link
                        key={a.id}
                        to={`/product/${a.id}`}
                        className="text-left js-searchedItem"
                        onClick={() => {
                          search.current.value = "";
                          setTitles([]);
                        }}
                      >
                        <span
                          key={a.id}
                          className="text-gray-600 dark:text-white line-clamp-2"
                        >
                          {a.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/cart" className="btn btn-ghost w-10 sm:w-12 ml-1">
                <span className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-gray-700 dark:stroke-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                  <span className="inline-flex items-center justify-center absolute top-0 right-0 px-2 py-1 rounded-full bg-red-500 text-xs font-bold leading-none text-gray-200 transform translate-x-1/2 -translate-y-1/2">
                    {itemCount}
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/accessory" element={<Accessory />} />
          <Route path="/digital" element={<Digital />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer></Footer>
      </section>
      <div className="drawer-side">
        <label htmlFor="side-menu" className="drawer-overlay"></label>
        <ul className="menu w-60 sm:w-80 p-4 overflow-y-auto bg-white dark:bg-base-100">
          <li>
            <Link
              className="!text-gray-700 active:!text-white dark:!text-white"
              to="/fashion"
              onClick={() => {
                sideMenu.current.click();
              }}
            >
              패션
            </Link>
          </li>
          <li>
            <Link
              className="!text-gray-700 active:!text-white dark:!text-white"
              to="/accessory"
              onClick={() => {
                sideMenu.current.click();
              }}
            >
              액세서리
            </Link>
          </li>
          <li>
            <Link
              className="!text-gray-700 active:!text-white dark:!text-white"
              to="/digital"
              onClick={() => {
                sideMenu.current.click();
              }}
            >
              디지털
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
