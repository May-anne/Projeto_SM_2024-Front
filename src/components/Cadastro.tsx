"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLock, FaPlus, FaRegEye } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HeaderPage } from './Header';
import { SearchBar } from './SearchBar';
import cross from '../../public/images/cross.png'

export function Cadastro(){

    const renderCrossImages = () => {
        const images = [];
        for (let i = 0; i < 20; i++) { // Ajuste o valor de acordo com a quantidade necessária
            images.push(
                <div className={`z-10 justify-between w-full flex-row flex ${i%2==0?'px-36':'px-16'}`}>
                    <div key={i} className="rounded-full justify-center flex h-[5vw] w-[5vw] overflow-hidden relative">
                        <Image src={cross} alt='' layout="fill" objectFit="cover" />
                    </div>

                    <div key={i} className="z-10 rounded-full justify-center flex h-[5vw] w-[5vw] overflow-hidden relative">
                        <Image src={cross} alt='' layout="fill" objectFit="cover" />
                    </div>
                </div>
            );
        }
        return images;
    };

    return(
        <div className='bg-[#D8C9E0] h-auto w-[100vw] overflow-y-auto'>
            <HeaderPage/>
            <div className='w-[100%] h-[100%] absolute z-10 flex flex-col justify-between my-20 gap-y-16'>
                {renderCrossImages()}
            </div>
            <div className='flex flex-col justify-center items-center mt-20 z-20 relative'>
                <div className='bg-[#F8F5FA] shadow-lg rounded-lg h-auto w-[60vw]'>
                    <div className='flex justify-center items-center mt-8 gap-1'>
                        <h2 className='font-semibold text-2xl text-[#6B3F97]'>Cdastro de Usuário</h2>
                        <div className='border border-t-2 border-gray-50'></div>
                    </div>
                    <div className='w-full flex flex-row justify-between px-12 mt-8 mb-4'>
                        <h2 className='font-semibold text-xl text-[#6B3F97]'>Dados Pessoais</h2>
                        <button className='text-xs text-blue-700 font-semibold hover:opacity-60'>LIMPAR TUDO</button>
                    </div>
                    <div className='justify-start items-center flex mx-12 '>
                        <div className='w-[60vw] shadow-2xl rounded-md'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='id'>
                                            ID
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                        <FaLock />
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                                            Nome Completo
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[30vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-4'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nasc'>
                                            Data de Nascimento
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text' />
                                            <FaRegCalendarAlt />
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='rg'>
                                            RG
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cpf'>
                                            CPF
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[13vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='sexo'>
                                            Sexo
                                        </label>
                                        <select
                                            className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='sexo'>
                                            <option value='F'>F</option>
                                            <option value='M'>M</option>
                                            </select>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-4'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='raca'>
                                            Raça
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <select
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='raca'>
                                            <option value='branco'>Amarelo</option>
                                            <option value='branco'>Branco</option>
                                            <option value='indigena'>Indígena/Nativo</option>
                                            <option value='pardo'>Pardo</option>
                                            <option value='preto'>Preto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='escolaridade'>
                                            Escolaridade
                                        </label>
                                        <select
                                            className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='escolaridade'>
                                            <option value='sem'>Sem instrução</option>
                                            <option value='fund_incompl'>Ensino fundamental incompleto</option>
                                            <option value='fund_compl'>Ensino fundamental completo</option>
                                            <option value='med_incompl'>Ensino médio incompleto</option>
                                            <option value='med_compl'>Ensino médio completo</option>
                                            <option value='sup_incompl'>Ensino superior incompleto</option>
                                            <option value='sup_compl'>Ensino superior completo</option>
                                            <option value='pos'>Pós-graduação completa</option>
                                            <option value='tec'>Ensino técnico ou profissionalizante</option>
                                            <option value='outro'>Outro</option>
                                            </select>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='ID'>
                                            Telefone
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-6'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='endereco'>
                                            Endereço
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cep'>
                                            CEP
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='bairro'>
                                            Bairro
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-6'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telemerg'>
                                            Telefone Emergencial
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2 mx-[20vh]'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cns'>
                                            Cartão CNS
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex flex-row justify-between px-12 mt-16 mb-4'>
                        <h2 className='font-semibold text-xl text-[#6B3F97]'>Informações de Renda</h2>
                        <button className='text-xs text-blue-700 font-semibold hover:opacity-60'>LIMPAR TUDO</button>
                    </div>
                    <div className='justify-start items-center flex mx-12 '>
                        <div className='w-[60vw] shadow-2xl rounded-md'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='id'>
                                            ID
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                        <FaLock />
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                                            Nome Completo
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[30vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-4'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nasc'>
                                            Data de Nascimento
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text' />
                                            <FaRegCalendarAlt />
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='rg'>
                                            RG
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cpf'>
                                            CPF
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[13vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='sexo'>
                                            Sexo
                                        </label>
                                        <select
                                            className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='sexo'>
                                            <option value='F'>F</option>
                                            <option value='M'>M</option>
                                            </select>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-4'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='raca'>
                                            Raça
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <select
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='raca'>
                                            <option value='branco'>Amarelo</option>
                                            <option value='branco'>Branco</option>
                                            <option value='indigena'>Indígena/Nativo</option>
                                            <option value='pardo'>Pardo</option>
                                            <option value='preto'>Preto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='escolaridade'>
                                            Escolaridade
                                        </label>
                                        <select
                                            className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='escolaridade'>
                                            <option value='sem'>Sem instrução</option>
                                            <option value='fund_incompl'>Ensino fundamental incompleto</option>
                                            <option value='fund_compl'>Ensino fundamental completo</option>
                                            <option value='med_incompl'>Ensino médio incompleto</option>
                                            <option value='med_compl'>Ensino médio completo</option>
                                            <option value='sup_incompl'>Ensino superior incompleto</option>
                                            <option value='sup_compl'>Ensino superior completo</option>
                                            <option value='pos'>Pós-graduação completa</option>
                                            <option value='tec'>Ensino técnico ou profissionalizante</option>
                                            <option value='outro'>Outro</option>
                                            </select>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='ID'>
                                            Telefone
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-6'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='endereco'>
                                            Endereço
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cep'>
                                            CEP
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='bairro'>
                                            Bairro
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-6'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telemerg'>
                                            Telefone Emergencial
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2 mx-[20vh]'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cns'>
                                            Cartão CNS
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}