import { createStackNavigator } from "react-navigation-stack";

import Alerting from "../View/Alerting";

const alertingNavigation = createStackNavigator(
  {
    Alerting: Alerting
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default alertingNavigation;
