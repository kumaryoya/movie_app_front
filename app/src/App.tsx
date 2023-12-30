import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import MovieModal from './MovieModal';
import MovieDetailModal from './MovieDetailModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  name: string;
  comment: string;
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [deleteConfirmModalIsOpen, setDeleteConfirmModalIsOpen] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios.get(`${apiUrl}/movies`)
      .then(response => setMovies(response.data))
      .catch(error => console.error("Error fetching data: ", error));
  };

  const openModal = (movie: Movie | null = null) => {
    setCurrentMovie(movie);
    setModalIsOpen(true);
    setDetailModalIsOpen(false);
    setDeleteConfirmModalIsOpen(false);
  };

  const closeModal = () => {
    setCurrentMovie(null);
    setModalIsOpen(false);
    setDetailModalIsOpen(false);
    setDeleteConfirmModalIsOpen(false);
  };

  const onSave = (movieData: any) => {
    const url = currentMovie && currentMovie.id
      ? `${apiUrl}/movies/${currentMovie.id}`
      : `${apiUrl}/movies`;

    axios[currentMovie && currentMovie.id ? 'put' : 'post'](url, movieData)
      .then(response => {
        if (currentMovie && currentMovie.id) {
          setMovies(movies.map(movie => movie.id === currentMovie.id ? response.data : movie));
        } else {
          setMovies([...movies, response.data]);
        }
        closeModal();
      })
      .catch(error => console.error("Error saving movie: ", error));
  };

  const showMovieDetail = (movie: Movie) => {
    setCurrentMovie(movie);
    setDetailModalIsOpen(true);
    setModalIsOpen(false);
    setDeleteConfirmModalIsOpen(false);
  };

  const confirmDelete = (movie: Movie) => {
    setCurrentMovie(movie);
    setDeleteConfirmModalIsOpen(true);
    setModalIsOpen(false);
    setDetailModalIsOpen(false);
  };

  const onDeleteConfirmed = () => {
    if (currentMovie && currentMovie.id) {
      axios.delete(`${apiUrl}/movies/${currentMovie.id}`)
        .then(() => {
          fetchMovies();
          closeModal();
        })
        .catch(error => console.error("Error deleting movie: ", error));
    }
  };

  return (
    <div className='bg_image items-center text-center py-20'>
      <button className='btn text-3xl mb-10' onClick={() => openModal()}>新規投稿</button>
      <div className="flex flex-wrap items-center justify-center text-center mx-auto">
        <MovieModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          onSave={onSave}
          movie={currentMovie}
        />
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
