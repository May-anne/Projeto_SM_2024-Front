import { FaPlus } from "react-icons/fa6";
import { MdFilterAlt } from "react-icons/md";

interface CardsProps {
    pesquisa:string;
    exame:boolean;

  }

export function SearchBar(props: CardsProps){
    return(
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
                {!props.exame && <button className='rounded-md px-2 py-2 ml-2 shadow-lg bg-[#6B3F97] hover:bg-[#4A2569]'><FaPlus className='text-white' size={20} /></button>}
                <button className='rounded-md px-2 py-2 ml-2 shadow-lg bg-white hover:bg-gray-50'><MdFilterAlt className='text-[#6B3F97]'size={20}/></button>
            </div>
            <div className='h-[40vh] w-[50vw] bg-white shadow-2xl rounded-md mb-4'>

            </div>
        </>
    );
}