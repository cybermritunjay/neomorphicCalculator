import React, { useState, useEffect, memo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows'
const Button = ({ digit, color, mainColor, onPressHandler, darkShadowColor, lightShadowColor }) => {
    const [colorStr, setColor] = useState(mainColor);
    const [pressedIn, setPressed] = useState(false)
    useEffect(() => {
        setColor(mainColor)
    }, [mainColor])
    return (

        <TouchableWithoutFeedback
            onPress={() => onPressHandler(digit)}
            onPressIn={() => {
                setPressed(true)
                setTimeout(() => {
                    setPressed(false)
                }, 100);

            }}
        >
            <View
                style={{ display: 'flex', flexDirection: 'row', margin: 5, padding: 5, backgroundColor: mainColor, }}>
                <Neomorph
                    inner={pressedIn}
                    useArt
                    darkShadowColor={darkShadowColor}
                    lightShadowColor={lightShadowColor}
                    style={{
                        ...styles.neomorphStyle,
                        shadowOffset: { width: 3, height: 3 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        borderRadius: pressedIn ? 15 : 20,
                        backgroundColor: pressedIn ? '#fb6161' : colorStr,
                    }}
                >
                    {digit == '<=' ? (<Icon name="backspace-outline" size={18} color={color} />) : (<Text style={{ color: color, fontSize: 18 }}>{digit}</Text>
                    )}
                </Neomorph>
            </View>

        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    neomorphStyle: {
        width: 55,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(Button);
