import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1b',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#514d4b',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 50,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Cor cinza para indicar que está desativado
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttondeleteText:{
    color: 'white',
    fontSize: 10,
  },
  deleteButton:{
    backgroundColor: 'red',
    position: 'absolute',
    width: '30%',
    left: '102%',
  },
  containerMenu:{
    // backgroundColor: 'blue',
    width: '50%',
  }
});
