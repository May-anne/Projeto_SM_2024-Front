import { FaRegCalendarAlt, FaPlus, FaRegTrashAlt, FaFileDownload } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { AddExame } from "./AddExame";
import { AddTreino } from "./AddTreino";
import { AddAvaliacao } from "./AddAvaliacao";
import { criarModalidade, deletarAvaliacao, deletarExame, deletarModalidade, getAllAvaliacoes, getAllExames, getAllExamesbyUser, mostrarModalidade, urlDownload } from "@/lib/api"; 
import { TiDeleteOutline } from "react-icons/ti";
import Link from "next/link";
import { OrganizeImportsMode } from "typescript";

interface CardsProps {
    pesquisa: string;
    ehExame: boolean;
    ehTreino: boolean;
    ehAvaliacao: boolean;
    cpf: string;
    nome: string;
    searchAll: boolean;
}

interface Exame {
    id: number;
    title: string;
    uploaded_at: string;
    cpf_idoso: string;
    file: string;
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
    const [allDadosExames, setAllDadosExame] = useState<Exame[]>([]);

    const [filteredInfo, setFilteredInfo] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [dadosTreino, setDadosTreino] = useState<Treino[]>([]);

    useEffect(() => {
        let termo: 'treino' | 'avaliacao';
        if (props.cpf) {
            if (props.ehTreino) {
                termo = 'treino';
                mostrarModalidade(termo, props.cpf)
                    .then((result) => {
                        setDadosTreino(result);
                        setFilteredInfo(result);
                    })
                    .catch(console.error);
            } 
            else if (props.ehAvaliacao) {
                termo = 'avaliacao';
                mostrarModalidade(termo, props.cpf)
                    .then((result) => {
                        setDadosAvaliacao(result);
                        setFilteredInfo(result);
                    })
                    .catch(console.error);
            } 
            else {
                getAllExamesbyUser(props.cpf)
                    .then((result) => {
                        setDadosExame(result);
                        console.log(result)
                        setFilteredInfo(result);
                    })
                    .catch(console.error);
            } 
        }
    }, [props.ehTreino, props.ehAvaliacao, props.cpf]);

