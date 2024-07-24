import { FaRegCalendarAlt, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { AddExame } from "./AddExame";
import { AddTreino } from "./AddTreino";
import { AddAvaliacao } from "./AddAvaliacao";
import { criarModalidade, deletarAvaliacao, deletarModalidade, getAllExamesbyUser, mostrarModalidade } from "@/lib/api"; 
import { TiDeleteOutline } from "react-icons/ti";
import Link from "next/link";

interface CardsProps {
    pesquisa: string;
    ehExame: boolean;
    ehTreino: boolean;
    ehAvaliacao: boolean;
    cpf: string;
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
    id: number,
    data: string,
    treino_pres: string,
    tempo_pres: number,
    distancia_pres: number,
    tempo_exec: number,
    distancia_exec: number,
    cpf_idoso: string
}

export function SearchBar(props: CardsProps) {
    const [dataPublicacao, setDataPublicacao] = useState<string>('');
    const [dadosExame, setDadosExame] = useState<Exame[]>([]);
    const [dadosAvaliacao, setDadosAvaliacao] = useState<Avaliacao[]>([]);

    const [filteredInfo, setFilteredInfo] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [dadosTreino, setDadosTreino] = useState<Treino[]>([]);

    useEffect(() => {
        let termo: 'treino' | 'avaliacao';
        if (props.ehTreino) {
            termo = 'treino';
            mostrarModalidade(termo, props.cpf)
                .then((result) => {
                    setDadosTreino(result);  // Store the result
                    setFilteredInfo(result); // Set filtered info with the fetched data
                })
                .catch(console.error);
        } else if (props.ehAvaliacao) {
            termo = 'avaliacao';
            mostrarModalidade(termo, props.cpf)
                .then((result) => {
                    setDadosAvaliacao(result);
                    setFilteredInfo(result); // Set filtered info with the fetched data
                })
                .catch(console.error);
        } else { // Então, é exame
            // getAllExamesbyUser(props.cpf).then(setDadosExame).catch(console.error)
        }
    }, [props.ehTreino, props.ehAvaliacao, props.cpf]);

    useEffect(() => {
        searchInfo(searchTerm); // Atualiza a filtragem sempre que searchTerm ou dataPublicacao muda
    }, [searchTerm, dataPublicacao]); 

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataPublicacao(e.target.value);
        searchInfo(searchTerm);
    };

    function resetData(){
        setDataPublicacao(''); 
        setSearchTerm('');
        searchInfo('');
        if (props.ehTreino) {
            setFilteredInfo(dadosTreino) 
        }
    }

    function searchInfo(searchTerm: string) {
        const lowerCaseSearch = searchTerm.toLowerCase().trim();

        let filtered: any[] = [];

        if (props.ehTreino) {
            filtered = dadosTreino.filter((treino) =>
                treino.treino_pres.toLowerCase().includes(lowerCaseSearch) &&
                (dataPublicacao === '' || treino.data.includes(dataPublicacao))
            );
        } else if (props.ehAvaliacao) {
            filtered = dadosAvaliacao.filter((avaliacao) =>
                avaliacao.nome.toLowerCase().includes(lowerCaseSearch) &&
                (dataPublicacao === '' || avaliacao.data.includes(dataPublicacao))
            );
        } else { // Então, é exame
            filtered = dadosExame.filter((exame) =>
                exame.nome.toLowerCase().includes(lowerCaseSearch) &&
                (dataPublicacao === '' || exame.data.includes(dataPublicacao))
            );
        }

        setFilteredInfo(filtered);
    }
    

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        //Detecta o aperto de enter na barra de pesquisa
        if (e.key === "Enter") {
            searchInfo(searchTerm);
        }
      };

    function deleteModalide(inf: any, modalide: 'exame' | 'treino' | 'avaliacao') { 
        if (confirm('Realmente deseja deletar?')) {
            if (!inf.id || !inf.cpf_idoso) {
                console.error('ID não fornecido ou CPF não fornecido');
                return;
            }
    
            deletarModalidade(modalide, inf)
                .then(() => {
                    if(modalide == 'treino'){
                        setDadosTreino(prevTreinos => prevTreinos.filter(treino => treino.id !== inf.id));
                    } 
                })
                .catch(error => {
                    console.error('Erro ao deletar modalidade:', error);
                });
    
            console.log(inf); 
        }
    }

    return (
        <>
            <div className='w-[50vw] h-[6vh] rounded-md flex items-center mb-4'>
                <input
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value); searchInfo(e.target.value)}}
                    type="text"
                    placeholder={`Pesquisar ${props.pesquisa}...`}
                    onKeyDown={handleKeyDown}
                    className="h-full px-[1vw] bg-white flex-grow outline-none rounded-tl-md rounded-bl-md border-white"
                />
                <button onClick={()=>searchInfo(searchTerm)} className="h-full px-4 py-2 bg-[#6B3F97] hover:bg-[#4A2569] text-white rounded-tr-md rounded-br-md">
                    Buscar
                </button>
                    {props.ehExame&&<AddAvaliacao avaliacao={dadosExame} cpf={props.cpf} nome={props.nome} editar={false}/>}
                    {props.ehTreino&&<AddTreino cpf={props.cpf} treinosInfo={dadosTreino} setTreinoInfo={setDadosTreino} treinoID={undefined} editar={false}/>} 
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
            <div className='h-[40vh] w-[50vw] bg-white shadow-2xl rounded-md'>
                <div className="w-[50vw] h-[5vh] bg-white shadow-md items-center flex flex-row">
                    <div className='flex flex-row justify-start items-center w-full'>
                        <p className="w-[10vw] text-center border-r">ID</p>
                        <p className="w-[15vw] text-center border-r">{props.pesquisa}</p>
                        <p className="w-[10vw] text-center border-r">Data</p>
                    </div>
                </div>
                <div className="overflow-y-auto h-[35vh] mt-6">
                    {dataPublicacao!=''&&(
                        <div className="flex flex-row w-full justify-between px-5 py-2 text-sm items-center italic">
                            <p>Data selecionada: {dataPublicacao}</p>
                            <div className="flex flex-row gap-x-2">
                                <p className="text-center">Resetar data </p>
                                <button onClick={resetData} className="font-bold hover:opacity-60">X</button>
                            </div>
                        </div>
                )}
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
                        filteredInfo.map((inf:any) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">{inf.treino_pres}</p>
                                    <p className="w-[10vw] text-center border-r">{inf.data}</p>
                                    <div className="flex gap-6 items-center mx-8">
                                        <button onClick={() => deleteModalide(inf, 'treino')} className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2">
                                            <FaRegTrashAlt />
                                        </button>
                                        <AddTreino cpf={props.cpf} treinosInfo={dadosTreino} setTreinoInfo={setDadosTreino} treinoID={inf.id} editar={true}/>
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
                                        <button onClick={() => deleteModalide(inf, 'avaliacao')} className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2"> 
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
