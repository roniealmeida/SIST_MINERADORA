import React from 'react'; 
 
export default function Inicio() {
    return (
        <section style={{ marginTop: '10px', alignItems: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <div style={{ padding: '30px', borderRadius: '20px', maxWidth: '700px', margin: '40px auto' }}>
                <img src="src\assets\system-integration.png" alt="Logo" style={{ width: '120px', marginBottom: '16px' }} />
                <h1 style={{ margin: '0 0 12px 0', fontSize: '30px' }}>Sistema Integrado da Mineradora</h1>
                <p style={{ margin: 0, fontSize: '18px', color: '#333' }}>Bem-vindo ao painel de controle. Utilize o menu acima para gerenciar os recursos.</p>
            </div>
        </section>
    );
}