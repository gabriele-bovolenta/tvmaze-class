import { database } from './firebase-config'
import { onValue, ref, remove, set } from 'firebase/database'

export const readDatabase = (uid:string) => {
    const movies = ref(database, 'favourite/' + uid);
    onValue(movies, (snapshot) => {
        const arrayData = [];
        const data = snapshot.val();
        for (const key in data) {
           arrayData.push(data[key])
        }
        localStorage.setItem('favourite', JSON.stringify(arrayData))
    });
}

export const removeMovieDatabase = (uid:string, id: number) => {
    remove(ref(database, 'favourite/' + uid + '/' + id))
}

export const addMovieDatabase = (uid:string,id: number, title: string) => {
    set(ref(database, 'favourite/' + uid + '/' + id), {
        id: id,
        name: title
    });
}

export const handleChecked = (idMovie: number) => {
    const movieFavourites : number[] = JSON.parse(localStorage.getItem('favourite')!);
    var result = false;

    if(movieFavourites) {
        movieFavourites.forEach((el: any) => {
            if(el.id === idMovie) {
                result = true;
                console.log(result);
                
                return result
            }
        });
    }
    
    return result
}