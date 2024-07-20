import { FaRegCalendarAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { AddExame } from "./AddExame";
import { AddTreino } from "./AddTreino";
import { AddAvaliacao } from "./AddAvaliacao";
import { Treino } from "./Treinos";
import { criarModalidade } from "@/lib/api";
import Link from "next/link";

interface CardsProps {
    pesquisa: string;
    ehExame: boolean;
    ehTreino: boolean;
    ehAvaliacao: boolean;
    cpf: string | undefined;
}

interface Exame {
    id: string;
    nome: string;
    data: string;
    cpf: string;
}

interface Avaliacao {
    id: number,
    nome: string,
    data_nascimento: string,
    peso: number,
    estatura: number,
    marcha: number,
    cintura: number,
    quadril: number,
    panturrilha: number,
    esquerdo1: number,
    esquerdo2: number,
    direito1: number,
    direito2: number,
    tug1: number,
    tug2: number,
}

interface Treino {
    id: string;
    nome: string;
    data: string;
    cpf: string;
}

interface ModalProps {
    onClose: () => void;
}

export function SearchBar(props: CardsProps) {
    const [dataPublicacao, setDataPublicacao] = useState<string>('');
    
    const [dadosExame, setDadosExame] = useState<Exame[]>([]);
    const [dadosAvaliacao, setDadosAvaliacao] = useState<Avaliacao[]>([]);
    const [dadosTreino, setDadosTreino] = useState<Treino[]>([]);


    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataPublicacao(e.target.value);
    };

    useEffect(() => {
        let termo: 'exame' | 'treino' | 'avaliacao';
        if (props.ehExame) {
            termo = 'exame';
            criarModalidade(termo, props.cpf).then(setDadosExame).catch(console.error);
        } else if (props.ehTreino) {
            termo = 'treino';
            criarModalidade(termo, props.cpf).then(setDadosTreino).catch(console.error);
        } else if (props.ehAvaliacao) {
            termo = 'avaliacao';
            criarModalidade(termo, props.cpf).then(setDadosAvaliacao).catch(console.error);
        } else {
            return;
        }

    }, [props.ehExame, props.ehTreino, props.ehAvaliacao, props.cpf]);

    return (
        <>
            <div className='w-[50vw] h-[6vh] rounded-md flex items-center mb-4'>
                <input
                    type="text"
                    placeholder={`Pesquisar ${props.pesquisa}...`}
                    className="h-full px-[1vw] bg-white flex-grow outline-none rounded-tl-md rounded-bl-md border-white"
                />
                <button className="h-full px-4 py-2 bg-[#6B3F97] hover:bg-[#4A2569] text-white rounded-tr-md rounded-br-md">
                    Buscar
                </button>
                    {props.ehExame&&<AddAvaliacao avaliacao={props.info} editar={false}/>}
                    {props.ehTreino&&<AddAvaliacao avaliacao={props.info} editar={false}/>}
                    {props.ehAvaliacao&&<AddAvaliacao avaliacao={props.info} editar={false}/>}
                <div className="flex items-center ml-2">
                    <input
                        id="inputDataPublicacao"
                        type="date"
                        value={dataPublicacao}
                        onChange={handleDataChange}
                        className="w-10 px-2 py-2 h-6"
                        size={20}
                        required
                        style={{ width: '30px', height: '30px', padding: '5px' }}
                    />
                </div>
            </div>
            <div className='h-[40vh] w-[50vw] bg-white shadow-2xl rounded-md mb-4'>
                <div className="w-[50vw] h-[5vh] bg-white shadow-md items-center">
                    <div className='flex flex-row justify-start items-center w-full'>
                        <p className="w-[10vw] text-center border-r">ID</p>
                        <p className="w-[15vw] text-center border-r">{props.pesquisa}</p>
                        <p className="w-[10vw] text-center border-r">Data</p>
                    </div>
                </div>
                <div className="overflow-y-auto h-[35vh] mt-6">
                    
                    {props.ehExame && (
                        dadosAvaliacao.map((inf) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">{inf.nome}</p>
                                    <p className="w-[10vw] text-center border-r">{inf.data}</p>
                                    <div className="flex gap-6 items-center mx-8">
                                        <button className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2">
                                            <FaRegTrashAlt />
                                        </button>
                                        <AddAvaliacao avaliacao={null} editar={true} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {props.ehTreino&& (
                        dadosExame.map((inf) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">{inf.nome}</p>
                                    <p className="w-[10vw] text-center border-r">{inf.data}</p>
                                    <div className="flex gap-6 items-center mx-8">
                                        <button className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2">
                                            <FaRegTrashAlt />
                                        </button>
                                        <AddAvaliacao avaliacao={inf} editar={true} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {props.ehAvaliacao&& (
                        dadosTreino.map((inf) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">{inf.nome}</p>
                                    <p className="w-[10vw] text-center border-r">{inf.data}</p>
                                    <div className="flex gap-6 items-center mx-8">
                                        <button className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2">
                                            <FaRegTrashAlt />
                                        </button>
                                        <AddAvaliacao avaliacao={props.info} editar={true} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}


                </div>
            </div>
            {isExameModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-transparent p-6 rounded-lg shadow-lg w-[60vw]">
                        <AddExame isOpen={isExameModalOpen} onClose={handleCloseExame} />
                    </div>
                </div>
            )}
            {isTreinoModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-transparent p-6 rounded-lg shadow-lg w-[60vw]">
                        <Treino isOpen={isTreinoModalOpen} onClose={handleCloseTreino} />
                    </div>
                </div>
            )}
        </>
    );
}
