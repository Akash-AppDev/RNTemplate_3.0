import { Constants, FONT_FAMILY, NETWORK_CONSTANTS } from '../Utils/Constants';
import { showMessage } from 'react-native-flash-message';
import { Colors } from '../Themes';
import { StyleSheet } from 'react-native';
import { isValidElement } from '../Utils/helpers';
//import * as Analytics from '../Utils/Analytics';
const showErrorMessage = (error, flashMessageComponent) => {
    let message = Constants.WENT_WRONG;
    let backgroundColor = Colors.warning;
    if (error.type === NETWORK_CONSTANTS.NETWORK_ERROR) {
        message = Constants.GENERIC_ERROR_MSG;
        backgroundColor = Colors.persianRed;
    } else if (error.type === NETWORK_CONSTANTS.API_ERROR) {
        message = error.message;
        backgroundColor = Colors.warning;
    } else {
        message = error;
        backgroundColor = Colors.warning;
    }
    let flashMessageObject = {
        message: message,
        backgroundColor: backgroundColor,
        color: Colors.white,
        duration: 3000,
        titleStyle: styles.welcomeTextStyle
    };
    if (isValidElement(flashMessageComponent)) {
        flashMessageComponent.showMessage(flashMessageObject);
    } else {
        showMessage(flashMessageObject);
    }
};
const showInfoMessage = (message, flashMessageComponent, toast = false) => {
    let flashMessageObject = {
        message: message,
        backgroundColor: toast ? Colors.black : Colors.green,
        color: Colors.white,
        duration: 3000,
        titleStyle: styles.welcomeTextStyle
    };
    if (isValidElement(flashMessageComponent)) {
        flashMessageComponent.showMessage(flashMessageObject);
    } else {
        showMessage(flashMessageObject);
    }
};
const styles = StyleSheet.create({
    welcomeTextStyle: {
        fontFamily: FONT_FAMILY.MEDIUM,
        fontSize: 16
    }
});
const logAPIErrorEvent = (error) => {
    //Analytics.logEvent(NETWORK_CONSTANTS.EVENT_NAME.API_ERROR_RESPONSE, error);
};
export { showErrorMessage, showInfoMessage, logAPIErrorEvent };

export const parseAPIEndPoint = (url) => {
    return 'EndPoint';
};
