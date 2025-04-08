import React, { useState } from 'react';
import api from '../services/api';
import BookCard from '../components/BookCard';
import './Home.css';

// Página principal da aplicação com busca de livros
function Home() {
  const [busca, setBusca] = useState('');
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);

  // Busca baseada no input do usuário
  const buscarLivros = async () => {
    if (!busca.trim()) return;

    setCarregando(true);
    try {
      const response = await api.get(`/search.json?q=${busca}&limit=10`);
      setLivros(response.data.docs);
    } catch (erro) {
      console.error("Erro ao buscar livros:", erro);
    } finally {
      setCarregando(false);
    }
  };

  // Função "Tente a Sorte" - busca um livro aleatório
  const tenteASorte = async () => {
    setCarregando(true);

    // Lista de termos genéricos pra dar mais chances de encontrar livros
    const termos = ['amor', 'aventura', 'guerra', 'história', 'vida', 'ciência', 'música', 'mistério'];
    const termoAleatorio = termos[Math.floor(Math.random() * termos.length)];

    try {
      const response = await api.get(`/search.json?q=${termoAleatorio}&limit=50`);
      const livrosEncontrados = response.data.docs;

      if (livrosEncontrados.length > 0) {
        const aleatorio = livrosEncontrados[Math.floor(Math.random() * livrosEncontrados.length)];
        setLivros([aleatorio]); // Mostra só o aleatório
      } else {
        setLivros([]);
      }
    } catch (erro) {
      console.error("Erro ao tentar a sorte:", erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container">
      <h1>Busca de Livros</h1>
      <input
        type="text"
        placeholder="Digite o nome do livro..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
      <div className="botoes">
        <button onClick={buscarLivros}>Buscar</button>
        <button className="sorte" onClick={tenteASorte}>🎲 Tente a Sorte</button>
      </div>

      <div className="livros-container">
        {carregando ? (
          <p>Carregando...</p>
        ) : (
          livros.map((livro, index) => {
            const titulo = livro.title || "Título desconhecido";
            const autor = livro.author_name ? livro.author_name.join(', ') : "Autor desconhecido";
            const ano = livro.first_publish_year || "Ano desconhecido";
            const capa = livro.cover_i
              ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
              : 'https://via.placeholder.com/150x200?text=Sem+Capa';

            return (
              <BookCard
                key={index}
                titulo={titulo}
                autor={autor}
                ano={ano}
                capa={capa}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
