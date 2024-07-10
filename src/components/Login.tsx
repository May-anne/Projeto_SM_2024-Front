"use client"
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineLock } from 'react-icons/ai';
import { AuthContext } from "../app/contexts/AuthContext"
import { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

export function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const { signIn } = useContext(AuthContext)
  const [badLogin, setBadLogin] = useState(false)
  const router = useRouter()
  
  async function handleLogin(){
      try {
        await signIn({login, senha});
      } catch (error) {
        setBadLogin(true) 
      }
  };

  useEffect(() => {
    const { 'engsoft.token': token } = parseCookies()
    if(token){
      router.push('/dashboard')
    }
    setBadLogin(false)
  },[])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-[#EBF4F6]'>
      <main className='flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-10 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl'>
          <form className='w-full md:w-3/5 p-6 md:p-10' onSubmit={(e) => {e.preventDefault(); handleLogin()}}>
            <div className='text-left font-bold'>
            </div>
            <div className='py-6 md:py-10 items-center justify-center'>
              <h2 className='text-3xl font-sans font-semibold ml-12 text-[#6B3F97] mb-6'>Acesse sua conta</h2>
              <div className='flex flex-col items-center text-left'>
              <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input 
                    type="username" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)}
                    className="border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#6B3F97]" 
                    placeholder="Usuário" 
                    required
                  />
                  <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                  
                </div>
                <div className="relative my-4 w-4/5 hover:opacity-70 hover:border-gray-400">
                  <input 
                    type="password" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)}
                    className="hover:opacity-70 border border-[#1C1C1C] rounded-md pl-10 pr-3 py-2 w-full block text-sm text-[#1C1C1C] bg-transparent border-1 appearance-none focus:outline-none focus:ring-0 focus:border-[#6B3F97]" 
                    placeholder="Senha" 
                    required
                  />
                  <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1C1C1C]" />
                  
                </div>
              </div>
              <div className='flex justify-between w-full mb-1'>
                  <label className='flex items-center text-xs'><input type='checkbox' name='lembre-se' className='mr-2 ml-12'/>Lembre-se de mim</label>
                  <Link href={'/ForgotPassword'} className='text-xs mr-12 hover:text-[#6B3F97] hover:underline'>Esqueci minha senha</Link>
              </div>
              <button type="submit" className='hover:opacity-70 w-48 mb-4 text-[18px] mt-6 rounded-xl bg-gradient-to-r from-[#6B3F97] to-[#45255A] px-4 text-white font-semibold font-sans py-2 '>Entrar</button>
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
                <div className='absolute bottom-0 left-0 pb-5 pl-5'>
                    <h2 className='text-left font-sans'>PROJETO</h2>
                    <h2 className='text-2xl font-sans font-semibold'>MOVIMENTA+</h2>
                </div>
            </div>
          
        </div>
      </main>
    </div>
  );
}

