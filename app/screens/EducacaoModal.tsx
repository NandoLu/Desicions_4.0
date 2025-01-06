import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/Modals';

type EducacaoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (pesquisa: number, universidades: number) => void;
  poder: number;
};

const EducacaoModal: React.FC<EducacaoModalProps> = ({ visible, onClose, onSave, poder }) => {
  const [pesquisa, setPesquisa] = useState(0);
  const [universidades, setUniversidades] = useState(0);
  const [initialPesquisa, setInitialPesquisa] = useState(0);
  const [initialUniversidades, setInitialUniversidades] = useState(0);
  const [canSave, setCanSave] = useState(false);
  const [custoPoder, setCustoPoder] = useState(0);

  useEffect(() => {
    if (visible) {
      setInitialPesquisa(pesquisa);
      setInitialUniversidades(universidades);
    }
  }, [visible]);

  useEffect(() => {
    const novoCustoPoder = Math.abs(pesquisa - initialPesquisa) + Math.abs(universidades - initialUniversidades);
    setCustoPoder(novoCustoPoder);
    setCanSave(novoCustoPoder <= poder && (pesquisa !== initialPesquisa || universidades !== initialUniversidades));
  }, [pesquisa, universidades, poder, initialPesquisa, initialUniversidades]);

  const handleSave = () => {
    if (canSave) {
      onSave(pesquisa, universidades);
      setInitialPesquisa(pesquisa); // Atualiza os valores iniciais
      setInitialUniversidades(universidades); // Atualiza os valores iniciais
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
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

export default EducacaoModal;
