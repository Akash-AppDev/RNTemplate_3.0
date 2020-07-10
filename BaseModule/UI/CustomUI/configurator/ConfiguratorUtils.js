import AsyncStorage from '@react-native-community/async-storage';

export const getConfigData = async () => {
    try {
        const value = await AsyncStorage.getItem('@t2s_configurator');
        if (value !== null) {
            return value;
        } else {
            return 'Configurator : No data available';
        }
    } catch (e) {
        if (__DEV__) {
            console.log('Configurator Utils: ' + e.message);
        }
        return 'Configurator : Error retrieving data';
    }
};

export const getBaseURL = async () => {
    try {
        let data = await getConfigData();
        let parsedData = await JSON.parse(data)[0];
        let selectedURL = parsedData.defaultValues;

        let obj = parsedData.values;
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (key === selectedURL) {
                    return obj[key];
                }
            }
        }
    } catch (e) {
        if (__DEV__) {
            console.log('Configurator Utils: ' + e.message);
        }
        return 'https://api.touch2success.com';
    }
};
