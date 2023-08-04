"use client";
import { useState , useEffect} from 'react';
import { AddProduct } from '../components/AddProduct';

export default function ProductDetails({searchParams}: {
    searchParams: {
        id: string;
    }
    }){
    const [image, setimage] = useState("/Shopping-cart.png");
    const [title, settitle] = useState("This is title");
    const [price, setprice] = useState("0.00 $");
    const [category, setcategory] = useState("Default value for catagory");
    const [description, setdescription] = useState("Default value for catagory");

    useEffect(() => {
        const fetchData = async() => {
            try {
            const response = await fetch('https://fakestoreapi.com/products/'+ searchParams.id)
            const data = await response.json();
            setimage(data.image);
            settitle(data.title);
            setprice(data.price);
            setcategory(data.category);
            setdescription(data.description);
            } catch (error) {
            console.log(error)
            }
        }
        fetchData()
        },[])

    return (
    <div className=" m-5 relative flex group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">   
        <img className=" group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          style={{ width: 400, height: 400 }}
          src={image}
          alt="new"
          />
        <a
        className=" group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer">
        <div className="relative flex "> 
        <p className={`mb-2 relative flex `}>
          Product{' '} {searchParams.id}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">           
          </span>       
        </p>             
        </div>
        <h6 className={`m-1 max-w-[30ch] `}>{title}</h6>
        <p className={`m-1 max-w-[30ch] text-sm`}>
          Catagory : {category}
        </p>  
        <p className={`m-1 max-w-[30ch] text-sm `}>
          Price : {price} $
        </p> 
        <p className={`m-1 max-w-[30ch] text-sm mb-8`}>
          Description : {description} 
        </p> 
        <div className="mb-3 ">
        <AddProduct></AddProduct>
        </div>       
      </a>    
      </div>
    )
}