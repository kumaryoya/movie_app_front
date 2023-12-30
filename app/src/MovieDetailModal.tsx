import React from 'react';
import Modal from 'react-modal';

const MovieDetailModal: React.FC<{
  isOpen: boolean,
  onClose: () => void,
  movie: any
}> = ({ isOpen, onClose, movie }) => {
  if (!movie) return null;

  const posterURL = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className='items-center text-center mx-20 py-5'>
        <h2 className='py-5'>{movie.title}</h2>
        {posterURL && <img className='mx-auto py-5' src={posterURL} alt={`Poster of ${movie.title}`} />}
        <div className="text-lg">{movie.release_date} 公開</div>
        <p className='py-5'>{movie.overview}</p>
        <p className='py-5'>投稿者 {movie.name}</p>
        <p className='py-5'>コメント {movie.comment}</p>
        <button className='btn my-5' onClick={onClose}>閉じる</button>
      </div>
    </Modal>
  );
};

export default MovieDetailModal;
