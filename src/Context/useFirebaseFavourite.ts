import { getDatabase, onValue, ref, remove, set } from "firebase/database";
import { useEffect, useState } from "react";
import { UseUserAuth } from "./authContext";
import { ShowType } from "../Api/index";

const database = getDatabase();

// Custom hook
const useFirebaseFavourite = (): [
  favorites: ShowType[],
  addToFavourite: (id: number, title: string, image?: string, description?: string) => void,
  removeFromFavourite: (id: number) => void
] => {
  const [favourites, setFavourite] = useState<ShowType[]>([]);
  const { currentUser } = UseUserAuth();

  // On user change, refresh favourites
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

  // Add to favourite action
  const addToFavourite = (id: number, title: string, image?: string, description?: string) => {
    if (!!currentUser) {
      set(ref(database, "favourite/" + currentUser.uid + "/" + id), {
        id: id,
        title: title,
        image: image !== undefined ? image : require('../images/background.jpeg'),
        description: description
      });
    }
  };

  // Remove from favourite action
  const removeFromFavourite = (id: number) => {
    if (!!currentUser) {
      remove(ref(database, "favourite/" + currentUser.uid + "/" + id));
    }
  };

  return [favourites, addToFavourite, removeFromFavourite];
};

export default useFirebaseFavourite;
