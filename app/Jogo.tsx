import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Jogo';
import { RootStackParamList } from '../types/navigation';
import { Leader, Pais } from '../data/paises';
import { useTurno } from './logic/Logica';
import Header from './BarsJogo/Header';
import Footer from './BarsJogo/Footer';

import ImpostoModal from '../app/screens/ImpostoModal';
import EducacaoModal from '../app/screens/EducacaoModal';

type JogoRouteProp = RouteProp<RootStackParamList, 'Jogo'>;

const Jogo = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<JogoRouteProp>();
  const { pais, lider } = route.params as { pais: Pais, lider: Leader };

  const { ano, mes, avancarTurno } = useTurno(pais.ano);

  const [impostoModalVisible, setImpostoModalVisible] = useState(false);
  const [educacaoModalVisible, setEducacaoModalVisible] = useState(false);

  const [impostos, setImpostos] = useState(pais.impostos);
  const [educacao, setEducacao] = useState(pais.educacao);

  useEffect(() => {
    const carregarDadosSalvos = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('jogoAtual');
        if (dadosSalvos) {
          const { impostos: impostosSalvos, educacao: educacaoSalva } = JSON.parse(dadosSalvos);
          setImpostos(impostosSalvos || pais.impostos);
          setEducacao(educacaoSalva || pais.educacao);
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos: ', error);
      }
    };

    carregarDadosSalvos();
  }, [pais]);

  const salvarDados = async (novosImpostos: { corporativo: number, propriedade: number }, novaEducacao: { pesquisa: number, universidades: number }) => {
    try {
      const jogoAtual = {
        pais,
        lider,
        impostos: novosImpostos,
        educacao: novaEducacao,
      };
      await AsyncStorage.setItem('jogoAtual', JSON.stringify(jogoAtual));
    } catch (error) {
      console.error('Erro ao salvar dados: ', error);
    }
  };

  const handleSaveImposto = (corporativo: number, propriedade: number) => {
    const novosImpostos = { corporativo, propriedade };
    setImpostos(novosImpostos);
    salvarDados(novosImpostos, educacao);
    console.log(`Salvando impostos: Corporativo - ${corporativo}, Propriedade - ${propriedade}`);
  };

  const handleCloseImpostoModal = () => {
    setImpostoModalVisible(false);
  };

  const handleSaveEducacao = (pesquisa: number, universidades: number) => {
    const novaEducacao = { pesquisa, universidades };
    setEducacao(novaEducacao);
    salvarDados(impostos, novaEducacao);
    console.log(`Salvando educação: Pesquisa - ${pesquisa}, Universidades - ${universidades}`);
  };

  const handleCloseEducacaoModal = () => {
    setEducacaoModalVisible(false);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Menu');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  if (!pais || !lider || !impostos || !educacao) {
    return (
      <View style={styles.container}>
        <Text>Erro: País, líder, impostos ou educação não foram fornecidos corretamente.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header pais={pais} lider={lider} />

      <View style={styles.BotoesContainer}>
        <TouchableOpacity
          style={styles.botoes}
          onPress={() => setImpostoModalVisible(true)}
        >
          <Image source={require('../assets/img.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Impostos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botoes}
          onPress={() => setEducacaoModalVisible(true)}
        >
          <Image source={require('../assets/img.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Educação</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botoes}>
          <Image source={require('../assets/img.png')} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Economia</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={avancarTurno} style={styles.button}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>

      <Footer pais={pais} lider={lider} ano={ano} mes={mes} />

      <ImpostoModal
        visible={impostoModalVisible}
        onClose={handleCloseImpostoModal}
        onSave={handleSaveImposto}
        poder={lider.poder} // Passando a variável poder
        valoresIniciais={impostos} // Passando os valores iniciais de impostos
      />

      <EducacaoModal
        visible={educacaoModalVisible}
        onClose={handleCloseEducacaoModal}
        onSave={handleSaveEducacao}
        poder={lider.poder} // Passando a variável poder
        valoresIniciais={educacao} // Passando os valores iniciais de educação
      />
    </View>
  );
};

export default Jogo;
