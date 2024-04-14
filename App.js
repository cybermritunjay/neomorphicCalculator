import React, { useState, useMemo, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Switch,
  StatusBar,
  Vibration,
  TouchableNativeFeedback,
} from 'react-native';
import { evaluate } from 'mathjs'
import Icon from 'react-native-vector-icons/Octicons';
import Vibrate from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from './components/button';
import { Neomorph } from 'react-native-neomorph-shadows'
import SpclButton from './components/spclButton';
import Sound from 'react-native-sound';
const calculate = (str) => {
  try {
    return evaluate(str.replace('x', '*'))
  } catch (error) {
    return 'ERR!!!'
  }
}

const App = () => {
  const [mainColor, setMainColor] = useState('#f3f3f6')
  const [textColor, setTextColor] = useState('#7f8087');
  const [spclTextColor, setSpclTextColor] = useState('#328fe3')
  const [screenBackground, setScreenBackground] = useState('#fff')
  const [lightShadowColor, setLightShadowColor] = useState('#fff')
  const [darkShadowColor, setDarkShadowColor] = useState('#000')
  const [mainString, setMainString] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [vibrationOn, setVibrationOn] = useState(true)
  const [soundOn, setSoundOn] = useState(true)
  const scrollRef = useRef(null)
  const ClickFile = new Sound(require('./technology_cell_phone_touchscreen_tap_hard_002.mp3'), (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  })
  const startVibration = () => {
    Vibration.vibrate(100)
  }
  const startSound = () => {
    ClickFile.play()
  }
  const onPressHandler = (d) => {
    if (vibrationOn === true) {
      startVibration()
    }
    if (soundOn === true) {
      startSound()
    }

    if (d == "=") {
      try {
        setMainString(previousState => calculate(previousState))
      } catch (error) {
        setMainString("ERR!!!")
      }

    } else if (d == '<=') {
      setMainString(prevState => prevState.slice(0, prevState.length - 1))
    } else if (d == 'C') {
      setMainString('')
    } else if (d == '√') {
      setMainString(previousState => previousState + 'sqrt(')
    } else {
      setMainString(previousState => previousState + d)
    }
    scrollRef.current.scrollToEnd({ animated: true })
  }

  const toggleMode = () => {
    setDarkMode(previousState => !previousState)
    if (!darkMode) {
      setMainColor('#10121e')
      setTextColor('#898a90')
      setSpclTextColor('#3e97e9')
      setScreenBackground('#111320')
      setDarkShadowColor('#0e0f23')
      setLightShadowColor("#36374a")
    } else {
      setMainColor('#f3f3f6')
      setTextColor('#7f8087')
      setSpclTextColor('#328fe3')
      setScreenBackground('#fff')
      setLightShadowColor('#fff')
      setDarkShadowColor('#000')
    }
  }
  return (
    <SafeAreaView  style={{backgroundColor: screenBackground}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          backgroundColor: screenBackground,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ display: 'flex', padding: 20, backgroundColor: mainColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Neomorph
            darkShadowColor={darkShadowColor}
            lightShadowColor={lightShadowColor}
            style={{
              height: Dimensions.get('window').height - (40 + StatusBar.currentHeight),
              width: Dimensions.get('window').width - 40,
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 1,
              shadowRadius: 5,
              borderRadius: 10,
              backgroundColor: mainColor,
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 15 }} >
                {soundOn ? (
                  <TouchableNativeFeedback onPress={() => setSoundOn(prevState => !prevState)}>
                    <Vibrate name='bell' color={textColor} style={{ fontSize: 18 }} />
                  </TouchableNativeFeedback>
                ) : (
                    <TouchableNativeFeedback onPress={() => setSoundOn(prevState => !prevState)}>
                      <Vibrate name='bell-off' color={textColor} style={{ fontSize: 18 }} />
                    </TouchableNativeFeedback>
                  )}
                {vibrationOn ? (
                  <TouchableNativeFeedback onPress={() => setVibrationOn(prevState => !prevState)}>
                    <Vibrate name='vibrate' color={textColor} style={{ fontSize: 18 }} />
                  </TouchableNativeFeedback>
                ) : (
                    <TouchableNativeFeedback onPress={() => setVibrationOn(prevState => !prevState)}>
                      <Vibrate name='vibrate-off' color={textColor} style={{ fontSize: 18 }} />
                    </TouchableNativeFeedback>
                  )}
              </View>
              <View style={{ flex: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <Icon name="primitive-dot" style={{ marginLeft: 3 }} size={18} color={textColor} />
                <Icon name="primitive-dot" style={{ marginLeft: 3 }} size={18} color={textColor} />
                <Icon name="primitive-dot" style={{ marginLeft: 3 }} size={18} color={textColor} />
                <Icon name="primitive-dot" style={{ marginLeft: 3 }} size={18} color={textColor} />
                <Icon name="primitive-dot" style={{ marginLeft: 3 }} size={18} color={textColor} />
                <Icon name="primitive-dot" style={{ marginLeft: 3 }} size={18} color={textColor} />
              </View>
              <View style={{ flex: 2 }}>
                <Switch
                  style={{ flex: 1 }}
                  trackColor={{ false: "#767577", true: "#7f8087" }}
                  thumbColor={darkMode ? "#f4f3f4" : "#252525"}
                  value={darkMode} onValueChange={toggleMode} />
              </View>
            </View>
            <View style={{ display: 'flex', margin: 5, padding: 10, backgroundColor: mainColor, }}>
              <Neomorph
                useArt
                inner
                darkShadowColor={darkShadowColor}
                lightShadowColor={lightShadowColor}
                style={{
                  ...styles.neomorphStyle,
                  shadowOffset: { width: 3, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  borderRadius: 10,
                  backgroundColor: screenBackground,

                }}
              ><ScrollView contentInsetAdjustmentBehavior='automatic'
                ref={scrollRef}
                contentContainerStyle={{ flexDirection: 'row-reverse', justifyContent: 'flex-end', alignItems: 'flex-end' }}
              >
                  <Text style={{ color: textColor, fontSize: 35, margin: 2 }}>{mainString}</Text>
                </ScrollView>
              </Neomorph>

            </View>
            {useMemo(() => {
              return (
                <View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button digit={'√'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'^'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'('} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={')'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button digit={'C'} color={spclTextColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'/'} color={spclTextColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'x'} color={spclTextColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'<='} color={spclTextColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button digit={'7'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'8'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'9'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'-'} color={spclTextColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Button digit={'4'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'5'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'6'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    <Button digit={'+'} color={spclTextColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 3 }}>
                      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Button digit={'1'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                        <Button digit={'2'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                        <Button digit={'3'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                      </View>
                      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Button digit={'%'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                        <Button digit={'0'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                        <Button digit={'.'} color={textColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <SpclButton digit={'='} color={spclTextColor} mainColor={mainColor} mainString={mainString} onPressHandler={onPressHandler} darkShadowColor={darkShadowColor} lightShadowColor={lightShadowColor} />
                    </View>
                  </View>
                </View>
              )
            }, [darkMode, vibrationOn])}


          </Neomorph>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({

  neomorphStyle: {
    width: Dimensions.get('window').width - 70,
    height: 110,
    flexDirection: 'column-reverse',
    alignItems: 'flex-end'
  },

});

export default App;
