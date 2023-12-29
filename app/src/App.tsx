import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import MovieModal from './MovieModal';
import MovieDetailModal from './MovieDetailModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const App: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [currentMovie, setCurrentMovie] = useState<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [deleteConfirmModalIsOpen, setDeleteConfirmModalIsOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios.get('http://localhost:3001/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error fetching data: ", error));
  };

  const openModal = (movie: any = null) => {
    setCurrentMovie(movie);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentMovie(null);
    setModalIsOpen(false);
    setDetailModalIsOpen(false);
    setDeleteConfirmModalIsOpen(false);
  };

  const onSave = (movieData: any) => {
    if (currentMovie && currentMovie.id) {
      axios.put(`http://localhost:3001/movies/${currentMovie.id}`, movieData)
        .then(() => fetchMovies());
    } else {
      axios.post('http://localhost:3001/movies', movieData)
        .then(() => fetchMovies());
    }
    closeModal();
  };

  const showMovieDetail = (movie: any) => {
    setCurrentMovie(movie);
    setDetailModalIsOpen(true);
  };

  const confirmDelete = (movie: any) => {
    setCurrentMovie(movie);
    setDeleteConfirmModalIsOpen(true);
  };

  const onDeleteConfirmed = () => {
    if (currentMovie && currentMovie.id) {
      axios.delete(`http://localhost:3001/movies/${currentMovie.id}`)
        .then(() => {
          fetchMovies();
          closeModal();
        })
        .catch(error => console.error("Error deleting movie: ", error));
    }
  };

  return (
    <div className='bg_image items-center text-center py-8'>
      <button className='btn text-3xl mb-5' onClick={() => openModal()}>新規投稿</button>
      <div className="flex flex-wrap items-center justify-center text-center mx-auto">
        <MovieModal isOpen={modalIsOpen} onClose={closeModal} onSave={onSave}/>
        {movies.map(movie => (
          <Movie
            key={movie.id}
            movie={movie}
            onEdit={() => openModal(movie)}
            onDelete={() => confirmDelete(movie)}
            onDetail={() => showMovieDetail(movie)}
          />
        ))}
        <MovieDetailModal
          isOpen={detailModalIsOpen}
          onClose={closeModal}
          movie={currentMovie}
        />
        <DeleteConfirmModal
          isOpen={deleteConfirmModalIsOpen}
          onClose={closeModal}
          onConfirm={onDeleteConfirmed}
        />
      </div>
    </div>
  );
};

export default App;
