import React from 'react'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from "react"
import '../css/Home.css'
import { searchMovies, getPopularMovies } from '../services/api'
import { useMovieContext } from '../contexts/MovieContext'

const Home = () => {
    const { favourites } = useMovieContext();
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("failed to load movies....")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return


        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)

        } catch (err) {
            console.log(err)
            setError("failed to search movies....")
        } finally {
            setLoading(false)
        }

        // setSearchQuery("")

    };


    return (
        <div className='home'>

            <form onSubmit={handleSearch} className='search-form'>
                <input type="text"
                    placeholder='search for movies....'
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />

                <button className='search-button'>Search</button>
            </form>

            {error && <div className='error-message'>{error}</div>}

            {loading ? (<div className='loading'>Loading..</div>

            ) : (

                <div className="movies-grid">
                    {movies.map((movie) =>{
                        let fav = true;
                        favourites.forEach(favmovie => {
                            if(favmovie.id==movie.id){
                                fav=false;
                            }
                        });
                        return movie.title.toLowerCase().startsWith(searchQuery) && (
                            <MovieCard movie={movie} key={movie.id} fav={fav}/>
                        )
                    })
                    }
                </div>
            )}
        </div>
    );
}

export default Home
