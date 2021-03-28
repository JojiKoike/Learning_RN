import React from 'react';
import { CommonActions } from '@react-navigation/routers';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, NavigationContainer, DrawerActions, TabRouter } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Main = () => {
  const { navigate } = useNavigation();
  const { dispatch } = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Main</Text>
      <TouchableOpacity
        onPress={() => {
          //dispatch(DrawerActions.openDrawer());
          navigate('Sub', {
            title: `${Date.now()}`,
          });
        }}
      >
        <Text>go to sub</Text>
      </TouchableOpacity>
    </View>
  );
};

const Sub = () => {
  return (
    <View style={styles.container}>
      <Text>Sub</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={({ route }) => ({
        title: route.params && route.params.title,
      })}
    >
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen
        name="Sub"
        component={Sub}
        options={({ navigation, route }) => {
          const title = route.params && route.params.title ? route.params.title : '0';
          const seed = parseInt(title, 10) % 3;
          switch (seed) {
            case 0:
              console.log('goback');
              navigation.goBack();
              break;
            case 1:
              console.log('replace');
              navigation.replace('Main');
              break;
            default:
              console.log('reset');
              const action = CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Main',
                  },
                ],
              });
              navigation.dispatch(action);
              break;
          }
          return { title };
        }}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Sub" component={Sub} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Sub" component={Sub} />
    </Drawer.Navigator>
  );
};

const Index = () => {
  return (
    <NavigationContainer onStateChange={newState => console.log(newState)}>
      <StackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
