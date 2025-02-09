import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import JobsScreen from "./screens/JobsScreen";
import BookmarksScreen from "./screens/BookmarksScreen";
import JobDetailsScreen from "./screens/JobDetailsScreen";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ Stack for Jobs Tab (Includes Job Details)
const JobsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="JobsHome" component={JobsScreen} options={{ title: "Jobs" }} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
  </Stack.Navigator>
);

// ✅ Stack for Bookmarks Tab (Includes Job Details)
const BookmarksStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="BookmarksHome" component={BookmarksScreen} options={{ title: "Bookmarks" }} />
    <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === "Jobs" ? "work" : "bookmark";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { paddingBottom: 5, height: 60 },
        })}
      >
        <Tab.Screen name="Jobs" component={JobsStack} options={{ headerShown: false }} />
        <Tab.Screen name="Bookmarks" component={BookmarksStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
