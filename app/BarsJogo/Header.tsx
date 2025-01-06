import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/Jogo';
import { Pais, Leader } from '../../data/paises';

interface HeaderProps {
  pais: Pais;
  lider: Leader;
}

const Header: React.FC<HeaderProps> = ({ pais, lider }) => {
  return (
    <View style={styles.Header}>
      <Image source={pais.bandeira} style={styles.leftImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{pais.nome}</Text>
        <Text style={styles.infoText}>População: {pais.populacao}</Text>
        <Text style={styles.infoText}>PIB: {pais.pib} bilhões</Text>
        <Text style={styles.infoText}>Líder: {lider.nome}</Text>
        <Text style={styles.infoText}>Poder: {lider.poder}</Text>
      </View>
      <Image source={lider.foto} style={styles.rightImage} />
    </View>
  );
};

export default Header;
