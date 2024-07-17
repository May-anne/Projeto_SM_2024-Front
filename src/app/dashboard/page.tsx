import { DashboardInicial } from "@/components/DashboardInicial";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function dashboard() {
  await getData()
  return <DashboardInicial />;
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    //redirect('/api/auth/logout')
  }
}