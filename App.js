import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Exam from './src/screens/Exam';
import Statistic from './src/screens/Statistic';
import Theme from './src/Theme';
import { Provider } from 'react-redux';
import store from './src/redux/store'
import Explanation from './src/screens/Explanation';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: styles.headerStyle,
          headerTintColor: Theme.textLight,
          headerTitleAlign: 'center'
        }}>
          <Stack.Screen name='Home' component={Home} options={{ title: '首頁' }} />
          <Stack.Screen name='Exam' component={Exam} options={{ title: '測驗' }} />
          <Stack.Screen name='Statistic' component={Statistic} options={{ title: '統計' }} />
          <Stack.Screen name='Explanation' component={Explanation} options={{ title: '說明' }} />
        </Stack.Navigator>
      </NavigationContainer >
    </Provider>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: Theme.primary
  }
});
