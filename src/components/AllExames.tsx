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


export function AllExames() {

    return (
        <>
        <div className='h-[100vh] w-[100vw] bg-[#eae3ef]'>
            <HeaderPage/>
            <div className='justify-center items-center mx-12 my-12'>
              <SearchBar searchAll={true} pesquisa={'exames'} ehExame={true} ehTreino={false} ehAvaliacao={false} nome="" cpf=""/>
            </div>
        </div>
        </>
      );
    }      