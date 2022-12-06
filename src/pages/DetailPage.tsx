import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowsById, ShowDetailType } from "../Api";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Interweave } from "interweave";

const DetailPage = () => {
  const { showId } = useParams();
  const [showDetail, setShowDetail] = useState<ShowDetailType | null>(null);

  useEffect(() => {
    if (!!showId) {
      // ! rinnega e transforma in booleano, !! doppia negazione
      try {
        const showIdNum = parseInt(showId);
        getShowsById(showIdNum).then((show) => {
          setShowDetail(show);
        });
      } catch (err) {
        console.error("NaN");
      }
    }
  }, [showId]); // con array vuoto, solo mount | se si specifica dei parametri viene eseguito al mount e al update

  return (
    <>
      {!!showDetail ? (
        <Card
          sx={{
            maxWidth: 345,
            justifyContent: "center",
            alignItem: "center",
            margin: "2em",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={showDetail?.image}
            alt={showDetail?.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {showDetail?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Interweave content={showDetail?.summary} />
            </Typography>
            <Typography>Genres: {showDetail?.genres}</Typography>
            <Typography>Rating: {showDetail?.avgRating}</Typography>
            <Typography>
              Start date: {showDetail?.startDate} End:{" "}
              {!showDetail?.endDate ? showDetail?.endDate : "Not finished"}
            </Typography>
          </CardContent>
          <CardActions>
            Button doesn't work
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ) : (
        "Loading.."
      )}

      <Button variant="contained" href="/">
        Back
      </Button>
    </>
  );
};

export default DetailPage;
