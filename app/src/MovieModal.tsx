import React, { useState } from 'react';
import Modal from 'react-modal';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const MovieModal: React.FC<{
  isOpen: boolean,
  onClose: () => void,
  onSave: (movieData: any) => void
}> = ({ isOpen, onClose, onSave }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSearch = async () => {
    const apiKey = 'd4529edacae0cdc7ef9fc9cddcd7c41c';
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ja&query=${searchTerm}`);
    const data = await response.json();
    setSearchResults(data.results);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleSubmit = () => {
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
      <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>検索</button>
      </div>
      {searchResults.map(movie => (
        <div key={movie.id} onClick={() => handleMovieSelect(movie)}>
          {movie.title}
        </div>
      ))}
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          {selectedMovie.poster_path && (
            <img src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`} alt={`Poster of ${selectedMovie.title}`} />
          )}
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="名前" />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="コメント" />
          <button onClick={handleSubmit}>投稿</button>
        </div>
      )}
    </Modal>
  );
};

export default MovieModal;
