import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IndecisionView from '@/views/IndecisionView.vue';
import ChatMessages from '@/components/chat/ChatMessages.vue';
import MessageBox from '@/components/chat/MessageBox.vue';
import { nextTick } from 'vue';

const mockChatMessages = {
  template: '<div>Mock ChatMessages</div>',
};

describe('<IndecisionView />', () => {
  const wrapper = mount(IndecisionView);

  test('should renders the ChatMessages and MessagesBox components', () => {
    //Assert
    const chatMessagesComponent = wrapper.findComponent(ChatMessages);
    const messageBoxComponent = wrapper.findComponent(MessageBox);

    //Act

    //Assert
    expect(chatMessagesComponent.exists()).toBe(true);
    expect(messageBoxComponent.exists()).toBe(true);
  });

  test('calls onMessage when sending a messages', async () => {
    //Arrange
    const wrapper = mount(IndecisionView, {
      global: {
        stubs: {
          ChatMessages: mockChatMessages,
          //un template ficticio cuando se llame un componente
        },
      },
    });

    const messageBoxComponent = wrapper.findComponent(MessageBox);
    messageBoxComponent.vm.$emit('sendMessage', 'Emiting Message test');

    //Act
    await nextTick();

    //Assert
    expect(wrapper.html()).toMatchSnapshot();
  });
});
