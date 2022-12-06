import { database } from "./firebase-config";
import { onValue, ref, remove, set } from "firebase/database";

export const readDatabase = (uid: string) => {
  const movies = ref(database, "favourite/" + uid);
  onValue(movies, (snapshot) => {
    const arrayData = [];
    const data = snapshot.val();
    for (const key in data) {
      arrayData.push(data[key]);
    }
    localStorage.setItem("favourite", JSON.stringify(arrayData));
  });
};

export const removeMovieDatabase = (uid: string, id: number) => {
  remove(ref(database, "favourite/" + uid + "/" + id));
};

export const addMovieDatabase = (uid: string, id: number, title: string) => {
  debugger;
  set(ref(database, "favourite/" + uid + "/" + id), {
    id: id,
    name: title,
    checked: true,
  });
};

export const handleChecked = (
  idMovie: number,
  data: { id: number }[]
): boolean => {
  if (data) {
    debugger;
    return !!data.find((d) => d.id === idMovie);
  }

  return false;
};
