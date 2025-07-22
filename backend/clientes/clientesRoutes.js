const express = require('express');
const router = express.Router();
const clienteService = require('./clientesService');

router.post('/', (req, res) => {
  const { nome, cpf } = req.body;
  try {
    clienteService.adicionarCliente(nome, cpf);
    res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!' });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

router.get('/:cpf', (req, res) => {
  const cliente = clienteService.buscarCliente(req.params.cpf);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ erro: 'Cliente não encontrado.' });
  }
});

router.put('/:cpf/visita', (req, res) => {
  clienteService.adicionarEntrada(req.params.cpf);
  res.json({ mensagem: 'Visita registrada com sucesso!' });
});

router.get('/:cpf/desconto', (req, res) => {
  const desconto = clienteService.temDesconto(req.params.cpf);
  res.json({ temDesconto: desconto });
});

router.get('/', (req, res) => {
  const clientes = clienteService.listarClientes();
  res.json(clientes);
});

module.exports = router;