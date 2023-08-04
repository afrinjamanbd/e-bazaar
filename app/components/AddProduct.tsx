import React from "react";
import Image from "next/image";
import { add } from "../redux/slices/productSlice";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store/store";


export const AddProduct = (props: any) => {
    const {category, description, id, image, price, rating, title} = props;
    const dispatch = useDispatch<AppDispatch>()

    const addToCart = () => {
        dispatch(add({category,description,id,image,price,rating,title}));
      };

    return(
        <div>
        <button onClick={()=>addToCart()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
          text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"> +    
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </button>
        </div>
    );

};