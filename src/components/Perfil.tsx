"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { FaLock, FaPlus, FaRegEye } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HeaderPage } from './Header';
import { SearchBar } from './SearchBar';
import { getIdoso } from '@/lib/api';

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

interface Idoso{
    id: number,
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


export function Perfil(){
    const [verMais, setVerMais] = useState(false);
    const [exame, setExame] = useState<Exame[]>([]);
    const [treino, setTreinos] = useState<Treino[]>([]);
    const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
    const [dataPublicacao, setDataPublicacao] = useState<string>('');
    const [selectedIdoso, setSelectedIdoso] = useState<Idoso[]>([]);

    const [idosoInfo, setIdosoInfo] = useState({
        id: 0,
        nome: '',
        data_nascimento: '',
        sexo: '',
        raca: '',
        escolaridade: '',
        deficiencia: '',
        deficiencia_quais: '',
        telefone_pessoal: '',
        telefone_emergencial: '',
        endereco: '',
        bairro: '',
        cep: '',
        rg: '',
        cpf: '',
        cartao_cns: '',
        plano_saude: '',
        plano_saude_qual: '',
        onde_moras: '',
        com_quem_mora: '',
        quantos_residem: '',
        meio_transporte: '',
        situacao_economica: '',
        renda: '',
        problemas_saude: '',
        problemas_saude_quais: '',
        cirgurgia_recente: '',
        cirurgia_quais: '',
        internacao_recente: '',
        internacao_quais: '',
        alcool: '',
        fumante: '',
        drogas: '',
        medicamentos: '',
        medicamentos_quais: ''
    })

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        if (typeof id === 'string') {
            getIdoso(id).then(data => {setSelectedIdoso(data); setIdosoInfo(data); });  
        }
    }, []);



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
                        <div className='w-[60vw] bg-white shadow-2xl rounded-md '>
                            <div className='p-6'>
                                <div className='grid grid-cols-3 items-center'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='id'>
                                            ID: <span className='font-normal'>{idosoInfo.id}</span>
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
                                <div className='grid grid-cols-4 gap-6 items-center mt-4'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nasc'>
                                            Data de Nascimento
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='date' />
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
                                            className='shadow appearance-none border rounded w-[11vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2 ml-3'>
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
                                <div className='grid grid-cols-3 gap-4 mt-4'>
                                    <div className='items-center'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='raca'>
                                            Raça
                                        </label>
                                        <div className='flex items-center gap-2'>
                                            <select
                                                className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                id='raca'>
                                                <option value='branco'>Amarelo</option>
                                                <option value='branco'>Branco</option>
                                                <option value='indigena'>Indígena/Nativo</option>
                                                <option value='pardo'>Pardo</option>
                                                <option value='preto'>Preto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='items-center'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='escolaridade'>
                                            Escolaridade
                                        </label>
                                        <select
                                            className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                                            <div className='items-center'>
                                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefone'>
                                                    Telefone
                                                </label>
                                                <input
                                                    className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                    id='telefone' type='text'/>
                                            </div>
                                    </div>
                                <div className='grid grid-cols-3 gap-0 items-center mt-6'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='endereco'>
                                            Endereço
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2 mx-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cep'>
                                            CEP
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[80%] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text'/>
                                    </div>
                                    <div className='items-center gap-2 ml-6'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='bairro'>
                                            Bairro
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[80%] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                                
                                {verMais&&<span>
                                    <div className='w-full flex flex-row justify-between px-12 mt-16 mb-4'>
                                        <h2 className='font-semibold text-xl text-[#6B3F97]'>Informações de Renda</h2>
                                        <button className='text-xs text-blue-700 font-semibold hover:opacity-60'>LIMPAR TUDO</button>
                                    </div>
                                    <div className='justify-start items-center flex px-12 w-full'>
                                        <div className='w-full shadow-2xl rounded-md'>
                                            <div className='p-6'>
                                                <div className='justify-start grid grid-cols-2 items-start mt-6 gap-y-10'>

                                                        <p className='block text-gray-700 text-sm font-bold'> Onde mora?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                                id='sexo'>
                                                                <option value='Casa'>Casa</option>
                                                                <option value='Apartamento'>Apartamento</option>
                                                                <option value='ILPI'>ILPI</option>
                                                            </select>
                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold'>Com quem mora?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                                id='sexo'>
                                                                <option value='Familia'>Família</option>
                                                                <option value='Sozinho(a)'>Sozinho(a)</option>
                                                                <option value='Amigo(a)'>Amigo(a)</option>
                                                            </select>
                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Quantos residem com você?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                                id='sexo'>
                                                                <option value='0'>Sozinho(a)</option>
                                                                <option value='1'>Duas</option>
                                                                <option value='2'>Tres</option>
                                                                <option value='3'>Quatro</option>
                                                                <option value='4'>Cinco</option>
                                                                <option value='5'>Mais de cinco</option>
                                                            </select>
                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Qual meio de transporte usado para vir ao projeto?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[14vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                                id='sexo'>
                                                                <option value='A pé'>A pé</option>
                                                                <option value='Bicicleta'>Bicicleta</option>
                                                                <option value='Transporte público'>Transporte público</option>
                                                                <option value='Transporte particular'>Transporte particular</option>
                                                            </select>
                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Qual a sua renda mensal?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[14vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                                id='sexo'>
                                                                <option value='Aposentado(a)'>Aposentado(a)</option>
                                                                <option value='Pensionista'>Pensionista</option>
                                                                <option value='Desempregado(a)'>Desempregado(a)</option>
                                                                <option value='Autonomo(a)'>Autonomo(a)</option>
                                                                <option value='Empregado(a)'>Empregado(a)</option>
                                                            </select>
                                                        </div>

                                                </div> 
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full flex flex-row justify-between px-12 mt-16 mb-4'>
                                        <h2 className='font-semibold text-xl text-[#6B3F97]'>Informações de Saúde</h2>
                                        <button className='text-xs text-blue-700 font-semibold hover:opacity-60'>LIMPAR TUDO</button>
                                    </div>
                                    <div className='justify-start items-center flex px-12 w-full'>
                                        <div className='w-full shadow-2xl rounded-md mb-20'>
                                            <div className='p-6'>
                                                <div className='justify-start grid grid-cols-2 items-start mt-6 gap-y-10'>
                                                        <p className='block text-gray-700 text-sm font-bold'>Tem alguma deficiência?</p>
                                                        <div className='flex flex-row w-full gap-x-10 items-start'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>

                                                            <div className='flex flex-row gap-x-2'>
                                                                <textarea name="" id="" className='w-[14vw]'></textarea>
                                                            </div>

                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold'>Tem algum plano de saúde?</p>
                                                        <div className='flex flex-row w-full gap-x-10 items-start'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>

                                                            <input type="text" name="" id="" className='w-[14vw]'/>

                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Tem algum problema de saúde?</p>
                                                        <div className='flex flex-row w-full gap-x-10'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>

                                                            <div className='flex flex-col gap-y-2 border items-start gap-2 py-2 px-3 w-[14vw]'>
                                                                <div className='flex flex-row items-center'>
                                                                    <input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm'/>
                                                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis ">Cardiovascular</p>
                                                                </div>

                                                                <div className='flex flex-row items-center'>
                                                                    <input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm'/>
                                                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis ">Respiratória</p>
                                                                </div>

                                                                <div className='flex flex-row items-center'>
                                                                    <input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm'/>
                                                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis ">Osteoarticular</p>
                                                                </div>

                                                                <div className='flex flex-row items-center'>
                                                                    <input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm'/>
                                                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis ">Metabólica</p>
                                                                </div>

                                                                <div className='flex flex-row items-center'>
                                                                    <input type='checkbox' className='mr-3 bg-gray-50 border-gray-50 rounded-sm'/>
                                                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis ">Psiquiátrica</p>
                                                                </div>
                                                            </div>

                                                        </div>   
                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Fez cirurgia nos últimos 12 meses?</p>
                                                        <div className='flex flex-row w-full gap-x-10 items-start'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>

                                                            <div className='flex flex-row gap-x-2'>
                                                                <textarea name="" id="" className='w-[14vw]'></textarea>
                                                            </div>

                                                        </div>  

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Teve alguma internação nos últimos 12 meses?</p>
                                                        <div className='flex flex-row w-full gap-x-10 items-start'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>

                                                            <div className='flex flex-row gap-x-2'>
                                                                <textarea name="" id="" className='w-[14vw]'></textarea>
                                                            </div>

                                                        </div>   
                                                            
                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Toma medicamento regularmente?</p>
                                                        <div className='flex flex-row w-full gap-x-10 items-start'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>

                                                            <div className='flex flex-row gap-x-2'>
                                                                <textarea name="" id="" className='w-[14vw]'></textarea>
                                                            </div>

                                                        </div> 

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Faz uso de álcool?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>
                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>É fumante?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>
                                                        </div>

                                                        <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Faz uso de drogas?</p>
                                                        <div className='flex items-center gap-2'>
                                                            <select
                                                                className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                                <option value='sim'>Sim</option>
                                                                <option value='nao'>Não</option>
                                                            </select>
                                                        </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </span>}
                            </div>

                        </div>
                    </div>
                    <button onClick={()=>setVerMais(!verMais)} className='text-sm text-blue-600 hover:text-blue-800 justify-end flex flex-row w-full px-12 my-3 hover:underline cursor-pointer'>
                        {verMais?('Ver menos'):('Ver mais')}
                    </button>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Treinos</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <SearchBar pesquisa='Treinos' ehExame={false}  ehTreino={true} info={treino} id='01' nome='Hemograma' data='16/07/2024'/>
                    </div>
            
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Exames</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <  SearchBar pesquisa='Exames' ehExame={true}  ehTreino={false} info={exame} id='01' nome='Hemograma' data='16/07/2024'/>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Avaliação</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <SearchBar pesquisa='Avaliações' ehExame={false} ehTreino={false} info={avaliacao} id='01' nome='Hemograma' data='16/07/2024' />
                    </div>
                </div>
            </div>
        </div>
    );
}