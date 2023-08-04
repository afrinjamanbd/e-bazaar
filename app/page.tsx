"use client";
import Image from 'next/image'
import { ProductCart } from './components/ProductCard';
import { Cart } from './components/Cart';
import { useState , useEffect, useRef} from 'react';
import { fetchproduct } from './redux/slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import { AppDispatch, RootState } from './redux/store/store';


export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { entities } = useSelector((state:RootState)=> state.product)
  const [newentities, setnewentities] = useState([]);
  const [totalCategory, setTotalCategory] = useState(0);
  const dispatch = useDispatch<AppDispatch>()
  const appRef = useRef(false)
  
  function toggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  const sorting = async() => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?sort=desc')
      const data = await response.json();
      setnewentities(data)
    } catch (error) {
      console.log(error);
    }
  }

  const categoryItems = async(catagory:any) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/category/'+ catagory)
      const data = await response.json();
      setnewentities(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(appRef.current === false){
      const cookies = new Cookies();

      cookies.set('token', 'eyJhbGciOiJIUzI1NiIsInR', { path: '/' })
      dispatch(fetchproduct())

      const fetchAllData = async() => {
        try {
          const response = await fetch('https://fakestoreapi.com/products')
          const data = await response.json();
          setnewentities(data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchAllData()

      const fetchData = async() => {
        try {
          const response = await fetch('https://fakestoreapi.com/products/categories')
          const data = await response.json();
          setTotalCategory(data.length);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData()
    }
    return ()=>{
      appRef.current = true;
    }
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 
        pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  
        lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Image src="/Original.png" alt="logo" width={150} height={150}></Image>
          {/* <code className="font-mono font-bold">app/page.tsx</code> */}
        </p>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white 
        dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none  flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            target="_blank"
            rel="noopener noreferrer"
          > <Cart></Cart>
          </a>         
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 
      before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] 
      after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 
      after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent 
      before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
      <a  style = {{ backgroundImage:'url("/Rectangle.png")',}}
          className="m-3 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 
          hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Total Product : {entities.length}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Wearhouse has total of {entities.length}. Each product is manufactured by E-Bazaar
          </p>
        </a>

        <a 
          style = {{ backgroundImage:'url("/Rectangle.png")',}}
          className="m-3 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100
           hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer" >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Total Category : {totalCategory}
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          Total number of catagory that are not duplicate or redundant.
          </p>
        </a>

        <a   
          className="m-3 group rounded-lg  border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100
           hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer" >
          <button onClick={sorting}  id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg m-5
          text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          Descending
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </button>

      <div>
      <button onClick={toggle} id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Dropdown hover
      <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
      </svg></button>

        <div id="dropdownDelay" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" 
        style={{visibility: isOpen ? 'visible' : 'hidden' }}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
              <li>
                <a onClick={()=>categoryItems('electronics')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Electronics</a>
              </li>
              <li>
                <a onClick={()=>categoryItems('jewelery')} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Jewelery</a>
              </li>
              <li>
                <a onClick={()=>categoryItems("men's clothing")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Men's clothing</a>
              </li>
              <li>
                <a onClick={()=>categoryItems("women's clothing")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Women's clothing</a>
              </li>
            </ul>
        </div>
        </div>

        </a>
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {
          newentities.map((curElem:any)=>{
          const newObj = Object.assign({isPage:true}, curElem)
          return <ProductCart key={newObj.id}{...newObj}></ProductCart>
          })     
        }
        {/* <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 
          hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 
          hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 
          hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Next.js features and API.
          </p>
        </a> */}
      </div>
    </main>
  )
}
