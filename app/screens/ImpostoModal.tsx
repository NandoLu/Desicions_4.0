import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/Modals';

type ImpostoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (corporativo: number, propriedade: number) => void;
};

const ImpostoModal: React.FC<ImpostoModalProps> = ({ visible, onClose, onSave }) => {
  const [corporativo, setCorporativo] = useState(0);
  const [propriedade, setPropriedade] = useState(0);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Configurações de Impostos</Text>
          
          <Text style={styles.modalText}>Imposto Corporativo: {corporativo}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={corporativo}
            onValueChange={setCorporativo}
          />

          <Text style={styles.modalText}>Imposto sobre Propriedade: {propriedade}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={propriedade}
            onValueChange={setPropriedade}
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

export default ImpostoModal;
