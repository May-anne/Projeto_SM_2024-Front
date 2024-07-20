import React, { useState } from "react";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateProgram, deleteProgram } from '@/lib/api';
import { describe } from "node:test";
import { Description } from "@mui/icons-material";

interface rewardItem {
  id: number;
  appkey: string;
  urlImage: string;
  title: string;
  description: string;
  cardColor: string;
  value: number;
}

interface NumberProps{
  HandleUpdateReward: Function, 
  setRewards: Function,
  rewards: rewardItem[],
  id: number,
  title: string;
  appkey: string,
  urlImage: string,
  description: string,
  cardColor: string
  value: number
}
export function UpdateItemResgate(props:NumberProps) {

  const [showModal, setShowModal] = React.useState(false);

  const [rewardName, setRewardName] = useState('')
  const [rewardDescription, setDescription] = useState('')
  const [value, setValue] = useState(0)
  const [cardColor, setCardColor] = useState('')
  const [urlImage, setUrlImage] = useState('')

  const handleImageUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      console.log("Selected file:", file);
    }
  };

  function resetModal(){
    setRewardName(props.title)
    setDescription(props.description)
    setValue(props.value)
    setCardColor(props.cardColor)
    setUrlImage(props.urlImage)
    setShowModal(true)
  }

  return (
    <>
      <button 
        title="Criar usuário"
        className="leading-none border-none outline-none rounded-xl p-2 px-3 cursor-pointer mb-6 mr-2 text-center"
        onClick={() => resetModal()}>
          <DriveFileRenameOutlineOutlinedIcon fontSize="medium" className='text-black hover:text-gray-200'/>
      </button>
      
      {showModal ? (
        <>
          <div className="flex items-center justify-center min-h-screen overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className={`text-center bg-gray-1000 shadow-lg shadow-gray-500 rounded-2xl w-[60vw] h-[37rem] pt-12`}>

              <div className="text-black font-bold text-2xl text-center mb-12 flex flex-row w-full justify-center items-center"> 
                <span className="ml-16 mr-16">{rewardName}</span>
                <button onClick={() => {alert("Funcionalidade em desenvolvimento"); /*handleDelete()*/}} className="z-10"><DeleteIcon className="text-red-500 hover:text-red-300"/></button>
              </div > 

              <div className="px-10">
                <form 
                  onSubmit={(e)=>{
                    e.preventDefault()
                    alert("Funcionalidade em desenvolvimento")
                    setShowModal(false)
                  }}
                  id="New usuario" 
                  className="grid grid-cols-2 flex-1 flex-col gap-x-10">
                    
                  <div className="relative mt-2 mb-8 w-full flex items-start flex-col gap-y-2">
                    <label htmlFor="rewardName" className={`text-generic-fields font-bold`}>Titulo</label>
                    <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                              id="rewardName" 
                              spellCheck={false}
                              onChange={(e)=>{setRewardName(e.target.value)}}
                              value={rewardName}
                              required/>
                  </div>

                  <div className="relative mt-2 mb-8 w-full flex items-start flex-col gap-y-2">
                    <label htmlFor="value" className={`text-generic-fields font-bold`}>Valor</label>
                    <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                              id="value" 
                              spellCheck={false}
                              onChange={(e)=>{setValue(Number(e.target.value))}}
                              value={value}            
                              required/>
                  </div>

                  <div className="relative mt-2 mb-8 w-full flex items-start flex-col gap-y-2">
                    <label htmlFor="rewardDescription" className={`text-generic-fields font-bold`}>Descrição</label>
                    <input className={`focus:ring-0 focus:border-1 focus:outline-none appearance-none leading-tight focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm bg-generic-bgLight shadow-input hover:shadow-input-hover-focus focus:shadow-input-hover-focus`} 
                              id="rewardDescription" 
                              spellCheck={false}
                              onChange={(e)=>{setDescription(e.target.value)}}
                              value={rewardDescription}            
                              required/>
                  </div>

                  <div className="flex flex-row gap-x-10 items-center">
                    <div className="relative mt-2 mb-8 w-full flex items-start flex-col gap-y-2">
                      <label htmlFor="cardColor" className="text-generic-fields font-bold">Cor do card</label>
                      <input
                        type="color"
                        className=" focus:border-white placeholder:text-generic-fields placeholder:font-semibold w-full border-none outline-none rounded-xl py-[1em] pl-[2em] pr-[4em] text-sm hover:opacity-60"
                        style={{ backgroundColor: cardColor }}
                        id="cardColor"
                        spellCheck={false}
                        onChange={(e) => setCardColor(e.target.value)}
                        value={cardColor}
                        required
                      />
                    </div>

                    <div 
                      title="UparImagem"
                      className={`flex justify-center gap-x-3 leading-none w-full border-none outline-none rounded-xl bg-gray-100 px-4 text-black items-center cursor-pointer py-3 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}
                    >
                      <FileUploadOutlinedIcon/> {"Imagem (300x300)"}
                      <input
                        type="file"
                        accept="image/*" // Accept only image files
                        style={{ display: "none" }} // Hide the input element
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                    </div>
                  </div>
                  
          
                  <button 
                    title="Cadastrar"
                    type="submit" 
                    className={`leading-none w-full border-none outline-none rounded-xl bg-generic-tittleButton p-4 text-generic-bgLight font-bold cursor-pointer mt-10 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus`}>
                    Atualizar
                  </button>

                  <button 
                    title="Fechar"
                    type="button" 
                    className={"leading-none border-none outline-none rounded-xl p-4 px-7 cursor-pointer mt-10 shadow-button hover:shadow-button-hover-focus focus:shadow-button-hover-focus"}
                    onClick={() => setShowModal(false)}>
                    Fechar
                  </button>
                </form>
            
              </div>
              <p className="flex flex-row w-full text-center justify-center text-lg text-red-500">Funcionalidade em desenvolvimento</p>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}