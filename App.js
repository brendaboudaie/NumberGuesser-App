import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './Components/Header';
import StartScreen from './Screens/StartScreen';
import GameScreen from './Screens/GameScreen';
import EndGameScreen from './Screens/EndGameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [numberOfRounds, setNumberOfRounds] = useState(0);

  const startNewGameHandler = () => {
    setNumberOfRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setNumberOfRounds(0);
  };

  const endGameHandler = rounds => {
    setNumberOfRounds(rounds);
  }

  let currentScreen = <StartScreen onStartGame={startGameHandler}/>

  if (userNumber && numberOfRounds <= 0) {
    currentScreen = <GameScreen userChoice={userNumber} onGameOver={endGameHandler}/>;
  }
  else if (numberOfRounds > 0){
    currentScreen = <EndGameScreen userNumber={userNumber} onRestart = {startNewGameHandler}/>;
  }

  return (
    <View style = {styles.screen}>
      <Header title = 'Guess A Number' />
      {currentScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
