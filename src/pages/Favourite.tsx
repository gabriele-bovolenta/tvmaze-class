// prendere id da localstorage --> fatto
// CHIAMATA API ID: getShowsById
// mostrare movie
// REMOVE FAVOURITE removeFavouriteMovie
// remove movie dal databse removeMovieDatabase
// controllare checkbox
import { useEffect } from 'react'

const Favourite = () => {

    const data = JSON.parse(localStorage.getItem('favourite')!)

    useEffect(() => {
        console.log(data) 
    }, [data])
    

    return (
        <>
            {data.map((e:any) =><pre>{e.name}</pre>)}
        </>
    );
}

export default Favourite;