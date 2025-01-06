import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/NovoJogo';
import paises, { Pais, Leader } from '../data/paises';
import { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NovoJogo'>;

const NovoJogo = () => {
  const navigation = useNavigation<NavigationProp>();
  const [paisSelecionado, setPaisSelecionado] = useState<Pais | null>(null);
  const [liderSelecionado, setLiderSelecionado] = useState<Leader | null>(null);

  const handleComecar = async () => {
    if (paisSelecionado && liderSelecionado) {
      const jogo = { pais: paisSelecionado, lider: liderSelecionado };
      await AsyncStorage.removeItem('jogoAtual'); // Remove o jogo anterior
      await AsyncStorage.setItem('jogoAtual', JSON.stringify(jogo)); // Salva o novo jogo
      navigation.navigate('Jogo', { pais: paisSelecionado, lider: liderSelecionado });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Jogo</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Selecione um país</Text>
        <Picker
          selectedValue={paisSelecionado ? paisSelecionado.nome : ''}
          onValueChange={(itemValue, itemIndex) => {
            const pais = paises[itemIndex];
            setPaisSelecionado(pais);
            setLiderSelecionado(null);
          }}
          style={styles.picker}
        >
          {paises.map((pais, index) => (
            <Picker.Item key={index} label={pais.nome} value={pais.nome} />
          ))}
        </Picker>
        {paisSelecionado && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedTitle}>{paisSelecionado.nome}</Text>
            <Image source={paisSelecionado.bandeira} style={styles.countryImage} />
          </View>
        )}
      </View>
      {paisSelecionado && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Selecione um líder</Text>
          <Picker
            selectedValue={liderSelecionado ? liderSelecionado.nome : ''}
            onValueChange={(itemValue) => {
              const lider = paisSelecionado.lideres.find(l => l.nome === itemValue);
              setLiderSelecionado(lider || null);
            }}
            style={styles.picker}
          >
            {paisSelecionado.lideres.map((lider, index) => (
              <Picker.Item key={index} label={lider.nome} value={lider.nome} />
            ))}
          </Picker>
          {liderSelecionado && (
            <View style={styles.selectedContainer}>
              <Text style={styles.selectedTitle}>{liderSelecionado.nome}</Text>
              <Image source={liderSelecionado.foto} style={styles.leaderImage} />
            </View>
          )}
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleComecar}
          style={[styles.button, (!paisSelecionado || !liderSelecionado) && styles.buttonDisabled]}
          disabled={!paisSelecionado || !liderSelecionado}
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NovoJogo;
