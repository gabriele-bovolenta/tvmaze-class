import { Button, Card, CardContent, CardMedia, Checkbox, FormControl, Grid, InputBase, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../Api";
import { Link, useSearchParams } from "react-router-dom";
import { database } from '../Firebase/firebase-config'
import { ref, remove, set } from 'firebase/database'

const SearchPage = () => {
    const [currentSearch, setCurrentSearch] = useSearchParams();
    const [shows, setShows] = useState<ShowType[]>([]);
    const [isChecked, setChecked] = useState<any>(sessionStorage.getItem('isChecked') || false);
    const label = {
        inputprops: { 'arial-label': 'checkbox-favourites' }
    }

    const handleOnSearchChange = useCallback(
        (query: string) => {
            setCurrentSearch({ search: query });
        },
        [setCurrentSearch]
    );

    const hadleCheckbox = (e: any, id: any, title: any) => {
        if (e.target.checked) {
            sessionStorage.setItem(`isChecked: ${id}`, 'true')
            setChecked(true)
            set(ref(database, 'movies/' + id), {
                id: id,
                name: title
            });
            console.log(`${title} con id=${id} aggiunto al database`)

        } else {
            sessionStorage.setItem(`isChecked: ${id}`, 'false')
            setChecked(false)
            remove(ref(database, 'movies/' + id))
            console.log(`${title} con id=${id} rimosso dal database`)
        }
    };

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
            {shows.map((el, i) => (
                <Card key={i} sx={{ display: 'flex', alignItems: 'center', margin: '2em' }}>
                        <Checkbox {...label} onChange={(e) => { hadleCheckbox(e, el.id, el.title) }} />
                        <CardMedia component='img' height={140} image={el.image} alt={el.title} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" >{el.title}</Typography>
                        </CardContent>
                        
                        <Link to={el.id.toString()}><Button variant="contained">Details</Button></Link>
                    </Card>
            ))}
        </Grid>
    );
};

export default SearchPage;