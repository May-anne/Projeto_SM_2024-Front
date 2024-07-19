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

export async function getIdosos() {
  const response = await api.get('idosos_dados/lista/', {});
  console.log( response.data)
  return response.data;
}

export async function getIdoso(id: string) {
  const response = await api.get('idosos_dados/'+id, {});
  console.log( response.data)
  return response.data;
}


export const api = axios.create({
  baseURL: urlBase
})


