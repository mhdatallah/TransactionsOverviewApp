import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TransactionList} from './src/components/TransactionList';

const ErrorScreen: React.FC<{route: any}> = ({route}) => (
  <View>
    <Text>{`Error Screen with ${route.params.objectId}`}</Text>
  </View>
);

const DetailsScreen1: React.FC<{route: any}> = ({route}) => (
  <View>
    <Text>{`Details Screen 1 with ${route.params.objectId}`}</Text>
  </View>
);

const DetailsScreen2: React.FC<{route: any}> = ({route}) => (
  <View>
    <Text>{`Details Screen 2 with ${route.params.objectId}`}</Text>
  </View>
);

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TransactionList">
        <Stack.Screen name="TransactionList" component={TransactionList} />
        <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
        <Stack.Screen name="DetailsScreen1" component={DetailsScreen1} />
        <Stack.Screen name="DetailsScreen2" component={DetailsScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
