import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputBase,
  Paper,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../Api";
import { Link, useSearchParams } from "react-router-dom";
import useFirebaseFavourite from "../Context/useFirebaseFavourite";
import { Interweave } from "interweave";

const SearchPage = () => {
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);

  const [favourites, addToFavourite, removeFromFavourite] =
    useFirebaseFavourite();

  const handleOnSearchChange = useCallback(
    (query: string) => {
      setCurrentSearch({ search: query });
    },
    [setCurrentSearch]
  );

  const isSearchButtonDisabled = () =>
    currentSearch.get("search")?.trim().length === 0;

  const handleOnSearch = useCallback(() => {
    getShowsBySearch(currentSearch?.get("search") || "").then((res) =>
      setShows(res)
    );
  }, [currentSearch]);

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
    const currentSearchStr = currentSearch?.get("search")?.trim();
    if (
      !!currentSearchStr &&
      currentSearchStr.length > 0 &&
      shows.length === 0
    ) {
      handleOnSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  return (
    <>
      <Grid container justifyContent="center" style={{ height: "100vh" }}>
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

        <Grid
          container
          justifyContent="center"
          style={{ minHeight: "100vh", padding: "2em", width: "100%" }}
        >
          {shows.map((el: any) => (
            <div key={el.id} className="card" style={{backgroundColor: 'black'}}>
              <Checkbox style={{backgroundColor: 'white'}}
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
                  <Link to={el.id.toString()}>
                    <Button variant="contained">Details</Button>
                  </Link>
                  {/* <a href="./DetailPage.tsx" className="card__button">
                    Read more
                  </a> */}
                </figcaption>
              </figure>
            </div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchPage;
