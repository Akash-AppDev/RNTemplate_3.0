import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles/SideMenuItemStyle';
// Images
import Colors from "../../../BaseModule/Themes/Colors";
import CustomIcon from "../../../BaseModule/UI/CustomUI/CustomIcon";
import {isValidElement} from "../../../BaseModule/Utils/helpers";

export class SideMenuItem extends Component {
    render() {
        const { screenName, selectedItem, screenDisplayName, handleNavigateClickProp, labelCount, UnSelectedColor, ImageName } = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => handleNavigateClickProp(screenName)}>
                <View
                    style={[
                        styles.sideMenuContainer,
                        selectedItem !== screenName ? { backgroundColor: Colors.white } : { backgroundColor: Colors.violet }
                    ]}
                >
                    <View style={styles.sideMenuViewStyle}>
                        {selectedItem !== screenName ? (
                            <CustomIcon name={ImageName} size={40} style={{ color: UnSelectedColor, marginLeft: 5 }} />
                        ) : (
                            <CustomIcon name={ImageName} size={40} style={{ color: Colors.white, marginLeft: 5 }} />
                        )}
                        <Text style={[styles.menuItemTextStyle, selectedItem === screenName ? styles.menuSelectedTextStyle : {}]}>
                            {screenDisplayName}
                        </Text>
                        {isValidElement(labelCount) && <Text style={styles.labelCount}>{labelCount}</Text>}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
