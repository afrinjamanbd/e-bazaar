import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
    return(
        <div>
            <nav >
                <ul>
                    <Link href='/'>
                        <Image src="/Rectangle.png" alt="logo" width={150} height={150}></Image>
                    </Link>                    
                </ul>
            </nav>
        </div>
    );
};