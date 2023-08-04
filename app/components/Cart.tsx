"use client";
import React from "react";
import { ProductCart } from "./ProductCard";
import Image from "next/image";
import { useState } from "react";
import { remove } from "../redux/slices/productSlice";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store/store";

export const Cart = () => {
    const { addedInCart } = useSelector((state:RootState)=> state.product);
    const dispatch = useDispatch<AppDispatch>()
    const [isOpen, setIsopen] = useState(false);
    const cartItem = addedInCart.length;

    const Cart = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    };

    const removeCartItem = () => {
        dispatch(remove());
    };

    return (
        <div>
            <div className="container-fluid mt-3">                
                <nav className="navbar navbar-expand-lg navbar-light shadow-md">
                    <div className="container-fluid p-2">
                        <div className=" form-inline ml-auto">
                            <button className="flex items-center justify-between gap-2  " onClick={Cart} >
                                <i className="fa fa-bars"></i>
                                <Image
                                    src="/Shopping-cart.png"
                                    alt="Cart Logo"
                                    width={32}
                                    height={32}
                                    priority
                                    />  Cart ({ cartItem})
                            </button>
                        </div>
                    </div>
                </nav>
                <div className={`sidebar ${isOpen == true ? 'active' : ''}`}>
                    <div className="sd-header">
                        <h3 className="mb-0 text-black text-2xl font-semibold">Shopping Cart</h3>
                        <div className="btn btn-primary" onClick={Cart}><i className="fa fa-times"></i></div>
                    </div>
                    
                        <div className="sd-body"> 
                        <button onClick={()=>removeCartItem()}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                        text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button"> Clear All    
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </button>      
                            <ul>
                                {
                                addedInCart.map((element:any)=>{
                                    return (<li key={element.id}><div className="sd-link"><ProductCart {...element}></ProductCart>
                                    </div></li>
                                    )
                                })     
                                }
                            </ul>
                        </div>
                    </div>
                <div className={`sidebar-overlay ${isOpen == true ? 'active' : ''}`} onClick={Cart}></div>
           </div>
        </div>
    )
}