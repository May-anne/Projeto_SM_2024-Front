
import { Cadastro } from '@/components/Cadastro';
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function cadastro() {
  await getData()
  return <Cadastro />;
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    //redirect('/api/auth/logout')
  }
}