export const sleep = ( seconds: number = 1 ) => {
  return new Promise( resolve => {
    setTimeout( resolve, seconds * 1000 );
  } );

};

/*
  también se puede expresar así
  setTimeout( () => {
      resolve( true );
  }, seconds * 1000 );
*/

/*
  Usamos una promesa con setTimeout para que sea compatible con async/await. Esto permite pausar la ejecución de forma secuencial
  en funciones asíncronas, lo que hará que haya una espera real y el código se ejecute de
*/
