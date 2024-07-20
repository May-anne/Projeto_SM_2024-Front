"use client"
import {
  MdHistory, MdOutlineSpaceDashboard, MdLogout
} from 'react-icons/md';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiExam } from "react-icons/pi";
import { FaRegNoteSticky } from 'react-icons/fa6';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { IoEnterOutline, IoCloseOutline  } from "react-icons/io5";
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
  const [headerOpen, setHeaderOpen] = useState(false)
  
  return (
    <>
      <div className={`w-full flex flex-row justify-between fixed bg-gray-1300 ${headerOpen?("pt-3 border-b border-b-green-1400 rounded-b-xl bg-opacity-100"):("lg:py-0 h-12 bg-opacity-90 lg:bg-opacity-100 px-12")} top-0 lg:relative z-40`}>
        <div className={`container h-full ${headerOpen?('px-8 '):('') } lg:px-0`}>
          <div className="flex items-center h-full justify-between">
            
            <span className="hidden md:block"><MenuBar /></span>
            <Link href={'/dashboard'} className="hover:opacity-60"><Image src={logo} alt='' width={150} layout="intrinsic"/></Link>
            <div className="mobile-menu lg:hidden block">
              {
                !headerOpen? (
                  <button
                    onClick={()=> setHeaderOpen(true)} 
                    className={`text-[#6B3F97] flex items-center px-3 py-2 border rounded bg-[#d5c7e2] hover:text-white hover:border-white hover:bg-gray-100`}><FaBars className="h-5 w-5"/></button>
                ):
                (
                  <button 
                    onClick={()=> setHeaderOpen(false)} 
                    className={`text-[#6B3F97] flex items-center px-3 py-2 border rounded bg-[#d5c7e2] hover:text-white hover:border-white hover:bg-gray-100`}><IoCloseOutline  className="h-5 w-5"/></button>
                )
              }
            </div>
            <div className="hidden lg:block"/>
          </div>

          {headerOpen && (
              <ul className={`flex flex-col py-5 items-center gap-y-3 border-t border-t-green-1400 mt-3 text-black gap-y-3`}>
                <li className='flex items-center'>
                    <MdOutlineSpaceDashboard className='mr-2' size={22} />
                    <Link href='/dashboard' className='block text-gray-600 hover:underline'>Início</Link>
                </li>
                <li className='flex items-center'>
                    <MdHistory className='mr-2' size={22} />
                    <Link href='#' className='block text-gray-600 hover:underline'>Históricos</Link>
                </li>
                <li className='flex items-center'>
                    <PiExam className='mr-2' size={22} />
                    <Link href='#' className='block text-gray-600 hover:underline'>Exames</Link>
                </li>
                <li className='flex items-center'>
                    <FaRegNoteSticky className='mr-2' size={22} />
                    <Link href='#' className='block text-gray-600 hover:underline'>Avaliações</Link>
                </li>
                <li className='flex items-center ml-6'>
                    <IoMdHelpCircleOutline className='mr-2' size={22} />
                    <Link href='#' className='block text-gray-600 hover:underline'>Ajuda</Link>
                </li>
                <li className='flex items-center ml-6'>
                    <Link href='/api/auth/logout' className='flex items-center gap-2 border-2 border-[#6B3F9] rounded-md text-[#6B3F97] px-2 py-1 mb-3'>
                        <MdLogout className='text-[#6B3F9]' /> Sair
                    </Link>
                </li>
              </ul>
            )}
        </div>
      </div>
    </>
);
}