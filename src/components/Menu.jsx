import React from 'react'; 
import '../styles/Menu.css'
 
export default function Menu({ setPagina }) { 
    return ( 
        <nav> 
            <button onClick={() => setPagina('inicio')} style={{ marginRight: '10px' }}>Início</button> 
            <button onClick={() => setPagina('equipamentos')} style={{ marginRight: '10px'}}>Equipamentos</button> 
            <button onClick={() => setPagina('cidades')} style={{ marginRight: '10px'}}>Cidades</button> 
            <button onClick={() => setPagina('funcionarios')} style={{ marginRight: '10px'}}>Funcionários</button> 
            <button onClick={() => setPagina('servicos')}>Serviços</button> 
        </nav> 
    ); 
} 