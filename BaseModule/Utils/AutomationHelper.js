import { Platform } from 'react-native';

export const BASE_ID = 'AK_';

export const setTestId = (screenName, id) => {
    try {
        return Platform.OS === 'android'
            ? { accessible: true, accessibilityLabel: BASE_ID + screenName + '_' + id }
            : { testID: BASE_ID + screenName + '_' + id };
    } catch (e) {
        // Adding automation logging failed
    }
};
