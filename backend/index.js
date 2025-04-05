const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const clienteController = require('./clienteController');


const {
  adicionarCliente,
  buscarCliente,
  adicionarEntrada,
  temDesconto
} = require('./clienteController');

app.use(cors());
app.use(express.json());

app.post('/clientes', (req, res) => {
  const { nome, cpf } = req.body;
  try {
    adicionarCliente(nome, cpf);
    res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao cadastrar cliente ou CPF já existe.' });
  }
});

app.get('/clientes/:cpf', (req, res) => {
  const cliente = buscarCliente(req.params.cpf);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ erro: 'Cliente não encontrado.' });
  }
});

app.put('/clientes/:cpf/visita', (req, res) => {
  adicionarEntrada(req.params.cpf);
  res.json({ mensagem: 'Visita registrada com sucesso!' });
});

app.get('/clientes/:cpf/desconto', (req, res) => {
  const desconto = temDesconto(req.params.cpf);
  res.json({ temDesconto: desconto });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/clientes', (req, res) => {
    const clientes = clienteController.listarClientes();
    res.json(clientes);
  });
  