"use client"
import { FiUsers } from 'react-icons/fi';
import {HeaderPage} from './Header'
import { FaLock } from 'react-icons/fa6';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { deletarModalidade } from '@/lib/api';

interface ModalProps {
    onClose: () => void;
    termo: string;
    isOpen: boolean;
    id: number;
}

function deleteAvaliacao(id : number) {
    deletarModalidade('avaliacao', id)
        .then(() => {
            console.log("Avaliação deletada com sucesso");
        })
        .catch(console.error);
    console.log(id);
}

export function ModalDelete({ isOpen, onClose, termo, id }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
            <div className='bg-[#F0F0F0] h-[30vh] w-[30vw] rounded-lg shadow-lg overflow-y-auto'>
                <div className='pt-6 text-center'>
                    <h2 className='font-semibold text-xl text-[#6B3F97]'>Confirmar Exclusão</h2>
                </div>
                <div className='p-4 ml-4 mr-4 text-center'>
                    <p className='text-base'>{`Tem certeza de que deseja excluir ${termo}? Esta ação é irreversível.`}</p>
                </div>
                <div className='flex justify-center gap-10 mb-6'>
                    <button 
                        className='rounded-lg shadow-md border-2 border-green-700 hover:border-green-900 px-3 py-2 bg-green-700 text-white hover:bg-green-900'
                        onClick={() => {
                            if(termo == 'avaliacao'){
                                console.log('id aqui: '+id);
                                deleteAvaliacao(id);
                                
                            } else if(termo == 'treino'){
                                //deleteAvaliacao(id);
                            } else{
                                //deleteAvaliacao(id);
                            }
                        }}
                    >
                        Confirmar
                    </button>
                    <button 
                        className='rounded-lg shadow-md border-2 border-red-700 hover:border-red-900 hover:text-red-900 bg-transparent text-red-700 px-3 py-2 font-semibold'
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}