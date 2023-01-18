// Import react
import { useEffect } from "react";

// Import custom hook favourite
import useFirebaseFavourite from "../Context/useFirebaseFavourite";

// Import react-router-dom
import { Link } from "react-router-dom";

// Import MUI
import { Button, Checkbox, Grid } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

// Favorite icon
import Favorite from "@mui/icons-material/Favorite";

// Import interwave
import { Interweave } from "interweave";

const Favourite = () => {
  const [favourites, addToFavourite, removeFromFavourite] =
    useFirebaseFavourite();

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
      <Grid container justifyContent="center" style={{ height: "100vh" }}>
        <Grid
          container
          justifyContent="center"
          style={{ minHeight: "100vh", padding: "2em", width: "100%" }}
        >
          {favourites.map((el: any) => (
            <div
              key={el.id}
              className="card"
              style={{ backgroundColor: "black" }}
            >
              <div className="custom-checkbox">
                <Checkbox
                  checkedIcon={<Favorite />}
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 40 },
                    color: lightGreen[100],
                    "&.Mui-checked": { color: lightGreen[300] },
                  }}
                  style={{
                    backgroundColor: "transparent",
                    position: "relative",
                  }}
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
                  <Link to={"/search/" + el.id.toString()}>
                    <Button
                      variant="contained"
                      style={{
                        borderRadius: 35,
                        backgroundColor: "#634b66",
                        padding: "9px 18px",
                        fontSize: "15px",
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

export default Favourite;