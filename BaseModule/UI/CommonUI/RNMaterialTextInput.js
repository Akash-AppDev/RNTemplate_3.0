import React from 'react';
import { StyleSheet, Text } from 'react-native';

import PropTypes from 'prop-types';

import { TextField } from 'react-native-material-textfield';
import { Colors } from '../../Themes';
import { FONT_FAMILY } from '../../Utils/Constants';
import { setTestId } from '../../Utils/AutomationHelper';

const RNMaterialTextInput = (props) => {
    const {
        disabled,
        fontSize,
        labelFontSize,
        label,
        onChangeText,
        value,
        keyboardType,
        maxLength,
        selection,
        required,
        mandatoryColor,
        changeUnderlineColor = false,
        materialRef
    } = props;

    return (
        <TextField
            ref={materialRef}
            selection={selection}
            labelTextStyle={styles.labelTextStyle}
            style={styles.textStyle}
            lineWidth={1}
            activeLineWidth={1}
            labelFontSize={labelFontSize}
            fontSize={fontSize}
            disabled={disabled}
            textColor={Colors.primaryTextColor}
            baseColor={changeUnderlineColor ? Colors.persianRed : Colors.greyHeaderText}
            disabledLineType={'solid'}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType}
            maxLength={maxLength}
            {...setTestId(props.screenName, props.id)}
            {...props}
            label={
                <Text>
                    {label} {required ? <Text style={{ color: mandatoryColor }}>*</Text> : null}
                </Text>
            }
        />
    );
};
RNMaterialTextInput.propTypes = {
    required: PropTypes.bool,
    selection: PropTypes.object,
    disabled: PropTypes.bool,
    fontSize: PropTypes.number,
    labelFontSize: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    keyboardType: PropTypes.string,
    maxLength: PropTypes.number
};
RNMaterialTextInput.defaultProps = {
    fontSize: 16,
    labelFontSize: 12,
    mandatoryColor: Colors.red,
    required: false
};
const styles = StyleSheet.create({
    labelTextStyle: {
        fontFamily: FONT_FAMILY.REGULAR
    },
    textStyle: {
        fontFamily: FONT_FAMILY.REGULAR
    }
});
export default RNMaterialTextInput;
