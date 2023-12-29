import React from 'react';
import Modal from 'react-modal';

const MovieDetailModal: React.FC<{
  isOpen: boolean,
  onClose: () => void,
  movie: any // 映画の詳細情報を保持するプロパティ
}> = ({ isOpen, onClose, movie }) => {
  if (!movie) return null;

  const posterURL = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      {posterURL && <img src={posterURL} alt={`Poster of ${movie.title}`} />} {/* ポスター画像を表示 */}
      <button onClick={onClose}>閉じる</button>
    </Modal>
  );
};

export default MovieDetailModal;
