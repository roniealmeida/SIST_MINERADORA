const initialData = {
  equipamentos: [
    { id: 1, nome: 'Escavadeira', setor: 'Extração' },
    { id: 2, nome: 'Caminhão', setor: 'Transporte' }
  ],
  cidades: [
    { id: 1, nome: 'Parauapebas' },
    { id: 2, nome: 'Marabá' }
  ],
  funcionarios: [
    { id: 1, nome: 'Ana Silva', cargo: 'Engenheira', salario: '8500' },
    { id: 2, nome: 'Carlos Mendes', cargo: 'Operador', salario: '4200' }
  ],
  servicos: [
    { id: 1, nome: 'Manutenção', descricao: 'Preventiva', valor: '1500' },
    { id: 2, nome: 'Transporte', descricao: 'Carga pesada', valor: '3200' }
  ]
};

const createService = (resource) => ({
  listar: async () => ({ data: initialData[resource] }),
  criar: async (payload) => {
    const item = { id: Date.now(), ...payload };
    initialData[resource] = [...initialData[resource], item];
    return { data: item };
  }
});

export const equipamentoService = createService('equipamentos');
export const cidadeService = createService('cidades');
export const funcionarioService = createService('funcionarios');
export const servicoService = createService('servicos');
