import { FiUsers } from 'react-icons/fi';
import {HeaderPage} from '../components/Header'
import { FaLock } from 'react-icons/fa6';

interface ModalProps {
    onClose: () => void;
}

export function Exames(){
    return(
        <div className='bg-[#F0F0F0] h-[50vh] w-[50vw] rounded-lg shadow-lg overflow-y-auto'>
            <div>
                <h2 className='justify-center flex font-semibold p-4 text-xl mb-5 text-[#6B3F97]'>Título do Exame</h2>
            </div>
            <div className='justify-between flex'>
                <div className='relative items-center gap-2 mx-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                    ID Exame
                </label>
                <div className='relative'>
                    <input
                        className='shadow bg-gray-100 appearance-none border rounded w-[10vw] py-1 px-4 pl-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nome' type='text' readOnly
                    />
                    <FaLock className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500' size={16} />
                </div>
            </div>
                <div className='items-center gap-2 mr-8'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                        Nome Completo
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[20vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nome' type='text'/>
                </div>
                <div className='items-center gap-2 mr-8'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nome'>
                        Data
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[10vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nome' type='text'/>
                </div>
            </div>
            <div className='my-8 mx-6'>
                <button className='px-2 py-1 bg-[#2D6A4F] hover:bg-[#1D4D3F] rounded-md text-white mb-3'>Adicionar PDF</button>
                <p className='text-blue-700 hover:underline hover:text-blue-900 cursor-pointer'>nome do arquivo.pdf</p>
            </div>
            <div className='justify-end flex mx-5 mb-8'>
                <button className='border-2  border-[#6B3F97] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#6B3F97] font-semibold'>Voltar</button>
            </div>
            
        </div>
    );
}