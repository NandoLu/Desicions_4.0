import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Cor cinza para indicar que está desativado
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
