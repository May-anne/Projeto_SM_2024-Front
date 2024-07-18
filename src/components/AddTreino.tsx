import React, { useEffect, useState } from "react";
import Marca_FACEPE from '../../public/images/Marca-FACEPE.png'
import FINEP from '../../public/images/FINEP.png'
import Image from "next/image";
import { FaFileDownload, FaPlus } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { FaSave, FaTrash  } from "react-icons/fa";

interface CardsProps {
  id: number
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTreino(props:CardsProps) {
  
  const [showModal, setShowModal] = useState(false);

  const [tempoTreino, setTempoTreino] = useState('');
  const [distanciaTreino, setDitistanciaTreino] = useState('');
  

  
  function resetModal(){
    setShowModal(true)
    setDitistanciaTreino('');
    setTempoTreino('');
  }


  return (
    <>
      
      <button onClick={() => resetModal()} className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'>
        <FaPlus className='text-white' size={20} />
      </button>
          
      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[25vw] h-[30vh]`}>
              <div className={`flex bg-white flex-col px-10  gap-8 rounded-xl w-full h-full justify-center items-center`}>
                <div className="flex flex-row gap-x-10 justify-center">
                  <div>
                    <input
                      type="name"
                      value={tempoTreino}
                      onChange={(e) => setTempoTreino(e.target.value)}
                      className="text-center border border-[#1C1C1C] rounded-md px-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                      placeholder="Duração"
                      required
                    />
                    <p>min</p>
                  </div>

                  <div>
                    <input
                      type="name"
                      value={distanciaTreino}
                      onChange={(e) => setDitistanciaTreino(e.target.value)}
                      className="text-center border border-[#1C1C1C] rounded-md px-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#088395]"
                      placeholder="Distância"
                      required
                    />
                    <p>km</p>
                  </div>
                </div>
                
                <div className="flex flex-row gap-x-10 justify-center">
                  <button className="px-3 py-2 bg-green-1100 hover:opacity-60 text-white font-semibold rounded-full">Criar Treino</button>
                  <button className="px-3 py-2 bg-red-500 hover:opacity-60 text-white font-semibold rounded-full" onClick={()=>{setShowModal(false)}}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}