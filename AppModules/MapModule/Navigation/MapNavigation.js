import { createStackNavigator } from "react-navigation-stack";

import Map from "../View/Map";

const mapNavigation = createStackNavigator(
  {
    Map: Map
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default mapNavigation;
