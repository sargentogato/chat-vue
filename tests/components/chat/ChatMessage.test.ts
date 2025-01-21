import { describe, test, expect, vi } from "vitest";
import ChatMessages from "@/components/chat/ChatMessages.vue";
import type { IChatMessages } from '@/interfaces/chat-message.interfaces';
import { mount } from '@vue/test-utils';
import { nextTick } from "vue";

const messages: IChatMessages[] = [
  { id: 1, message: "Hola Mundo", itsMine: true },
  { id: 1, message: "Hola Mundo", itsMine: false, image: 'http://hola-mundo.jpg' },
  { id: 1, message: "Hola Mundo", itsMine: true },
];

describe( "<ChatMessages />", () => {
  const wrapper = mount( ChatMessages, {
    props: {
      messages
    }
  } );

  test( "should renders chat message correctly", () => {
    //Arange
    //Act
    const chatBubble = wrapper.findAllComponents( { name: 'ChatBubble' } );

    //Assert
    expect( chatBubble.length ).toBe( messages.length );
  } );

  test( "should scroll to the bottom after messages updated", async () => {
    //Arrange
    const scrollToMock = vi.fn();
    const chatRef = wrapper.vm.$refs.chatRef as HTMLDivElement;

    //Mock: remplazo de alguna función que existe
    //Spy: pendientes de lo que suceda

    //Act
    chatRef.scrollTo = scrollToMock;

    await wrapper.setProps( {
      messages: [...messages, { id: 4, message: "hey", itsMine: true }]
    } );

    await nextTick();
    //Assert
    expect( scrollToMock ).toHaveBeenCalled();
    expect( scrollToMock ).toHaveBeenCalledWith( { behavior: 'smooth', top: expect.any( Number ) } );
  } );
} );
