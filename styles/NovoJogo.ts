import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1b',
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A5A5A5',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#514d4b',
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff'
  },
  selectedContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  leaderImage: {
    width: 100,
    height: 150,
  },
  countryImage:{
    width: 150,
    height: 100,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
