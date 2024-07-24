import { AllExames } from "@/components/AllExames";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function login() {
  await getData()
  return <AllExames />;
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    redirect('/api/auth/logout')
  }
}