import React from 'react'


const FilterMovies = ({givingRating, onRatingButtonClick, ratings}) => {


  return (
    
        <ul className='center_ele movie_filter'>

          {
             
            ratings.map(rategiven=><li key={rategiven} className={givingRating===rategiven ? 'movie_filter_item active' : 'movie_filter_item'}  onClick={() =>onRatingButtonClick(rategiven)}>{rategiven}+ </li>
            )
          }

  
        </ul>
      
    
  )
}

export default FilterMovies;