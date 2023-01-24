// Import react
import { useCallback, useEffect, useState } from "react";

// Import api call
import { getShowsBySearch, ShowType } from "../Api";

// Import react-router-dom
import { useSearchParams } from "react-router-dom";

// Import context
import useFirebaseFavourite from "../Context/useFirebaseFavourite";

// Import MUI
import { Button, FormControl, Grid, InputBase, Paper } from "@mui/material";
import CustomCard from "../Components/Card/card.component";

// Import redux
import { useSelector, useDispatch } from "react-redux";
import { setDarkTheme, setDefaultTheme } from "../Redux/theme";

const SearchPage = () => {
  // States
  const [currentSearch, setCurrentSearch] = useSearchParams();
  const [shows, setShows] = useState<ShowType[]>([]);

  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme);

  const setDark = () => {
    dispatch(setDarkTheme());
  };

  const setDefault = () => {
    dispatch(setDefaultTheme());
  };

  // Custom hook favourite
  const [favourites] = useFirebaseFavourite();

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
        {!theme.darkmode ? (
            <Button variant="contained" onClick={setDark}>
              Dark theme
            </Button>
        ) : (
          <Button variant="contained" onClick={setDefault}>
            Light theme
          </Button>
        )}
        <CustomCard array={shows} />
      </Grid>
    </>
  );
};

export default SearchPage;
