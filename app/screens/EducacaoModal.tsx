import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../styles/Modals';

type EducacaoModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (pesquisa: number, universidades: number, novoPoder: number, despesa: number, impacto: number) => void;
  poder: number;
  valoresIniciais: { pesquisa: number; universidades: number; };
  onAvancarTurno: () => void;
};

const EducacaoModal: React.FC<EducacaoModalProps> = ({
  visible,
  onClose,
  onSave,
  poder,
  valoresIniciais,
  onAvancarTurno
}) => {
  const [pesquisa, setPesquisa] = useState(valoresIniciais.pesquisa);
  const [universidades, setUniversidades] = useState(valoresIniciais.universidades);
  const [initialPesquisa, setInitialPesquisa] = useState(valoresIniciais.pesquisa);
  const [initialUniversidades, setInitialUniversidades] = useState(valoresIniciais.universidades);
  const [canSave, setCanSave] = useState(false);
  const [custoPoder, setCustoPoder] = useState(0);
  const [despesaImpacto, setDespesaImpacto] = useState({ despesa: 0, impacto: 0 });

  useEffect(() => {
    if (visible) {
      setPesquisa(valoresIniciais.pesquisa);
      setUniversidades(valoresIniciais.universidades);
      setInitialPesquisa(valoresIniciais.pesquisa);
      setInitialUniversidades(valoresIniciais.universidades);
    }
  }, [visible, valoresIniciais]);

  useEffect(() => {
    const novoCustoPoder = Math.abs(pesquisa - initialPesquisa) + Math.abs(universidades - initialUniversidades);
    setCustoPoder(novoCustoPoder);
    setCanSave(novoCustoPoder <= poder && (pesquisa !== initialPesquisa || universidades !== initialUniversidades));
    calcularDespesaImpacto();
  }, [pesquisa, universidades, poder, initialPesquisa, initialUniversidades]);

  const calcularDespesaImpacto = () => {
    const despesa = -(pesquisa * 2 + universidades * 5);
    const impacto = (pesquisa === 0 ? -2 : pesquisa * 0.5) + (universidades === 0 ? -5 : universidades * 2);
    setDespesaImpacto({ despesa, impacto });
  };

  const handleSave = () => {
    if (canSave) {
      onSave(pesquisa, universidades, poder - custoPoder, despesaImpacto.despesa, despesaImpacto.impacto);
      onAvancarTurno();
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
          <Text style={styles.modalText}>Poder: {poder - custoPoder}</Text>
          <Text style={styles.modalText}>Custo Poder: {custoPoder}</Text>
          <Text style={styles.modalText}>Despesa: {despesaImpacto.despesa}</Text>
          <Text style={styles.modalText}>Impacto: {despesaImpacto.impacto}</Text>
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
