import { createStackNavigator } from "react-navigation-stack";

import Building from "../View/Building";

const buildingNavigation = createStackNavigator(
  {
    Building: Building
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default buildingNavigation;
