import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../../styles/Jogo';
import { Pais, Leader } from '../../data/paises'; // Importando o tipo Leader

interface FooterProps {
  pais: Pais;
  lider: Leader;
  ano: number;
  mes: string;
  saldoEconomia: number;
  popularidade: number;
}

const Footer: React.FC<FooterProps> = ({ pais, lider, ano, mes, saldoEconomia, popularidade }) => {
  return (
    <View style={styles.Footer}>
      <View style={styles.infoBar}>
        <Text style={styles.infoText}>Saldo: {saldoEconomia}</Text>
        <Text style={styles.infoText}>Popularidade: {popularidade}</Text>
        <Text style={styles.infoText}>{ano} / {mes}</Text>
      </View>
      <View style={styles.buttonsFooter}>
        <TouchableOpacity>
          <Image source={require('../../assets/img.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/img.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/img.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
