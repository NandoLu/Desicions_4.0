// styles/Jogo.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  Header: {
    paddingLeft: 10,
    paddingRight: 5,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
    justifyContent: 'space-around',
  },
  infoContainer: {
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 9,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 20,
    marginBottom: 10,
    width: '100%',
    backgroundColor: 'gray',
  },
  Footer: {
    position: 'absolute',
    flexDirection: 'column',
    height: 90,
    width: '100%',
    backgroundColor: '#f8f8f8',
    bottom: 0,
  },
  buttonsFooter: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  leftImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  rightImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  buttonImage: {
    height: 60,
    width: 60,
    margin: 0,
  },
  middleButtonContainer: {
    position: 'absolute',
    bottom: '11%',
    width: 150,
    right: 0,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    bottom: 90
  },
  buttonText: {
    color: 'black',
    fontSize: 9,
    textAlign: 'center',
  },
  BotoesContainer:{
    backgroundColor: 'gray',
    padding: 0,
    paddingTop: '15%',
    width: '90%',
    height: '70%',
    alignItems: 'center',
    flexDirection: 'row',       // Adiciona esta linha
    flexWrap: 'wrap',           // Adiciona esta linha
    justifyContent: 'space-around',   // Centraliza as colunas horizontalmente
  },
  botoes:{
    width: 60,    // Altere o tamanho conforme necessário
    height: 60,   // Altere o tamanho conforme necessário
    margin: 0,    // Adiciona um espaço entre os botões
  },
});

export default styles;
