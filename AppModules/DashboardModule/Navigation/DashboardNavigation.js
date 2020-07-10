import { createStackNavigator } from "react-navigation-stack";

import Dashboard from "../View/Dashboard";

const dashboardNavigation = createStackNavigator(
  {
    Dashboard: Dashboard
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default dashboardNavigation;
