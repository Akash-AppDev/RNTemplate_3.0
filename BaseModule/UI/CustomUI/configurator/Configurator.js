import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Button, Switch, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import RNPopupMenu from '../popupmenu/RNPopupMenu';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { useNavigationParam, useNavigation } from 'react-navigation-hooks';
import { Colors } from '../../../Themes';

const Configurator = () => {
    const { goBack } = useNavigation();

    const name = useNavigationParam('input');

    let inputDataFile = JSON.parse(name);
    const [state, setState] = useState(inputDataFile);
    const myRefs = useRef([]);

    useEffect(() => {
        this.getConfiguratorData();
    }, []);

    this.storeConfiguratorData = async () => {
        try {
            await AsyncStorage.setItem('@t2s_configurator', JSON.stringify(state));
        } catch (e) {
            if (__DEV__) {
                console.log(e);
            }
        }
    };

    this.getConfiguratorData = async () => {
        try {
            const value = await AsyncStorage.getItem('@t2s_configurator');
            if (value !== null) {
                // value previously stored
                setState(JSON.parse(value));
                if (__DEV__) {
                    console.log('From AsyncStorage : ' + value);
                }
            } else {
                this.storeConfiguratorData();
            }
        } catch (e) {
            if (__DEV__) {
                console.log(e);
            }
        }
    };

    this.updatePressed = () => {
        this.storeConfiguratorData();
        goBack();
    };
    this.resetToDefaults = () => {
        setState(inputDataFile);
        setTimeout(() => {
            this.storeConfiguratorData();
        }, 500);
    };
    this.toggleSwitch = (index) => {
        setState(state.map((item) => (item.id === index ? { ...item, values: !item.values } : item)));
    };
    this.onTextChanged = (text, index) => {
        setState(state.map((item) => (item.id === index ? { ...item, values: text } : item)));
    };
    this.handlePopupMenuItemSelected = (data, index) => {
        setState(state.map((item) => (item.id === index ? { ...item, defaultValues: data } : item)));
    };
    this.renderDynamicLayout = () => {
        return state.map((item, index) => {
            if (item.input_type === 'text') {
                return (
                    <View style={styles.rowStyle} key={index.toString()}>
                        <Text style={styles.textStyle}> {item.label}</Text>
                        <Text style={styles.textValueStyle}>{item.values}</Text>
                    </View>
                );
            } else if (item.input_type === 'dropdown') {
                let jsonData = JSON.parse(JSON.stringify(item.values));
                let menuData = [];
                for (var key in jsonData) {
                    menuData.push({ key: key, value: jsonData[key] });
                }
                return (
                    <View style={styles.rowStyle} key={index.toString()}>
                        <Text style={styles.textStyle}> {item.label}</Text>
                        <RNPopupMenu
                            ref={(element) => (myRefs.current[index] = element)}
                            inputData={menuData}
                            onSelected={(data) => this.handlePopupMenuItemSelected(data.key, index)}
                            button={
                                <Text style={styles.textValueStyle} onPress={() => myRefs.current[index].show()}>
                                    {item.defaultValues}
                                </Text>
                            }
                        />
                    </View>
                );
            } else if (item.input_type === 'switch') {
                return (
                    <View key={index.toString()} style={styles.rowStyle}>
                        <Text style={styles.textStyle}> {item.label}</Text>

                        <Switch value={item.values} onValueChange={() => this.toggleSwitch(index)} />
                    </View>
                );
            } else if (item.input_type === 'textInput') {
                return (
                    <View key={index.toString()} style={styles.rowStyle}>
                        <Text style={styles.textStyle}> {item.label}</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            value={item.values}
                            onChangeText={(text) => this.onTextChanged(text, index)}
                        />
                    </View>
                );
            }
        });
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    {this.renderDynamicLayout()}
                    <View style={{ alignItems: 'center' }}>
                        <View
                            style={[
                                {
                                    width: '30%',
                                    margin: 10,
                                    backgroundColor: '#0080FE'
                                }
                            ]}
                        >
                            <Button
                                color={Platform.OS === 'ios' ? '#FFFFFF' : '#0080FE'}
                                title="Update"
                                onPress={() => this.updatePressed()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: 'bold',
        marginRight: 8
    },
    textValueStyle: {
        fontSize: 16,
        color: Colors.black
    },
    textInputStyle: {
        height: 40,
        width: '40%',
        borderColor: 'gray',
        paddingHorizontal: 4,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    },
    rowStyle: {
        flexDirection: 'row',
        margin: 16,
        alignItems: 'center'
    }
});
Configurator.propTypes = {
    navigation: PropTypes.object
};
Configurator.navigationOptions = {
    title: 'Dev Mode',
    headerRight: (
        <TouchableOpacity
            onPress={() => {
                this.resetToDefaults();
            }}
        >
            <Text style={{ marginRight: 8, color: '#0080FE' }}>Reset </Text>
        </TouchableOpacity>
    )
};
export default Configurator;
