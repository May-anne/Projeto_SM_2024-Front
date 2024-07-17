"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaLock, FaPlus, FaRegEye } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineExport, AiOutlineLock } from 'react-icons/ai';
import { AuthContext } from "../app/contexts/AuthContext"
import { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { HeaderPage } from './Header';
import { MdFilterAlt } from 'react-icons/md';
import { GoSingleSelect } from "react-icons/go";
import { SearchBar } from './SearchBar';

interface Exame{
    id: string;
    nome: string;
    data: string;
}

interface Treino{
    id: string;
    nome: string;
    data: string;
}

interface Avaliacao{
    id: string;
    nome: string;
    data: string;
}


export function Perfil(){
    const [exame, setExame] = useState<Exame[]>([]);
    const [treino, setTreinos] = useState<Treino[]>([]);
    const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
    const [dataPublicacao, setDataPublicacao] = useState<string>('');

    useEffect(() => {
        // Simulando a busca de dados de exame e treino (substitua com sua lógica real)
        fetchExames(); 
        fetchTreinos();
    }, []);

    const fetchExames = () => {
        // Simulação de dados de exame
        const mockExames: Exame[] = [
            { id: '1', nome: 'Exame 1', data: '2023-01-01' },
            { id: '2', nome: 'Exame 2', data: '2023-02-15' },
            // Adicione mais dados conforme necessário
        ];
        setExame(mockExames);
    };

    const fetchTreinos = () => {
        // Simulação de dados de treino
        const mockTreinos: Treino[] = [
            { id: '1', nome: 'Treino 1', data: '2023-03-10' },
            { id: '2', nome: 'Treino 2', data: '2023-04-20' },
            // Adicione mais dados conforme necessário
        ];
        setTreinos(mockTreinos);
    };

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataPublicacao(e.target.value);
      };

    return(
        
        <div className='bg-[#D8C9E0] h-auto w-[100vw] overflow-y-auto'>
            <HeaderPage/>
            <div className='flex flex-col justify-center items-center mt-20'>
                <div className='bg-[#F8F5FA] shadow-lg rounded-lg h-auto w-[60vw]'>
                    <div className='flex justify-center items-center mt-8 gap-1'>
                        <h2 className='font-semibold text-2xl text-[#6B3F97]'>Perfil do(a) Paciente</h2>
                        <div className='border border-t-2 border-gray-50'></div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Dados Pessoais</h2>
                    </div>
                    <div className='justify-start items-center flex mx-12 '>
                        <div className='h-[40vh] w-[60vw] bg-white shadow-2xl rounded-md overflow-y-auto'>
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
                    <div className='text-sm text-blue-600 hover:text-blue-800 justify-end flex mx-12 my-3 hover:underline cursor-pointer'>
                        <p>Ver mais</p>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Treinos</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <SearchBar pesquisa='Treinos' ehExame={false}  ehTreino={true} treino={treino} avaliacao={null} exame={null} id='01' nome='Hemograma' data='16/07/2024'/>
                    </div>
            
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Exames</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <SearchBar pesquisa='exames' ehExame={true}  ehTreino={false} exame={exame} treino={null} avaliacao={null} id='01' nome='Hemograma' data='16/07/2024'/>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Avaliação</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <SearchBar pesquisa='Avaliações' ehExame={false} ehTreino={false} avaliacao={avaliacao} exame={null} treino={null} id='01' nome='Hemograma' data='16/07/2024' />
                    </div>
                </div>
            </div>
        </div>
    );
}