import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import api from '../../services/api';

import {
  Container,
  ContentCamera,
  TouchButtonRevertCamera,
  TouchButtonTakePicture,
  Image,
  Content,
  IconWeather,
  TextTemperature,
  TextAddress,
  TextInput,
} from './styles';

const register = () => {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });
  const [address, setAddress] = useState({
    street: null,
    number: null,
    name: null,
    city: null,
    region: null,
  });
  const [weather, setWeather] = useState([
    {
      icon: null,
    },
  ]);
  const [informationsWeather, setInformationsWeather] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Location.enableNetworkProviderAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      setHasPermission(status === 'granted');
    })();

    (async () => {
      console.log('aqui');
      if (hasPermission === true) {
        const responseLocation = await Location.getCurrentPositionAsync();
        setLocation(responseLocation);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const responseAddress = await Location.reverseGeocodeAsync(
        location.coords
      );
      setAddress(responseAddress[0]);
      console.log(responseAddress[0]);
    })();

    (async () => {
      const responseWeather = await api.get('weather', {
        params: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          appid: process.env.REACT_APP_SECRET_API_GOOGLE,
        },
      });
      setWeather(responseWeather.data.weather);
      setInformationsWeather(responseWeather.data.main);
    })();
  }, [location]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permissões negadas!</Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
    }
  }

  async function savePicture() {
    try {
      const asset = await MediaLibrary.createAssetAsync(capturedPhoto);
      console.log(asset);
      alert('Salvo com sucesso!');
    } catch (error) {
      console.log('err', error);
    }
  }

  return (
    <Container>
      {!open ? (
        <Camera
          style={{ height: '50%' }}
          type={type}
          radio="16:9"
          useCamera2Ap
          ref={camRef}
        >
          <ContentCamera>
            <TouchButtonRevertCamera
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name="md-reverse-camera" size={23} color="#FFF" />
            </TouchButtonRevertCamera>

            <TouchButtonTakePicture onPress={takePicture}>
              <FontAwesome name="camera" size={30} color="#FFF" />
            </TouchButtonTakePicture>
          </ContentCamera>
        </Camera>
      ) : (
        <Image
          style={{ width: '100%', backgroundColor: '#555' }}
          source={{ uri: capturedPhoto }}
        />
      )}
      <Content>
        <MapView
          style={{ width: '100%', height: '30%' }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
          zoomEnabled
          minZoomLevel={13}
        >
          <Marker
            coordinate={location.coords}
            title="teste"
            // description={marker.description}
          />
        </MapView>
        {/* <TextAddress>{`Endereço: ${
          address.street !== null ? `${address.street} - ` : ''
        }${address.name !== null ? `${address.name}, ` : ''}${
          address.city !== null ? `${address.city} - ` : ''
        }${address.region !== null ? `${address.region}` : ''}`}</TextAddress> */}
        <IconWeather
          source={{
            uri: `http://openweathermap.org/img/wn/${weather[0].icon}.png`,
          }}
        />

        <TextTemperature style={{ fontSize: 30, fontWeight: 'bold' }}>
          {`${(informationsWeather.feels_like - 273.15).toFixed(2)}ºC`}
        </TextTemperature>

        <TextInput
          // style={{ color:  }}
          // value={this.state.value}
          // onChangeText={(text) => this.setState({ value: text })}
          multiline
          underlineColorAndroid="transparent"
        />
      </Content>
    </Container>
  );
};

export default register;
