"use client"
import { FaRegCalendarAlt, FaPlus } from "react-icons/fa";
import { FaLock } from 'react-icons/fa6';
import { FaEdit, FaRegTrashAlt,FaFilePdf } from 'react-icons/fa';
import { ModalDelete } from './ModalDelete';
import { useEffect, useState } from 'react';
import { criarModalidade, deletarModalidade } from '@/lib/api';

interface ModalProps {
    avaliacao: any;
    nome: string;
    cpf: string | undefined;
    editar: boolean
}

export function AddAvaliacao(props: ModalProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editing, setIsEditing] = useState(false);
    const [AvaliacaoInfo, setAvaliacao] = useState({
        id: 0,
        nome: "",
        cpf_idoso: props.cpf,
        data: "",
        peso: "",
        estatura: "",
        marcha6: "",
        per_cintura: "",
        per_quadril:"",
        per_panturrilha:"",
        hg_esquerda1:"",
        hg_esquerda2: "",
        hg_direita1:"",
        hg_direita2:"",
        ir_vir1: "",
        ir_vir2: "",
    })

    const fieldTitles: { [key: string]: string } = {
        peso: "Peso (kg)",
        estatura: "Estatura (m)",
        per_cintura: "Cintura",
        per_quadril: "Quadril",
        per_panturrilha: "Panturrilha",
        marcha6: "Marcha (s)",
        hg_direita1: "Handgrip direito 1",
        hg_direita2: "Handgrip direito 2",
        hg_esquerda1: "Handgrip esquerdo 1",
        hg_esquerda2: "Handgrip esquerdo 2",
        ir_vir1: "TUG 1",
        ir_vir2: "TUG 2",
      };

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setAvaliacao(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        setAvaliacao(prevState => ({
            ...prevState,
            ...props.avaliacao,
            cpf_idoso: props.cpf,
            nome: props.nome
        }));
    }, [props.avaliacao, props.cpf, props.nome]);


    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    function resetModal(){
        setShowModal(true)
    
    }

    function deleteAvaliacao() {
        if (!AvaliacaoInfo.cpf_idoso) {
            console.error("CPF não fornecido");
            return;
        }
        deletarModalidade('avaliacao', AvaliacaoInfo)
            .then(() => {
                console.log("Avaliação deletada com sucesso");
            })
            .catch(console.error);
        console.log(AvaliacaoInfo);
    }

    function createAvaliacao() {
        if (!AvaliacaoInfo.cpf_idoso) {
            console.error("CPF não fornecidooo");
            return;
        }
        criarModalidade('avaliacao', AvaliacaoInfo)
            .then((response) => {
                setAvaliacao(response);
            })
            .catch(console.error);
        console.log(AvaliacaoInfo);
    }
    return (

        <>
        {!props.editar ? (
                <button 
                    className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'
                    onClick={() => resetModal()}>
                    <FaPlus className='text-white' size={20} />
                </button>
            ) : (
                <button 
                    className='text-[#6B3F97] hover:bg-gray-50 py-3 px-2 items-center flex rounded-full font-semibold'
                    onClick={() => resetModal()}>
                    Ver mais
                </button>
            )}

        
        {showModal ? (
            <>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-transparent p-6 rounded-lg shadow-lg w-[60vw]">
                        <div className='bg-[#F8F5FA] h-[60vh] w-[60vw] rounded-lg shadow-lg overflow-y-auto' style={{maxHeight: '60vh', scrollbarWidth: 'thin'}}>
                            <div className='flex items-center justify-between p-6'>
                                <h2 className='font-semibold text-2xl text-[#6B3F97] text-center mb-2 mt-2'>Título da Avaliação</h2>
                                <div className='flex items-center gap-3'>
                                    <button onClick={handleEditClick}><FaEdit className='text-[#6B3F97] cursor-pointer hover:text-[#4A2569]' size={22} /></button>
                                    <button onClick={handleOpenModal}><FaRegTrashAlt className='text-red-700 hover:text-red-900 cursor-pointer' size={20} /></button>
                                </div>
                            </div>
                            <ModalDelete 
                                isOpen={isModalOpen} 
                                onClose={handleCloseModal} 
                                termo="esta avaliação"
                                id={AvaliacaoInfo.id}
                            />
                            <div className='grid grid-cols-3 ml-8'>
                                <div className='items-center gap-2'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='id'>
                                        ID Avaliação
                                    </label>
                                    <div className='relative'>
                                        <input
                                            className='shadow bg-gray-100 appearance-none border rounded w-[10vw] py-1 px-4 pl-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            id='id' type='number'  defaultValue={AvaliacaoInfo.id} readOnly
                                            name="id"
                                        />
                                        <FaLock className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' size={16} />
                                    </div>
                                </div>
                                <div className='items-center gap-2 ml-[-10vh]'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                                        Nome do Paciente
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        value={AvaliacaoInfo.nome}
                                        onChange={handleChange}
                                        name="nome"
                                        />
                                </div>
                                <div className='items-center gap-2'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='data'>
                                        Data
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id='data' type='date'
                                        value={AvaliacaoInfo.data}
                                        onChange={handleChange}
                                        name="data"
                                        />
                                </div>
                            </div>
                            <div className='grid grid-cols-3 gap-8 mx-8 my-5'>
                            {['peso', 'estatura', 'marcha6'].map((field) => (
                                    <div key={field} className="items-center gap-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}> {fieldTitles[field]}</label>
                                        <input
                                            className="shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id={field} type="number"
                                            value={(AvaliacaoInfo as any)[field]}
                                            onChange={handleChange}
                                            name={field}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='grid grid-cols-3  ml-8'>
                                {['per_cintura', 'per_quadril', 'per_panturrilha'].map((field) => (
                                        <div key={field} className="items-center gap-2">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>Perímetro {fieldTitles[field]} (cm)</label>
                                            <input
                                                className="shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id={field} type="number"
                                                value={(AvaliacaoInfo as any)[field]}
                                                onChange={handleChange}
                                                name={field}
                                            />
                                        </div>
                                    ))}
                            </div>
                                <div className='grid grid-cols-4 gap-8 mx-8 mt-5'>
                                {['hg_direita1', 'hg_esquerda1', 'hg_direita2', 'hg_esquerda2'].map((field) => (
                                    <div key={field} className="items-center gap-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>{fieldTitles[field]}  (kgf)</label>
                                        <input
                                            className="shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id={field} type="number"
                                            value={(AvaliacaoInfo as any)[field]}
                                            onChange={handleChange}
                                            name={field}
                                        />
                                    </div>
                                ))}
                                </div>
                                <div className='grid grid-cols-3 ml-8 mt-5'>
                                    {['ir_vir1', 'ir_vir2'].map((field) => (
                                        <div key={field} className="items-center gap-2">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>TUG {field.charAt(field.length - 1)} (segundos)</label>
                                            <input
                                                className="shadow appearance-none border rounded w-[8vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id={field} type="number"
                                                value={(AvaliacaoInfo as any)[field]}
                                                onChange={handleChange}
                                                name={field}
                                            />
                                        </div>
                                    ))}
                                </div>
                            <div className='flex justify-end gap-8 mx-8 my-8'>
                                <button onClick={()=>{createAvaliacao()}} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'>Salvar</button>
                                <button onClick={()=>{setShowModal(false)}} className='border-2 text-lg border-[#9387AB] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#9387AB] font-semibold'>Voltar</button>
                            </div>
                        </div>
                    </div>
                </div> 
            </>
        ) : null}
    </>
    )
}