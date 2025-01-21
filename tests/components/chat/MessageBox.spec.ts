import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MessageBox from "@/components/chat/MessageBox.vue";

describe( "MessagesBox Component", () => {
  /* El wrapper se utiliza en todos los test para acceder al componente */
  const wrapper = mount( MessageBox );

  test( "renders input and button elements correctly", () => {
    //Prueba que el código (html, css, js) sea igual
    expect( wrapper.html() ).toMatchSnapshot();
    //existe ese elemento, dos formas de comprobarlo
    expect( wrapper.find( "[data-test-input-messageBox]" ).exists() ).toBe( true );
    expect( wrapper.find( "input[type='text']" ).exists() ).toBe( true );
    //existe un boton
    expect( wrapper.find( "button" ).exists() ).toBe( true );
    //existe un boton con una imagen svg
    expect( wrapper.find( "button svg" ).exists() ).toBe( true );
  } );

  test( "emits addMessage event when button is clicked with message value", async () => {
    //Arrange
    const message = "Hola Mundo";

    //Action
    /* Establecemos un mensaje en el input */
    await wrapper.find( 'input[type="text"]' ).setValue( message );

    await wrapper.find( 'button' ).trigger( 'click' );


    expect( wrapper.emitted( 'sendMessage' )?.[0] ).toEqual( [message] );
    // const vm = wrapper.vm as unknown as { message: string };
    expect( ( wrapper.vm as any ).message ).toBe( "" );
  }
  );

  test( "emits sendMessage event when keypress.enter is triggered with message value", async () => {
    //Arrange
    const message = "Hola Mundo";

    //Act
    const input = wrapper.find( "input" );
    input.setValue( message );
    input.trigger( "keypress.enter" );

    //Assert
    expect( wrapper.emitted( "sendMessage" )?.[0] ).toEqual( [message] );
    expect( ( wrapper.vm as any ).message ).toBe( "" );
  } );

  test( "it should not emit nothing", () => {
    //Arrange
    const wrapper = mount( MessageBox );

    //Act
    const input = wrapper.find( "input" );
    input.trigger( "keypress.enter" );

    //Assert
    expect( wrapper.emitted( "sendMessage" ) ).toBeFalsy();
  } );
} );
