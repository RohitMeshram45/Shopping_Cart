"use client"
import React from "react";
import  {CartContext} from "./Context/page"
import Cart from "./Cart/page"
import {toast,Toaster} from 'react-hot-toast';

export default function Home() {

  return (
    < >
    <Toaster />
      <Cart />
    </> 
  );
}
