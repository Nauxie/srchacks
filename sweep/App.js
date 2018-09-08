import React from 'react';
import { StyleSheet, View } from 'react-native';
import Map from './Views/Map';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    );
  }
}
