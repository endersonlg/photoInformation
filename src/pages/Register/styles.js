import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

export const ContentCamera = styled.View`
  height: 100%;
  background: transparent;
  flex-direction: row;
`;

export const TouchButtonRevertCamera = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const TouchButtonTakePicture = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: ${Dimensions.get('window').width / 2 - 25};
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border: solid 2px #fff;
  border-radius: 50px;
`;

export const Image = styled.Image`
  width: '100%';
  height: 50%;
  background: '#CCC';
`;

export const Content = styled.View`
  margin: 10px 10px 0;
`;

export const TextAddress = styled.Text`
  font-size: 16px;
`;

export const TextInput = styled.TextInput`
  text-align-vertical: top;

  border: 1px solid #000;
  border-radius: 4px;
  height: 180px;
  font-size: 18px;
`;

export const IconWeather = styled.Image`
  width: 50px;
  height: 50px;
`;

export const TextTemperature = styled.Text``;
