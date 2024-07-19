"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegEye } from "react-icons/fa6";
import { IoEnterOutline } from "react-icons/io5";
import logo from '../../public/images/Pmov.png'
import { useState } from 'react';
import {MenuBar} from '../components/MenuBar'


export function HeaderOut() {
  return (
    <div 
      className={`bg-[#F8F5FA] flex justify-center w-full text-black font-normal text-lg py-3 top-0 z-40`}>
      <div className="container h-full px-8 lg:px-0">
        <div className="flex items-center h-full justify-between">
          <Link href="/">
            <Image src={logo} alt='' width={150} layout="intrinsic"/>
          </Link>
          <ul className={`hidden lg:flex gap-x-6 items-center justify-center`}>
            <li>
              <Link href="/">
                <p className={`hover:opacity-60`}>Página Inicial</p>
              </Link>
            </li>
            <li>
              <Link href={`/about`}>
                <p className={`hover:opacity-60`}>Sobre</p>
              </Link>
            </li>
            <li>
              <Link href={``}>
                <p className={`hover:opacity-60`}>Contato</p>
              </Link>
            </li>
          </ul>
          <Link href={'/login'}>
          <button className="font-normal border-[#6B3F97] border-2 rounded-xl flex flex-row items-center gap-x-2 py-1 px-3 hover:opacity-60 hover:bg-gray-100">
            <IoEnterOutline /> Entrar
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HeaderPage(){
  
  return (
  <div className='bg-white w-full h-12 flex items-center'>
    <div className='flex flex-row justify-between px-6 w-full '>
      <MenuBar />
      <Link href={'/dashboard'} className="hover:opacity-60"><Image src={logo} alt='' width={150} layout="intrinsic"/></Link>
      
      <div></div>
    </div>
  </div>
);
}