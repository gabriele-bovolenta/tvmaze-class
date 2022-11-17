import React, { useEffect, useState } from 'react'
import { collection, /* deleteDoc */ /* doc */ getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase-config";
import { /* Button */ Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const Favourite = () => {

    const [favouriteMovie, setFavouriteMovie] = useState<any>([]);
    const postCollectionRef = collection(db, "favourite");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            console.log(data);
            
            setFavouriteMovie(data.docs.map((doc) => (
                { ...doc.data(), id: doc.id }
            )));
        }

        getPosts();  
        favouriteMovie.map((el: any):void => {
            console.log(el.id)
            return el.id
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* const deletePost = async (id: any) => {
        const postDoc = doc(db, "favourite", id );
        await deleteDoc(postDoc);
    } */

    return (
        <Grid item style={{ padding: "2em" }}>
                        {favouriteMovie.map((el: any, i: number) => (
                            <Card sx={{ display: "flex", alignItems: "center", margin: "2em" }} key={i}>
                                <CardMedia component="img" height={140} image={el.image} alt={el.title} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {el.id}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
    )
}

export default Favourite;