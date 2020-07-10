import { createStackNavigator } from "react-navigation-stack";

import Profile from "../View/Profile";

const profileNavigation = createStackNavigator(
  {
    Profile: Profile
  },
  {
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default profileNavigation;
