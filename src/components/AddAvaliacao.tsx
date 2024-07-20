"use client"
import { FaLock } from 'react-icons/fa6';
import { FaEdit, FaRegTrashAlt,FaFilePdf } from 'react-icons/fa';
import { ModalDelete } from './ModalDelete';
import { useEffect, useState } from 'react';
import { criarAvaliacao, editarAvaliacao} from '@/lib/api';

interface ModalProps {
    isOpen: boolean;
    avaliacao: any;
    isEditing: boolean;
    onClose: () => void;
}

export function AddAvaliacao({ isOpen, onClose, isEditing, avaliacao }: ModalProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setIsEditing] = useState(false);
    const [cpf, setCpf] = useState('');
    const [AvaliacaoInfo, setAvaliacao] = useState({
        id: 0,
        nome: '',
        data_nascimento: '',
        peso: 0,
        estatura: 0,
        marcha: 0,
        cintura: 0,
        quadril: 0,
        panturrilha: 0,
        esquerdo1: 0,
        esquerdo2: 0,
        direito1: 0,
        direito2: 0,
        tug1: 0,
        tug2: 0,
    })

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setAvaliacao(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        setAvaliacao(avaliacao);
    }, [avaliacao]);

    useEffect(() => {
        const fetchExames = async () => {
          try {
            const data = await criarAvaliacao(cpf);
            setAvaliacao(data);
          } catch (error) {
            console.error('Erro ao criar avaliação', error);
          }
        };
    
        fetchExames();
      }, [cpf]);

      useEffect(() => {
        const fetchExames = async () => {
          try {
            const data = await editarAvaliacao(cpf);
            setAvaliacao(data);
          } catch (error) {
            console.error('Erro ao editar avaliação', error);
          }
        };
    
        fetchExames();
      }, [cpf]);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    if (!isOpen) return null;
    
    return (
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
                        readOnly={!isEditing}
                        onChange={handleChange}
                        />
                </div>
                <div className='items-center gap-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='data'>
                        Data
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='data' type='date'
                        value={AvaliacaoInfo.data_nascimento}
                        readOnly={!isEditing}
                        onChange={handleChange}
                        />
                </div>
            </div>
            <div className='grid grid-cols-3 gap-8 mx-8 my-5'>
            {['peso', 'estatura', 'marcha'].map((field) => (
                    <div key={field} className="items-center gap-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)} (kg)</label>
                        <input
                            className="shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={field} type="number"
                            value={(AvaliacaoInfo as any)[field]}
                            readOnly={!isEditing}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-3  ml-8'>
                {['cintura', 'quadril', 'panturrilha'].map((field) => (
                        <div key={field} className="items-center gap-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>Perímetro da {field} (cm)</label>
                            <input
                                className="shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={field} type="number"
                                value={(AvaliacaoInfo as any)[field]}
                                readOnly={!isEditing}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
            </div>
                <div className='grid grid-cols-4 gap-8 mx-8 mt-5'>
                {['direito1', 'esquerdo1', 'direito2', 'esquerdo2'].map((field) => (
                    <div key={field} className="items-center gap-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>Handgrip {field.charAt(0).toUpperCase() + field.slice(1, field.length - 1)} {field.charAt(field.length - 1)} (kgf)</label>
                        <input
                            className="shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={field} type="number"
                            value={(AvaliacaoInfo as any)[field]}
                            readOnly={!isEditing}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                </div>
                <div className='grid grid-cols-3 ml-8 mt-5'>
                    {['tug1', 'tug2'].map((field) => (
                        <div key={field} className="items-center gap-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>TUG {field.charAt(field.length - 1)} (segundos)</label>
                            <input
                                className="shadow appearance-none border rounded w-[8vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id={field} type="number"
                                value={(AvaliacaoInfo as any)[field]}
                                readOnly={!isEditing}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
            <div className='flex justify-end gap-8 mx-8 my-8'>
                <button onClick={onClose} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'>Salvar</button>
                <button onClick={onClose} className='border-2 text-lg border-[#9387AB] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#9387AB] font-semibold'>Voltar</button>
            </div>
        </div>
    )
}