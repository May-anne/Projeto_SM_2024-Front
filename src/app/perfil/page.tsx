import { Perfil } from "@/components/Perfil";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function Home() {
  await getData()
  return <Perfil/>;
}
async function getData() {
  if(!cookies().has('movimenta.token')){
    redirect('/api/auth/logout')
  }
}