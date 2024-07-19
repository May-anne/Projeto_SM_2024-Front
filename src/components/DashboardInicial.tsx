"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderPage } from './Header';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdFilterAlt, MdOutlineSort } from "react-icons/md";
import { FaPlus } from 'react-icons/fa6';
import Filtro from './Filtro';
import router from 'next/router';
import { parseCookies } from 'nookies';
import { getIdosos } from '@/lib/api';


interface Usuario{
    nome: string,
    sexo: string,
    idade: string,
    ID: string,
}

interface Idoso{
    nome: string,
    data_nascimento: string,
    sexo: string,
    raca: string,
    escolaridade: string,
    deficiencia: boolean,
    deficiencia_quais: string,
    telefone_pessoal: string,
    telefone_emergencial: string,
    endereco: string,
    bairro: string,
    cep: string,
    rg: string,
    cpf: string,
    cartao_cns: string,
    plano_saude: boolean,
    plano_saude_qual: string,
    onde_moras: string,
    com_quem_mora: string,
    quantos_residem: number,
    meio_transporte: string,
    situacao_economica: string,
    renda: number,
    problemas_saude: boolean,
    problemas_saude_quais: string,
    cirgurgia_recente: boolean,
    cirurgia_quais: string,
    internacao_recente: boolean,
    internacao_quais: string,
    alcool: boolean,
    fumante: boolean,
    drogas: boolean,
    medicamentos: boolean,
    medicamentos_quais: string
}

export function DashboardInicial() {

    useEffect(() => {
        getIdosos().then((result) => {
            setIdososList(result)
        })
      },[])

    const [idososList, setIdososList] = useState<Idoso[]>([]);
    const [selectedUser, setSelectedUser] = useState<Idoso[]>([]);
    const [selecionarVarios, setSelecionarVarios] = useState(false);
    const [isFiltroAberto, setIsFiltroAberto] = useState(false);

    const openModal = () => {
        setIsFiltroAberto(true);
    };

    const closeModal = () => {
        setIsFiltroAberto(false);
    };

    function addPaciente(paciente: Idoso) {
        const index = selectedUser.findIndex(u => u.cpf === paciente.cpf);
        if (index !== -1) {
            const updatedUsers = [...selectedUser];
            updatedUsers.splice(index, 1);
            setSelectedUser(updatedUsers);
        } else {
            setSelectedUser([...selectedUser, paciente]);
        }
    }

    function handleSelecionarVarios(){
        setSelecionarVarios(!selecionarVarios)
        setSelectedUser([])
    }

    function calcularIdade(dataNascimento: string): number {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        if(idade<0){
            idade = 0
        }
        return idade;
    }

    return (
        <>
        <div className='h-[100vh] w-[100vw] bg-[#eae3ef]'>
            <HeaderPage/>
            <div className='flex flex-col h-full  justify-center items-center'>
               
                <div className='w-[106vh] h-[6vh] rounded-md flex items-center'>
                    <input
                        type="text"
                        placeholder="Pesquisar pacientes..."
                        className="h-full px-[1vw] flex-grow outline-none rounded-tl-md rounded-bl-md border-white"
                    />
                    <button className="h-full px-4 py-2 bg-[#6B3F97] hover:bg-[#4A2569] text-white rounded-tr-md rounded-br-md">
                        Buscar
                    </button>
                    <Link href={'/cadastro'} className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'><FaPlus className='text-white' size={20} /></Link>
                    <button onClick={openModal} className='rounded-md px-2 py-2 ml-2 shadow-lg bg-white hover:bg-gray-50'><MdFilterAlt className='text-[#6B3F97]'size={20}/></button>
                </div>
                <div className='w-[106vh] mt-5 bg-white shadow-lg'>
                    <div className='w-full h-[6vh] bg-white shadow-md flex items-center'>
                        <div className='flex flex-row justify-start items-center w-full'>
                            <p className="w-[17vw] text-center border-r">Nome</p>
                            <p className="w-[5vw] text-center border-r">Sexo</p>
                            <p className="w-[5vw] text-center border-r">Idade</p>
                            <p className="w-[10vw] text-center border-r">CPF</p>
                            <div className='w-[30%] flex flex-row justify-between items-center rounded-md px-4 py-4'>
                                <button className='text-[#6B3F97] hover:bg-gray-50 py-3 px-2 items-center flex rounded-full font-semibold'><MdOutlineSort size={24} /></button> 
                                {selectedUser.length>1&&(<button className='bg-red-1100 hover:opacity-60 py-2 px-2 items-center flex rounded-full font-semibold'><FaRegTrashAlt  /></button>)}
                            </div>
                        </div>
                    </div>
                    
                    <div className='border-t-2 bg-gray-50'/>
                    
                    <div className='grid grid-rows-5 h-[25vh] overflow-scroll w-full'>
                        <div className='flex flex-row p-4 items-center text-sm italic'>
                            <input type='checkbox' onClick={()=>handleSelecionarVarios()} className='mr-3 bg-gray-50 border-gray-50 rounded-sm'/><p>Selecionar Vários</p>
                        </div>
                        {idososList.map((paciente) => (
                            <div key={paciente.cpf} className='flex flex-row mt-[1.5vh]'>
                                <div className="flex flex-row gap-x-4 w-[17vw] text-center border-r pl-4 overflow-hidden items-center">
                                    {selecionarVarios&&(<input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm' onClick={()=>addPaciente(paciente)}/>)}
                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis ">{paciente.nome}</p>
                                </div>
                                <p className="w-[5vw] text-center border-r">{paciente.sexo}</p>
                                <p className="w-[5vw] text-center border-r">{calcularIdade(paciente.data_nascimento)}</p>
                                <p className="w-[10vw] text-center border-r">{paciente.cpf}</p>
                                {selectedUser.length<=1&&
                                (<div className='flex flex-row w-[25%] justify-end gap-x-5'>
                                    <button className='bg-red-1100 hover:opacity-60 py-2 px-2 items-center flex rounded-full font-semibold'><FaRegTrashAlt  /></button>
                                    <button className='bg-purple-500 px-2 hover:opacity-60 py-3 items-center flex rounded-full font-semibold text-white'> <Link href={`/perfil?cpf=${paciente.cpf}`}> Ver Mais </Link></button>
                                </div>
                                )}
                            </div>
                        ))}
                        
                    </div>

                    <div className='h-[4vh] w-[106vh] bg-[#6B3F97] justify-end flex-grow items-end z-50 bottom-0 rounded-br-md rounded-bl-md'/>
                </div>
            </div>
            {isFiltroAberto && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                    <Filtro onClose={closeModal}/>
                </div>
            )}
            
        </div>
        </>
      );
    }      