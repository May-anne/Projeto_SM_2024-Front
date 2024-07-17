import { DashboardInicial } from "@/components/DashboardInicial";
import { Filtro } from "@/components/Filtro";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function acesso() {
  return <Filtro />;
}
