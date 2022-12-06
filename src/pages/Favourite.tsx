// prendere id da localstorage --> fatto
// CHIAMATA API ID: getShowsById
// mostrare movie
// REMOVE FAVOURITE removeFavouriteMovie
// remove movie dal databse removeMovieDatabase
// controllare checkbox

import { getShowsById, ShowType } from "../Api";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const Favourite = () => {

    const [movies, setMovies] = useState<ShowType[]>([])

    

    const getFavourite = () => {
        const localFavourite = JSON.parse(localStorage.getItem('favouriteMovies')!);

        if (localFavourite) {
            localFavourite.forEach(async (el: number) => {
                try {
                    const movie = await getShowsById(el);
                    if (movie !== null) {
                        setMovies(favourite => [...favourite, movie]);
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }

    useEffect(() => {
        getFavourite();
        console.log(movies);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Grid container justifyContent="center" style={{ height: "100vh" }}>
            <Grid item style={{ padding: "2em" }} />
            {movies.map((el, i) => (
                <Card key={i} sx={{ display: 'flex', alignItems: 'center', margin: '2em' }}>
                    <CardMedia component='img' height={140} image={el.image} alt={el.title} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" >{el.title}</Typography>
                    </CardContent>
                </Card>
            ))}
            </Grid>
        </>
    );
}

export default Favourite;