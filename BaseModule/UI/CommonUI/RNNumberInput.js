import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import RNMaterialTextInput from './RNMaterialTextInput';

const RNNumberInput = (props) => {
    const [isEditing, setEditing] = useState(false);
    const {
        screenName,
        id,
        disabled,
        fontSize,
        labelFontSize,
        label,
        onChangeText,
        value,
        prefix,
        postfix,
        maxLength,
        modifier,
        onFocus,
        onBlur
    } = props;
    const [flag, setFlag] = useState(false);
    const [original, setOriginal] = useState(value);
    const maxLengthAfterEditing = maxLength ? maxLength + 2 : maxLength;
    useEffect(() => {
        setOriginal(value);
    }, [value]);

    const getFinalText = useCallback(() => {
        const finalText = modifier(original)
            .replace(postfix, '')
            .replace(prefix, '');
        return finalText;
    }, [modifier, original, postfix, prefix]);

    useEffect(() => {
        const finalText = getFinalText();
        if (onChangeText && flag) onChangeText(finalText);
        if (!flag) setFlag(true);
        setOriginal(isEditing || finalText === '' ? finalText : prefix + finalText + postfix);
    }, [flag, getFinalText, isEditing, onChangeText, postfix, prefix]);
    const visibleValue = isEditing || value === '' ? value : prefix + value + postfix;
    return (
        <RNMaterialTextInput
            {...props}
            prefix={null}
            screenName={screenName}
            id={id}
            keyboardType={'numeric'}
            labelFontSize={labelFontSize}
            onFocus={() => {
                setEditing(true);
                onFocus(getFinalText());
            }}
            onBlur={() => {
                setEditing(false);
                onBlur(getFinalText());
            }}
            fontSize={fontSize}
            disabled={disabled}
            label={label}
            maxLength={isEditing ? maxLength : maxLengthAfterEditing}
            onChangeText={(text) => {
                setOriginal(text);
            }}
            value={visibleValue}
        />
    );
};
RNNumberInput.propTypes = {
    modifier: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
    fontSize: PropTypes.number,
    maxLength: PropTypes.number,
    labelFontSize: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.string,
    prefix: PropTypes.string,
    postfix: PropTypes.string,
    onChangeText: PropTypes.func
};
RNNumberInput.defaultProps = {
    fontSize: 16,
    labelFontSize: 12,
    prefix: '',
    postfix: '',
    modifier: (text) => text,
    onFocus: (text) => text,
    onBlur: (text) => text
};
export default RNNumberInput;
