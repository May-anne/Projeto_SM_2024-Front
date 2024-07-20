"use client"
import { FaLock } from 'react-icons/fa6';
import { FaEdit, FaRegTrashAlt,FaFilePdf } from 'react-icons/fa';
import { ModalDelete } from './ModalDelete';
import { useEffect, useState } from 'react';
import { criarExame, deletarExame, getAllExamesbyUser } from '@/lib/api';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddExame({ isOpen, onClose }: ModalProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nomePaciente, setNomePaciente] = useState('Nome do Paciente');
    const [dataExame, setDataExame] = useState('Data do Exame');
    const [pdfExame, setPdfExame] = useState('pdf');
    const [cpf, setCpf] = useState('');
    const [exames, setExames] = useState<any[]>([]);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };
    
    useEffect(() => {
        const fetchExames = async () => {
          try {
            const data = await getAllExamesbyUser(cpf);
            setExames(data);
          } catch (error) {
            console.error('Erro ao buscar exames:', error);
          }
        };
    
        fetchExames();
      }, [cpf]);

    const handleCriarExame = async () => {
    try {
        await criarExame(cpf);
        alert('Exame criado com sucesso!');
        const data = await getAllExamesbyUser(cpf);
        setExames(data);
    } catch (error) {
        console.error('Erro ao criar exame:', error);
        alert('Erro ao criar exame. Verifique o console para mais detalhes.');
    }
    };

    const handleDeletarExame = async () => {
        try {
          await deletarExame(cpf);
          alert('Exame deletado com sucesso!');
          const data = await getAllExamesbyUser(cpf);
          setExames(data);
        } catch (error) {
          console.error('Erro ao deletar exame:', error);
          alert('Erro ao deletar exame. Verifique o console para mais detalhes.');
        }
      };

    if (!isOpen) return null;
    
    return (
            <div className='bg-[#F0F0F0] h-[52vh] w-[60vw] rounded-lg shadow-lg overflow-y-auto'>
            <div className='flex items-center justify-between p-6'>
                <h2 className='font-semibold text-2xl text-[#6B3F97] text-center mb-2 mt-2'>Título do Exame</h2>
                <div className='flex items-center gap-3'>
                    <button onClick={handleEditClick}><FaEdit className='text-[#6B3F97] cursor-pointer hover:text-[#4A2569]' size={22} /></button>
                    <button onClick={handleOpenModal}><FaRegTrashAlt className='text-red-700 hover:text-red-900 cursor-pointer' size={20} /></button>
                </div>
            </div>
            <ModalDelete 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                termo="este exame"
            />
            <div className='flex justify-start gap-8'>
                <div className='relative items-center gap-2 mx-8'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                        ID Exame
                    </label>
                    <div className='relative'>
                        <input
                            className='shadow bg-gray-100 appearance-none border rounded w-[10vw] py-1 px-4 pl-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='nome' type='text' defaultValue='0000' readOnly
                        />
                        <FaLock className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' size={16} />
                    </div>
                </div>
                <div className='items-center gap-2 mr-8'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                        Nome do Paciente
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[25vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nome' type='text'
                        value={nomePaciente}
                        readOnly={!isEditing}
                        onChange={(e) => setNomePaciente(e.target.value)}/>
                </div>
                <div className='items-center gap-2 mr-8'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                        Data
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nome' type='date'
                        value={dataExame}
                        readOnly={!isEditing}
                        onChange={(e) => setDataExame(e.target.value)}/>
                </div>
            </div>
            <div className='mt-8 mx-8'>
                <button className='px-2 py-1 bg-[#2D6A4F] hover:bg-[#1D4D3F] rounded-md text-white mb-3 items-center flex gap-2 text-lg'><FaFilePdf className='text-white' size={20}/> Adicionar PDF</button>
            </div>
            <div className='mx-8'>
                <button className='text-blue-700 w-auto hover:underline hover:text-blue-900 cursor-pointer'>
                    nome do arquivo.pdf
                </button>
            </div>
            <div className='flex justify-end gap-8 mx-8'>
                <button onClick={onClose} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'>Salvar</button>
                <button onClick={onClose} className='border-2 text-lg border-[#9387AB] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#9387AB] font-semibold'>Voltar</button>
            </div>
        </div>
    )
}