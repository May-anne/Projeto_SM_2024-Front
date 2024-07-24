"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeaderPage } from './Header';
import { FaRegTrashAlt } from "react-icons/fa";
import { MdFilterAlt, MdOutlineSort } from "react-icons/md";
import { FaPlus } from 'react-icons/fa6';
import Filtro from './Filtro';
import { apagarIdoso, getIdosos } from '@/lib/api';
import { FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Divide } from 'lucide-react';
import { SearchBar } from './SearchBar';


export function AllAvaliacoes() {
  return (
    <div className='relative'>
      <HeaderPage />
      <div className='h-screen w-screen bg-[#eae3ef] flex flex-col justify-center items-center'>
        <div>
          <h2 className='text-3xl font-semibold text-[#6B3F97]'>Listagem Geral de Avaliações</h2>
        </div>
          <div className='mx-12 my-12'>
              <SearchBar searchAll={true} pesquisa={'avaliações'} ehExame={false} ehTreino={false} ehAvaliacao={true} nome="" cpf=""/>
          </div>
      </div>
      </div>
  );
}
