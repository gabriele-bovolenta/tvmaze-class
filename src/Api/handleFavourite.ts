import { database } from '../Firebase/firebase-config'
import { ref, remove, set } from 'firebase/database'

export const removeMovieDatabase = (id: number) => {
    remove(ref(database, 'favourite/' + id))
}

export const addMovieDatabase = (id: number, title: string) => {
    set(ref(database, 'favourite/' + id), {
        id: id,
        name: title
    });
}

export const handleChecked = (id: number) => {
    const movieFavourites : number[] = JSON.parse(localStorage.getItem('favouriteMovies')!);
    var result = false;

    if(movieFavourites) {
        movieFavourites.forEach((el: number) => {
            if(el === id) {
                result = true;
                return false
            }   
        });
    } 

    return result
}

export const saveToLocalStorage = (items: any) => {
    localStorage.setItem('favouriteMovies', JSON.stringify(items));
};