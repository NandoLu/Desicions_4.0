import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Menu';
import { Pais, Leader } from '../data/paises';

type RootStackParamList = {
  Menu: undefined;
  NovoJogo: undefined;
  Jogo: { pais: Pais; lider: Leader };
};

type MenuNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

const Menu = () => {
  const navigation = useNavigation<MenuNavigationProp>();
  const [jogoExistente, setJogoExistente] = useState<boolean>(false);

  useEffect(() => {
    const verificarJogoExistente = async () => {
      const jogo = await AsyncStorage.getItem('jogoAtual');
      if (jogo) {
        setJogoExistente(true);
      }
    };

    verificarJogoExistente();
  }, []);

  const continuarJogo = async () => {
    const jogo = await AsyncStorage.getItem('jogoAtual');
    if (jogo) {
      const { pais, lider } = JSON.parse(jogo);
      navigation.navigate('Jogo', { pais, lider });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity
        style={[styles.button, !jogoExistente && styles.disabledButton]}
        disabled={!jogoExistente}
        onPress={continuarJogo}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NovoJogo')}>
        <Text style={styles.buttonText}>Novo Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apoiar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Menu;
