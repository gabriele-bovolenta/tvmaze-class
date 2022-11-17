import { Button, Card, CardContent, CardMedia, FormControl, Grid, InputBase, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getShowsBySearch, ShowType } from "../Api";
import { Link, useSearchParams } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";

const SearchPage = ({ isAuth }: any) => {
    const [currentSearch, setCurrentSearch] = useSearchParams();
    const [shows, setShows] = useState<ShowType[]>([]);
    const [favouriteMovie, setFavouriteMovie] = useState<any>([]);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const addMovieToPref = collection(db, 'favourite')
    const postCollectionRef = collection(db, "favourite");

    const deleteMovie = async (id: any) => {
        const postDoc = doc(db, "favourite", id );
        await deleteDoc(postDoc);
    }

    /* const getPosts = async () => {
        const data = await getDocs(addMovieToPref);
        console.log(data);

        setPostList(data.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
        )));
    } */

    const updatePreferiti = async (id: any, e: any) => {
        if (e.target.checked) {
            await addDoc(
                addMovieToPref, 
                {
                    id: id,
                }
            )

            console.log('aggiunto'); 
        }
        else if (!e.target.checked) {  
            const getPosts = async () => {
                const data = await getDocs(postCollectionRef);
                console.log(data);
                
                setFavouriteMovie(data.docs.map((doc) => (
                    { ...doc.data(), id: doc.id }
                )));
            }
    
            getPosts();
            deleteMovie(favouriteMovie[id]);
        }
    }

    const handleOnSearchChange = useCallback(
        (query: string) => {
            setCurrentSearch({ search: query });
        }, [setCurrentSearch]);

    const isSearchButtonDisabled = () => currentSearch.get("search")?.trim().length === 0;

    const handleOnSearch = useCallback(() => {
        getShowsBySearch(currentSearch?.get("search") || "").then((res) => setShows(res));
    }, [currentSearch]);

    useEffect(() => {
        if (isAuth) {
            const currentSearchStr = currentSearch?.get("search"?.trim());
            if (!!currentSearchStr && currentSearchStr.length > 0) {
                handleOnSearch();
            }
        } else {
            window.location.pathname = '/login'
        }
        // eslint-disable-next-line 
    }, []);

    return (
        <>
            {!!shows ?
                <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                    <Grid item style={{ padding: "2em", width: "80%" }}>
                        <Paper
                            component="form"
                            sx={{ display: "flex", alignItems: "center" }}
                            style={{ padding: "2em" }}
                            autoComplete="off"
                            onSubmit={(e) => {
                                // utilizzato per componente form, utilizzando questo il click che se ricevi un submit ignoralo
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
                                <Button disabled={isSearchButtonDisabled()} onClick={handleOnSearch}>
                                    Search
                                </Button>
                            </FormControl>
                        </Paper>
                    </Grid>

                    <Grid item style={{ padding: "2em" }}>
                        {shows.map((el, i: number) => (
                            <Card sx={{ display: "flex", alignItems: "center", margin: "2em" }} key={i}>
                                <CardMedia component="img" height={140} image={el.image} alt={el.title} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {el.title}
                                    </Typography>
                                </CardContent>
                                <Link to={el.id.toString()}>
                                    <Button variant="contained">Details</Button>
                                </Link>
                                <Checkbox {...label} onChange={(e) => { updatePreferiti(el.id, e) }} />
                            </Card>
                        ))}
                    </Grid>
                </Grid>
                : "loading"}
        </>
    );
};

export default SearchPage;
