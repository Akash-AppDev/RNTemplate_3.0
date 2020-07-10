import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Dimensions } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import SideMenu from "../View/SideMenu/SideMenu";
import { SIDE_MENU_CONSTANTS as Constants } from "../View/SideMenu/SideMenuConstants";
import Login from "../../AppModules/AuthModule/View/Login";
import React from "react";
import AppDeciderScreen from "../View/AppDeciderScreen";
import RegistrationScreen from "../../AppModules/AuthModule/View/RegistrationScreen";
import mapNavigation from "../../AppModules/MapModule/Navigation/MapNavigation";
import buildingNavigation from "../../AppModules/BuildingModule/Navigation/BuildingNavigation";
import dashboardNavigation from "../../AppModules/DashboardModule/Navigation/DashboardNavigation";
import alertingNavigation from "../../AppModules/AlertingModule/Navigation/AlertingNavigation";
import profileNavigation from "../../AppModules/ProfileModule/Navigation/ProfileNavigation";

const { width } = Dimensions.get("window");

export const DrawerNavigator = createDrawerNavigator(
  {
    Home: mapNavigation,
    Dashboard: dashboardNavigation,
    Building: buildingNavigation,
    Alerting: alertingNavigation,
    Profile: profileNavigation
  },
  {
    initialRouteName: Constants.HOME,
    contentComponent: SideMenu,
    drawerWidth: width / 1.25,
    backBehavior: "none"
  }
);

const AuthStack = createStackNavigator(
  {
    loginScreen: Login,
    registerScreen: RegistrationScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const AppStack = createStackNavigator(
  {
    dashboard: DrawerNavigator
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export const RootStack = createSwitchNavigator(
  {
    authStack: AuthStack,
    appStack: AppStack,
    appDeciderScreen: AppDeciderScreen
  },
  {
    initialRouteName: "appDeciderScreen",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
export default createAppContainer(RootStack);
