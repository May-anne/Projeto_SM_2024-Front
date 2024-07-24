"use client"
import { FaLock, FaPlus } from 'react-icons/fa6';
import { FaEdit, FaRegTrashAlt,FaFilePdf } from 'react-icons/fa';
import { ModalDelete } from './ModalDelete';
import { useEffect, useState } from 'react';
import { criarExame, criarModalidade, getAllExamesbyUser } from '@/lib/api';

interface ModalProps {
    exame: any;
    nome: string;
    cpf: string | undefined;
    editar: boolean
}

export function AddExame(props: ModalProps){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [ExameInfo, setExame] = useState({
        id: 0,
        titulo: "",
        cpf: props.cpf,
        linkPDF: null as File | null,
    })

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };
    
    useEffect(() => {
        const fetchExames = async () => {
          try {
            const data = await getAllExamesbyUser(props.cpf);
            setExame(data);
          } catch (error) {
            console.error('Erro ao buscar exames:', error);
          }
        };
    
        fetchExames();
      }, [props.cpf]);


      function criarNovoExame() {
        criarExame(props.cpf, ExameInfo.titulo, ExameInfo.linkPDF)
            .then((response) => {
                setExame(response);
            })
            .catch(console.error);
        console.log(ExameInfo);
        console.log("Exame criado")
    }

    function resetModal(){
        setShowModal(true)
    }

      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setExame(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    return (
        <>
        {!props.editar ? (
            <button 
                className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'
                onClick={() => resetModal()}>
                <FaPlus className='text-white' size={20} />
            </button>
            ) : (
            <button 
                className='text-[#6B3F97] hover:bg-gray-50 px-3 items-center flex rounded-full font-semibold'
                onClick={() => resetModal()}>
                Ver mais
            </button>
            )}
          {showModal ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-transparent p-6 rounded-lg shadow-lg w-[60vw]">
                <div className='bg-[#F0F0F0] h-[52vh] w-full rounded-lg shadow-lg overflow-y-auto'>
                <div className='flex items-center justify-between p-6'>
                    <h2 className='font-semibold text-2xl text-[#6B3F97] text-center mb-2 mt-2'>
                    Exame
                    </h2>
                    <div className='flex items-center gap-3'>
                    <button onClick={handleEditClick}>
                        <FaEdit
                        className='text-[#6B3F97] cursor-pointer hover:text-[#4A2569]'
                        size={22}
                        />
                    </button>
                    <button onClick={handleOpenModal}>
                        <FaRegTrashAlt
                        className='text-red-700 hover:text-red-900 cursor-pointer'
                        size={20}
                        />
                    </button>
                    </div>
                </div>
                {/*<ModalDelete
                    id
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    termo="este exame"
                />*/}
                <div className='flex justify-start gap-8'>
                    <div className='relative items-center gap-2 mx-8'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='nome'
                    >
                        ID Exame
                    </label>
                    <div className='relative'>
                        <input
                        className='shadow bg-gray-100 appearance-none border rounded w-[10vw] py-1 px-4 pl-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nome' name='id'
                        type='text'
                        defaultValue='0000'
                        readOnly
                        />
                        <FaLock
                        className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500'
                        size={16}
                        />
                    </div>
                    </div>
                    <div className='items-center gap-2 mr-8'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='nome'
                    >
                        Título do Exame
                    </label>
                    <input
                        className='shadow appearance-none border rounded w-[25vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='nome' name='title'
                        type='text'
                        //value={ExameInfo.titulo}
                        //readOnly={!isEditing}
                        onChange={handleChange}
                    />
                    </div>
                </div>
                <div className='mt-8 mx-8'>
                <input
                    type="file" name='file_url'
                    //onChange={handleFileChange}
                    className="hidden"
                    id="upload"
/>
                <label htmlFor="upload" className='px-2 py-1 bg-[#2D6A4F] hover:bg-[#1D4D3F] rounded-md text-white mb-3 items-center flex gap-2 text-lg cursor-pointer'>
                    <FaFilePdf className='text-white' size={20} /> Adicionar PDF
                </label>

                </div>
                <div className='mx-8'>
                    <button className='text-blue-700 w-auto hover:underline hover:text-blue-900 cursor-pointer'>
                    nome do arquivo.pdf
                    </button>
                </div>
                <div className='flex justify-end gap-8 mx-8'>
                    <button onClick={()=>{criarNovoExame()}} className='border-2 text-lg border-[#6B3F97] bg-[#6B3F97] hover:border-[#4A2569] hover:bg-[#4A2569] px-4 py-1 rounded-md text-white font-semibold'>
                    Salvar
                    </button>
                    <button onClick={()=>{setShowModal(false)}}  className='border-2 text-lg border-[#9387AB] bg-transparent hover:border-[#4A2569] hover:text-[#4A2569] px-4 py-1 rounded-md text-[#9387AB] font-semibold'>
                    Voltar
                    </button>
                </div>
            </div>
            </div>
                </div>
          ) : null}
        </>
      );
    }