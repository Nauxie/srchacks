import React from 'react';
// import { StyleSheet, View } from 'react-native';
import { MapView } from 'expo';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default class Map extends React.Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

/*
  Keystore password: 3828eb7f0d3e1fa93af7c1a719159e70
  Key alias:         QGtob29tZWlrL3NXRWVwLXNsdWc=
  Key password:      e6095478947eb19ae54f6a32257dce15
*/
