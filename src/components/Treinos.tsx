"use client";
import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Treino {
    tempo: string;
    distancia: string;
    data: string;
}

interface RegistroTreino {
    prescrito: Treino;
    executado: Treino;
}

export function Treino({ isOpen, onClose }: ModalProps) {
    const [treinos, setTreinos] = useState<RegistroTreino[]>([]);
    const [prescricao, setPrescricao] = useState<Treino>({
        tempo: "",
        distancia: "",
        data: "",
    });
    const [executado, setExecutado] = useState<Treino>({
        tempo: "",
        distancia: "",
        data: "",
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddPrescricao = () => {
        if (editIndex !== null) {
            const updatedTreinos = treinos.map((treino, index) =>
                index === editIndex
                    ? { prescrito: prescricao, executado }
                    : treino
            );
            setTreinos(updatedTreinos);
            setEditIndex(null);
        } else {
            setTreinos([
                ...treinos,
                { prescrito: prescricao, executado }
            ]);
        }
        setExecutado({ tempo: "", distancia: "", data: "" });
    };

    const handleEditPrescricao = (index: number) => {
        setPrescricao(treinos[index].prescrito);
        setExecutado(treinos[index].executado);
        setEditIndex(index);
    };

    const handleDeletePrescricao = (index: number) => {
        const updatedTreinos = treinos.filter((_, i) => i !== index);
        setTreinos(updatedTreinos);
    };

    return (
        <div
            className="bg-[#F8F5FA] h-[80vh] w-[80vw] sm:w-[60vw] rounded-lg shadow-lg overflow-y-auto"
            style={{ maxHeight: "80vh", scrollbarWidth: "thin" }}
        >
            <div className="flex items-center justify-between p-6">
                <div className="bg-[#F8F5FA] rounded-lg h-auto w-full">
                    <div className="flex justify-center items-center mt-8 gap-1">
                        <h2 className="font-semibold text-2xl text-[#6B3F97]">
                            Treino Prescrito
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-center gap-8 mx-8flex flex-col sm:flex-row gap-8">
                            <div className="items-center gap-2 mr-8">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tempo">
                                    Tempo (minutos)
                                </label>
                                <div className="relative">
                                    <input
                                        className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="tempo"
                                        type="text"
                                        value={prescricao.tempo}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setPrescricao({ ...prescricao, [name]: value });
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="items-center gap-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="distancia">
                                    Distância (metros)
                                </label>
                                <div className="relative">
                                    <input
                                        className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="distancia"
                                        type="text"
                                        value={prescricao.distancia}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setPrescricao({ ...prescricao, [name]: value });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-8 gap-1">
                        <h2 className="font-semibold text-2xl text-[#6B3F97]">
                            Treino Executado
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="flex justify-center flex flex-col sm:flex-row items-end gap-8">
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
                                        name="tempo"
                                        type="text"
                                        value={executado.tempo}
                                        onChange={(e) => {
                                            const { name, value } = e.target;
                                            setExecutado({ ...executado, [name]: value });
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
                                    name="distancia"
                                    type="text"
                                    value={executado.distancia}
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setExecutado({ ...executado, [name]: value });
                                    }}
                                />
                            </div>
                            <div className="items-center gap-2 mr-8">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="data"
                                >
                                    Data
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full sm:w-[12vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="data"
                                    name="data"
                                    type="date"
                                    value={executado.data}
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        setExecutado({ ...executado, [name]: value });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleAddPrescricao}
                        >
                            {editIndex !== null ? <FaEdit /> : <FaPlus />}{" "}
                            {editIndex !== null ? "Editar" : "Adicionar"}
                        </button>
                    </div>
                    <div className="mt-8">
                        <h2 className="font-semibold text-2xl text-[#6B3F97] mb-4 text-center">
                            Registro de treinos / Comparativo
                        </h2>
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-center">Data</th>
                                    <th className="px-4 py-2 text-center">Treino Prescrito</th>
                                    <th className="px-4 py-2 text-center">Treino Executado</th>
                                    <th className="px-4 py-2 text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {treinos.map((treino, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-4 py-2 text-center">
                                        {new Date(treino.executado.data).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        Tempo: {treino.prescrito.tempo} min, Distância: {treino.prescrito.distancia} m
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        Tempo: {treino.executado.tempo} min, Distância: {treino.executado.distancia} m
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            className="text-yellow-500 hover:text-yellow-700"
                                            onClick={() => handleEditPrescricao(index)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 ml-2"
                                            onClick={() => handleDeletePrescricao(index)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 mb-4">
                        <div className="flex justify-end gap-8 mx-8">
                            <button
                                onClick={onClose} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'
                            >
                                Salvar
                            </button>
                            <button
                                 onClick={onClose} className='border-2 text-lg border-[#9387AB] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#9387AB] font-semibold'
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
