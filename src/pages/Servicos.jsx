import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const response = await servicoService.listar();
      setServicos(response.data);
    } catch (error) {
      console.error("Erro ao buscar serviços", error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !descricao || !valor) return alert("Preencha todos os campos!");
    try {
      await servicoService.criar({ nome, descricao, valor });
      setNome('');
      setDescricao('');
      setValor('');
      carregarServicos();
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  return (
    <section style={{ marginTop: '10px', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ margin: '0 20px 20px 0', fontSize: '30px' }}>Gestão de Serviços</h2>

      <form onSubmit={(e) => { e.preventDefault(); cadastrar(); }} style={{ background: '#002fff49', padding: '15px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e0e0e0' }}>
        <h4 style={{ margin: '10px' }}>Novo Serviço</h4>
        <div style={{ display: 'flex', gap: '12px', margin: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Nome do Serviço" value={nome} onChange={(e) => setNome(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
          <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
          <input type="text" placeholder="Valor Estimado" value={valor} onChange={(e) => setValor(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
          <button type="submit" style={{ padding: '6px 20px', cursor: 'pointer', background: '#0004ff', color: '#fff', border: 'none', borderRadius: '14px' }}>Cadastrar</button>
        </div>
      </form>

      <h3>Serviços Cadastrados</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {servicos.map(serv => (
          <li key={serv.id} style={{ background: '#f7f7f7', padding: '12px 14px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e5e5e5' }}>
            <strong>{serv.nome}</strong>: {serv.descricao} - R$ {serv.valor}
          </li>
        ))}
      </ul>
    </section>
  );
}