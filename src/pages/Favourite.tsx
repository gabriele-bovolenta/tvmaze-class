// prendere id da localstorage --> fatto
// CHIAMATA API ID: getShowsById
// mostrare movie
// REMOVE FAVOURITE removeFavouriteMovie
// remove movie dal databse removeMovieDatabase
// controllare checkbox

import { Checkbox, Grid } from "@mui/material";
import { useEffect } from "react";
import useFirebaseFavourite from "../Context/useFirebaseFavourite";
import { Interweave } from "interweave";

const Favourite = () => {
  const [favourites, addToFavourite, removeFromFavourite] = useFirebaseFavourite();

  const label = {
    inputprops: { "arial-label": "checkbox-favourites" },
  };

  const handleCheckbox = (
    checked: boolean,
    id: number,
    title: string,
    image?: string,
    description?: string
  ) => {
    if (checked) {
      removeFromFavourite(id);
    } else {
      addToFavourite(id, title, image, description);
    }
  };

  useEffect(() => {
    console.log(favourites);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "100vh", padding: "2em", width: "100%"}}
      >
        {favourites.map((el: any) => (
          <div key={el.id} className="card" style={{backgroundColor: 'black', height:"400px"}}>
            <Checkbox
                {...label}
                onChange={(e) => {
                  handleCheckbox(
                    !!favourites.find((d) => el.id === d.id),
                    el.id,
                    el.title,
                    el.image,
                    el.description
                  );
                }}
                checked={!!favourites.find((d) => el.id === d.id)}
              />
            <figure className="card__thumb">
              <img src={el.image} alt="" className="card__image" />
              <figcaption className="card__caption">
                <h2 className="card__title">{el.title}</h2>
                <Interweave
                  className="card__snippet"
                  content={el.description}
                />
                {/* <Link to={el.id.toString()}>
                  <Button variant="contained">Details</Button>
                </Link> */}
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

/* <Grid container justifyContent="center" style={{ height: "100vh" }}>
      <Grid item style={{ padding: "2em", width: "100%" }}>
        <Paper
          component="form"
          sx={{ display: "flex", alignItems: "center" }}
          style={{ padding: "2em" }}
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <FormControl>
            <InputBase
              id="outlined-basic"
              placeholder="Search by title..."
              onChange={(e) => handleOnSearchChange(e.target.value)}
              value={currentSearch.get("search") || ""}
              autoFocus
            />
          </FormControl>
          <FormControl>
            <Button
              disabled={isSearchButtonDisabled()}
              onClick={handleOnSearch}
            >
              Search
            </Button>
          </FormControl>
        </Paper>
      </Grid>

      <Grid item style={{ padding: "2em" }} />
      {shows.map((el, i) => (
        <Card
          key={i}
          sx={{ display: "flex", alignItems: "center", margin: "2em" }}
        >
          <Checkbox
            {...label}
            onChange={(e) => {
              handleCheckbox(!!favourites.find((d) => el.id === d.id), el.id, el.title, el.image, el.description);
            }}
            checked={!!favourites.find((d) => el.id === d.id)}
          />
          <CardMedia
            component="img"
            height={140}
            image={el.image}
            alt={el.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {el.title}
            </Typography>
          </CardContent>

          <Link to={el.id.toString()}>
            <Button variant="contained">Details</Button>
          </Link>
        </Card>
      ))}
    </Grid> */

export default Favourite;
