import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    carregarCidades();
  }, []);

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      setCidades(response.data);
    } catch (error) {
      console.error('Erro ao buscar cidades', error);
    }
  };

  const cadastrar = async (e) => {
    e.preventDefault();
    
    if (!nome.trim()) return alert("Preencha com o nome da cidade");
    
    try {
      await cidadeService.criar({ nome });
      setNome('');
      carregarCidades();
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  return (
    <section style={{ marginTop: '10px', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ margin: '0 20px 20px 0', fontSize: '30px' }}>Painel de Cidades</h2>
    
      <form onSubmit={cadastrar} style={{ background: '#002fff49', padding: '15px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e0e0e0' }}>
        <h4 style={{ margin:'10px' }}>Registrar Novo Polo</h4>
        <div style={{ display: 'flex', gap: '12px', margin: '10px'}}>
          <input 
            type="text" 
            placeholder="Nome da Localidade (Ex: Carajás)" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} 
          />
          <button type="submit" style={{ padding: '6px 20px', cursor: 'pointer', background: '#0004ff', color: '#fff', border: 'none', borderRadius: '14px' }}>
            Salvar Cidade
          </button>
        </div>
      </form>

      <h3>Localidades Operacionais</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', textAlign: 'center' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #bbb', textAlign: 'center' }}>
            <th style={{ padding: '8px 4px' }}>Código</th>
            <th style={{ padding: '8px 4px' }}>Nome da Cidade</th>
          </tr>
        </thead>
        <tbody>
          {cidades.map(cid => (
            <tr key={cid.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
              <td style={{ padding: '8px 4px', color: '#777' }}>#{cid.id}</td>
              <td style={{ padding: '8px 4px' }}><strong>{cid.nome}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}