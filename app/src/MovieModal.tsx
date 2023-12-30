import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  name: string;
  comment: string;
}

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (movieData: any) => void;
  movie: Movie | null;
}

const MovieModal: React.FC<MovieModalProps> = ({ isOpen, onClose, onSave, movie }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (movie) {
      setSelectedMovie(movie);
      setName(movie.name || '');
      setComment(movie.comment || '');
    }
  }, [movie]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSearchResults([]);
      setSelectedMovie(null);
      setName('');
      setComment('');
    }
  }, [isOpen]);

  const handleSearch = async () => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ja&query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.results);
      } else {
        console.error('Search failed:', data);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const isFormValid = () => {
    return name.trim() !== '' && comment.trim() !== '';
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid()) return;

    if (selectedMovie) {
      onSave({
        title: selectedMovie.title,
        overview: selectedMovie.overview,
        poster_path: selectedMovie.poster_path,
        release_date: selectedMovie.release_date,
        name,
        comment
      });
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {!selectedMovie && (
        <>
          <div className='items-center text-center py-5'>
            <input
              className='input input-bordered w-full max-w-xs mx-3'
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='btn mx-3' onClick={handleSearch}>検索</button>
          </div>
          <div className='items-center text-center py-5'>
            {searchResults.map(movie => (
              <div
                className='link link-hover py-2'
                key={movie.id}
                onClick={() => handleMovieSelect(movie)}
              >
                {movie.title}
              </div>
            ))}
          </div>
        </>
      )}

      {selectedMovie && (
        <div className='items-center text-center mx-20 py-5'>
          <form onSubmit={handleSubmit}>
            <h2 className='py-5'>{selectedMovie.title}</h2>
            <p className='py-5'>{selectedMovie.overview}</p>
            {selectedMovie.poster_path && (
              <img
                className='mx-auto py-5'
                src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
                alt={`Poster of ${selectedMovie.title}`}
              />
            )}
            <div className='py-5'>
              <input
                className='input input-bordered w-full max-w-xs mx-3'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="投稿者"
              />
              <input
                className='input input-bordered w-full max-w-xs mx-3'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="コメント"
              />
              <button
                className={`btn mx-3 ${!isFormValid() ? 'btn-disabled' : ''}`}
                type="submit"
                disabled={!isFormValid()}
              >
                投稿
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default MovieModal;
