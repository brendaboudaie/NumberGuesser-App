import React from 'react';
import {View, Text, StyleSheet, PickerIOSComponent} from 'react-native';

import Colors from '../constants/colors'

const Header = props => {
    return (
        <View style = {styles.header}>
            <Text style = {styles.headerTitle}> {props.title} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100, 
        paddingTop: 35,
        backgroundColor: Colors.myPink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Avenir-Medium'
    }
});

export default Header;