import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import styles from './Style/HeaderStyle';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SCREEN_NAME, VIEW_ID } from './HeaderConstants';
import RNText from './RNText';
import CustomIcon from '../CustomUI/CustomIcon';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchModal: false,
            showChatModal: false,
            showNotificationModal: false,
            showInfoModal: false,
            chat_notification_count: 0,
            showMenuSearchInput: false,
            showAccountSuspendedRestrictedModal: false
        };
    }

    render() {
        const { headerText, navigation, isWithoutMarginBottomStyle } = this.props;
        return (
            <View>
                <View style={[styles.viewStyle, isWithoutMarginBottomStyle ? styles.withoutMarginBottomStyle : styles.marginBottomStyle]}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            navigation.openDrawer();
                            this.setState({ showMenuSearchInput: false });
                        }}
                    >
                        <View style={styles.iconContainer}>
                            <CustomIcon name="hamburger" size={40} style={styles.navigationIconStyle} />
                        </View>
                    </TouchableWithoutFeedback>
                    <RNText numberOfLines={1} style={styles.headerText} screenName={SCREEN_NAME.HEADER} id={VIEW_ID.TITLE_TEXT}>
                        {headerText}
                    </RNText>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({});

Header.propTypes = {
    headerRight: PropTypes.bool
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
