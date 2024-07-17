import { FiUsers } from 'react-icons/fi';
import {HeaderPage} from '../components/Header'


export function Treinos(){
    return(
        <div className='bg-[#D8C9E0] h-[100vh] w-[100vw]'>
            <HeaderPage/>
            <div className='flex flex-col justify-center items-center mt-20'>
                <div className='bg-white shadow-md rounded-lg h-[80vh] w-[60vw]'>
                <div className='flex justify-center items-center mt-6 gap-1'>
                        <h2 className='font-semibold text-2xl'>Cadastro de Paciente</h2>
                        <div className='border border-t-2 border-gray-50'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}