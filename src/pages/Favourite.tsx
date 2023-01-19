// Import react
import { useEffect } from "react";

// Import custom hook favourite
import useFirebaseFavourite from "../Context/useFirebaseFavourite";

// Import component
import CustomCard from "../Components/Card/card.component";

const Favourite = () => {
  const [favourites] = useFirebaseFavourite();

  useEffect(() => {
    console.log(favourites);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

  return (
    <>
      <CustomCard array={favourites} />
    </>
  );
};

export default Favourite;
