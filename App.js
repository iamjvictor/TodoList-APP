import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import List from './src/pages/List';
import Details from './src/pages/Details'


const Stack = createStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName='List' screenOptions={{
        headerStyle: {
        backgroundColor: '#B0C4DE',
        height: 60,
        },
        headerTitleStyle:{
            fontWeight:"bold",
            textTransform:"uppercase"
        }
         }}>

      

      <Stack.Screen 
      name="List"
      component={List}
      options={{
        headerTintColor:'black'
      }}
      />     
  

      <Stack.Screen 
      name="Details"
      component={Details}
      options={{
        headerTintColor:'black'
      }}
      />

      </Stack.Navigator>
   </NavigationContainer>
  );
}


