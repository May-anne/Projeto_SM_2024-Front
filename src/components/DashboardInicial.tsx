"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { FiUsers } from "react-icons/fi";
import { PiExam } from "react-icons/pi";
import { HeaderPage } from './Header';
import { MdHistory, MdOutlineDirectionsRun, MdOutlinePostAdd, MdOutlineSort } from 'react-icons/md';
import { CgInsertAfter, CgInsertBefore } from "react-icons/cg";
import { MdFilterAlt } from "react-icons/md";
import { FaPlus } from 'react-icons/fa6';

interface Usuario{
    nome: string,
    sexo: string,
    idade: string,
    ID: string,
}

export function DashboardInicial() {
    const cardData = [
        {
            nome: "Ana Maria Braga",
            sexo: 'F',
            idade: '68',
            ID: '001',
        },
        {
            nome: "Silvio Santos",
            sexo: 'M',
            idade: '75',
            ID: '002',
        },
        {
            nome: "Jô Soares",
            sexo: 'M',
            idade: '78',
            ID: '003',
        }
    ];
    return (
        <div className='h-full bg-[#C9B7D4]'>
            <HeaderPage/>
            <div className='flex flex-col h-auto justify-center items-center'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-24'>
                    <div className='rounded-lg shadow-lg bg-white hover:bg-gray-50'>
                            <div className='p-5'>
                                <Link href='#'>
                                    <div className='rounded-xl overflow-hidden'>
                                        <div className='flex items-center justify-center'>
                                            <FiUsers   className='mr-2' size={22} />
                                            <h2 className='font-semibold'>Cadastros</h2>
                                        </div>
                                        <div className='border-t-2 border-gray-100 my-4'></div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex-grow'></div>
                                            <p className=' text-gray-500'>4 pacientes cadastrados</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='rounded-lg shadow-lg bg-white hover:bg-gray-50'>
                            <div className='p-5'>
                                <Link href='#'>
                                    <div className='rounded-xl overflow-hidden'>
                                        <div className='flex items-center justify-center'>
                                            <MdOutlineDirectionsRun  className='mr-2' size={22} />
                                            <h2 className='font-semibold'>Treinos</h2>
                                        </div>
                                        <div className='border-t-2 border-gray-100 my-4'></div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex-grow'></div>
                                            <p className=' text-gray-500'>8 treinos cadastrados</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='rounded-lg shadow-lg bg-white hover:bg-gray-50'>
                            <div className='p-5'>
                                <Link href='#'>
                                    <div className='rounded-xl overflow-hidden'>
                                        <div className='flex items-center justify-center'>
                                            <MdOutlinePostAdd className='mr-2' size={22} />
                                            <h2 className='font-semibold'>Exames</h2>
                                        </div>
                                        <div className='border-t-2 border-gray-100 my-4'></div>
                                        <div className='flex justify-between items-end'>
                                            <div className='flex-grow'></div>
                                            <p className=' text-gray-500'>2 exames cadastrados</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='rounded-lg shadow-lg bg-white hover:bg-gray-50'>
                            <Link href=''>
                                <div className='p-5 flex flex-col'>
                                    <div className='rounded-xl overflow-hidden flex justify-center'>
                                        <CgInsertAfter className='mr-2' size={22} />
                                        <h2 className='font-semibold'>Pré-Intervenção</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='rounded-lg shadow-lg bg-white hover:bg-gray-50'>
                            <Link href=''>
                                <div className='p-5 flex flex-col'>
                                    <div className='rounded-xl overflow-hidden flex justify-center'>
                                        <CgInsertBefore className='mr-2' size={22}/>
                                        <h2 className='font-semibold'>Pós-Intervenção</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='rounded-lg shadow-lg bg-white hover:bg-gray-50'>
                            <Link href=''>
                                <div className='p-5 flex flex-col'>
                                    <div className='rounded-xl overflow-hidden flex justify-center'>
                                        <MdHistory className='mr-2' size={22} />
                                        <h2 className='font-semibold'>Históricos</h2>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='w-[106vh] h-[6vh] mt-16 rounded-md flex items-center'>
                        <input
                            type="text"
                            placeholder="Pesquisar pacientes..."
                            className="h-full px-4 flex-grow outline-none rounded-md border-white"
                        />
                        <button className="h-full px-4 py-2 bg-[#6B3F97] hover:bg-[#4A2569] text-white rounded-md">
                            Buscar
                        </button>
                        <button className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'><FaPlus className='text-white' size={20} /></button>
                        <button className='rounded-md px-2 py-2 ml-2 shadow-lg bg-white hover:bg-gray-50'><MdFilterAlt className='text-[#6B3F97]'size={20}/></button>
                    </div>
                    <div className='w-[106vh] h-[40vh] mt-5 mb-6 rounded-md bg-white shadow-lg'>
                        <div className='w-full h-[6vh] bg-white shadow-md flex items-center'>
                            <div className='flex'>
                                <p className="w-[15vw] text-center border-r">Nome</p>
                                <p className="w-[5vw] text-center border-r">Sexo</p>
                                <p className="w-[5vw] text-center border-r">Idade</p>
                                <p className="w-[5vw] text-center border-r">ID</p>
                            </div>
                            <div className='flex justify-end flex-grow items-center rounded-md px-4 py-4'><MdOutlineSort className='text-[#6B3F97] hover:bg-gray-50' size={24} /> </div>
                        </div>
                        <div className='border-t-2 bg-gray-50'></div>
                        <div className='grid grid-rows-4'>
                            {cardData.map((paciente) => (
                                <div key={paciente.ID} className='flex flex-row mt-[1.5vh]'>
                                    <div className="flex flex-row gap-x-4 w-[15vw] text-center border-r pl-4 overflow-hidden items-center">
                                      <input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm' />
                                      <p className="overflow-hidden whitespace-nowrap text-ellipsis ">{paciente.nome}</p>
                                    </div>
                                    <p className="w-[5vw] text-center border-r">{paciente.sexo}</p>
                                    <p className="w-[5vw] text-center border-r">{paciente.idade}</p>
                                    <p className="w-[5vw] text-center border-r">{paciente.ID}</p>
                                </div>
                            ))}
                            
                        </div>
                        <div className='h-[4vh] bg-[#6B3F97] mt-78 justify-end flex-grow items-end'></div>
                    </div>
                
            </div>
        </div>
      );
    }      