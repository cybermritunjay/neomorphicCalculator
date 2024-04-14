import React, { useState, useEffect, memo } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Neomorph } from 'react-native-neomorph-shadows'
const SpclButton = ({ digit, color, mainColor, onPressHandler, darkShadowColor, lightShadowColor }) => {
    const [colorStr, setColor] = useState(mainColor);
    const [isPressed, setIsPressed] = useState(false)
    useEffect(() => {
        setColor(mainColor)
    }, [mainColor])
    return (

        <TouchableNativeFeedback
            onPress={() => onPressHandler(digit)}
            onPressIn={() => {
                setIsPressed(true)
                setTimeout(() => {
                    setIsPressed(false)
                }, 100);

            }}
        >
            <View style={{ display: 'flex', flexDirection: 'row', margin: 5, padding: 5, backgroundColor: mainColor, }} >
                <Neomorph
                    inner={isPressed}
                    useArt
                    darkShadowColor={darkShadowColor}
                    lightShadowColor={lightShadowColor}
                    style={{
                        ...styles.neomorphStyle,
                        shadowOffset: { width: 3, height: 3 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        borderRadius: 15,
                        backgroundColor: colorStr,
                    }}
                ><Text style={{ color: color, fontSize: 18 }}>{digit}</Text></Neomorph>
            </View>
        </TouchableNativeFeedback>

    );
};

const styles = StyleSheet.create({
    neomorphStyle: {
        width: 55,
        height: 105,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default memo(SpclButton);