    useEffect(() => {
        console.log('Props mudaram:', props.ehExame, props.searchAll);
    
        if (props.ehExame && props.searchAll) {
            getAllExames()
                .then((result) => {
                    console.log('Dados de exames recebidos:', result);
                    setAllDadosExame(result);
                    setFilteredInfo(result);
                })
                .catch((error) => {
                    console.error('Erro ao obter exames:', error);
                });
        } else if (props.ehAvaliacao && props.searchAll) {
            getAllAvaliacoes()
                .then((result) => {
                    console.log('Dados de avaliações recebidos:', result);
                    setAllDadosExame(result); // Aqui você deve considerar renomear para setAllDadosAvaliacao, se aplicável
                    setFilteredInfo(result);
                })
                .catch((error) => {
                    console.error('Erro ao obter avaliações:', error);
                });
        }
    }, [props.ehExame, props.ehAvaliacao, props.searchAll]);
    

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
                (dataPublicacao === '' || avaliacao.data.includes(dataPublicacao))
            );
        } else { // Então, é exame
            filtered = dadosExame.filter((exame) =>
                exame.title.toLowerCase().includes(lowerCaseSearch) &&
                (dataPublicacao === '' || formatDate(exame.uploaded_at).includes(dataPublicacao))
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
                    if (modalide === 'treino') {
                        setDadosTreino(prevTreinos => prevTreinos.filter(treino => treino.id !== inf.id));
                        setFilteredInfo(prevTreinos => prevTreinos.filter(treino => treino.id !== inf.id));
                    } 
                    if (modalide === 'avaliacao') {
                        setDadosAvaliacao(prevAvaliacoes => prevAvaliacoes.filter(avaliacao => avaliacao.id !== inf.id));
                        setFilteredInfo(prevAvaliacoes => prevAvaliacoes.filter(avaliacao => avaliacao.id !== inf.id));
                    } 
                    if (modalide === 'exame') {
                        setDadosExame(prevExames => prevExames.filter(exame => exame.id !== inf.id));
                        setFilteredInfo(prevExames => prevExames.filter(exame => exame.id !== inf.id));
                    } 
                })
                .catch(error => {
                    console.error('Erro ao deletar modalidade:', error);
                });

                deletarExame(inf)
                .then(() => {
                    if (modalide === 'exame') {
                        setDadosExame(prevExames => prevExames.filter(exame => exame.id !== inf.id));
                        setFilteredInfo(prevExames => prevExames.filter(exame => exame.id !== inf.id));
                    } 
                })
                .catch(error => {
                    console.error('Erro ao deletar exame', error);
                });
    
            console.log(inf); 
        }
    }
    

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <div className='w-[50vw] h-[6vh] rounded-md flex items-center pb-4'>
                    {!props.ehAvaliacao&&(
                    <>
                        <input
                        value={searchTerm}
                        onChange={(e) => {setSearchTerm(e.target.value); searchInfo(e.target.value)}}
                        type="text"
                        placeholder={`Pesquisar ${props.pesquisa}...`}
                        onKeyDown={handleKeyDown}
                        className="h-full px-[1vw] bg-white flex-row w-full outline-none rounded-tl-md rounded-bl-md border-white items-center"
                        />
                        <button onClick={()=>searchInfo(searchTerm)} className="h-full px-4 items-center flex flex-row py-2 bg-[#6B3F97] hover:bg-[#4A2569] text-white rounded-tr-md rounded-br-md">
                            Buscar
                        </button>
                    </>
                    )}
                    {props.ehExame&&<AddExame exameID={undefined} exameInfo={dadosExame} setExamoInfo={setDadosExame} cpf={props.cpf}/>}
                    {props.ehTreino&&<AddTreino cpf={props.cpf} treinosInfo={dadosTreino} setTreinoInfo={setDadosTreino} treinoID={undefined} editar={false}/>} 
                    {props.ehAvaliacao&&<AddAvaliacao avaliacaoID={undefined} avaliacaoInfo={dadosAvaliacao} cpf={props.cpf} nome={props.nome} setAvaliacaoInfo={setDadosAvaliacao} editar={false}/>}
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
                        filteredInfo.map((inf) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">{inf.title}</p>
                                    <p className="w-[10vw] text-center border-r">{formatDate(inf.uploaded_at)}</p>
                                    
                                    <div className="flex flex-row justify-center gap-6 items-center mx-8">
                                        <button onClick={() => deleteModalide(inf, 'exame')} className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2">
                                            <FaRegTrashAlt />
                                        </button>
                                        <a href={urlDownload+inf.file} target="blank" className="rounded-md text-[#6B3F97] hover:bg-gray-50 px-2 py-2"><FaFileDownload  /></a>
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
                        filteredInfo.map((inf) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">Avaliação {inf.id}</p>
                                    <p className="w-[10vw] text-center border-r">{inf.data}</p>
                                    <div className="flex gap-6 items-center mx-8">
                                        <button onClick={() => deleteModalide(inf, 'avaliacao')} className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2"> 
                                            <FaRegTrashAlt />
                                        </button>
                                        <AddAvaliacao avaliacaoID={inf.id} avaliacaoInfo={dadosAvaliacao} cpf={props.cpf} nome={props.nome} setAvaliacaoInfo={setDadosAvaliacao} editar={true} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    {props.ehExame && props.searchAll && (
                         filteredInfo.map((inf) => (
                            <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                                <div className='flex flex-row justify-start items-center w-full'>
                                    <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                    <p className="w-[15vw] text-center border-r">{inf.title}</p>
                                    <p className="w-[10vw] text-center border-r">{formatDate(inf.uploaded_at)}</p>
                                    
                                    <div className="flex flex-row justify-center gap-6 items-center mx-8">
                                        <button onClick={() => deleteModalide(inf, 'exame')} className="rounded-md text-red-1100 hover:bg-gray-50 px-2 py-2">
                                            <FaRegTrashAlt />
                                        </button>
                                        <a href={urlDownload+inf.file} target="blank" className="rounded-md text-[#6B3F97] hover:bg-gray-50 px-2 py-2"><FaFileDownload  /></a>
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
