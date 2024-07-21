"use client"
import React, { useContext, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
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


export function Relatorios(){
    const [exame, setExame] = useState<Exame[]>([]);
    const [treino, setTreinos] = useState<Treino[]>([]);
    const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
    const [dataPublicacao, setDataPublicacao] = useState<string>('');
    
    const handleExport = (jsonData:any) => {
        try {
          const jsonParsed = JSON.parse(JSON.stringify(jsonData));
          const csv = Papa.unparse(jsonParsed);
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          saveAs(blob, 'data.csv');
        } catch (error) {
          console.error('Invalid JSON:', error);
          alert('Invalid JSON. Please enter valid JSON data.');
        }
      };

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
                <div className='bg-[#F8F5FA] shadow-lg rounded-lg h-[83vh] w-[60vw]'>
                    <div className='flex justify-center items-center mt-8 gap-1'>
                        <h2 className='font-semibold text-2xl text-[#6B3F97]'>Relatórios</h2>
                        <div className='border border-t-2 border-gray-50'></div>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Relatórios de Usuário</h2>
                    </div>
                    <div className='justify-start items-center grid grid-cols-2 mx-12 '>
                        <div className='h-[20vh] w-[20vw] bg-white shadow-2xl rounded-2xl overflow-y-auto'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <h3 className='text-lg mb-5'>Exames</h3>
                                        <button className='w-[10vw] h-[5vh] rounded-md bg-[#6B3F97] text-white ' onClick={() => handleExport(exame)}>Baixar CSV</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-[20vh] w-[20vw] bg-white shadow-2xl rounded-2xl overflow-y-auto'>
                            <div className='p-6'>
                                <div className='justify-between flex items-center'>
                                    <div className='items-center gap-2'>
                                        <h3 className='text-lg mb-5'>Treino</h3>
                                        <button className='w-[10vw] h-[5vh] rounded-md bg-[#6B3F97] text-white ' onClick={() => handleExport(treino)}>Baixar CSV</button>
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