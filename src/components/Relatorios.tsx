"use client"
import React, { useContext, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { HeaderPage } from './Header';
import { MdFilterAlt } from 'react-icons/md';
import { GoSingleSelect } from "react-icons/go";
import { SearchBar } from './SearchBar';
import { getAllAvaliacoes, getAllAvaliacoesbyUser, getAllExames, getAllTreinos, getIdosos } from '@/lib/api';

interface Exame{
    cpf_idoso: string;
    id: string;
    title: string;
    uploaded_at: string;
    file: string;
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

interface Admins{
    id: string;
    nome: string;
    data: string;
}

interface Idosos{
    id: string;
    nome: string;
    data: string;
}


export function Relatorios(){
    const [exame, setExame] = useState<Exame[]>([]);
    const [treino, setTreinos] = useState<Treino[]>([]);
    const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
    const [idosos, setIdosos] = useState<Idosos[]>([]);
    
    const handleExport = (jsonData:any, type:string) => {
        const now = new Date();
        const formattedDate = now.toISOString();
        try {
          const jsonParsed = JSON.parse(JSON.stringify(jsonData));
          const csv = Papa.unparse(jsonParsed);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, `${type+"-"+formattedDate}.csv`);
        } catch (error) {
          console.error('Invalid JSON:', error);
          alert('Invalid JSON. Please enter valid JSON data.');
        }
      };

    useEffect(() => {
        fetchExames(); 
        fetchTreinos();
        fetchAvaliacoes();
        fetchIdosos();
    }, []);

    const fetchExames = async () => {
        const mockExames: Exame[] = await getAllExames();
        setExame(mockExames);
    };

    const fetchTreinos = async () => {
        const mockTreinos: Treino[] = await getAllTreinos();
        setTreinos(mockTreinos);
    };

    const fetchAvaliacoes = async () => {
        const mockAvaliacoes: Avaliacao[] = await getAllAvaliacoes();
        setAvaliacao(mockAvaliacoes);
    }

    const fetchIdosos = async () => {
        const mockIdosos: Idosos[] = await getIdosos();
        setIdosos(mockIdosos);
    }

    return(
        
        <div className='bg-[#D8C9E0] h-auto w-[100vw] overflow-y-auto'>
            <HeaderPage/>
            <div className='flex flex-col justify-center items-center mt-20'>
                <div className='bg-[#F8F5FA] shadow-lg rounded-lg h-[90vh] w-[60vw]'>
                    <div className='flex justify-center items-center mt-8 gap-1'>
                        <h2 className='font-semibold text-2xl text-[#6B3F97]'>Relatórios</h2>
                        <div className='border border-t-2 border-gray-50'></div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Relatórios de Usuários</h2>
                    </div>
                    <div className='justify-start items-center grid grid-cols-2 mx-12 gap-5'>
                        <div className='h-[20vh] w-[20vw] bg-white shadow-2xl rounded-2xl overflow-y-auto'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <h3 className='text-lg mb-5'>Exames</h3>
                                        <button className='w-[10vw] h-[5vh] rounded-md bg-[#6B3F97] text-white ' onClick={() => handleExport(exame, "exames")}>Baixar CSV</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-[20vh] w-[20vw] bg-white shadow-2xl rounded-2xl overflow-y-auto'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <h3 className='text-lg mb-5'>Treinos</h3>
                                        <button className='w-[10vw] h-[5vh] rounded-md bg-[#6B3F97] text-white ' onClick={() => handleExport(treino, "treinos")}>Baixar CSV</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-[20vh] w-[20vw] bg-white shadow-2xl rounded-2xl overflow-y-auto'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <h3 className='text-lg mb-5'>Avaliações</h3>
                                        <button className='w-[10vw] h-[5vh] rounded-md bg-[#6B3F97] text-white ' onClick={() => handleExport(avaliacao, "avaliacoes")}>Baixar CSV</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Relatórios de Administrador</h2>
                    </div>
                    <div className='justify-start items-center grid grid-cols-2 mx-12 gap-5'>
                        <div className='h-[20vh] w-[20vw] bg-white shadow-2xl rounded-2xl overflow-y-auto'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <h3 className='text-lg mb-5'>Idosos</h3>
                                        <button className='w-[10vw] h-[5vh] rounded-md bg-[#6B3F97] text-white ' onClick={() => handleExport(idosos, "usuarios")}>Baixar CSV</button>
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