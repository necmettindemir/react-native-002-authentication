//import libs
import React from 'react';
import { View, Text } from 'react-native';

//make component

const Header = (props) => {     

    const { viewStyle, textStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>
                { props.headerText }
            </Text>
        </View>
    );
};


const styles = {
    viewStyle: {
        backgroundColor: '#b8b8b8',    
        justifyContent: 'center', //'flex-start' //'flex-end'
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.9,
        position: 'relative'
    },
    textStyle: {
        fontSize: 30,
        color: 'white'      
    }
};


//make component available
//export default Header;

export { Header };
