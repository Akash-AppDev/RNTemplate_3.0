import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import BaseComponent from "../../BaseModule/BaseComponent";
import styles from "../Styles/AlertingStyle";
import { SIDE_MENU_CONSTANTS } from "../../../GsdApp/View/SideMenu/SideMenuConstants";
import RNText from "../../../BaseModule/UI/CommonUI/RNText";

class Alerting extends Component {
  render() {
    return (
      <BaseComponent {...this.props} headerText={SIDE_MENU_CONSTANTS.ALERTING_DISPLAY_NAME}>
        <View style={styles.centerAlignedTextView}>
          <RNText style={styles.centerAlignedText}> Alerting </RNText>
        </View>
      </BaseComponent>
    );
  }
}

Alerting.navigationOptions = {
  header: null
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Alerting);
