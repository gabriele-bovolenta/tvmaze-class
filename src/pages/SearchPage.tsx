// Import react
import { useCallback, useEffect, useState } from "react";

// Import api call
import { getShowsBySearch, ShowType } from "../Api";

// Import react-router-dom
import { Link, useSearchParams } from "react-router-dom";

// Import context
import useFirebaseFavourite from "../Context/useFirebaseFavourite";

// Import MUI
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputBase,
  Paper,
} from "@mui/material";
import { Interweave } from "interweave";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { lightGreen } from "@mui/material/colors";

const SearchPage = () => {

  // States
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);

  // Custom hook favourite
  const [favourites, addToFavourite, removeFromFavourite] =
    useFirebaseFavourite();

    // Set current search in the state
  const handleOnSearchChange = useCallback(
    (query: string) => {
      setCurrentSearch({ search: query });
    },
    [setCurrentSearch]
  );

  // Button search disable if string === 0
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

  // Add or remove favourite movies
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
            <div
              key={el.id}
              className="card"
              style={{ backgroundColor: "black" }}
            >
              <div className="custom-checkbox">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 40 }, color: lightGreen[100], '&.Mui-checked': { color: lightGreen[300]} }}
                  style={{ backgroundColor: "transparent", position: "relative" }}
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
              </div>
              <figure className="card__thumb">
                <img src={el.image} alt="" className="card__image" />
                <figcaption className="card__caption">
                  <h2 className="card__title">{el.title}</h2>
                  <Interweave
                    className="card__snippet"
                    content={el.description}
                  />
                  <Link to={el.id.toString()}>
                    <Button 
                    variant="contained"
                    style={{
                      borderRadius: 35,
                      backgroundColor: "#634b66",
                      padding: "9px 18px",
                      fontSize: "15px"
                  }}
                    >
                      Details
                    </Button>
                  </Link>
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
