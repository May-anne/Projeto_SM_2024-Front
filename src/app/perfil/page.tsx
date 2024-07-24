import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { Perfil } from "@/components/Perfil";
import { Suspense } from "react";

export default function acesso() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Perfil />
    </Suspense>
  );
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    redirect('/api/auth/logout')
  }
}