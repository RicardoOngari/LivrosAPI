import React from 'react';
import './BookCard.css';

// Componente que exibe as informações de um livro (sem descrição)
function BookCard({ titulo, autor, ano, capa }) {
  return (
    <div className="livro-card">
      <img src={capa} alt={`Capa do livro ${titulo}`} />
      <h3>{titulo}</h3>
      <p><strong>Autor:</strong> {autor}</p>
      <p><strong>Ano:</strong> {ano}</p>
    </div>
  );
}

export default BookCard;
