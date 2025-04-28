import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { useState } from "react"


const MovieCard = ({movie}) => {  //{} nhi te isliye error arra tha boiii
    const {isFavourite, addToFavourites,removeFromFavourites}  = useMovieContext()
    const favourite = isFavourite(movie.id)
    const[fav,setfav]=useState(true);

    function OnFavouriteClick(e) {
        e.preventDefault()
        if (favourite) removeFromFavourites(movie.id)
        else addToFavourites(movie)
      
        {fav ? (alert("added to favourites"),
            setfav(false)
        ):(alert("removed from favourites"),
        setfav(true)

    )}
    }
    return (
        <div className='movie-card'>
            <div className='movie-poster'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className='movie-overlay'>
                    <button className={`favourite-button ${favourite ? "active" : ""}`} onClick={OnFavouriteClick}>♡</button>
                </div>
                </div>
                
                <div className='movie-info'>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split("-")[0]}</p>
                </div>
            </div>

    
    )
}             

export default MovieCard
