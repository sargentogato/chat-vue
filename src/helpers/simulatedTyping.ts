import type { IChatMessages } from "@/interfaces/chat-message.interfaces";

let dots: string = "";
// export const interval = ( messages: IChatMessages[] ) => {
//   const timer = setInterval( () => {
//     dots = dots.length < 3 ? dots + "." : "";
//
//     const counter: number = messages.length;
//
//     messages[counter - 1].message = "escribiendo" + dots;
//   }, 500 );
//
//   return timer;
// };

/*
  Se puede expresar de ambas maneras. La de abajo parace más limpia, aunque
  la de arriba, es más expresiva creo
*/

export const interval = ( messages: IChatMessages[] ) => {

  return setInterval( () => {
    dots = dots.length < 3 ? dots + "." : "";

    const counter: number = messages.length;
    console.log( "interval working" );

    messages[counter - 1].message = "escribiendo" + dots;
  }, 500 );
};
