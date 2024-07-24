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

interface Treino {
  id: number,
  data: string,
  treino_pres: string,
  tempo_pres: number,
  distancia_pres: number,
  tempo_exec: number,
  distancia_exec: number,
  cpf_idoso: string
}

interface Avaliacao {
  id: number,
  nome: string,
  data: string,
  cpf_idoso: string,
  peso: number,
  estatura: number,
  marcha6: number,
  per_cintura: number,
  per_quadril: number,
  per_panturrilha: number,
  hg_esquerda1: number,
  hg_esquerda2: number,
  hg_direita1: number,
  hg_direita2: number,
  ir_vir1: number,
  ir_vir2: number,
}

export const urlDownload = "http://localhost:8000/api"
const urlBase = urlDownload+"/"


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
  try {
      console.log(modo +" kk")
      const response = await api.post(`/idosos_dados/${termo}/criar/`, modo);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error(`Erro ao criar ${termo}:`, error);
      throw error;
  }
}

export async function deletarModalidade(termo: 'exame' | 'treino' | 'avaliacao', modo: any) {
  try {
    const response = await api.delete(`/idosos_dados/${termo}/${modo.id}`, {
      data: modo // Ensure the request body includes 'modo'
    });
      console.log(`${termo} deletada(o) com sucesso:`, response.data);
  } catch (error) {
      console.error(`Erro ao deletar ${termo}`, error);
  }
}


export async function deletarExame(exame: any) {
  try{
    const response = await api.delete(`/idosos_dados/exame/apagar`, {
      params: {
        exame_id: exame.id,
        cpf_idoso: exame.cpf_idoso,
        title: exame.title
      },
    });
    console.log(response.data)
    return response.data;
  } catch(error){
    console.log("Erro ao pegar exames.")
  }
}

export async function getAllExamesbyUser(cpf: string) {
  try{
    const response = await api.get('idosos_dados/exame/lista_cpf', {
      params: {
        cpf_idoso: cpf,
      },
    });
    console.log(response.data)
    return response.data;
  } catch(error){
    console.log("Erro ao pegar exames.")
  }
}

export async function criarExame(formData: FormData) {
  try {
    const response = await api.post(`idosos_dados/exame/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function getAllExames() {
  const response = await api.get('/idosos_dados/exame/lista_geral');
  console.log(response.data)
  return response.data;
}


export async function editarTreino(treino: Treino) {
  const response = await api.put(`idosos_dados/treino/${treino.id}/`, {
    id: treino.id,
    data: treino.data,
    treino_pres: treino.distancia_pres,
    tempo_pres: treino.tempo_pres,
    distancia_pres: treino.distancia_pres,
    tempo_exec: treino.tempo_exec,
    distancia_exec: treino.distancia_exec,
    cpf_idoso: treino.cpf_idoso
  });
  console.log(response.data);
  return response.data;
}

export async function createTreino(treino: Treino) {
  const response = await api.post('idosos_dados/treino/criar/', {
    data: treino.data,
    treino_pres: treino.treino_pres,
    tempo_pres: treino.tempo_pres,
    distancia_pres: treino.distancia_pres,
    tempo_exec: treino.tempo_exec,
    distancia_exec: treino.distancia_exec,
    cpf_idoso: treino.cpf_idoso
  });

  return response;
}

export async function getAllTreinosbyUser(cpf: string) {
  const response = await api.get('idosos_dados/treino/listar/'+cpf, {});
  console.log(response.data)
  return response.data;
}

export async function getAllTreinos() {
  const response = await api.get('idosos_dados/treino/lista/');
  console.log(response.data)
  return response.data;
}

export async function editarAvaliacao(avaliacao: Avaliacao) {
  const response = await api.put(`idosos_dados/avaliacao/${avaliacao.id}`, {
    id: avaliacao.id,
    nome: avaliacao.nome,
    data: avaliacao.data,
    cpf_idoso: avaliacao.cpf_idoso,
    peso: avaliacao.peso,
    estatura: avaliacao.estatura,
    marcha6: avaliacao.marcha6,
    per_cintura: avaliacao.per_cintura,
    per_quadril: avaliacao.per_quadril,
    per_panturrilha: avaliacao.per_panturrilha,
    hg_esquerda1: avaliacao.hg_esquerda1,
    hg_esquerda2: avaliacao.hg_esquerda2,
    hg_direita1: avaliacao.hg_direita1,
    hg_direita2: avaliacao.hg_direita2,
    ir_vir1: avaliacao.ir_vir1,
    ir_vir2: avaliacao.ir_vir2,
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
  const response = await api.get('idosos_dados/avaliacao/lista/');
  console.log( response.data)
  return response.data;
}
 
export async function uploadFile(tipo: string, id:number, formData: FormData) {
  try {
    const response = await api.post(`${tipo}/inserir/${id}/pdf`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export const api = axios.create({
  baseURL: urlBase
})


