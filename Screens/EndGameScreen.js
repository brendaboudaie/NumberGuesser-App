import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import Colors  from '../constants/colors';

const EndGameScreen = props => {
    return (
      <View style={styles.screen}>
        <Text style = {{fontSize:30}}>Got it!</Text>
        <Text style = {{fontSize:30}}>Your number was:</Text>
        <Text style = {{color: Colors.myPink, fontSize:45}}>{props.userNumber}</Text>
        <Button color={Colors.myPurple} title = "NEW GAME" onPress = {props.onRestart}/>
        <Image style = {styles.picture} source = {require('../assets/jumpStreet.jpg')} />
      </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        top: 40,
        alignItems: 'center',
    },
    picture: {
        top: 10,
        width: '85%',
        borderRadius: 10,
    }
});

export default EndGameScreen;