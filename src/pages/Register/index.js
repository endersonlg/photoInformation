import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import {
  Container,
  ContainerCamera,
  TouchButtonRevertCamera,
  TouchButtonTakePicture,
} from './styles';

const register = () => {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();
  }, []);

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
      <ContainerCamera>
        <Camera
          style={{ flex: 1 }}
          type={type}
          radio="16:9"
          useCamera2Ap
          ref={camRef}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
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
          </View>
        </Camera>
      </ContainerCamera>
    </Container>
  );
};

export default register;
