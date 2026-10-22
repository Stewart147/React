import React, { useEffect, useState } from 'react';
import './Movies.css';
import { WatchMovies } from './WatchMovies';
import FilterMovies from './FilterMovies';

const Movies = () => {

  const [movies, setMovies] = useState([]);

  // store original movies
  const [allMoviesFiltered, setAllMoviesFiltered] = useState([]);

  // ⭐ rating filter state
  const [givingRating, setRating] = useState(0);

  // 📅 release year filter state
  const [releaseYear, setReleaseYear] = useState("");

  // 🔽 sorting state
  const [sortType, setSortType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // fetch movies
  useEffect(() => {
    fetchmovies();
  }, []);

  const fetchmovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=09446d72ec4f5d1c4ae447afdaf3f7bb"
      );
      const data = await res.json();

      setMovies(data.results);
      setAllMoviesFiltered(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // ✅ reusable sort function
  const sortMovies = (type, order, list) => {
    let sorted = [...list];

    if (type === "rating") {
      sorted.sort((a, b) =>
        order === "asc"
          ? a.vote_average - b.vote_average
          : b.vote_average - a.vote_average
      );
    }

    if (type === "date") {
      sorted.sort((a, b) =>
        order === "asc"
          ? new Date(a.release_date) - new Date(b.release_date)
          : new Date(b.release_date) - new Date(a.release_date)
      );
    }

    return sorted;
  };

  // ✅ MAIN FILTER FUNCTION (combines rating + date)
  const applyFilters = (rating, year) => {
    let filtered = [...allMoviesFiltered];

    // 🎯 filter by rating
    if (rating !== 0) {
      filtered = filtered.filter(
        (movie) => movie.vote_average >= rating
      );
    }

    // 📅 filter by release year
    if (year !== "") {
      filtered = filtered.filter(
        (movie) =>
          movie.release_date &&
          movie.release_date.startsWith(year)
      );
    }

    // 🔽 apply sorting after filtering
    const sorted = sortMovies(sortType, sortOrder, filtered);

    setMovies(sorted);
  };

  // ⭐ rating button click
  const handleFilter = (rating) => {
    const newRating = rating === givingRating ? 0 : rating;

    setRating(newRating);

    applyFilters(newRating, releaseYear);
  };

  // 📅 release year dropdown
  const handleYearChange = (e) => {
    const year = e.target.value;

    setReleaseYear(year);

    applyFilters(givingRating, year);
  };

  // 🔽 sort type
  const handleSortType = (e) => {
    const type = e.target.value;

    setSortType(type);

    const sorted = sortMovies(type, sortOrder, movies);
    setMovies(sorted);
  };

  // 🔼🔽 sort order
  const handleSortOrder = (e) => {
    const order = e.target.value;

    setSortOrder(order);

    const sorted = sortMovies(sortType, order, movies);
    setMovies(sorted);
  };

  return (
    <section className='movie_list'>
      <header className='movieheader'>
        <h2 className='center_ele movie_h2'>Popular</h2>

        <div className='center_ele movie_listadd'>

          {/* ⭐ Rating Filter */}
          <FilterMovies
            givingRating={givingRating}
            onRatingButtonClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          {/* 📅 Release Year Filter */}
          <select className="movie_sorting" onChange={handleYearChange}>
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>

          {/* 🔽 Sort Type */}
          <select className="movie_sorting" onChange={handleSortType}>
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="date">Release Date</option>
          </select>

          {/* 🔼🔽 Sort Order */}
          <select className="movie_sorting" onChange={handleSortOrder}>
            <option value="">Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

        </div>
      </header>

      <div className='movie_shows'>
        {
          movies.length > 0 ? (
            movies.map((movie) => (
              <WatchMovies key={movie.id} movie={movie} />
            ))
          ) : (
            <p className='movie_h2'>No Movies found</p>
          )
        }
      </div>
    </section>
  );
};

export default Movies;