import { FaRegCalendarAlt, FaPlus } from "react-icons/fa";
import React, { useContext, useEffect, useState } from 'react';
import { AddTreino } from "./AddTreino";

interface CardsProps {
    pesquisa: string;
    ehExame: boolean;
    ehTreino: boolean;
    id: string;
    nome: string;
    data: string;
    info: Treino[] | Avaliacao[] | Exame[] | null;
}

interface Exame {
    id: string;
    nome: string;
    data: string;
}

interface Avaliacao {
    id: string;
    nome: string;
    data: string;
}

interface Treino {
    id: string;
    nome: string;
    data: string;
}

export function SearchBar(props: CardsProps) {
    const [dataPublicacao, setDataPublicacao] = useState<string>('');

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataPublicacao(e.target.value);
      };

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
                {!props.ehExame && (
                    <AddTreino id={5}/>
                )}
                <div className="flex items-center ml-2">
                    <input
                        id="inputDataPublicacao"
                        type="date"
                        value={dataPublicacao}
                        onChange={handleDataChange}
                        className="w-10 px-2 py-2 h-6" // Input de data oculto
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
                        <p className="w-[20vw] text-center border-r">{props.pesquisa}</p>
                        <p className="w-[15vw] text-center border-r">Data</p>
                    </div>
                </div>
                <div className="overflow-y-auto h-[35vh] mt-6">
                    {props.info?.map((inf) => (
                        <div key={inf.id} className="w-[50vw] h-[5vh] bg-white items-center">
                            <div className='flex flex-row justify-start items-center w-full'>
                                <p className="w-[10vw] text-center border-r">{inf.id}</p>
                                <p className="w-[20vw] text-center border-r">{inf.nome}</p>
                                <p className="w-[15vw] text-center border-r">{inf.data}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
