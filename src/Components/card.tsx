import { Button, Checkbox, Grid, Link } from "@mui/material";
import useFirebaseFavourite from "../Context/useFirebaseFavourite";
import { Interweave } from "interweave";

const CardCustom = () => {
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

  return (
    <>
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
            <Checkbox
              style={{ backgroundColor: "white" }}
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
                <Button variant="contained" component={Link} href={"/search/"+el.id.toString()} >Details</Button>
              </figcaption>
            </figure>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default CardCustom;
