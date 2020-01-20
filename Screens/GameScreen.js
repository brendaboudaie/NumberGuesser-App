import React, { useState, useRef, useEffect } from 'react';
import {View, StyleSheet, Text, Button, Alert} from 'react-native';

import Card from '../Components/Card';
import Colors from '../constants/colors';

const randomNumberGenerator = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;

    if (randomNumber === exclude){
        return randomNumberGenerator(min, max, exclude);
    }
    else {
        return randomNumber;
    }
};

const GameScreen = props => {
    const [computerGuess, setComputerGuess] = useState(randomNumberGenerator(1, 100, props.userChoice));
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    const forgotNumberHandler = () => {
        Alert.alert(''+ userChoice);    
    }

    useEffect(() => {
        if (computerGuess === userChoice){
            props.onGameOver(rounds);
        }
    }), [computerGuess, userChoice, onGameOver];


    const nextGuess = direction => {
        if ((direction === 'lower' && computerGuess < props.userChoice) ||
            (direction === 'greater' && computerGuess > props.userChoice)){
            Alert.alert("Uh oh! Make sure your hints are accurate");
            return;
        }

    if (direction === 'lower'){
        currentHigh.current = computerGuess; 
    } 
    else {
        currentLow.current = computerGuess;
    }

    const nextNum = randomNumberGenerator(currentLow.current, currentHigh.current, computerGuess);
    setComputerGuess(nextNum);
    setRounds(currentRound => currentRound + 1);
    }

    return (
      <View style={styles.screen}>
        <Text style={{ textAlign: "center", fontSize: 35 }}>
          Computer's Guess
        </Text>
        <Text style={styles.guess}>{computerGuess}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around",}}>
          <Button
            title="LOWER"
            color={Colors.myGrey}
            onPress={nextGuess.bind(this, "lower")}
          />
          <Button
            title="GREATER"
            color={Colors.myPink}
            onPress={nextGuess.bind(this, "greater")}
          />
        </View>
        <View style = {styles.forgotButton}>
            <Button color= 'grey' title="Forgot my number" onPress = {forgotNumberHandler}/>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    // padding: 40,
    alignItems: 'center',
    marginTop: 60,
  },
  guess: {
    textAlign: "center",
    fontSize: 60,
    marginVertical: 10,
    color: Colors.myPurple,
    width: "60%",
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.myPurple,
    borderRadius: 10,
    marginVertical: 10,
  },
  forgotButton: {
      bottom: 0,
  }
});

export default GameScreen;