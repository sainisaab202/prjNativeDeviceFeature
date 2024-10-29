import * as SQLite from "expo-sqlite";

let database;

export async function init(){
    //will open existing or create a new one
    database = await SQLite.openDatabaseAsync("places.db");
    return database.execAsync(`CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)`);
    // const promise = new Promise((resolve, reject)=>{
    //     database.withTransactionAsync((tx)=> {
    //         database.execAsync(`CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)`,
    //             [],
    //             ()=>{
    //                 resolve();
    //             },
    //             (_, error)=>{
    //                 console.log(error);
    //                 reject(error);
    //             }
    //         )
    //     })
    // }); 

    // return promise;
}

export function insertPlace(place){
    // result = await database.runAsync(`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    //     [place.title, place.imageUri, place.address, place.location.lat, place.location.lng]);
    const promise = new Promise(async (resolve, reject)=>{
            result = await database.runAsync(`INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
            [place.title, place.imageUri, place.address, place.location.lat, place.location.lng])
            console.log(result);

            if(result.changes === 1){
                resolve();
            }else{
                reject("Can not save current place in the DB.")
            }
    //         (_, result)=>{
    //             console.log(result);
    //             resolve(result);
    //         },
    //         (_, error)=>{
    //             reject(error);
    //             console.log(error)
    //         }
    });

    return promise;
}

export function fetchPlaces(){
    // console.log(database);
    return database.getAllAsync('SELECT * FROM places');
    // const promise = new Promise((resolve, reject)=>{
    //     const allRows = database.getAllAsync('SELECT * FROM test')

    // });

    // return promise;
}

export function fetechPlaceDetails(id){
    return database.getFirstAsync('SELECT * FROM places WHERE id = ?', [id]);
}