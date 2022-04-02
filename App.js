import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Exam from './src/screens/Exam';
import Statistic from './src/screens/Statistic';
import Theme from './src/Theme';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: styles.headerStyle,
        headerTintColor: Theme.textLight
      }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Exam' component={Exam} />
        <Stack.Screen name='Statistic' component={Statistic} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Theme.primary
  }
});
