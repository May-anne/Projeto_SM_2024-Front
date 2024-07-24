import { AllAvaliacoes } from "@/components/AllAvaliacoes";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";


export default async function avaliacoes() {
  await getData()
  return <AllAvaliacoes />;
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    redirect('/api/auth/logout')
  }
}