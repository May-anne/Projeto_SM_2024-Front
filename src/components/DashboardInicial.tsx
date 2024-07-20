"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeaderPage } from './Header';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdFilterAlt, MdOutlineSort } from "react-icons/md";
import { FaPlus } from 'react-icons/fa6';
import Filtro from './Filtro';
import { apagarIdoso, getIdosos } from '@/lib/api';
import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

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

    function apagarUmIdoso(cpf: string) {
        apagarIdoso(cpf)
        setIdososList(prevList => prevList.filter(idoso => idoso.cpf !== cpf));
    }

    function apagarVariosIdosos(pacientes: Idoso[]) {
        const cpfs = pacientes.map(paciente => paciente.cpf);
        for(let i=0; i<cpfs.length; i++){
            apagarIdoso(cpfs[i])
        }
        setIdososList(prevList => prevList.filter(idoso => !cpfs.includes(idoso.cpf)));
    }

    function handleApagarIdoso(paciente: Idoso) {
        if (selectedUser.length > 1) {
            if (confirm(`Deseja apagar os pacientes selecionados?`) == true) {
                apagarVariosIdosos(selectedUser);
                setSelectedUser([]);
                alert("Usuários removidos!");
            }
        } else {
            if (confirm(`Deseja apagar o paciente: "${paciente.nome}" de cpf: "${paciente.cpf}"?`) == true) {
                apagarUmIdoso(paciente.cpf);
                alert("Usuário removido!");
            }
        }
    }

    return (
        <>
        <div className='h-[100vh] w-[100vw] bg-[#eae3ef]'>
            <HeaderPage/>
            
            <div className='flex flex-col h-full  justify-center items-center'>
               
                <div className='sm:w-full lg:w-[106vh] h-[6vh] rounded-md flex items-center'>
                    <input
                        type="text"
                        placeholder="Pesquisar pacientes..."
                        className="h-full px-[1vw] flex-grow outline-none rounded-tl-md rounded-bl-md border-white"
                    />
                    <button className="hidden lg:block h-full px-4 py-2 bg-[#6B3F97] hover:bg-[#4A2569] text-white rounded-tr-md rounded-br-md">
                        Buscar
                    </button>

                    <button className="lg:hidden block h-full px-4 py-2 bg-[#6B3F97] hover:bg-[#4A2569] text-white rounded-tr-md rounded-br-md">
                        <FaSearch/>
                    </button>

                    <Link href={'/cadastro'} className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'><FaPlus className='text-white' size={20} /></Link>
                    <button onClick={openModal} className='rounded-md px-2 py-2 ml-2 shadow-lg bg-white hover:bg-gray-50'><MdFilterAlt className='text-[#6B3F97]'size={20}/></button>
                </div>



                <div className='sm:w-full lg:w-[106vh] mt-[10vh] lg:mt-5  bg-white shadow-lg'>
                    <div className='hidden w-full h-[6vh] bg-white shadow-md lg:flex items-center'>
                        <div className='flex flex-row justify-start items-center w-full'>
                            <p className="lg:w-[17vw] text-center border-r">Nome</p>
                            <p className="lg:w-[5vw] text-center border-r">Sexo</p>
                            <p className="lg:w-[5vw] text-center border-r">Idade</p>
                            <p className="lg:w-[10vw] text-center border-r">CPF</p>
                            <div className='lg:w-[30%] flex flex-row justify-between items-center rounded-md px-4 py-4'>
                                <button className='text-[#6B3F97] hover:bg-gray-50 py-3 px-2 items-center flex rounded-full font-semibold'><MdOutlineSort size={24} /></button> 
                                {selectedUser.length>1&&(<button className='bg-red-1100 hover:opacity-60 py-2 px-2 items-center flex rounded-full font-semibold' onClick={() => handleApagarIdoso(selectedUser[0])}><FaRegTrashAlt  /></button>)}
                            </div>
                        </div>
                    </div>
                    
                    <div className='border-t-2 bg-gray-50'/>
                    
                    <div className='grid grid-cols-2 gap-x-2 lg:gap-x-0 lg:grid-rows-5 lg:grid-cols-none pb-5 px-2 lg:px-0 h-[60vh] lg:h-[25vh] overflow-scroll w-[100vw] lg:w-full'>
                        <div className='flex flex-row py-4 lg:py-0 px-2 lg:p-4 items-center text-sm italic w-full'>
                            <input type='checkbox' onClick={()=>handleSelecionarVarios()} className='mr-3 bg-gray-50 border-gray-50 rounded-sm'/><p>Selecionar Vários</p>
                        </div>
                        <div className='flex lg:hidden'/>
                        {idososList.map((paciente) => (
                            <>
                                <div key={paciente.cpf} className='hidden lg:flex flex-row mt-[1.5vh]'>
                                    <div className="flex flex-row gap-x-4 lg:w-[17vw] text-center border-r pl-4 overflow-hidden items-center">
                                        {selecionarVarios&&(<input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm' onClick={()=>addPaciente(paciente)}/>)}
                                        <p className="overflow-hidden whitespace-nowrap text-ellipsis ">{paciente.nome}</p>
                                    </div>
                                    <p className="lg:w-[5vw] text-center border-r">{paciente.sexo}</p>
                                    <p className="lg:w-[5vw] text-center border-r">{calcularIdade(paciente.data_nascimento)}</p>
                                    <p className="lg:w-[10vw] text-center border-r">{paciente.cpf}</p>
                                    {selectedUser.length<=1&&
                                    (<div className='flex flex-row lg:w-[25%] justify-end gap-x-5'>
                                        <button className='bg-red-1100 hover:opacity-60 py-2 px-2 items-center flex rounded-full font-semibold' onClick={()=>{handleApagarIdoso(paciente)}}><FaRegTrashAlt  /></button>
                                        <button className='bg-purple-500 px-2 hover:opacity-60 py-3 items-center flex rounded-full font-semibold text-white'> 
                                            <Link className='hidden lg:block' href={`/perfil?cpf=${paciente.cpf}`}> Ver Mais </Link>
                                            <Link className='lg:hidden block' href={`/perfil?cpf=${paciente.cpf}`}> <FaEye/> </Link>
                                        </button>
                                        
                                    </div>
                                    )}
                                </div>

                                <div key={paciente.cpf} className='lg:hidden flex flex-col mt-[1.5vh] border rounded-lg py-3 px-2 w-full gap-y-3'>
                                    <div className="flex flex-row gap-x-4 text-center overflow-hidden items-center justify-start ">
                                        {selecionarVarios&&(<input type='checkbox' className=' bg-gray-50 border-gray-50 rounded-sm' onClick={()=>addPaciente(paciente)}/>)}
                                        <p className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold">{paciente.nome}</p>
                                    </div>
                                    <div className='flex flex-row w-full justify-between px-3'>
                                        <p className="text-center"><span className='font-semibold text-sm italic'>Sexo: </span>{paciente.sexo}</p>
                                        <p>|</p>
                                        <p className="text-center"><span className='font-semibold text-sm italic'>Idade: </span>{calcularIdade(paciente.data_nascimento)}</p>
                                    </div>
                                    
                                    <p className="text-center">{paciente.cpf}</p>
                                    {selectedUser.length<=1&&
                                    (<div className='flex flex-row gap-x-5 w-full justify-between px-10'>
                                        <button className='bg-red-1100 hover:opacity-60 py-2 px-2 items-center flex rounded-full font-semibold' onClick={()=>{handleApagarIdoso(paciente)}}><FaRegTrashAlt  /></button>
                                        <button className='bg-purple-500 px-2 hover:opacity-60 py-3 items-center flex rounded-full font-semibold text-white'> 
                                            <Link className='hidden lg:block' href={`/perfil?cpf=${paciente.cpf}`}> Ver Mais </Link>
                                            <Link className='lg:hidden block' href={`/perfil?cpf=${paciente.cpf}`}> <FaEye/> </Link>
                                        </button>
                                        
                                    </div>
                                    )}
                                </div>
                            </>
                        ))}
                        
                    </div>

                    <div className='h-[4vh] lg:w-[106vh] bg-[#6B3F97] justify-end flex-grow items-end z-50 bottom-0 lg:rounded-br-md lg:rounded-bl-md'/>
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