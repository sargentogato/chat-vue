import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MessageBox from "@/components/chat/MessageBox.vue";

describe( "MessagesBox Component", () => {
  test( "renders input and button elements correctly", () => {
    //Arrange - no hay propos, así que se queda así
    const wrapper = mount( MessageBox );


    expect( wrapper.html() ).toMatchSnapshot();
    expect( wrapper.find( "[data-test-input-messageBox]" ).exists() ).toBe( true );
    expect( wrapper.find( "input[type='text']" ).exists() ).toBe( true );
    expect( wrapper.find( "button" ).exists() ).toBe( true );
    expect( wrapper.find( "button svg" ).exists() ).toBe( true );
  } );

  test( "emits addMessage event when button is clicked with message value", async () => {
    //Arrange
    const message = "Hola Mundo";
    const wrapper = mount( MessageBox );

    //Action
    await wrapper.find( 'input[type="text"]' ).setValue( message );
    /* Establecemos un mensaje en el input */

    await wrapper.find( 'button' ).trigger( 'click' );


    expect( wrapper.emitted( 'sendMessage' )?.[0] ).toEqual( [message] );
  }
  );
} );
