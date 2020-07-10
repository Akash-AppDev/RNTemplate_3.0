import React from 'react';
import { Platform, StatusBar, Text, View, ViewPropTypes } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import styles from './Style/DialogModalStyle';
import { isEmpty } from '../../Utils/helpers';
import RNButton from './RNButton';
import { isNonEmptyString, isValidElement } from '../../Utils/helpers';

const viewPropTypes = ViewPropTypes || View.propTypes;

const RNModal = (props) => {
    const {
        isVisible,
        requestClose,
        title,
        description,
        negativeButtonClicked,
        positiveButtonClicked,
        positiveButtonText,
        negativeButtonText,
        positiveButtonStyle,
        negativeButtonStyle,
        dialogCancelable,
        titleCenter,
        descriptionTextStyle,
        positiveButtonTextStyle,
        negativeButtonTextStyle,
        titleTextStyle,
        textAllCaps,
        customView
    } = props;

    return (
        <View>
            <Modal
                isVisible={isVisible}
                onBackdropPress={() => (dialogCancelable ? requestClose() : {})}
                onRequestClose={() => requestClose()}
            >
                {Platform.OS === 'android' ? (
                    <View>
                        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
                    </View>
                ) : null}
                <View style={styles.modalContentContainerStyle}>
                    {!isEmpty(title) ? (
                        <Text
                            style={[
                                styles.modalHeaderStyle,
                                titleCenter ? styles.modalHeaderTitleCenter : styles.modalHeaderStyle,
                                titleTextStyle
                            ]}
                        >
                            {title}
                        </Text>
                    ) : null}

                    {isValidElement(customView) ? (
                        customView
                    ) : (
                        <Text style={[styles.modalDescriptionStyle, descriptionTextStyle]}>{description}</Text>
                    )}
                    <View style={styles.modalButtonContainer}>
                        {isNonEmptyString(negativeButtonText) ? (
                            <RNButton
                                buttonTextStyle={[styles.negativeButtonTextStyle, negativeButtonTextStyle]}
                                buttonStyle={[styles.negativeButtonStyle, negativeButtonStyle]}
                                onPress={negativeButtonClicked}
                                screenName={props.screenName}
                                id={props.negativeButtonId}
                            >
                                {textAllCaps ? negativeButtonText.toUpperCase() : negativeButtonText}
                            </RNButton>
                        ) : null}

                        {isNonEmptyString(negativeButtonText) && <View style={styles.buttonSpaceStyle} />}
                        <RNButton
                            buttonTextStyle={[styles.buttonTextStyle, positiveButtonTextStyle]}
                            buttonStyle={[styles.positiveButtonStyle, positiveButtonStyle]}
                            onPress={positiveButtonClicked}
                            screenName={props.screenName}
                            id={props.positiveButtonId}
                        >
                            {textAllCaps ? positiveButtonText.toUpperCase() : positiveButtonText}
                        </RNButton>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
RNModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    negativeButtonText: PropTypes.string,
    positiveButtonText: PropTypes.string.isRequired,
    positiveButtonClicked: PropTypes.func.isRequired,
    negativeButtonClicked: PropTypes.func,
    requestClose: PropTypes.func.isRequired,
    positiveButtonStyle: viewPropTypes.style,
    negativeButtonStyle: viewPropTypes.style,
    positiveButtonTextStyle: Text.propTypes.style,
    negativeButtonTextStyle: Text.propTypes.style,
    descriptionTextStyle: Text.propTypes.style,
    titleTextStyle: Text.propTypes.style,
    dialogCancelable: PropTypes.bool,
    titleCenter: PropTypes.bool,
    textAllCaps: PropTypes.bool,
    customView: PropTypes.element
};
RNModal.defaultProps = {
    dialogCancelable: true,
    titleCenter: false,
    textAllCaps: false
};

export default RNModal;
