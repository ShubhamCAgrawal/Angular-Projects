// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environmentt = {
  production: false,
  apiKey: '64faecc2ebc4b1fcf7c16904ea1417eb',
  images: 'https://image.tmdb.org/t/p/w500',
  baseUrl: 'https://api.themoviedb.org/3'

};
export const environment = {
  firebase: {
    apiKey: 'AIzaSyDOTO8PHTFW96kQ3HZR4UIzipyw8PJVjw4',
    authDomain: 'movie-app-52ad3.firebaseapp.com',
    databaseURL: 'https://movie-app-52ad3-default-rtdb.firebaseio.com',
    projectId: 'movie-app-52ad3',
    storageBucket: 'movie-app-52ad3.appspot.com',
    messagingSenderId: '462326532243',
    appId: '1:462326532243:web:0e8e7d5b0a31df52652566',
    measurementId: 'G-4CFJJWJ1CE'

  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
