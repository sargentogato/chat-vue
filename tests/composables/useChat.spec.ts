import { useChat } from '@/composables/useChat';
import { nextTick, vModelCheckbox } from 'vue';
import { describe, test, expect, vi } from 'vitest';
import { mock } from 'node:test';

describe('useChat', () => {
  test('should add message when addMessage is called', async () => {
    //Arrange
    const text = 'Testing useChat';
    const { messages, addMessage } = useChat();
    const numberOfMessages = 1;

    //Act
    await addMessage(text);

    /* Assert */

    //Evaluando que tenga un mensaje
    expect(messages.value.length).toBe(numberOfMessages);
    //Que el mensaje sea el que hemos enviado
    expect(messages.value[0].message).toBe(text);
    //Que el objeto tengo las siguientes propiedades
    expect(messages.value[0]).toEqual({
      id:      expect.any(Number),
      itsMine: true,
      message: text,
    });
  });

  test('should show for a while the word escribiendo, when the menssage end with ?', async () => {
    /* Arrante */
    const text = 'Why?';
    const temporalText = 'escribiendo';
    const { messages, addMessage } = useChat();

    /* Act */
    const addingMessages = addMessage(text);

    /* Assert */
    // Verificar si "escribiendo" está en el array antes del `pop`
    expect(messages.value).toContainEqual(expect.objectContaining({ message: `${temporalText}` }));
    expect(messages.value.some((obj) => obj.message === temporalText)).toBe(true);

    await addingMessages;

    //Verifica que escribiendo ya no está
    expect(messages.value.some((obj) => obj.message === temporalText)).toBe(false);
    expect(messages.value).not.toContainEqual(
      expect.objectContaining({ message: `${temporalText}` }),
    );
  });

  test('it should get an response when message end with?', async () => {
    /* Arrange */
    const text = 'Do you want coffe?';
    const { messages, addMessage } = useChat();

    /* Act */
    await addMessage(text);

    const [myMessage, herMessage] = messages.value;

    /* Assert */

    expect(messages.value.length).toBe(2);
    expect(myMessage).toEqual({ id: expect.any(Number), itsMine: true, message: text });
    expect(herMessage).toEqual({
      id:      expect.any(Number),
      itsMine: false,
      message: expect.any(String),
      image:   expect.any(String),
    });
  });
  test('mock response - fetch API', async () => {
    /* Arrange */
    const mockResponse = {answer: 'yes', image: 'example.jpg'};

    (window as any).fetch = vi.fn(async () => ({
      json: async () => mockResponse
    }))

    const text = "Do you want?";
    const { messages, addMessage } = useChat();


    /* Act */
    await addMessage(text)
    await nextTick()

    /* Assert */
    const [, herMessage ] = messages.value;

    expect(herMessage).toEqual({
      id:      expect.any(Number),
      image:   mockResponse.image,
      itsMine: false,
      message: mockResponse.answer
    })
  })
});
