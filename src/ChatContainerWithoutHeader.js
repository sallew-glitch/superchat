<ChatContainer
  style={{
    height: '500px'
  }}
>
  <MessageList 
//   typingIndicator={<TypingIndicator content="Joe is typing" />}
  >
    {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'last',
        sender: 'Joe',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Joe"
        src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
      />
    </Message>
    <Message
      model={{
        direction: 'outgoing',
        message: 'Hello my friend',
        position: 'last',
        sender: 'Oliver',
        sentTime: '15 mins ago'
      }}
     />
    <Message
      avatarSpacer
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'first',
        sender: 'Joe',
        sentTime: '15 mins ago'
      }}
    />
    <Message
      model={{
        direction: 'incoming',
        message: 'Hello my friend',
        position: 'last',
        sender: 'Joe',
        sentTime: '15 mins ago'
      }}
    >
      <Avatar
        name="Joe"
        src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
      />
    </Message>
  </MessageList>
  <MessageInput placeholder="Type message here" />
</ChatContainer>