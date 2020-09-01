import { api, opcoesFetch } from './config'


const listarClientes = () => 
  fetch('http://localhost:4000', opcoesFetch('{clientes { id nome cpf }}'))
  .then(resposta => resposta.json())
  .then(dados => dados.data.clientes);

const buscarClientePorId = id => 
  fetch('http://localhost:4000', opcoesFetch(`
    query {
      cliente(id: ${id}) {
        nome
        cpf
      }
    }`))
  .then(resposta => resposta.json())
  .then(dado => dado.data.cliente);

const adicionarCliente = cliente => 
  fetch('http://localhost:4000', opcoesFetch(`
    mutation {
      adicionarCliente(nome: "${cliente.nome}", cpf: "${cliente.cpf}") {
        id
        nome
      }
    }`))
  .then(resposta => resposta.json())
  .then(dados => dados.data.cliente);

const alterarCliente = (id, cliente) =>
  fetch('http://localhost:4000', opcoesFetch(`
    mutation {
        atualizarCliente(id: ${id}, nome: "${cliente.nome}", cpf: "${cliente.cpf}") {
          nome
          cpf
        }
    }
  `))
  .then(resposta => resposta.json())
  .then(dados => dados.data.cliente);

const removerCliente = id => 
  fetch('http://localhost:4000', opcoesFetch(`
    mutation {
      deletarCliente(id: ${id})
    }`));

export default {
  listarClientes,
  buscarClientePorId,
  adicionarCliente,
  alterarCliente,
  removerCliente
}