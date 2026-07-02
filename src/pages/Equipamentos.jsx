import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]); 
    const [nome, setNome] = useState(''); 
    const [setor, setSetor] = useState(''); 
 
    useEffect(() => { 
        carregarEquipamentos(); 
    }, []); 
 
    const carregarEquipamentos = async () => { 
        try { 
            const response = await equipamentoService.listar(); 
            setEquipamentos(response.data); 
        } catch (error) { 
            console.error("Erro ao buscar equipamentos", error); 
        } 
    }; 
 
    const cadastrar = async () => { 
        if (!nome || !setor) return alert("Preencha todos os campos!"); 
        try { 
            await equipamentoService.criar({ nome, setor }); 
            setNome(''); 
            setSetor(''); 
            carregarEquipamentos();
        } catch (error) { 
            console.error("Erro ao cadastrar", error); 
        } 
    }; 
 
    return (
        <section style={{ marginTop: '10px', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ margin: '0 20px 20px 0', fontSize: '30px' }}>Gestão de Equipamentos</h2>

            <form onSubmit={(e) => { e.preventDefault(); cadastrar(); }} style={{ background: '#002fff49', padding: '15px', borderRadius: '16px', marginBottom: '30px', border: '1px solid #e0e0e0' }}>
                <h4 style={{ margin: '10px' }}>Novo Equipamento</h4>
                <div style={{ display: 'flex', gap: '12px', margin: '10px', flexWrap: 'wrap' }}>
                    <input type="text" placeholder="Nome do Equipamento" value={nome} onChange={(e) => setNome(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
                    <input type="text" placeholder="Setor (Ex: Extração)" value={setor} onChange={(e) => setSetor(e.target.value)} style={{ padding: '6px 12px', flex: '1', borderRadius: '14px', border: '2px solid #ccc' }} />
                    <button type="submit" style={{ padding: '6px 20px', cursor: 'pointer', background: '#0004ff', color: '#fff', border: 'none', borderRadius: '14px' }}>Cadastrar</button>
                </div>
            </form>

            <h3>Equipamentos Cadastrados</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {equipamentos.map(eq => (
                    <li key={eq.id} style={{ background: '#f7f7f7', padding: '12px 14px', borderRadius: '12px', marginBottom: '10px', border: '1px solid #e5e5e5' }}>
                        <strong>{eq.nome}</strong> - Setor: {eq.setor}
                    </li>
                ))}
            </ul>
        </section>
    );
}