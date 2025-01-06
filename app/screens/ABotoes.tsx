// screens/ABotoes.tsx
import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from '../../styles/Jogo';

type ABotoesProps = {
  setImpostoModalVisible: (visible: boolean) => void;
  setEducacaoModalVisible: (visible: boolean) => void;
};

const ABotoes: React.FC<ABotoesProps> = ({ setImpostoModalVisible, setEducacaoModalVisible }) => {
  return (
    <View style={styles.BotoesContainer}>
      <TouchableOpacity
        style={styles.botoes}
        onPress={() => setImpostoModalVisible(true)}
      >
        <Image source={require('../../assets/img.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Impostos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botoes}
        onPress={() => setEducacaoModalVisible(true)}
      >
        <Image source={require('../../assets/img.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Educação</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botoes}>
        <Image source={require('../../assets/img.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Economia</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ABotoes;
