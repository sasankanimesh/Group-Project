import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat'; 
import { Dialogflow_V2 } from 'react-native-dialogflow';

import { dialogflowConfig } from './env';

const BOT_USER = {
  _id: 2,
  name: 'Mr.MindMate ',
  avatar: 'https://static.vecteezy.com/system/resources/previews/013/478/805/non_2x/smart-robot-doctor-treats-patients-flat-illustration-vector.jpg'
};

class Chatbot extends Component {
  state = {
    messages: [
      {
        _id: 1,
        text: `Hi! I am Mr.WellnessWhisper 🤖`,
        createdAt: new Date(),
        user: BOT_USER
      }
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  handleGoogleResponse(result) {
    if (result && result.queryResult && result.queryResult.fulfillmentMessages) {
      let text = result.queryResult.fulfillmentMessages[0].text.text[0];
      this.sendBotResponse(text);
    } else {
      console.error("Unexpected response format:", result);
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error)
    );
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
  }

  render() {
    return (
      <ImageBackground source={require('../assets/images/1.jpg')} style={styles.backgroundImage}>
        <View style={styles.container}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
            renderSend={(props) => (
              <Send {...props} containerStyle={styles.sendContainer}>
                {/* Your custom send button content */}
              </Send>
            )}
            renderUsernameOnMessage={true}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1, 
    resizeMode: 'cover', 
    justifyContent: 'center', 
    width: '100%', 
    height: '100%', 
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
    color: 'red'
  },
  sendText: {
    color: '#FF5733', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chatbot;
