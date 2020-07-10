import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DrawerActions } from "react-navigation-drawer";
import SplashScreen from "react-native-splash-screen";
import styles from "./styles/SideMenuStyle";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { SideMenuItem } from "./SideMenuItem";
import { SIDE_MENU_CONSTANTS as Constants } from "./SideMenuConstants";
import SideMenuHeaderView from "./SideMenuHeaderView";
import { refreshSideMenuAction, setSideMenuActiveAction } from "../../Redux/Actions";
import OfflineNotice from "../../../BaseModule/Managers/OfflineNoticeManager/OfflineNoticeManager";
import RNModal from "../../../BaseModule/UI/CommonUI/RNModal";
import { isValidElement } from "../../../BaseModule/Utils/helpers";
import SafeAreaViewUI from "../../../BaseModule/UI/CustomUI/SafeAreaViewUI";
import AuthManager from "../../../BaseModule/Managers/AuthManager/AuthManager";

class SideMenu extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
    this.props.setSideMenuActiveAction(Constants.HOME);
    this.props.refreshSideMenuAction();
  }

  handleModuleNavigation(route) {
    const { navigation } = this.props;
    this.props.setSideMenuActiveAction(route);
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    navigation.dispatch(navigateAction);
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  handleLogoutClick() {
    this.setState({ showLogoutModal: true });
  }

  handleLogoutYesClick() {
    this.setState({ showLogoutModal: false });
    AuthManager.signOut().then(() => {
      this.props.navigation.navigate("authStack");
    });
  }

  renderLogoutModal() {
    return (
      <RNModal
        isVisible={this.state.showLogoutModal}
        requestClose={() => this.setState({ showLogoutModal: false })}
        title={Constants.LOGOUT}
        description={Constants.LOGOUT_MESSAGE}
        positiveButtonText={Constants.YES}
        negativeButtonText={Constants.NO}
        positiveButtonClicked={() => this.handleLogoutYesClick()}
        negativeButtonClicked={() => {
          this.setState({ showLogoutModal: false });
        }}
      />
    );
  }

  render() {
    const { visibleSideMenuItems } = this.props;
    return (
      <SafeAreaViewUI>
        <OfflineNotice isFullScrceenView={false} needToShowMessage={true}/>
        <View style={styles.sideMenuParentContainer}>
          {this.state.showLogoutModal && this.renderLogoutModal()}

          <SideMenuHeaderView
            onPressed={() => {
              this.props.navigation.dispatch(DrawerActions.closeDrawer());
            }}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {isValidElement(visibleSideMenuItems) &&
              visibleSideMenuItems.map((value, index) => {
                return (
                  <SideMenuItem
                    key={index}
                    labelCount={null}
                    screenName={value.key}
                    screenDisplayName={isValidElement(value.name) ? value.name : value.key}
                    selectedItem={this.props.selectedItem}
                    handleNavigateClickProp={(screenName) => this.handleModuleNavigation(screenName)}
                    UnSelectedColor={value.unselected_color}
                    ImageName={value.icon_name}
                  />
                );
              })}
              <TouchableOpacity onPress={() => this.handleLogoutClick()}>
                <View style={styles.sideMenuTextContainer}>
                  <Text style={styles.sideMenuText}>{Constants.LOGOUT}</Text>
                </View>
              </TouchableOpacity>
              {this.renderVersionName()}
            </View>
          </ScrollView>
        </View>
      </SafeAreaViewUI>
    );
  }

  renderVersionName() {
    return (
      <View style={styles.versionContainer}>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedItem: state.appState.activeMenu,
  visibleSideMenuItems: state.appState.visibleSideMenuItems,
  connectionStatus: state.appState.connectionStatus
});

const mapDispatchToProps = {
  refreshSideMenuAction,
  setSideMenuActiveAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
