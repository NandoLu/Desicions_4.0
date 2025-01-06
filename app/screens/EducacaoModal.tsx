import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/Modals';

type EducacaoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (pesquisa: number, universidades: number) => void;
};

const EducacaoModal: React.FC<EducacaoModalProps> = ({ visible, onClose, onSave }) => {
  const [pesquisa, setPesquisa] = useState(0);
  const [universidades, setUniversidades] = useState(0);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Configurações de Educação</Text>
          
          <Text style={styles.modalText}>Pesquisa: {pesquisa}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={pesquisa}
            onValueChange={setPesquisa}
          />

          <Text style={styles.modalText}>Universidades: {universidades}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={universidades}
            onValueChange={setUniversidades}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled style={[styles.modalButton, styles.disabledButton]}>
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EducacaoModal;
