import React, { Component } from 'react';

import { Image, Text, TouchableOpacity, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import RNPopupMenu from '../CustomUI/popupmenu/RNPopupMenu';
import styles from './Style/RNDropdownStyle';
import { setTestId } from '../../Utils/AutomationHelper';

const viewPropTypes = ViewPropTypes || View.propTypes;
class RNDropdown extends Component {
    constructor(props) {
        super(props);
        this.dropDownRef = React.createRef();
    }

    render() {
        const {
            inputData,
            onSelected,
            underlineStyle,
            iconStyle,
            textStyle,
            icon,
            disabled,
            menuItemTextStyle,
            horizontalLineStyle
        } = this.props;
        return (
            <View>
                <RNPopupMenu
                    menuItemTextStyle={menuItemTextStyle}
                    selector={true}
                    inputData={inputData}
                    ref={this.dropDownRef}
                    onSelected={(data) => onSelected(data)}
                    value={this.props.value}
                    {...setTestId(this.props.screenName, this.props.id)}
                    button={
                        <TouchableOpacity disabled={disabled} onPress={() => this.dropDownRef.current.show()}>
                            <View style={styles.subContainer}>
                                <Text style={disabled ? [styles.disableTextStyle, textStyle] : [styles.textStyle, textStyle]}>
                                    {this.props.value}
                                </Text>
                                {disabled ? null : (
                                    <View>
                                        <Image
                                            source={icon ? icon : require('../../Images/common/black_down_arrow.png')}
                                            style={[styles.arrowStyle, iconStyle]}
                                        />
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    }
                />
                <View style={[horizontalLineStyle ? styles.withOutHorizontalLine : styles.horizontalLine, underlineStyle]} />
            </View>
        );
    }
}
RNDropdown.propTypes = {
    underlineStyle: viewPropTypes.style,
    iconStyle: viewPropTypes.style,
    textStyle: Text.propTypes.style,
    inputData: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    value: PropTypes.string,
    icon: PropTypes.number,
    disabled: PropTypes.bool,
    menuItemTextStyle: Text.propTypes.style,
    screenName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default RNDropdown;
