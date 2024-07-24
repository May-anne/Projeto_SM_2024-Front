"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'
import { FaLock, FaPlus, FaRegEye } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HeaderPage } from './Header';
import { SearchBar } from './SearchBar';
import { getIdoso, updateIdoso } from '@/lib/api';
import cross from '../../public/images/cross.png'

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
    const [editado, setEditado] = useState(false);
    const [exame, setExame] = useState<Exame[]>([]);
    const [treino, setTreinos] = useState<Treino[]>([]);
    const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
    const [dataPublicacao, setDataPublicacao] = useState<string>('');
    
    const [selectedIdoso, setSelectedIdoso] = useState<Idoso>();
    const [idosoInfo, setIdosoInfo] = useState<Idoso>({
        nome: '',
        data_nascimento: '',
        sexo: '',
        raca: '',
        escolaridade: '',
        deficiencia: false,
        deficiencia_quais: '',
        telefone_pessoal: '',
        telefone_emergencial: '',
        endereco: '',
        bairro: '',
        cep: '',
        rg: '',
        cpf: '',
        cartao_cns: '',
        plano_saude: false,
        plano_saude_qual: '',
        onde_moras: '',
        com_quem_mora: '',
        quantos_residem: 0,
        meio_transporte: '',
        situacao_economica: '',
        renda: 0,
        problemas_saude: false,
        problemas_saude_quais: '',
        cirgurgia_recente: false,
        cirurgia_quais: '',
        internacao_recente: false,
        internacao_quais: '',
        alcool: false,
        fumante: false,
        drogas: false,
        medicamentos: false,
        medicamentos_quais: ''
    })

    const options: { [key: string]: string[] } = {
        raca: ['Amarela', 'Branca', 'Indigena', 'Parda', 'Preta'],
        escolaridade: ['Fundamental 1', 'Fundamental 2', 'Ensino Médio', 'Ensino Superior', 'Pós graduação'],
        sexo: ['F', 'M'],
        onde_moras: ['Casa', 'Apartamento', 'ILPI'],
        com_quem_mora: ['Familia', 'Sozinho(a)', 'Amigo(a)'],
        quantos_residem: ['1', '2', '3', '4', '5', '6'],
        meio_transporte: ['A pé', 'Bicicleta', 'Transporte público', 'Transporte particular'],
        situacao_economica: ['Aposentado(a)', 'Pensionista', 'Desempregado(a)', 'Autonomo(a)', 'Empregado(a)'],
        problemas: ['Cardiovascular', 'Respiratória', 'Osteoarticular', 'Metabólica', 'Psiquiátrica']
    };

    const quantosResidemText: { [key: string]: string } = {
        '1': 'Sozinho(a)',
        '2': 'Duas',
        '3': 'Tres',
        '4': 'Quatro',
        '5': 'Cinco',
        '6': 'Mais de cinco'
    };

    const isValidOption = (field: string, value: string): string => options[field].includes(value) ? value : '';

    const handleChange = (event:any) => {
        const { id, value, type, checked } = event.target;
    
        // Verifica se o input é um checkbox ou não
        if (type === 'checkbox') {
            setIdosoInfo(prevState => ({
                ...prevState,
                [id]: checked
            }));
        } 

        else if (type === 'date') {
            setIdosoInfo(prevState => ({
                ...prevState,
                [id]: value
            }));
        }

        else {
            setIdosoInfo(prevState => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = event.target;
        
        // Converte o valor de volta para booleano
        const booleanValue = value === 'sim';
    
        setIdosoInfo(prevState => ({
            ...prevState,
            [id]: booleanValue
        }));
    };

    const problemas = options.problemas;

    const handleCheckboxChange = (problem: string) => {
        const problemasArray = idosoInfo.problemas_saude_quais.split(',');

        if (problemasArray.includes(problem)) {
            // Remove o problema da string se estiver presente
            const updatedProblems = problemasArray.filter(p => p !== problem).join(',');
            setIdosoInfo(prevState => ({ ...prevState, problemas_saude_quais: updatedProblems }));
        } else {
            // Adiciona o problema à string se não estiver presente
            const updatedProblems = [...problemasArray, problem].join(',');
            setIdosoInfo(prevState => ({ ...prevState, problemas_saude_quais: updatedProblems }));
        }
    };
    
    function LimparTudo(row: number){
        const pt1 = row == 0 ? {
            nome: '',
            data_nascimento: '',
            sexo: '',
            raca: '',
            escolaridade: '',
            telefone_pessoal: '',
            telefone_emergencial: '',
            endereco: '',
            bairro: '',
            cep: '',
            rg: '',
            cpf: '',
            cartao_cns: '',
        } : {
            nome: idosoInfo.nome,
            data_nascimento: idosoInfo.data_nascimento,
            sexo: idosoInfo.sexo,
            raca: idosoInfo.raca,
            escolaridade: idosoInfo.escolaridade,
            telefone_pessoal: idosoInfo.telefone_pessoal,
            telefone_emergencial: idosoInfo.telefone_emergencial,
            endereco: idosoInfo.endereco,
            bairro: idosoInfo.bairro,
            cep: idosoInfo.cep,
            rg: idosoInfo.rg,
            cpf: idosoInfo.cpf,
            cartao_cns: idosoInfo.cartao_cns,
        };
        
        const pt2 = row == 1 ? {
            onde_moras: '',
            com_quem_mora: '',
            quantos_residem: 0,
            meio_transporte: '',
            situacao_economica: '',
            renda: 0,
        } : {
            onde_moras: idosoInfo.onde_moras,
            com_quem_mora: idosoInfo.com_quem_mora,
            quantos_residem: idosoInfo.quantos_residem,
            meio_transporte: idosoInfo.meio_transporte,
            situacao_economica: idosoInfo.situacao_economica,
            renda: idosoInfo.renda
        };

        const pt3 = row == 2 ? {
            deficiencia: false,
            deficiencia_quais: '',
            plano_saude: false,
            plano_saude_qual: '',
            problemas_saude: false,
            problemas_saude_quais: '',
            cirgurgia_recente: false,
            cirurgia_quais: '',
            internacao_recente: false,
            internacao_quais: '',
            alcool: false,
            fumante: false,
            drogas: false,
            medicamentos: false,
            medicamentos_quais: ''
        } : {
            deficiencia: idosoInfo.deficiencia,
            deficiencia_quais: idosoInfo.deficiencia_quais,
            plano_saude: idosoInfo.plano_saude,
            plano_saude_qual: idosoInfo.plano_saude_qual,
            problemas_saude: idosoInfo.problemas_saude,
            problemas_saude_quais: idosoInfo.problemas_saude_quais,
            cirgurgia_recente: idosoInfo.cirgurgia_recente,
            cirurgia_quais: idosoInfo.cirurgia_quais,
            internacao_recente: idosoInfo.internacao_recente,
            internacao_quais: idosoInfo.internacao_quais,
            alcool: idosoInfo.alcool,
            fumante: idosoInfo.fumante,
            drogas: idosoInfo.drogas,
            medicamentos: idosoInfo.medicamentos,
            medicamentos_quais: idosoInfo.medicamentos_quais,
        };

        const updatedIdosoInfo = {
            ...idosoInfo,
            ...pt1,
            ...pt2,
            ...pt3
        };
    
        setIdosoInfo(updatedIdosoInfo);

    }
    
    const renderCrossImages = () => {
        const images = [];
        let tam = verMais?(25):(14)
        for (let i = 0; i < tam; i++) {
            images.push(
                <div className={`z-10 justify-between w-full flex-row flex ${i%2==0?'px-36':'px-16'}`}>
                    <div key={i} className="rounded-full justify-center flex h-[5vw] w-[5vw] overflow-hidden relative">
                        <Image src={cross} alt='' layout="fill" objectFit="cover" />
                    </div>

                    <div key={-i-1} className="z-10 rounded-full justify-center flex h-[5vw] w-[5vw] overflow-hidden relative">
                        <Image src={cross} alt='' layout="fill" objectFit="cover" />
                    </div>
                </div>
            );
        }
        return images;
    };

    const searchParams = useSearchParams()
    const cpf = searchParams.get('cpf')

    useEffect(() => {
        if (typeof cpf === 'string') {
            getIdoso(cpf).then(data => {setSelectedIdoso(data); setIdosoInfo(data); });  
        }
    }, []);

    useEffect(() => {
        idosoInfo == selectedIdoso?(setEditado(false)):(setEditado(true))
    }, [idosoInfo]);
    
    return(
        
        <div className='bg-[#D8C9E0] h-auto w-[100vw]'>
            <HeaderPage/>
            <div className='w-[100%] h-[100%] absolute z-10 flex flex-col justify-between my-20 gap-y-16'>
                {renderCrossImages()}
            </div>
            <div className='flex flex-col justify-center items-center pt-20 z-20 relative'>
                <div className='bg-[#F8F5FA] shadow-lg rounded-lg h-auto w-[60vw] pb-10'>
                    <div className='w-full grid grid-cols-3 justify-center items-center mt-8 gap-1 px-[4vw]'>
                        <Link href={'/dashboard'} className='text-sm font-bold hover:opacity-60'>{'< Voltar'}</Link>
                        <h2 className='font-semibold text-2xl text-[#6B3F97]'>Perfil do(a) Paciente</h2>
                        <div/>
                    </div>
                    <div className='flex flex-row w-full justify-between items-center px-12'>
                        <h2 className='font-semibold text-xl text-[#6B3F97]  mt-8 mb-4'>Dados Pessoais</h2>
                        <div className='flex flex-row gap-x-5'>
                            {editado&&
                                <>
                                    <button className='py-2 px-4 bg-red-1100 items-center justify-center rounded-full hover:opacity-60' onClick={()=>{if (selectedIdoso) {setIdosoInfo(selectedIdoso);}}}>Cancelar</button>
                                    <button className='py-2 px-4 bg-green-1300 items-center justify-center rounded-full hover:opacity-60' onClick={()=> {if (idosoInfo) {updateIdoso(idosoInfo)}; setEditado(false)}}>Salvar</button>
                                </> 
                            }
                        </div>
                    </div>
                    <div className='justify-start items-center flex mx-12 '>
                        <div className='w-[60vw] bg-white shadow-2xl rounded-md '>
                            <div className='p-6'>
                                <div className='grid grid-cols-3 items-center'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                                            Nome Completo
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[30vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='nome' type='text' value={idosoInfo.nome} onChange={handleChange}/>
                                    </div>
                                    <div/>
                                    <div/>
                                </div>
                                <div className='grid grid-cols-4 gap-6 items-center mt-4'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nasc'>
                                            Data de Nascimento
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 leading-tight focus:outline-none focus:shadow-outline'
                                            id='data_nascimento' type='date' value={idosoInfo.data_nascimento} onChange={handleChange}/>
                                        </div>
                                    </div> 
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='rg'>
                                            RG
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='rg' type='text' value={idosoInfo.rg} onChange={handleChange}/>
                                    </div>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cpf'>
                                            CPF
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[11vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='cpf' type='text' value={idosoInfo.cpf} onChange={handleChange}/>
                                    </div>
                                    <div className='items-center gap-2 ml-3'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='sexo'>
                                            Sexo
                                        </label>
                                        <select
                                            className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='sexo' value={isValidOption('sexo', idosoInfo.sexo)} onChange={handleChange}>
                                                <option value='' disabled>Selecione o sexo</option>
                                                {options.sexo.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
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
                                                id='raca' value={isValidOption('raca', idosoInfo.raca)} onChange={handleChange}>
                                                    <option value='' disabled>Selecione a raça</option>
                                                    {options.raca.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='items-center'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='escolaridade'>
                                            Escolaridade
                                        </label>
                                        <select
                                            className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='escolaridade' value={idosoInfo.escolaridade} onChange={handleChange}>
                                                <option value='' disabled>Selecione a escolaridade</option>
                                                {options.escolaridade.map(option => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                        </select>
                                        </div>
                                            <div className='items-center'>
                                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telefone'>
                                                    Telefone
                                                </label>
                                                <input
                                                    className='shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                    id='telefone_pessoal' type='text' value={idosoInfo.telefone_pessoal} onChange={handleChange}/>
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
                                            id='endereco' type='text' value={idosoInfo.endereco} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2 mx-4'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cep'>
                                            CEP
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[80%] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='cep' type='text' value={idosoInfo.cep} onChange={handleChange}/>
                                    </div>
                                    <div className='items-center gap-2 ml-6'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='bairro'>
                                            Bairro
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[80%] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='bairro' type='text' value={idosoInfo.bairro} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className='justify-between flex items-center mt-6'>
                                    <div className='items-center gap-2'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telemerg'>
                                            Telefone Emergencial
                                        </label>
                                        <div className='flex items-center gap-2'>
                                        <input
                                            className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='telefone_emergencial' type='text' value={idosoInfo.telefone_emergencial} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className='items-center gap-2 mx-[20vh]'>
                                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cns'>
                                            Cartão CNS
                                        </label>
                                        <input
                                            className='shadow appearance-none border rounded w-[13vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='cartao_cns' type='text' value={idosoInfo.cartao_cns} onChange={handleChange}/>
                                    </div>
                                </div> 
                                
                                {verMais&&<span>
                                    <div className='w-full flex flex-row justify-between px-12 mt-16 mb-4'>
                                        <h2 className='font-semibold text-xl text-[#6B3F97]'>Informações de Renda</h2>
                                        <button className='text-xs text-blue-700 font-semibold hover:opacity-60' onClick={()=>{LimparTudo(1)}}>LIMPAR TUDO</button>
                                    </div>
                                    <div className='justify-start items-center flex px-12 w-full'>
                                        <div className='w-full shadow-2xl rounded-md'>
                                            <div className='p-6'>
                                                <div className='justify-start grid grid-cols-2 items-start mt-6 gap-y-10'>

                                                    <p className='block text-gray-700 text-sm font-bold'> Onde mora?</p>
                                                    <div className='flex items-center gap-2'>
                                                        <select
                                                            className='shadow appearance-none border rounded w-[15vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='onde_moras' value={isValidOption('onde_moras', idosoInfo.onde_moras)} onChange={handleChange}>
                                                                <option value='' disabled>Selecione onde mora</option>
                                                                {options.onde_moras.map(option => (
                                                                    <option key={option} value={option}>{option}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                    <p className='block text-gray-700 text-sm font-bold'>Com quem mora?</p>
                                                    <div className='flex items-center gap-2'>
                                                        <select
                                                            className='shadow appearance-none border rounded w-[18vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='com_quem_mora' value={isValidOption('com_quem_mora', idosoInfo.com_quem_mora)} onChange={handleChange}>
                                                                <option value='' disabled>Selecione com quem mora</option>
                                                                {options.com_quem_mora.map(option => (
                                                                    <option key={option} value={option}>{option}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Quantos residem com você?</p>
                                                    <div className='flex items-center gap-2'>
                                                        <select
                                                            className='shadow appearance-none border rounded w-[18vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='quantos_residem' value={isValidOption('quantos_residem', `${idosoInfo.quantos_residem}`)} onChange={handleChange}>
                                                            <option value='' disabled>Selecione quantos residem</option>
                                                            {Object.entries(quantosResidemText).map(([value, text]) => (
                                                                <option key={value} value={value}>{text}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Qual meio de transporte usado para vir ao projeto?</p>
                                                    <div className='flex items-center gap-2'>
                                                        <select
                                                            className='shadow appearance-none border rounded w-[18vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='meio_transporte' value={isValidOption('meio_transporte', idosoInfo.meio_transporte)} onChange={handleChange}>
                                                                <option value='' disabled>Selecione o meio de transporte</option>
                                                                {options.meio_transporte.map(option => (
                                                                    <option key={option} value={option}>{option}</option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Qual a sua situação econômica?</p>
                                                    <div className='flex items-center gap-2'>
                                                        <select
                                                            className='shadow appearance-none border rounded w-[18vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                            id='situacao_economica' value={isValidOption('situacao_economica', idosoInfo.situacao_economica)} onChange={handleChange}>
                                                                <option value='' disabled>Selecione a situação econômica</option>
                                                                {options.situacao_economica.map(option => (
                                                                    <option key={option} value={option}>{option}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                    </div>

                                    <div className='w-full flex flex-row justify-between px-12 mt-16 mb-4'>
                                        <h2 className='font-semibold text-xl text-[#6B3F97]'>Informações de Saúde</h2>
                                        <button className='text-xs text-blue-700 font-semibold hover:opacity-60' onClick={()=>{LimparTudo(2)}}>LIMPAR TUDO</button>
                                    </div>
                                    <div className='justify-start items-center flex px-12 w-full'>
                                        <div className='w-full shadow-2xl rounded-md mb-20'>
                                            <div className='p-6'>
                                                <div className='justify-start grid grid-cols-3 items-center gap-x-[1vw] mt-6 gap-y-10'>
                                                    
                                                    <p className='block text-gray-700 text-sm font-bold'>Tem alguma deficiência?</p>
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='deficiencia' value={idosoInfo.deficiencia?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    {idosoInfo.deficiencia?
                                                        (<textarea name="" id="deficiencia_quais" className='w-[12vw]' value={idosoInfo.deficiencia_quais} onChange={handleChange}></textarea>)
                                                        :(<div/>)
                                                    }

                                                    <p className='block text-gray-700 text-sm font-bold'>Tem algum plano de saúde?</p> 
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='plano_saude' value={idosoInfo.plano_saude?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    {idosoInfo.plano_saude?
                                                        (<input type="text" name="" id="plano_saude_qual" className='w-[12vw]' value={idosoInfo.plano_saude_qual} onChange={handleChange}/>)
                                                        :(<div/>)
                                                    }

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Tem algum problema de saúde?</p>
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='problemas_saude' value={idosoInfo.problemas_saude?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    {idosoInfo.problemas_saude?
                                                        (<div className='flex flex-col gap-y-2 border items-start gap-2 py-2 px-3 w-[12vw]'>
                                                            {problemas.map(problem => (
                                                                <label
                                                                    key={problem}
                                                                    className='flex flex-row items-center cursor-pointer select-none'
                                                                >
                                                                    <input
                                                                        type='checkbox'
                                                                        className='mr-3 bg-gray-50 border-gray-50 rounded-sm'
                                                                        checked={idosoInfo.problemas_saude_quais.split(',').includes(problem)}
                                                                        onChange={() => handleCheckboxChange(problem)}
                                                                    />
                                                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">{problem}</p>
                                                                </label>
                                                            ))}
                                                        </div>)
                                                        :(<div/>)
                                                    }

                                                        
                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Fez cirurgia nos últimos 12 meses?</p>
                                                    
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='cirgurgia_recente' value={idosoInfo.cirgurgia_recente?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    {idosoInfo.cirgurgia_recente?
                                                        (<textarea name="" id="cirurgia_quais" className='w-[12vw]' value={idosoInfo.cirurgia_quais} onChange={handleChange}></textarea>)
                                                        :(<div/>)
                                                    }

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Teve alguma internação nos últimos 12 meses?</p>
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='internacao_recente' value={idosoInfo.internacao_recente?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    {idosoInfo.internacao_recente?
                                                        (<textarea name="" id="internacao_quais" className='w-[12vw]' value={idosoInfo.internacao_quais} onChange={handleChange}></textarea>)
                                                        :(<div/>)
                                                    }

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Toma medicamento regularmente?</p>
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] h-8 py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='medicamentos' value={idosoInfo.medicamentos?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    {idosoInfo.medicamentos?
                                                        (<textarea name="" id="medicamentos_quais" className='w-[12vw]' value={idosoInfo.medicamentos_quais} onChange={handleChange}></textarea>)
                                                        :(<div/>)
                                                    }

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Faz uso de álcool?</p> 
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='alcool' value={idosoInfo.alcool?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    <div/>

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>É fumante?</p>
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='fumante' value={idosoInfo.fumante?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    <div/>

                                                    <p className='block text-gray-700 text-sm font-bold w-[12vw]'>Faz uso de drogas?</p>
                                                    <select
                                                        className='shadow appearance-none border rounded w-[5vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                                        id='drogas' value={idosoInfo.drogas?('sim'):('nao')} onChange={handleSelectChange}>
                                                        <option value='sim'>Sim</option>
                                                        <option value='nao'>Não</option>
                                                    </select>
                                                    <div/>
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
                        <SearchBar searchAll={false} pesquisa='Treinos' ehExame={false} ehAvaliacao={false} ehTreino={true} cpf={idosoInfo.cpf} nome={idosoInfo.nome}/>
                    </div>
            
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Exames</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <SearchBar searchAll={false} pesquisa='Exames' ehExame={true} ehAvaliacao={false} ehTreino={false} cpf={idosoInfo.cpf} nome={idosoInfo.nome}/>
                    </div>
                    <div>
                        <h2 className='font-semibold text-xl text-[#6B3F97] mx-12 mt-8 mb-4'>Avaliação</h2>
                    </div>
                    <div className='justify-start items-center mx-12'>
                        <SearchBar searchAll={false} pesquisa='Avaliações' ehExame={false} ehTreino={false} ehAvaliacao={true} cpf={idosoInfo.cpf} nome={idosoInfo.nome}/>
                    </div>
                </div>
            </div>
        </div>
    );
}