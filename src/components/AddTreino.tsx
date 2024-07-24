"use client";
import { createTreino, editarTreino } from "@/lib/api";
import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";


interface Treino {
    id: number,
    data: string,
    treino_pres: string,
    tempo_pres: number,
    distancia_pres: number,
    tempo_exec: number,
    distancia_exec: number,
    cpf_idoso: string
}

interface ModalProps {
    treinosInfo: Treino[];
    setTreinoInfo: Function
    treinoID: number | undefined
    cpf: string;
    editar: boolean
}

export function AddTreino(props: ModalProps) {
  
    const [showModal, setShowModal] = useState(false);
    const [prescricao, setPrescricao] = useState<Treino>({
        id: 0,
        data: 'dd/mm/aaaa',
        treino_pres: '',
        tempo_pres: 0,
        distancia_pres: 0,
        tempo_exec: 0,
        distancia_exec: 0,
        cpf_idoso: props.cpf
    });
    

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [showModal]);

    useEffect(() => {
        if (props.editar&&props.treinoID) {
            const selectedTreino = props.treinosInfo.find(treino => treino.id === props.treinoID);
            if (selectedTreino) {
                setPrescricao(selectedTreino);
            } 
        } 
    }, [props.treinoID]);

    function resetModal() {
        setShowModal(true);
        if (props.treinoID!=0) {
            const selectedTreino = props.treinosInfo.find(treino => treino.id === props.treinoID);
            if (selectedTreino) {
                setPrescricao(selectedTreino);
            } 
        } 
        else {
            setPrescricao({
                id: 0,
                data: 'dd/mm/aaaa',
                treino_pres: '',
                tempo_pres: 0,
                distancia_pres: 0,
                tempo_exec: 0,
                distancia_exec: 0,
                cpf_idoso: props.cpf
            });
        }
    }

    function handleSalvar() {
        console.log(prescricao)
        editarTreino(prescricao).then((result) => {
            console.log(result)
            const updatedTreinos = props.treinosInfo.map(treino => {
            if (treino.id === prescricao.id) {
                return prescricao;
            } else {
                return treino;
            }
            });
            props.setTreinoInfo(updatedTreinos);
            setShowModal(false);
        }).catch(error => {
            console.error('Erro ao editar treino:', error);
        });
    }
    
    function handleAdicionar() {
        console.log(prescricao)
        createTreino(prescricao).then((novoTreino) => {
            const updatedTreinos = [...props.treinosInfo, novoTreino.data];
            props.setTreinoInfo(updatedTreinos);
            setShowModal(false);
        }).catch(error => {
            console.error('Erro ao criar novo treino:', error);
        });
    }

  return (
    <>
      
      {!props.editar?(
        <button onClick={() => resetModal()} className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'>
            <FaPlus className='text-white' size={20} />
        </button>) :
      (<button onClick={() => resetModal()} className='text-[#6B3F97] hover:bg-gray-50 py-3 px-2 items-center flex rounded-full font-semibold'>
        Ver mais
      </button>)}
          
      {showModal ? (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              className="bg-[#F8F5FA] w-[80vw] sm:w-[60vw] rounded-lg shadow-lg overflow-y-auto"
              style={{ maxHeight: "80vh", scrollbarWidth: "thin" }}
              >
                <div className="flex items-center justify-between p-6">
                    <div className="bg-[#F8F5FA] rounded-lg h-auto w-full">
                        <div className="flex justify-center items-center mt-8 gap-1">
                            <h2 className="font-semibold text-2xl text-[#6B3F97] flex flex-col justify-center items-center gap-y-4">
                                {props.editar?(<span>Treino Prescrito</span>):(<span>Prescrever Treino</span>)}
                                <div className="items-center gap-2">
                                    <div className="relative">
                                        {!props.editar?(<input
                                            className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="treino_pres"
                                            type="text"
                                            placeholder="Nomeie o treino"
                                            value={prescricao.treino_pres}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setPrescricao({ ...prescricao, [name]: value });
                                            }}
                                        />):
                                        (<p className="shadow flex flex-row appearance-none border rounded w-full items-center justify-center font-normal sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight">{prescricao.treino_pres}</p>)}
                                    </div>
                                </div>
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-center gap-8 mx-8flex flex-col sm:flex-row">
                                <div className="items-center gap-2 mr-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tempo">
                                        Tempo (minutos)
                                    </label>
                                    <div className="relative">
                                        {!props.editar?(<input
                                            className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="tempo_pres"
                                            type="text"
                                            value={prescricao.tempo_pres}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setPrescricao({ ...prescricao, [name]: value });
                                            }}
                                        />):
                                        (<p className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight">{prescricao.tempo_pres}</p>)}
                                    </div>
                                </div>
                                <div className="items-center gap-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distancia">
                                        Distância (metros)
                                    </label>
                                    <div className="relative">
                                        {!props.editar?(<input
                                            className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            name="distancia_pres"
                                            type="text"
                                            value={prescricao.distancia_pres}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setPrescricao({ ...prescricao, [name]: value });
                                            }}
                                        />)
                                        :
                                        (<p className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight">{prescricao.distancia_pres}</p>)}
                                    </div>
                                </div>
                                <div className="items-center gap-2 mr-8">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="data"
                                    >
                                        Data
                                    </label>
                                    {!props.editar?(<input
                                        className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="data"
                                        name="data"
                                        type="date"
                                        value={prescricao.data}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setPrescricao({ ...prescricao, [name]: value });
                                        }}
                                    />):(<p className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight">{prescricao.data}</p>)}
                                </div>
                            </div>
                        </div>
                        {props.editar&&(<>
                            <div className="flex justify-center items-center mt-8 gap-1">
                                <h2 className="font-semibold text-2xl text-[#6B3F97]">
                                    Treino Executado
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-center flex-col sm:flex-row items-end gap-8">
                                    <div className="items-center gap-2 mr-8">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="tempo"
                                        >
                                            Tempo (minutos)
                                        </label>
                                        <div className="relative">
                                            <input
                                                className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="tempo"
                                                name="tempo_exec"
                                                type="text"
                                                value={prescricao.tempo_exec}
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    setPrescricao({ ...prescricao, [name]: value });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="items-center gap-2 mr-8">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="distancia"
                                        >
                                            Distância (metros)
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="distancia"
                                            name="distancia_exec"
                                            type="text"
                                            value={prescricao.distancia_exec}
                                            onChange={(e) => {
                                                const { name, value } = e.target;
                                                setPrescricao({ ...prescricao, [name]: value });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>)}
                        
                        <div className="mt-8 mb-4">
                            <div className="flex justify-end gap-8 mx-8">
                                {props.editar?(<button
                                    onClick={handleSalvar} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'
                                >
                                    Salvar
                                </button>)
                                :
                                (<button
                                    onClick={handleAdicionar} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'
                                >
                                    Prescrever
                                </button>)}

                                <button
                                    onClick={()=>setShowModal(false)} className='border-2 text-lg border-[#9387AB] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#9387AB] font-semibold'
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>   
        </>
      ) : null}
    </>
  );
}