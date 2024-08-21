"use client"
import Image from "next/image";
import React, { useContext } from 'react'
import productData from "../data.json"

import { CartContext } from "../Context/page"
import Link from "next/link";

const MyCart = () => {

  const { cartItems, addToCart, minusProduct, removeItem ,getTotal} = useContext(CartContext);

  console.log(cartItems)
  return (
    <>
      <section className="text-gray-600 body-font">
        <span className="flex justify-center ">
          <h1 className="text-6xl text-center mt-10 font-extrabold shadow-xl drop-shadow-xl shadow-inherit"> My Cart Products</h1>
          <Link href={"/Payment"} className="flex items-center gap-2 text-lg text-white absolute right-44 top-28 bg-yellow-400 px-3 py-1">
            <svg className="NwyjNT" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path className="" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
            Total - {
             Math.floor(getTotal())
            }
          </Link>
        </span>
        <Link href={"/Cart"} className="flex items-center gap-2 text-lg text-white absolute left-10 top-28 bg-yellow-400 px-3 py-1">
        <svg className="NwyjNT" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path className="" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
        Home
      </Link>
      
        <div className="container px-6 py-20 mx-auto">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {cartItems.map((product, index) => (
              <li key={index} className="p-4 list-none">
                <div className="p-3 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300">
                  <img
                    className="h-60 rounded w-full object-contain my-5 hover:scale-105"
                    src={product.imageUrl}
                    alt="content"
                  />
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {product.name}
                  </h3>
                  <h2 className="text-xl text-gray-900 font-medium title-font mb-4">
                    {product.title}
                  </h2>
                  <span className="leading-relaxed text-base">{product.description}</span>
                  <div className="flex justify-between mt-2 text-lg font-semibold">
                    <span>
                      Size :
                      <select>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>

                    </span>
                    <h2 className="text-xl text-gray-900 font-medium title-font mb-4">
                      Rs.{Math.floor(product.price)}
                    </h2>
                  </div>
                  <div className="flex gap-2 p-2   justify-between items-center hover:scale-105">
                    <span className="flex gap-2 px-2 py-1 bg-yellow-400 w-32 justify-center items-center hover:scale-105">
                      <svg className="NwyjNT" width="16" height="16" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path className="" d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86" fill="#fff"></path></svg>
                      <button onClick={() => removeItem(product.id)} className="text-xl font-medium  text-white">Remove </button>
                    </span>
                    <h1 className="text-xl font-medium " >Quantity :
                    <span className="flex gap-2">
                    <img onClick={()=>addToCart(product)} className="cursor-pointer" width="25" height="22" src="https://img.icons8.com/windows/32/add--v1.png" alt="add--v1"/>
                    {product.quantity}
                    <img onClick={()=>minusProduct(product)}  className="cursor-pointer" width="25" height="22" src="https://img.icons8.com/ios/50/minus.png" alt="minus"/>
                    </span>
                    </h1>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default MyCart
