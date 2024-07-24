import { Relatorios } from "@/components/Relatorios";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default function login() {
  return <Relatorios />;
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    redirect('/api/auth/logout')
  }
}