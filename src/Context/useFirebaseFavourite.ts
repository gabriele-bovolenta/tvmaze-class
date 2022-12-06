import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { UseUserAuth } from "./authContext";

type FavType = {
  id: number;
};

const database = getDatabase();

// custom hook
const useFirebaseFavourite = (): [
  favorites: FavType[],
  addToFavourite: (id: number) => void,
  removeFromFavourite: (id: number) => void
] => {
  const [favourites, setFavourite] = useState<FavType[]>([]);
  const { currentUser } = UseUserAuth();

  // on user change, refresh favourites
  useEffect(() => {
    if (currentUser) {
      const movies = ref(database, "favourite/" + currentUser.uid);
      onValue(movies, (snapshot) => {
        const arrayData = [];
        const data = snapshot.val();
        for (const key in data) {
          arrayData.push(data[key]);
        }
        setFavourite(arrayData);
      });
    }
  }, [currentUser]);

  // ad to favourite action
  const addToFavourite = (id: number) => {
    if (!!currentUser) {
      set(ref(database, "favourite/" + currentUser.uid + "/" + id), {
        id: id,
      });
    }
  };

  // remove from favourite action
  const removeFromFavourite = (id: number) => {
    if (!!currentUser) {
      remove(ref(database, "favourite/" + currentUser.uid + "/" + id));
    }
  };

  return [favourites, addToFavourite, removeFromFavourite];
};

export default useFirebaseFavourite;
