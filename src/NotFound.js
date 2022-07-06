import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="main pt-16">
      <h1 className="mt-20 sm:mt-28 text-center text-4xl sm:text-9xl font-bold">
        404
      </h1>
      <p className="mt-4 mb-5 sm:mb-10 text-center text-lg sm:text-3xl">
        페이지를 찾을 수 없습니다.
      </p>
      <div className="text-center">
        <Link className="btn btn-md sm:btn-lg btn-primary sm:w-40" to="/">
          메인으로
        </Link>
      </div>
    </section>
  );
}
