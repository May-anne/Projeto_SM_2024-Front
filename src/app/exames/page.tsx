import { DashboardInicial } from "@/components/DashboardInicial";
import { Exames } from "@/components/Exames";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default function exames() {
  return <Exames />;
}

