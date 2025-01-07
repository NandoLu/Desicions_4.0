// Jogo.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Jogo';
import { RootStackParamList } from '../types/navigation';
import { Leader, Pais } from '../data/paises';
import { useTurno } from './logic/Logica';
import Header from './BarsJogo/Header';
import Footer from './BarsJogo/Footer';
import ABotoes from './screens/ABotoes';
import ImpostoModal from '../app/screens/ImpostoModal';
import EducacaoModal from '../app/screens/EducacaoModal';

type JogoRouteProp = RouteProp<RootStackParamList, 'Jogo'>;

const Jogo = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<JogoRouteProp>();
  const { pais, lider } = route.params as { pais: Pais, lider: Leader };

  const [impostoModalVisible, setImpostoModalVisible] = useState(false);
  const [educacaoModalVisible, setEducacaoModalVisible] = useState(false);
  const [impostos, setImpostos] = useState(pais.impostos);
  const [educacao, setEducacao] = useState(pais.educacao);
  const [poderAtual, setPoderAtual] = useState(lider.poder);
  const [saldoEconomia, setSaldoEconomia] = useState(pais.saldoEconomia);
  const [popularidade, setPopularidade] = useState(lider.popularidade);

  const { ano, mes, receitaTotal, despesaTotal, impactoTotal, avancarTurno, atualizarTotais } = useTurno(
    pais.ano,
    impostos.corporativo * 2 + impostos.propriedade * 5,
    educacao.pesquisa * -2 + educacao.universidades * -5,
    (impostos.corporativo === 0 ? 2 : impostos.corporativo * -0.5) + (impostos.propriedade === 0 ? 5 : impostos.propriedade * -2)
  );

  useEffect(() => {
    const carregarDadosSalvos = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem('jogoAtual');
        if (dadosSalvos) {
          const { impostos: impostosSalvos, educacao: educacaoSalva } = JSON.parse(dadosSalvos);
          if (impostosSalvos && educacaoSalva) {
            setImpostos(impostosSalvos);
            setEducacao(educacaoSalva);
            // Atualiza os valores iniciais com os dados salvos
            atualizarTotais(
              impostosSalvos.corporativo * 2 + impostosSalvos.propriedade * 5,
              0,
              (impostosSalvos.corporativo === 0 ? 2 : impostosSalvos.corporativo * -0.5) + (impostosSalvos.propriedade === 0 ? 5 : impostosSalvos.propriedade * -2),
              'imposto'
            );
            atualizarTotais(
              0,
              educacaoSalva.pesquisa * 2 + educacaoSalva.universidades * 5,
              (educacaoSalva.pesquisa === 0 ? -2 : educacaoSalva.pesquisa * 0.5) + (educacaoSalva.universidades === 0 ? -5 : educacaoSalva.universidades * 2),
              'educacao'
            );
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos: ', error);
      }
    };
    carregarDadosSalvos();
  }, [pais]);

  const salvarDados = async (novosImpostos: { corporativo: number, propriedade: number }, novaEducacao: { pesquisa: number, universidades: number }, novoPoder: number) => {
    try {
      const jogoAtual = { pais, lider: { ...lider, poder: novoPoder }, impostos: novosImpostos, educacao: novaEducacao };
      await AsyncStorage.setItem('jogoAtual', JSON.stringify(jogoAtual));
    } catch (error) {
      console.error('Erro ao salvar dados: ', error);
    }
  };

  const handleSaveImposto = (corporativo: number, propriedade: number, novoPoder: number, receita: number, impacto: number) => {
    const novosImpostos = { corporativo, propriedade };
    setImpostos(novosImpostos);
    setPoderAtual(novoPoder);
    salvarDados(novosImpostos, educacao, novoPoder);
    atualizarTotais(receita, 0, impacto, 'imposto'); // Atualiza a receita e impacto dos impostos
  };

  const handleCloseImpostoModal = () => {
    setImpostoModalVisible(false);
  };

  const handleSaveEducacao = (pesquisa: number, universidades: number, novoPoder: number, despesa: number, impacto: number) => {
    const novaEducacao = { pesquisa, universidades };
    setEducacao(novaEducacao);
    setPoderAtual(novoPoder);
    salvarDados(impostos, novaEducacao, novoPoder);
    atualizarTotais(0, despesa, impacto, 'educacao'); // Atualiza a despesa e impacto da educação
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

  useEffect(() => {
    setSaldoEconomia(prevSaldo => prevSaldo + receitaTotal - despesaTotal);
    setPopularidade(prevPopularidade => prevPopularidade + impactoTotal);
  }, [mes, ano]);

  const handleAvancarTurno = () => {
    avancarTurno();
  };

  if (!pais || !lider || !impostos || !educacao) {
    return (
      <View style={styles.container}>
        <Text>Erro: País, líder, impostos ou educação não foram fornecidos corretamente.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header pais={pais} lider={{ ...lider, poder: poderAtual }} />
      <ABotoes setImpostoModalVisible={setImpostoModalVisible} setEducacaoModalVisible={setEducacaoModalVisible} />
      <TouchableOpacity onPress={handleAvancarTurno} style={styles.button}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
      <Footer pais={pais} lider={lider} ano={ano} mes={mes} saldoEconomia={saldoEconomia} popularidade={popularidade} />
      <ImpostoModal 
        visible={impostoModalVisible}
        onClose={handleCloseImpostoModal}
        onSave={(corporativo, propriedade, novoPoder, receita, impacto) => handleSaveImposto(corporativo, propriedade, novoPoder, receita, impacto)}
        poder={poderAtual}
        valoresIniciais={impostos}
        onAvancarTurno={avancarTurno}
      />
      <EducacaoModal 
        visible={educacaoModalVisible}
        onClose={handleCloseEducacaoModal}
        onSave={(pesquisa, universidades, novoPoder, despesa, impacto) => handleSaveEducacao(pesquisa, universidades, novoPoder, despesa, impacto)}
        poder={poderAtual}
        valoresIniciais={educacao}
        onAvancarTurno={avancarTurno}
      />
    </View>
  );
};

export default Jogo;
