import React from 'react';

const Movie: React.FC<{
  movie: any,
  onEdit: () => void,
  onDelete: () => void,
  onDetail: () => void
}> = ({ movie, onEdit, onDelete, onDetail }) => {
  const posterURL = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '';

  return (
    <div className="post_image card w-96 m-3">
      <figure className='pt-5'>
        {posterURL && <img src={posterURL} alt={`Poster of ${movie.title}`} />}
      </figure>
      <div className="card-body items-center justify-center text-center flex space-between">
        <div className="text-2xl">{movie.title}</div>
        <div className="text-lg">{movie.release_date} 公開</div>
        <div className="text-lg pb-5">投稿者 {movie.name}</div>
        <div className="flex mx-auto">
          <button onClick={onDetail} className="btn mx-3">詳細</button>
          <button onClick={onEdit} className="btn mx-3">編集</button>
          <button onClick={onDelete} className="btn mx-3">削除</button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
