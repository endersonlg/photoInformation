import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
`;

export const ContainerCamera = styled.View`
  width: 100%;
  height: 50%;
`;

export const TouchButtonRevertCamera = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
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
