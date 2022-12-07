// prendere id da localstorage --> fatto
// CHIAMATA API ID: getShowsById
// mostrare movie
// REMOVE FAVOURITE removeFavouriteMovie
// remove movie dal databse removeMovieDatabase
// controllare checkbox

import { Grid } from "@mui/material";
import { useEffect } from "react";
import useFirebaseFavourite from "../Context/useFirebaseFavourite";
import { Interweave } from "interweave";

const Favourite = () => {
  const [favourites] = useFirebaseFavourite();

  useEffect(() => {
    console.log(favourites);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "100vh", padding: "2em", width: "100%" }}
      >
        {favourites.map((el: any) => (
          <div key={el.id} className="card">
            <figure className="card__thumb">
              <img src={el.image} alt="" className="card__image" />
              <figcaption className="card__caption">
                <h2 className="card__title">{el.title}</h2>
                <Interweave
                  className="card__snippet"
                  content={el.description}
                />
                <a href="./DetailPage.tsx" className="card__button">
                  Read more
                </a>
              </figcaption>
            </figure>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default Favourite;
