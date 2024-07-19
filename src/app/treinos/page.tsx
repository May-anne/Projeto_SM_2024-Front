import { Treino } from '@/components/Treinos';
import { cookies } from 'next/headers'

export default async function treinos() {
  getData();
  return <Treino />;
}

async function getData() {
  if(!cookies().has('movimenta.token')){
    //redirect('/api/auth/logout')
  }
}