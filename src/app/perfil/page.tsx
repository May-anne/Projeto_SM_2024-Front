import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { Perfil } from "@/components/Perfil";

export default function acesso() {
  return <Perfil />;
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    redirect('/api/auth/logout')
  }
}