"use client"
import { FaLock } from 'react-icons/fa6';
import { FaEdit, FaRegTrashAlt,FaFilePdf } from 'react-icons/fa';
import { ModalDelete } from './ModalDelete';
import { useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddAvaliacao({ isOpen, onClose }: ModalProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nomePaciente, setNomePaciente] = useState('');
    const [dataAvaliacao, setDataAvaliacao] = useState('Data da Avaliação');
    const [peso, setPeso] = useState('');
    const [estatura, setEstatura] = useState('');
    const [marcha, setMarcha] = useState('');
    const [cintura, setCintura] = useState('');
    const [quadril, setQuadril] = useState('');
    const [panturrilha, setPanturrilha] = useState('');
    const [esquerdo1, setEsquerdo1] = useState('');
    const [esquerdo2, setEsquerdo2] = useState('');
    const [direito1, setDireito1] = useState('');
    const [direito2, setDireito2] = useState('');
    const [tug1, setTug1] = useState('');
    const [tug2, setTug2] = useState('');



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
            <div className='bg-[#F0F0F0] h-[60vh] w-[60vw] rounded-lg shadow-lg overflow-y-auto' style={{maxHeight: '60vh', scrollbarWidth: 'thin'}}>
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
                            id='id' type='number' defaultValue='0000' readOnly
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
                        id='nome' type='text'
                        value={nomePaciente}
                        readOnly={!isEditing}
                        onChange={(e) => setNomePaciente(e.target.value)}/>
                </div>
                <div className='items-center gap-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='data'>
                        Data
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='data' type='date'
                        value={dataAvaliacao}
                        readOnly={!isEditing}
                        onChange={(e) => setDataAvaliacao(e.target.value)}/>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-8 mx-8 my-5'>
                <div className='items-center gap-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='peso'>
                        Peso (kg)
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[8vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='peso' type='number'
                        value={peso}
                        readOnly={!isEditing}
                        onChange={(e) => setPeso(e.target.value)}/>
                </div>
                <div className='items-center gap-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='estatura'>
                        Estatura (m)
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[8vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='estatura' type='number'
                        value={estatura}
                        readOnly={!isEditing}
                        onChange={(e) => setEstatura(e.target.value)}/>
                </div>
                <div className='items-center gap-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='marcha'>
                        Marcha (m)
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[8vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='marcha' type='number'
                        value={marcha}
                        readOnly={!isEditing}
                        onChange={(e) => setMarcha(e.target.value)}/>
                </div>


            </div>
            <div className='grid grid-cols-3  ml-8'>
                    <div className='items-center gap-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='cintura'>
                            Perímetro da cintura (cm)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='cintura' type='number'
                            value={cintura}
                            readOnly={!isEditing}
                            onChange={(e) => setCintura(e.target.value)}/>
                    </div>
                    <div className='items-center gap-2 mr-8'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='quadril'>
                            Perímetro do quadril (cm)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='quadril' type='number'
                            value={quadril}
                            readOnly={!isEditing}
                            onChange={(e) => setQuadril(e.target.value)}/>
                    </div>
                    <div className='items-center mr-8'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='panturrilha'>
                            Perímetro da panturrilha (cm)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='panturrilha' type='number'
                            value={panturrilha}
                            readOnly={!isEditing}
                            onChange={(e) => setPanturrilha(e.target.value)}/>
                    </div>
                </div>
                <div className='grid grid-cols-4 gap-8 mx-8 mt-5'>
                    <div className='items-center gap-2 mr-8'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='direito1'>
                            Handgrip direito 1 (kgf)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='dir1' type='number'
                            value={direito1}
                            readOnly={!isEditing}
                            onChange={(e) => setDireito1(e.target.value)}/>
                    </div>
                    <div className='items-center gap-2 mr-8'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='esquerdo1'>
                            Handgrip esquerdo 1 (kgf)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='esq1' type='number'
                            value={esquerdo1}
                            readOnly={!isEditing}
                            onChange={(e) => setEsquerdo1(e.target.value)}/>
                    </div>
                    <div className='items-center gap-2 mr-8'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='direito2'>
                            Handgrip direito 2 (kgf)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='dir2' type='number'
                            value={direito2}
                            readOnly={!isEditing}
                            onChange={(e) => setDireito2(e.target.value)}/>
                    </div>
                    <div className='items-center gap-2 mr-8'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='esquerdo2'>
                            Handgrip esquerdo 2 (kgf)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[7vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='esq2' type='number'
                            value={esquerdo2}
                            readOnly={!isEditing}
                            onChange={(e) => setEsquerdo2(e.target.value)}/>
                    </div>
                </div>
                <div className='grid grid-cols-2 ml-8 mt-5'>
                    <div className='items-center gap-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='tug1'>
                                TUG 1 (segundos)
                            </label>
                            <input
                                className='shadow appearance-none border rounded w-[8vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='tug1' type='number'
                                value={tug1}
                                readOnly={!isEditing}
                                onChange={(e) => setTug1(e.target.value)}/>
                    </div>
                    <div className='items-center gap-2'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='tug2'>
                            TUG 2 (segundos)
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-[8vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='tug2' type='number'
                            value={tug2}
                            readOnly={!isEditing}
                            onChange={(e) => setTug2(e.target.value)}/>
                </div>
            </div>
            <div className='flex justify-end gap-8 mx-8 my-8'>
                <button onClick={onClose} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'>Salvar</button>
                <button onClick={onClose} className='border-2 text-lg border-[#9387AB] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#9387AB] font-semibold'>Voltar</button>
            </div>
        </div>
    )
}