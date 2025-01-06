import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/Modals';

type ImpostoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (corporativo: number, propriedade: number, novoPoder: number) => void;
  poder: number;
  valoresIniciais: {
    corporativo: number;
    propriedade: number;
  };
  onAvancarTurno: () => void;
};

const ImpostoModal: React.FC<ImpostoModalProps> = ({ visible, onClose, onSave, poder, valoresIniciais, onAvancarTurno }) => {
  const [corporativo, setCorporativo] = useState(valoresIniciais.corporativo);
  const [propriedade, setPropriedade] = useState(valoresIniciais.propriedade);
  const [initialCorporativo, setInitialCorporativo] = useState(valoresIniciais.corporativo);
  const [initialPropriedade, setInitialPropriedade] = useState(valoresIniciais.propriedade);
  const [canSave, setCanSave] = useState(false);
  const [custoPoder, setCustoPoder] = useState(0);
  const [receitaImpacto, setReceitaImpacto] = useState({ receita: 0, impacto: 0 });

  useEffect(() => {
    if (visible) {
      setCorporativo(valoresIniciais.corporativo);
      setPropriedade(valoresIniciais.propriedade);
      setInitialCorporativo(valoresIniciais.corporativo);
      setInitialPropriedade(valoresIniciais.propriedade);
    }
  }, [visible, valoresIniciais]);

  useEffect(() => {
    const novoCustoPoder = Math.abs(corporativo - initialCorporativo) + Math.abs(propriedade - initialPropriedade);
    setCustoPoder(novoCustoPoder);
    setCanSave(novoCustoPoder <= poder && (corporativo !== initialCorporativo || propriedade !== initialPropriedade));
    calcularReceitaImpacto();
  }, [corporativo, propriedade, poder, initialCorporativo, initialPropriedade]);

  const calcularReceitaImpacto = () => {
    const receita = corporativo * 2 + propriedade * 5;
    const impacto = 
      (corporativo === 0 ? 2 : corporativo * -0.5) + 
      (propriedade === 0 ? 5 : propriedade * -2);

    setReceitaImpacto({ receita, impacto });
  };

  const handleSave = () => {
    if (canSave) {
      onSave(corporativo, propriedade, poder - custoPoder);
      onAvancarTurno();
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

          <Text style={styles.modalText}>Poder: {poder - custoPoder}</Text>
          <Text style={styles.modalText}>Custo Poder: {custoPoder}</Text>
          <Text style={styles.modalText}>Receita: {receitaImpacto.receita}</Text>
          <Text style={styles.modalText}>Impacto: {receitaImpacto.impacto}</Text>

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
