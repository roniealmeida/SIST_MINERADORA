import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const carregarFuncionarios = async () => {
    try {
      const response = await funcionarioService.listar();
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  };

  const cadastrar = async () => {
    if (!nome || !cargo || !salario) return alert("Preencha os campos!");
    try {
      await funcionarioService.criar({ nome, cargo, salario });
      setNome('');
      setCargo('');
      setSalario('');
      carregarFuncionarios();
    } catch (error) {
      console.error("Erro ao cadastrar", error);
    }
  };

  return (
    <section style={{ marginTop: '10px', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ margin: '0 20px 20px 0', fontSize: '30px' }}>Gestão de Funcionários</h2>

      <form onSubmit={(e) => { e.preventDefault(); cadastrar(); }} style={{ background: '#002fff49', padding: '15px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e0e0e0' }}>
        <h4 style={{ margin: '10px' }}>Novo Funcionário</h4>
        <div style={{ display: 'flex', gap: '12px', margin: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
          <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
          <input type="text" placeholder="Salário" value={salario} onChange={(e) => setSalario(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
          <button type="submit" style={{ padding: '6px 20px', cursor: 'pointer', background: '#0004ff', color: '#fff', border: 'none', borderRadius: '14px' }}>Cadastrar</button>
        </div>
      </form>

      <h3>Funcionários Cadastrados</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {funcionarios.map(func => (
          <li key={func.id} style={{ background: '#f7f7f7', padding: '12px 14px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e5e5e5' }}>
            <strong>{func.nome}</strong> - {func.cargo} (R$ {func.salario})
          </li>
        ))}
      </ul>
    </section>
  );
}