import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css";

export default function App() {
  return (
    <View className="bg-green-300" style={styles.container}>
      <Text className="bg-red-200 text-2xl font-bold">Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f05',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
