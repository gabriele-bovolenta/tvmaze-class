// prendere id da localstorage --> fatto
// CHIAMATA API ID: getShowsById
// mostrare movie
// REMOVE FAVOURITE removeFavouriteMovie
// remove movie dal databse removeMovieDatabase
// controllare checkbox

import { useEffect } from "react";
import useFirebaseFavourite from "../Firebase/useFirebaseFavourite";



const Favourite = () => {
    const [favourites] = useFirebaseFavourite()

    useEffect(() => {
        console.log(favourites)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [favourites]);
    

    return (
        <>
        </>
    );
}

export default Favourite;