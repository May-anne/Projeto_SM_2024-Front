import {
    MdHistory, MdKeyboardArrowDown, MdLogout, MdOutlineDirectionsRun,
    MdOutlineEmail, MdOutlineSpaceDashboard, MdOutlineMenuOpen
} from 'react-icons/md';
import { IoArrowForwardOutline, IoArrowBack } from "react-icons/io5";
import { RiMenuFold4Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { PiExam } from "react-icons/pi";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaRegCircleUser, FaRegNoteSticky } from 'react-icons/fa6';
import React, { useState, useEffect, useRef, RefObject } from 'react';
import Link from 'next/link';
import { DashboardInicial } from './DashboardInicial';
import { TbReport } from "react-icons/tb"


export function MenuBar() {
    const [isVisible, setIsVisible] = useState(false);
    const [isIn, setIsIn] = useState(false);
    const sidebarRef: RefObject<HTMLDivElement> = useRef(null);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    }
    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible]);

    return (
        <>
            <button className={`flex flex-row items-center gap-1 ${isVisible ? 'hidden' : ''}`} onClick={toggleVisibility} onMouseEnter={() => setIsIn(true)} onMouseLeave={() => setIsIn(false)}>
                <div className={`flex flex-row ${isIn ? 'hidden' : ''} rounded-full py-1 px-4 gap-x-1`}>
                    <MdOutlineMenuOpen className='text-[#6B3F97]' size={25} />
                    <p className='text-[#6B3F97]'>Menu</p>
                </div>
                <div className={`flex flex-row ${isIn ? '' : 'hidden'} bg-gray-100 py-1 px-4 bg-opacity-40 rounded-full gap-x-1`}>
                    <p className='text-[#6B3F97]'>Menu</p>
                    <RiMenuFold4Line className='text-[#6B3F97]' size={25} />
                </div>
            </button>
            <div className={`w-[100vw] h-[100vh] bg-slate-400 top-0 left-0 bg-opacity-70 ${isVisible ? 'absolute' : 'hidden'}`}></div>
            <div 
                ref={sidebarRef}
                className={`transition-transform duration-300 ease-in-out transform ${isVisible ? 'translate-x-0' : '-translate-x-full'} w-[20%] bg-white shadow-xl fixed top-0 bottom-0 left-0 z-50`}
            >
                <div className='flex items-center flex-grow justify-end mr-4 mt-4'>
                    <button className='flex items-center' onClick={() => { setIsVisible(false); setIsIn(false); }} onMouseEnter={() => setIsIn(true)} onMouseLeave={() => setIsIn(false)}>
                        <div className={`flex flex-row ${isIn ? 'hidden' : ''} rounded-full py-1 px-4 gap-x-1 items-center`}>
                            <IoArrowBack />
                            <p>Voltar</p>
                        </div>
                        <div className={`flex flex-row ${isIn ? '' : 'hidden'} bg-gray-100 py-1 px-4 bg-opacity-40 rounded-full gap-x-1 items-center`}>
                            <p>Voltar</p>
                            <IoArrowForwardOutline />
                        </div>
                    </button>
                </div>

                <div className='ml-6 mb-6'>
                    <ul className='space-y-8'>
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
                            <Link href='/exames' className='block text-gray-600 hover:underline'>Exames</Link>
                        </li>
                        <li className='flex items-center'>
                            <FaRegNoteSticky className='mr-2' size={22} />
                            <Link href='/avaliacoes' className='block text-gray-600 hover:underline'>Avaliações</Link>
                        </li>
                        <li className='flex items-center'>
                            <TbReport className='mr-2' size={22} />
                            <Link href='/relatorios' className='block text-gray-600 hover:underline'>Relatórios</Link>
                        </li>
                    </ul>
                </div>
                <div className='border-t-2 border-gray-100 ml-6 mr-6 mb-8'></div>
                <li className='flex items-center ml-6'>
                    <IoMdHelpCircleOutline className='mr-2' size={22} />
                    <Link href='#' className='block text-gray-600 hover:underline'>Ajuda</Link>
                </li>
                <div className='flex justify-center items-end absolute bottom-0 w-full'>
                    <Link href='/api/auth/logout' className='flex items-center gap-2 border-2 border-[#6B3F9] rounded-md text-[#6B3F97] px-2 py-1 mb-3'>
                        <MdLogout className='text-[#6B3F9]' /> Sair
                    </Link>
                </div>
            </div>
        </>
    );
}
