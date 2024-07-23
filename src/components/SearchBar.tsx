import { FaRegCalendarAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { AddExame } from "./AddExame";
import { AddTreino } from "./AddTreino";
import { AddAvaliacao } from "./AddAvaliacao";
import { criarModalidade, deletarAvaliacao, deletarModalidade, getAllExamesbyUser, mostrarModalidade } from "@/lib/api";
import Link from "next/link";

interface CardsProps {
    pesquisa: string;
    ehExame: boolean;
    ehTreino: boolean;
    ehAvaliacao: boolean;
    cpf: string | undefined;
    nome: string;
}

interface Exame {
    id: number;
    nome: string;
    data: string;
    cpf: string;
}

interface Avaliacao {
    id: number,
    nome: string,
    data: string,
    cpf_idoso: string,
    peso: number,
    estatura: number,
    marcha6: number,
    per_cintura: number,
    per_quadril: number,
    per_panturrilha: number,
    hg_esquerda1: number,
    hg_esquerda2: number,
    hg_direita1: number,
    hg_direita2: number,
    ir_vir1: number,
    ir_vir2: number,
}

interface Treino {
    id: number;
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
        let termo: 'treino' | 'avaliacao';
         if (props.ehTreino) {
            termo = 'treino';
            mostrarModalidade(termo, props.cpf).then(setDadosTreino).catch(console.error);
        } else if (props.ehAvaliacao) {
            termo = 'avaliacao';
            mostrarModalidade(termo, props.cpf).then(setDadosAvaliacao).catch(console.error);
        } else { //Então, é exame
            //getAllExamesbyUser(props.cpf).then(setDadosExame).catch(console.error)
        }

    }, [props.ehTreino, props.ehAvaliacao, props.cpf]);

    
    function deleteAvaliacao(id : number) {
        deletarModalidade('avaliacao', id)
            .then(() => {
                console.log("Avaliação deletada com sucesso");
            })
            .catch(console.error);
    
        console.log("id:"+id);
    }

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
                    {props.ehExame&&<AddExame exame={dadosExame} cpf={props.cpf} nome={props.nome} editar={false}/>}
                    {props.ehTreino&&<AddTreino avaliacao={dadosTreino} cpf={props.cpf} nome={props.nome}  editar={false}/>}
                    {props.ehAvaliacao&&<AddAvaliacao avaliacao={dadosAvaliacao} cpf={props.cpf} nome={props.nome}  editar={false}/>}
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
                                        <AddExame exame={inf} cpf={props.cpf} nome={props.nome}  editar={true} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {props.ehTreino&& (
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
                                        <AddAvaliacao avaliacao={inf} nome= {props.nome} cpf={props.cpf} editar={true} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {props.ehAvaliacao&& (
                        dadosAvaliacao.map((inf) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">{inf.nome}</p>
                                    <p className="w-[10vw] text-center border-r">{inf.data}</p>
                                    <div className="flex gap-6 items-center mx-8">
                                        <button onClick={() => deleteAvaliacao(inf.id)} className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2">
                                            <FaRegTrashAlt />
                                        </button>
                                        <AddAvaliacao avaliacao={inf} cpf={props.cpf} nome={props.nome}  editar={true} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}


                </div>
            </div>

        </>
    );
}
