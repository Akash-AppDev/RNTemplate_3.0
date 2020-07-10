import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import BaseComponent from "../../BaseModule/BaseComponent";
import styles from "../Styles/MapStyle";
import { SIDE_MENU_CONSTANTS } from "../../../GsdApp/View/SideMenu/SideMenuConstants";
import RNText from "../../../BaseModule/UI/CommonUI/RNText";

class Map extends Component {
  render() {
    return (
      <BaseComponent {...this.props} headerText={SIDE_MENU_CONSTANTS.HOME}>
        <View style={styles.centerAlignedTextView}>
          <RNText style={styles.centerAlignedText}> Map </RNText>
        </View>
      </BaseComponent>
    );
  }
}

Map.navigationOptions = {
  header: null
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
