import { Button, Card, CardContent, CardMedia, FormControl, Grid, InputBase, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../Api";
import { Link, useSearchParams } from "react-router-dom";

const SearchPage = () => {
    const [currentSearch, setCurrentSearch] = useSearchParams();
    const [shows, setShows] = useState<ShowType[]>([]);

    const handleOnSearchChange = useCallback(
        (query: string) => {
            setCurrentSearch({ search: query });
        },
        [setCurrentSearch]
    );

    const isSearchButtonDisabled = () => currentSearch.get("search")?.trim().length === 0;

    const handleOnSearch = useCallback(() => {
        getShowsBySearch(currentSearch?.get("search") || "").then((res) => setShows(res));
    }, [currentSearch]);

    useEffect(() => {
        const currentSearchStr = currentSearch?.get("search")?.trim();
        if (!!currentSearchStr && currentSearchStr.length > 0 && shows.length === 0) {
            handleOnSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
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
                            value={currentSearch.get("search")}
                            autoFocus
                        />
                    </FormControl>
                    <FormControl>
                        <Button disabled={isSearchButtonDisabled()} onClick={handleOnSearch}>Search</Button>
                    </FormControl>
                </Paper>
            </Grid>

            <Grid item style={{ padding: "2em" }} />
            {shows.map((el) => (
                <Link to={el.id.toString()}>
                    <Card sx={{ display: 'flex', alignItems: 'center', margin: '2em' }}>
                        <CardMedia component='img' height={140} image={el.image} alt={el.title} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" >{el.title}</Typography>
                        </CardContent>
                    </Card>
                </Link>
            ))}

        </Grid>
    );
};

export default SearchPage;