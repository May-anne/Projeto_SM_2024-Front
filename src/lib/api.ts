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

export async function criarModalidade(termo: 'exame' | 'treino' | 'avaliacao', cpf: string | undefined) {
  if (!cpf) throw new Error('CPF não fornecido');

  try {
      const response = await api.get(`/idosos_dados/${termo}/lista/?cpf_idoso=${cpf}`);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
  }
}

export async function criarExame(cpf: string) {
  const response = await api.post('forms/exame/upload', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
  return response.data;
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

export async function getAllExamesbyUser(cpf: string) {
  const response = await api.get('/forms/exame/listacpf'+cpf, {});
  console.log(response.data)
  return response.data;
}

export async function getAllExames() {
  const response = await api.get('/forms/exame/lista_geral');
  console.log(response.data)
  return response.data;
}

export async function criarTreino(cpf: string) {
  const response = await api.post('idosos_dados/treino/criar', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
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

export async function getAllTreinosbyUser(cpf: string) {
  const response = await api.get('idosos_dados/treino/listar/'+cpf, {});
  console.log(response.data)
  return response.data;
}

export async function getAllTreinos() {
  const response = await api.get('idosos_dados/treino/listar/');
  console.log(response.data)
  return response.data;
}

export async function criarAvaliacao(cpf: string) {
  const response = await api.post('idosos_dados/avaliacao/criar/', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
  return response.data;
}

export async function editarAvaliacao(cpf: string) {
  const response = await api.put('idosos_dados/avaliacao/', {
    params: {
      cpf: cpf,
    },
  });
  console.log(response.data);
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

export async function getAllAvaliacoesbyUser(cpf: string) {
  const response = await api.get('idosos_dados/avaliacao/listar/'+cpf, {});
  console.log( response.data)
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


