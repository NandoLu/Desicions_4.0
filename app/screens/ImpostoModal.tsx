import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/Modals';

type ImpostoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (corporativo: number, propriedade: number) => void;
  poder: number;
};

const ImpostoModal: React.FC<ImpostoModalProps> = ({ visible, onClose, onSave, poder }) => {
  const [corporativo, setCorporativo] = useState(0);
  const [propriedade, setPropriedade] = useState(0);
  const [initialCorporativo, setInitialCorporativo] = useState(0);
  const [initialPropriedade, setInitialPropriedade] = useState(0);
  const [canSave, setCanSave] = useState(false);
  const [custoPoder, setCustoPoder] = useState(0);

  useEffect(() => {
    if (visible) {
      setInitialCorporativo(corporativo);
      setInitialPropriedade(propriedade);
    }
  }, [visible]);

  useEffect(() => {
    const novoCustoPoder = Math.abs(corporativo - initialCorporativo) + Math.abs(propriedade - initialPropriedade);
    setCustoPoder(novoCustoPoder);
    setCanSave(novoCustoPoder <= poder && (corporativo !== initialCorporativo || propriedade !== initialPropriedade));
  }, [corporativo, propriedade, poder, initialCorporativo, initialPropriedade]);

  const handleSave = () => {
    if (canSave) {
      onSave(corporativo, propriedade);
      setInitialCorporativo(corporativo); // Atualiza os valores iniciais
      setInitialPropriedade(propriedade); // Atualiza os valores iniciais
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
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

          <Text style={styles.modalText}>Poder: {poder}</Text>
          <Text style={styles.modalText}>Custo Poder: {custoPoder}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSave}
              disabled={!canSave}
              style={[styles.modalButton, !canSave && styles.disabledButton]}
            >
              <Text style={styles.modalButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImpostoModal;
