import axios from "axios";

interface Idoso{
  nome: string,
  data_nascimento: string,
  sexo: string,
  raca: string,
  escolaridade: string,
  deficiencia: boolean,
  deficiencia_quais: string,
  telefone_pessoal: string,
  telefone_emergencial: string,
  endereco: string,
  bairro: string,
  cep: string,
  rg: string,
  cpf: string,
  cartao_cns: string,
  plano_saude: boolean,
  plano_saude_qual: string,
  onde_moras: string,
  com_quem_mora: string,
  quantos_residem: number,
  meio_transporte: string,
  situacao_economica: string,
  renda: number,
  problemas_saude: boolean,
  problemas_saude_quais: string,
  cirgurgia_recente: boolean,
  cirurgia_quais: string,
  internacao_recente: boolean,
  internacao_quais: string,
  alcool: boolean,
  fumante: boolean,
  drogas: boolean,
  medicamentos: boolean,
  medicamentos_quais: string
}


const urlBase = "http://localhost:8000/api/"


export async function loginUser(nome: string, senha: string) {
  const response = await api.post('user_admin/signin/', {
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

export async function getIdoso(cpf: string) {
  const response = await api.get('idosos_dados/'+cpf, {});
  console.log( response.data)
  return response.data;
}

export async function apagarIdoso(cpf: string) {
  const response = await api.delete('idosos_dados/'+cpf, {});
  console.log( response.data)
  return response.data;
}

export async function updateIdoso(idoso: Idoso) {
  try {
    const response = await api.put(`idosos_dados/${idoso.cpf}/`, {
      nome: idoso.nome,
      data_nascimento: idoso.data_nascimento,
      sexo: idoso.sexo,
      raca: idoso.raca,
      escolaridade: idoso.escolaridade,
      deficiencia: idoso.deficiencia,
      deficiencia_quais: idoso.deficiencia_quais,
      telefone_pessoal: idoso.telefone_pessoal,
      telefone_emergencial: idoso.telefone_emergencial,
      endereco: idoso.endereco,
      bairro: idoso.bairro,
      cep: idoso.cep,
      rg: idoso.rg,
      cpf: idoso.cpf,
      cartao_cns: idoso.cartao_cns,
      plano_saude: idoso.plano_saude,
      plano_saude_qual: idoso.plano_saude_qual,
      onde_moras: idoso.onde_moras,
      com_quem_mora: idoso.com_quem_mora,
      quantos_residem: idoso.quantos_residem,
      meio_transporte: idoso.meio_transporte,
      situacao_economica: idoso.situacao_economica,
      renda: idoso.renda,
      problemas_saude: idoso.problemas_saude,
      problemas_saude_quais: idoso.problemas_saude_quais,
      cirgurgia_recente: idoso.cirgurgia_recente,
      cirurgia_quais: idoso.cirurgia_quais,
      internacao_recente: idoso.internacao_recente,
      internacao_quais: idoso.internacao_quais,
      alcool: idoso.alcool,
      fumante: idoso.fumante,
      drogas: idoso.drogas,
      medicamentos: idoso.medicamentos,
      medicamentos_quais: idoso.medicamentos_quais,
    })
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error updating program:', error);
    throw error;
  }
}

export async function createIdoso(idoso: Idoso) {
  const response = await api.post('idosos_dados/cadastrar/', {
      nome: idoso.nome,
      data_nascimento: idoso.data_nascimento,
      sexo: idoso.sexo,
      raca: idoso.raca,
      escolaridade: idoso.escolaridade,
      deficiencia: idoso.deficiencia,
      deficiencia_quais: idoso.deficiencia_quais,
      telefone_pessoal: idoso.telefone_pessoal,
      telefone_emergencial: idoso.telefone_emergencial,
      endereco: idoso.endereco,
      bairro: idoso.bairro,
      cep: idoso.cep,
      rg: idoso.rg,
      cpf: idoso.cpf,
      cartao_cns: idoso.cartao_cns,
      plano_saude: idoso.plano_saude,
      plano_saude_qual: idoso.plano_saude_qual,
      onde_moras: idoso.onde_moras,
      com_quem_mora: idoso.com_quem_mora,
      quantos_residem: idoso.quantos_residem,
      meio_transporte: idoso.meio_transporte,
      situacao_economica: idoso.situacao_economica,
      renda: idoso.renda,
      problemas_saude: idoso.problemas_saude,
      problemas_saude_quais: idoso.problemas_saude_quais,
      cirgurgia_recente: idoso.cirgurgia_recente,
      cirurgia_quais: idoso.cirurgia_quais,
      internacao_recente: idoso.internacao_recente,
      internacao_quais: idoso.internacao_quais,
      alcool: idoso.alcool,
      fumante: idoso.fumante,
      drogas: idoso.drogas,
      medicamentos: idoso.medicamentos,
      medicamentos_quais: idoso.medicamentos_quais,
  });

  return response;
}

export async function mostrarModalidade(termo: 'exame' | 'treino' | 'avaliacao', cpf: string | undefined) {
  if (!cpf) throw new Error('CPF não fornecido');

  try {
      const response = await api.get(`/idosos_dados/${termo}/lista/?cpf_idoso=${cpf}`);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error(`Erro ao mostrar ${termo}:`, error);
      throw error;
  }
}

export async function criarModalidade(termo: 'exame' | 'treino' | 'avaliacao', modo: any) {
  if (!modo.cpf_idoso) throw new Error('CPF não fornecido');
  try {
      const response = await api.post(`/idosos_dados/${termo}/criar/`, modo);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error(`Erro ao criar ${termo}:`, error);
      throw error;
  }
}

export async function deletarModalidade(termo: 'exame' | 'treino' | 'avaliacao', id: number) {
  try {
      const response = await axios.delete(urlBase+`idosos_dados/${termo}/${id}`);
      console.log(`${termo} deletada(o) com sucesso:`, response.data);
  } catch (error) {
      console.error(`Erro ao deletar ${termo}`, error);
      if (axios.isAxiosError(error)) {
          console.error('Axios error details:', error.toJSON());
      } else {
          console.error('Unexpected error:', error);
      }
  }
}

export async function atualizarModalidade(termo: 'exame' | 'treino' | 'avaliacao', id: number) {
  try {
      const response = await axios.put(urlBase+`idosos_dados/${termo}/${id}`);
      console.log(`${termo} atualizado(a) com sucesso:`, response.data);
  } catch (error) {
      console.error(`Erro ao atualizar ${termo}`, error);
      if (axios.isAxiosError(error)) {
          console.error('Axios error details:', error.toJSON());
      } else {
          console.error('Unexpected error:', error);
      }
  }
}


export async function deletarExame(cpf: string) {
  const response = await api.delete('/forms/exame/apagar', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function getAllExamesbyUser(cpf: string | undefined) {
  if (cpf) throw new Error('CPF não fornecido');
  try{
    const response = await api.get('forms/exame/listacpf?cpf_idoso='+cpf, {});
    console.log(response.data)
    return response.data;
  } catch(error){
    console.log("Erro ao pegar exames.")
  }
}

export async function criarExame(cpf: string | undefined, titulo: string, file: string ) {
  try{const response = await api.post('/forms/exame/upload', {
    params: {
      cpf_idoso: cpf,
      title: titulo,
      file_url: file,
    },
  });
  console.log(response.data);
  return response.data;}
  catch(error){
    console.log("Erro ao criar exame.")
  }
}

export async function getAllExames() {
  const response = await api.get('/forms/exame/lista_geral');
  console.log(response.data)
  return response.data;
}

export async function editarTreino(cpf: string) {
  const response = await api.put('idosos_dados/treino/', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function deletarTreino(cpf: string) {
  const response = await api.delete('idosos_dados/treino/', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function getAllTreinos() {
  const response = await api.get('idosos_dados/treino/listar/');
  console.log(response.data)
  return response.data;
}

export async function deletarAvaliacao(cpf: string) {
  const response = await api.delete('idosos_dados/avaliacao/', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function getAllAvaliacoes() {
  const response = await api.get('idosos_dados/avaliacao/listar/');
  console.log( response.data)
  return response.data;
}


export const api = axios.create({
  baseURL: urlBase
})


