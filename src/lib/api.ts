import axios from "axios";

const urlBase = "http://localhost:8000/api/"


export async function loginUser(nome: string, senha: string) {
  const response = await api.post('signin/', {
    nome: nome,
    senha: senha,
  });
  if (response){
    return response
  }
}

export const api = axios.create({
  baseURL: urlBase
})


