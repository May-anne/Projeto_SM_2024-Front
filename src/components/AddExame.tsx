"use client"
import { FaLock, FaPlus } from 'react-icons/fa6';
import { FaEdit, FaRegTrashAlt,FaFilePdf } from 'react-icons/fa';
import { ModalDelete } from './ModalDelete';
import { useEffect, useState } from 'react';
import { criarExame, criarModalidade, getAllExamesbyUser } from '@/lib/api';

interface Exame {
  id: number;
  title: string;
  uploaded_at: string;
  cpf_idoso: string;
  file: string;
}

interface ModalProps {
  exameInfo: Exame[];
  setExamoInfo: Function
  exameID: number | undefined
  cpf: string;
}

export function AddExame(props: ModalProps){
  const [file, setFile] = useState<File | undefined>();
  const [showModal, setShowModal] = useState(false);

  const [ExameInfo, setExame] = useState({
    id: 0,
    title: '',
    uploaded_at: 'aaaa/mm/dd',
    cpf_idoso: props.cpf,
    file: ''
  })

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

  
  function resetModal() {
    setShowModal(true);
    setExame({
      id: 0,
      title: '',
      uploaded_at: 'aaaa/mm/dd',
      cpf_idoso: props.cpf,
      file: ''
    });

}
  async function subirPdf(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
        files: FileList;
    };
    setFile(target.files[0]);
  }

  const criarNovoExame = async () => {
    if (file) {
      try {
        const formData = new FormData();
        console.log(props.cpf);
        formData.append("cpf_idoso", props.cpf);
        formData.append("title", ExameInfo.title);
        formData.append("file", file);
  
        try {
          const uploadResponse = await criarExame(formData);
          console.log("File uploaded successfully:", uploadResponse);

          if (uploadResponse && uploadResponse.data) {
            const novoExame = uploadResponse.data;
            props.setExamoInfo((prevExames: Exame[]) => [...prevExames, novoExame]);
          }

          setShowModal(false);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } catch (error) {
        console.error("Erro ao criar edital", error);
      }
    } else {
      alert("Insira algum arquivo para criar o edital");
    }
  };
  

    return (
        <>
          <button 
              className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569] '
              onClick={() => resetModal()}>
              <FaPlus className='text-white' size={20} />
          </button>

          {showModal ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-transparent p-6 rounded-lg shadow-lg w-[35vw]">
                <div className='bg-[#F0F0F0]  w-full rounded-lg shadow-lg overflow-y-auto flex flex-col justify-between gap-y-5 py-5'>
                  <div className='flex  items-center justify-between px-6'>
                    <h2 className='font-semibold text-2xl text-[#6B3F97] text-center mb-2'>
                      Exame
                    </h2>
                  </div>
                  <div className='flex justify-center gap-8'>
                    <div className='items-center gap-2 mr-8'>
                      <label
                          className='block text-gray-700 text-sm font-bold mb-2'
                          htmlFor='nome'
                      >
                          Título do Exame
                      </label>

                      <input
                          className='shadow appearance-none border rounded w-[25vw] py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          id='nome'
                          name='title'
                          type='text'
                          value={ExameInfo.title}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            setExame({ ...ExameInfo, [name]: value });
                        }}
                      />
                    </div>
                  </div>
                  <div className='mt-8 mx-8 flex flex-col'>
                    <div className='flex flex-row'>
                      <input
                          type="file" name='file_url'
                          onChange={subirPdf}
                          className="hidden"
                          id="upload"
                      />
                      <label htmlFor="upload" className='px-2 py-1 bg-[#2D6A4F] hover:bg-[#1D4D3F] rounded-md text-white items-center flex flex-row gap-2 text-lg cursor-pointer'>
                          <FaFilePdf className='text-white' size={20} /> Adicionar PDF
                      </label>
                    </div>
                    <p className='text-blue-700 w-auto hover:underline hover:text-blue-900 cursor-pointer'>
                      {file?(file.name):('Insira um arquivo')}
                    </p>
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