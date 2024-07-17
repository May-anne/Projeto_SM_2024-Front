import { FiUsers } from 'react-icons/fi';
import {HeaderPage} from '../components/Header'
import React from 'react'
import { FaFilter } from 'react-icons/fa6';

interface ModalProps {
    onClose: () => void;
  }

const Filtro: React.FC<ModalProps> = ({ onClose }) =>{
    return(
        <div className='bg-[#F0F0F0] h-[90vh] w-[30vw] rounded-lg shadow-lg overflow-y-auto' style={{ maxHeight: '90vh', scrollbarWidth: 'thin' }}>
            <div className='text-start'>
                <div className='pt-8 mx-4 mb-8 flex items-center'>
                    <h2 className='text-[#6B3F97] text-2xl font-semibold mx-4'>Adicionar Filtro</h2>
                    <FaFilter className='text-[#6B3F97]' size={22}/>
                </div>
                <div>
                    <div className='mx-8 mb-2'>
                        <h2 className='text-lg font-base'>Idade</h2>
                    </div>
                    <div>
                    <select
                        className='mx-8 shadow appearance-none border rounded w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='idade'>
                        <option value='F'>60-65 anos</option>
                        <option value='F'>66-70 anos</option>
                        <option value='F'>71-75 anos</option>
                        <option value='F'>76-80 anos</option>
                        <option value='F'>81-85 anos</option>
                        <option value='F'>86-90 anos</option>
                        <option value='F'>91-95 anos</option>
                        <option value='F'>96-100 anos</option>
                        </select>
                    </div>
                    <div className='mx-8 mt-4 mb-2'>
                        <h2 className='text-lg font-base'>Necessidades Especiais</h2>
                    </div>
                    <div>
                    <select
                        className='mx-8 shadow appearance-none border text-sm rounded w-[20vw] h-[5vh] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='idade'>
                        <option value='F'>Não tem</option>
                        <option value='F'>Física</option>
                        <option value='F'>Auditiva</option>
                        <option value='F'>Visual</option>
                        <option value='F'>Intelectual</option>
                        <option value='F'>Mental</option>
                        </select>
                    </div>
                    <div className='mx-8 mt-4 mb-2'>
                        <h2 className='text-lg font-base'>Condições Médicas</h2>
                    </div>
                    <div>
                    <select
                        className='mx-8 shadow appearance-none border text-sm rounded w-[20vw] h-[5vh] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='idade'
                        placeholder='Selecione uma opção'>
                        <option value='F'>Não tem</option>
                        <option value='F'>Angina</option>
                        <option value='F'>Ansiedade</option>
                        <option value='F'>Arritmia</option>
                        <option value='F'>Artrite</option>
                        <option value='F'>Artrose</option>
                        <option value='F'>Asma</option>
                        <option value='F'>Bronquite</option>
                        <option value='F'>Demências</option>
                        <option value='F'>Depressão</option>
                        <option value='F'>Diabetes</option>
                        <option value='F'>Dislipidemia</option>
                        <option value='F'>Osteoporose</option>
                        <option value='F'>Pneumonia</option>
                        <option value='F'>Outro</option>
                        </select>
                    </div>
                    <div className='mx-8 mt-4 mb-2'>
                        <h2 className='text-lg font-base'>Uso de Drogas</h2>
                    </div>
                    <div>
                    <select
                        className='mx-8 shadow appearance-none border text-sm rounded w-[8vw] h-[5vh] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='idade'>
                        <option value='F'>Não</option>
                        <option value='F'>Sim</option>
                        </select>
                    </div>
                    <div className='mx-8 mt-4 mb-2'>
                        <h2 className='text-lg font-base'>Uso de Álcool</h2>
                    </div>
                    <div>
                    <select
                        className='mx-8 shadow appearance-none border text-sm rounded w-[8vw] h-[5vh] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='idade'>
                        <option value='F'>Não</option>
                        <option value='F'>Sim</option>
                        </select>
                    </div>
                    <div className='mx-8 mt-4 mb-2'>
                        <h2 className='text-lg font-base'>É fumante</h2>
                    </div>
                    <div>
                    <select
                        className='mx-8 shadow appearance-none border text-sm rounded w-[8vw] h-[5vh] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='idade'>
                        <option value='F'>Não</option>
                        <option value='F'>Sim</option>
                        </select>
                    </div>
                    <div className='mx-8 mt-4 mb-2'>
                        <h2 className='text-lg font-base'>Toma remédios regularmente</h2>
                    </div>
                    <div>
                    <select
                        className='mx-8 shadow appearance-none border text-sm rounded w-[8vw] h-[5vh] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='idade'>
                        <option value='F'>Não</option>
                        <option value='F'>Sim</option>
                        </select>
                    </div>
                    <div className='flex justify-between mx-20 my-4'>
                        <button className='mt-5 border-2  border-[#6B3F97] bg-transparent px-2 py-2 rounded-md text-[#6B3F97] font-semibold' onClick={onClose}>Voltar</button>
                        <button className='mt-5 border-2 border-[#6B3F97] bg-transparent px-2 py-2 rounded-md text-[#6B3F97] font-semibold'>Aplicar</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};
export default Filtro;