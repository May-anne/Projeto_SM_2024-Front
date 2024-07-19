"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineLock } from 'react-icons/ai';
import { AuthContext } from "../app/contexts/AuthContext"
import logo from '../../public/images/Pmov.png'
import { parseCookies } from 'nookies';
import { MdOutlineMail } from 'react-icons/md';

export function EsqueceuSenha() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useContext(AuthContext)
  const [badLogin, setBadLogin] = useState(false)
  const router = useRouter()
  
  async function handleLogin(){
      try {
        await signIn({nome, senha});
      } catch (error) {
        setBadLogin(true) 
      }
  };

  useEffect(() => {
    const { 'movimenta.token': token } = parseCookies()
    if(token){
      router.push('/dashboard')
    }
    setBadLogin(false)
  },[])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-[#EBF4F6]'>
      <main className='flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl'>
          <form className='w-full md:w-3/5 p-6 md:p-10'>
            <div className='md:py-10 items-center justify-center'>
              <Link href="/" className='hover:opacity-60'>
                <Image src={logo} alt='' width={150} layout="intrinsic"/>
              </Link>
              <h2 className='text-3xl font-sans font-semibold  text-[#6B3F97] mb-4 mt-12'>Recuperação de Senha</h2>
              <p className='font-sans mb-6 text-gray-300'>Instruções serão enviadas para você redefinir sua senha.</p>
              <div className='flex flex-col items-center text-left'>
              <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input 
                    type="username" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)}
                    className="border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#6B3F97]" 
                    placeholder="E-mail" 
                    required
                  />
                  <MdOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                  
                </div>
              </div>
              <button type="submit" className='hover:opacity-70 w-48 mb-4 text-[18px] mt-6 rounded-xl bg-gradient-to-r from-[#6B3F97] to-[#45255A] px-4 text-white font-semibold font-sans py-2 '>Enviar</button>
              {badLogin && (
              <div className="text-red-400 pt-3">
                Email ou senha incorreto(s)
              </div>
            )}
            </div>
          </form>
            <div className='relative w-full md:w-2/5 bg-gradient-to-r from-[#6B3F97] to-[#45255A] text-white rounded-b-2xl md:rounded-tr-2xl md:rounded-br-2xl py-10 md:py-36 px-6 md:px-12'>
                <div>

                </div>
                <Link href={'/'} className='absolute bottom-0 left-0 pb-5 pl-5 hover:opacity-60'>
                    <h2 className='text-left font-sans'>PROJETO</h2>
                    <h2 className='text-2xl font-sans font-semibold'>MOVIMENTA+</h2>
                </Link>
            </div>
          
        </div>
      </main>
    </div>
  );
}

