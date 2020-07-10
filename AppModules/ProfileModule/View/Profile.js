import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import BaseComponent from "../../BaseModule/BaseComponent";
import styles from "../Styles/ProfileStyle";
import { SIDE_MENU_CONSTANTS } from "../../../GsdApp/View/SideMenu/SideMenuConstants";
import RNText from "../../../BaseModule/UI/CommonUI/RNText";

class Profile extends Component {
  render() {
    return (
      <BaseComponent {...this.props} headerText={SIDE_MENU_CONSTANTS.PROFILE_DISPLAY_NAME}>
        <View style={styles.centerAlignedTextView}>
          <RNText style={styles.centerAlignedText}> Profile </RNText>
        </View>
      </BaseComponent>
    );
  }
}

Profile.navigationOptions = {
  header: null
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
