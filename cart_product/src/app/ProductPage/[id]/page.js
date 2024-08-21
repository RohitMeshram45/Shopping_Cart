"use client";

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../../Context/page";  // Adjust the path according to your setup
import productData from "../../data.json"
import Link from "next/link";

const ProductPage = ({ params }) => {
  const { getTotal, addToCart } = useContext(CartContext);  // Fetch products from your context

  const id = params.id;

  if (!id) {
    return <p>Loading...</p>;  // Handle the case when id is not available yet
  }
  // Find the product with the matching ID
  const product = productData.products.find((item) => (parseInt(id) === item.id));

  // If the product is not found, show an error message
  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="  w-full bg-slate-400 h-32">
      <Link href={"/Cart"} className="flex items-center gap-2 text-lg text-white absolute left-10 top-14 bg-yellow-400 px-3 py-1">
        <svg className="NwyjNT" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path className="" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
        Home
      </Link>
      <span>
      <Link href={"/ Cart"} className="flex items-center gap-2 text-lg text-white absolute right-44 top-16 bg-yellow-400 px-3 py-1">
        <svg className="NwyjNT" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path className="" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
        My Cart
      </Link>
      </span>
      <div className="flex gap-28 items-center justify-center relative top-48   ">
        <div>
          <h1 className="text-8xl py-7">{product.brand}</h1>
          <h1>{product.name}</h1>
          <p className="py-3">{product.description}</p>
          <div>
            <div className="flex justify-between mt-2 text-lg font-semibold">
              <span className=" gap-1">
                <span>Size : </span>
                <select className=" border-2 border-slate-950">
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </span>
              <h2 className="text-2xl text-gray-900 font-medium title-font mb-4">
                Rs.{Math.floor(product.price)}
              </h2>
            </div>

            {/* Add a button to add the product to the cart */}
            <button onClick={() => addToCart(product)} className="text-xl rounded-md mt-5 font-medium bg-yellow-400 text-white p-2 flex items-center gap-2">
              <svg className="NwyjNT" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path className="" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
              Add to Cart</button>
          </div>
        </div>
        <img src={product.imageUrl} className="hover:scale-105" alt={product.name} style={{ width: "300px"}} />
      </div>
    </div>
  );
};

export default ProductPage;
