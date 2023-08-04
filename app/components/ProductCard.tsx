import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState , useEffect} from 'react';
import { data } from "autoprefixer";
import { AddProduct } from "./AddProduct";

function ADDToCart(props:any) {
    if (props.isPage) {
      return <AddProduct{...props}></AddProduct>   
    }
    return <div/>;
  }

  function SetImage(props:any) {
    if (props.isPage) {
      return <img style={{ width: 200, height: 200 }}
      src={props.image}
      alt="new"
      />  
    }
    return <div/>;
  }

export const ProductCart = (curElem: any) => {
    const {category, description, id, image, price, rating, title, isPage} = curElem;

    return(
        <div className=" m-5 ">       
        <a
        className=" group rounded-lg border border-transparent px-5 py-4 transition-colors "
        target="_blank"
        rel="noopener noreferrer">
        <SetImage className="m-4" {...curElem}></SetImage>        
        <div className="relative flex "> 
          <p className={`mb-2 relative flex max-w-[20ch]`}>{title}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"></span>       
          </p>             
        </div>
        <p className={`m-1 max-w-[20ch] text-sm`}>catagory : {category}</p>  
        <p className={`m-1 max-w-[20ch] text-sm`}>price : {price} $</p> 
        <ADDToCart className="m-4" {...curElem}></ADDToCart> 
        <Link className="ml-4" href={ 
          {
            pathname: "/productdetails",
            query: {id: id}
          }
        }> see details...</Link> 
      </a>    
      </div>
    );
};