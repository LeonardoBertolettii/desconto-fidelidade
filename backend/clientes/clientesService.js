const repo = require('./clientesRepository');

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;
  return true;
}

function adicionarCliente(nome, cpf) {
  if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
    throw new Error('Nome inválido. Informe pelo menos 3 letras.');
  }
  if (!cpf || !validarCPF(cpf)) {
    throw new Error('CPF inválido.');
  }
  if (repo.buscarClientePorCpf(cpf)) throw new Error('CPF já cadastrado');
  repo.inserirCliente(nome.trim(), cpf);
}

function buscarCliente(cpf) {
  return repo.buscarClientePorCpf(cpf);
}

function adicionarEntrada(cpf) {
  repo.incrementarEntrada(cpf);
}

function temDesconto(cpf) {
  const cliente = repo.buscarClientePorCpf(cpf);
  if (cliente && cliente.numero_entradas >= 10) {
    repo.atualizarEntradas(cpf, 0);
    return true;
  }
  return false;
}

function listarClientes() {
  return repo.listarClientes();
}

module.exports = {
  adicionarCliente,
  buscarCliente,
  adicionarEntrada,
  temDesconto,
  listarClientes,
};