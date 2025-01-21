import { describe, test, expect } from 'vitest';
import ChatBubble from '@/components/chat/ChatBubble.vue';
import { mount } from '@vue/test-utils';


describe( "ChatBubble", () => {
  test( "renders own message correctly", () => {
    //Arange
    const message = "Hola Mundo";
    const wrapper = mount( ChatBubble, {
      props: {
        message,
        itsMine: true
      }
    } );

    //Assert
    expect( wrapper.find( "[data-test-itsMine]" ).exists() ).toBe( true );
    expect( wrapper.find( "[data-test-itsMine]" ).exists() ).toBeTruthy();
    expect( wrapper.find( "[data-test-itsMine]" ).text() ).toContain( message );
    expect( wrapper.find( "[data-test-itsNotMine]" ).exists() ).toBeFalsy();
  } );

  test( "renders received message correctly", () => {
    //Arrange
    const message = "Hola Mundi";
    const wrapper = mount( ChatBubble, {
      props: {
        message: message,
        itsMine: false
      }
    } );

    expect( wrapper.find( '[data-test-itsNotMine]' ).exists() ).toBe( true );
    expect( wrapper.find( '[data-test-itsMine]' ).exists() ).toBe( false );
    expect( wrapper.find( '[data-test-itsNotMine]' ).text() ).toContain( message );
    //Vamos a probar que la imagen existe
    expect( wrapper.find( 'img' ).exists() ).toBe( false );
  } );

  test( "renders received message correctly with an image", () => {
    //Arrange
    const message = "Hola Mundo";
    const image = "example.jpg";

    const wrapper = mount( ChatBubble, {
      props: {
        message: message,
        itsMine: false,
        image:   image
      }
    } );

    expect( wrapper.find( "[data-test-itsNotMine]" ).exists() ).toBe( true );
    expect( wrapper.find( "[data-test-itsNotMine]" ).exists() ).toBe( true );
    expect( wrapper.find( "img" ).attributes( "src" ) ).toBe( image );

  } );
} )


