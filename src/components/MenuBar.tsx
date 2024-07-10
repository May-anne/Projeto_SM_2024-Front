import { MdHistory, MdKeyboardArrowDown, MdLogout, MdOutlineDirectionsRun, MdOutlineEmail, MdOutlineSpaceDashboard } from 'react-icons/md';
import { FiUsers } from "react-icons/fi";
import { PiExam } from "react-icons/pi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { AiOutlineLock } from 'react-icons/ai';
import { FaRegCircleUser } from 'react-icons/fa6';         
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoArrowBack } from "react-icons/io5";

export function MenuBar(){
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            {isVisible && (
                <div className='transition-all duration-300 ease-in-out transform translate-x-0 w-[20%] bg-white shadow-xl fixed top-0 bottom-0 left-0'>
                    <div className='flex items-center flex-grow justify-end mr-4 mt-4'>
                        <button className='flex items-center gap-2 ' onClick={toggleVisibility}>
                            <IoArrowBack />
                            <p>Voltar</p>
                        </button>
                    </div>
                    <div className='bg-[#D9D9D9] flex items-center p-3 mt-6 mr-6 ml-6 mb-12 rounded-sm'>
                        <FaRegCircleUser className='text-[#2C2C2C] mr-3' size={24} />
                        <p className='text-[#2C2C2C]'>Usuário</p>
                        <div className='flex flex-grow justify-end items-center'>
                            <Link href='#'>
                                <MdKeyboardArrowDown className='text-[#2C2C2C]' size={20} />
                            </Link>
                        </div>
                    </div>
                    <div className='ml-6 mb-6'>
                        <ul className='space-y-8'>
                            <li className='flex items-center'>
                                <MdOutlineSpaceDashboard className='mr-2' size={22} />
                                <Link href='#' className='block text-gray-600 hover:underline'>Início</Link>
                            </li>
                            <li className='flex items-center'>
                                <FiUsers className='mr-2' size={22} />
                                <Link href='#' className='block text-gray-600 hover:underline'>Cadastros</Link>
                            </li>
                            <li className='flex items-center'>
                                <MdOutlineDirectionsRun className='mr-2' size={22} />
                                <Link href='#' className='block text-gray-600 hover:underline'>Treinos</Link>
                            </li>
                            <li className='flex items-center'>
                                <PiExam className='mr-2' size={22} />
                                <Link href='#' className='block text-gray-600 hover:underline'>Exames</Link>
                            </li>
                            <li className='flex items-center'>
                                <MdHistory className='mr-2' size={22} />
                                <Link href='#' className='block text-gray-600 hover:underline'>Históricos</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='border-t-2 border-gray-100 ml-6 mr-6 mb-8'></div>
                    <li className='flex items-center ml-6'>
                        <IoMdHelpCircleOutline className='mr-2' size={22} />
                        <Link href='#' className='block text-gray-600 hover:underline'>Ajuda</Link>
                    </li>
                    <div className='flex justify-center items-end absolute bottom-0 w-full'>
                        <button className='flex items-center gap-2 border-2 border-[#6B3F9] rounded-md text-[#6B3F97] px-2 py-1 mb-3'><MdLogout className='text-[#6B3F9]' /> Sair</button>
                    </div>
                </div>
            )}
        </>
    );
}