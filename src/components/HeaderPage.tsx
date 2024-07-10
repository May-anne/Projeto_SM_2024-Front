"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdLogout, MdOutlineMenuOpen } from 'react-icons/md';
import {MenuBar} from '../components/MenuBar'

export function HeaderPage(){
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
    <div className='bg-white w-full h-12 flex items-center'>
      <div className='flex justify-start ml-6 cursor-pointer'>
        <button className='flex items-center gap-1' onClick={toggleMenu} >
            <MdOutlineMenuOpen className='text-[#6B3F97]' size={25} />
            <p className='text-[#6B3F97]'>Menu</p>
        </button>
      </div>

      {menuOpen && <MenuBar />}
      <div className='flex flex-grow justify-end'>
        <Link href='#'>
          <button className='flex items-center mr-6 gap-2 text-[#6B3F97]'><MdLogout className='text-[#6B3F9]' size={20} /> Sair</button>
        </Link>
      </div>
    </div>
  );
}