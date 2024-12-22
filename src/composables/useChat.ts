import { sleep } from "@/helpers/sleep";
import { interval } from "@/helpers/simulatedTyping";
import type { IChatMessages } from "@/interfaces/chat-message.interfaces";
import type { IYesNoResponse } from "@/interfaces/yes-no.response";
import { ref } from "vue";


export const useChat = () => {

  const messages = ref<IChatMessages[]>( [] );

  const getResponse = async (): Promise<IYesNoResponse> => {
    const response = await fetch( 'https://yesno.wtf/api' );
    const data = await response.json();
    /* Tambiérn podría poner
      const data = await (response.json()) as IYesNoResponse
    */

    return data;
  };

  const addMessage = async ( text: string ) => {
    //Validación para que no haga nada si no hay mensajes
    if ( text.length === 0 ) return;

    messages.value.push( {
      id: new Date().getTime(),
      itsMine: true,
      message: text,
    } );

    //Evaluate if the message ends with ?
    if ( !text.endsWith( '?' ) ) return;

    messages.value.push( {
      id: new Date().getTime(),
      itsMine: false,
      message: "escribiendo",
    } );

    /*
      Me guardo en una variable el interval, para luego poder limpiar el setIterval
    */
    const intervalId = interval( messages.value );

    await sleep( 2 );
    clearInterval( intervalId );
    messages.value.pop();

    const { answer, image } = await getResponse();

    messages.value.push( {
      id: new Date().getTime(),
      itsMine: false,
      message: answer,
      image: image
    } );
  };

  return {
    //Properties
    messages,

    //Methods
    addMessage

  };
};
