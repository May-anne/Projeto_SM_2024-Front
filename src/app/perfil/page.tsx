import { DashboardInicial } from "@/components/DashboardInicial";
import { Filtro } from "@/components/Filtro";
import { Perfil } from "@/components/Perfil";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function acesso() {
  return <Perfil />;
}
