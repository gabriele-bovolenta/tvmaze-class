// Import react
import { useEffect, useState } from "react";

// Import react router dom
import { Link, useParams } from "react-router-dom";

// Import api call
import { getShowsById, ShowDetailType } from "../../Api";

// Import MUI
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Import interwave
import { Interweave } from "interweave";

// Import style
import "./Detail.scss";

const DetailPage = () => {
  const { showId } = useParams();

  // State
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
        <div className="card-detail">
          <Card>
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
          </Card>
        </div>
      ) : (
        "Loading.."
      )}

      <div className="back-button">
        <Link to={"/search/"}>
          <Button 
          variant="contained"
          style={{
            backgroundColor: "#181d31"
          }}
          >
            Back
          </Button>
        </Link>
      </div>
    </>
  );
};

export default DetailPage;
