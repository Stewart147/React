import React from 'react';
import PropTypes from 'prop-types';
import './WatchMovies.css';
import rating from '../assets/star.png';


export const WatchMovies = ({movie}) => {

  return (

    <>

    <a href={`https://www.themoviedb.org/movie/${movie.id}`} target="_blank" className='movie_show' > 
      {/*  <img src= {`https://image.tmdb.org/t/p/w500${movie.profile_path}`} className='movie_img' alt='moviedetails'  /> */} 

    <img
  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
  className="movie_img"
/>

    <div className='movie_details'>
        <h3 className='movie_details_h3'>{movie.original_title}</h3>
        <div className='center_ele moviedate'>
            <p>
               {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("en-GB")
                : "N/A"}
            </p>
                <p> 
                {movie.vote_average} <img className='emoji_class' alt='rating icons' src={rating} />
                 </p>
        </div>
        <p className='moviedesc'>{movie.overview.slice(0,100)+"."}</p> 
        
    </div>
    </a> 

    </>

  )
};

 WatchMovies.propTypes={
    movie: PropTypes.shape({
        id:PropTypes.number.isRequired,
        poster_path:PropTypes.string,
        original_title:PropTypes.string.isRequired,
        release_date:PropTypes.string,
       /* rate_average:PropTypes.number, */
       vote_average:PropTypes.number,
        overview:PropTypes.string,

    }).isRequired,
}; 

// object values can be found from using console, clicking on object
// results and then array value, i.e 0, then you get object values such as
// original_title,overview etc
