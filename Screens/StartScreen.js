import React, { useState } from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';

import Card from '../Components/Card'
import Colors from '../constants/colors'
import Input from '../Components/Input'

const StartScreen = props => {
  const [enteredValue, setEnteredValue] = useState(''); // user input number
  const [confirmed, setConfirmed] = useState(false); // track if number confirmed by user
  const [selectedNumber, setSelectedNumber] = useState();

  const inputHandler = userInput => {
    // don't allow non-numbers
    setEnteredValue(userInput.replace(/[^0-9 ^0-9]/, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false); // not confirmed
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue); // convert string to int
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert('Please enter a valid number');
      return;
    }

    setConfirmed(true); //confirmed 
    setSelectedNumber(chosenNumber); // store number for the actual game
    setEnteredValue(''); // reset entered value
  };

  let confirmedOutput; // to print on screen

  if (confirmed) {
    confirmedOutput = (
      <View style = {{marginTop:80}}>
        <View style={styles.selectedNumberContainer}>
          <Text style = {{fontSize:45}}>Your number:</Text>
          <View style={styles.selectedNumberText}>
            <Text
              style={{
                fontSize: 60,
                textAlign: "center",
                color: Colors.myPurple
              }}
            >
              {selectedNumber}
            </Text>
          </View>
        </View>
        <Button
          title="START GAME"
          color={Colors.myPink}
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </View>
    );
  }

    return (
      <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
          <Card style={styles.inputContainer}>
            <Text>Enter your number</Text>
            <Input
              style={styles.input}
              placeholder="99"
              placeholderTextColor='#f2f2f2'
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={inputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Reset" color={Colors.myGrey} onPress = {resetInputHandler}/>
              </View>
              <View style={styles.button}>
                <Button title="Confirm" color={Colors.myPink} onPress = {confirmInputHandler}/>
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    input: {
        width: 50,
        textAlign: 'center',
        fontSize: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    button: {
        width: 120
    },
    selectedNumberContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedNumberText: {
      width: '90%',
      padding: 10,
      borderWidth: 2, 
      borderColor: Colors.myPurple,
      borderRadius: 10,
      marginVertical: 10,
    }
});

export default StartScreen;