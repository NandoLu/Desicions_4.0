import { useState } from 'react';

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const useTurno = (anoInicial: number) => {
  const [ano, setAno] = useState(anoInicial);
  const [mes, setMes] = useState(0);

  const avancarTurno = () => {
    setMes((mesAtual) => {
      if (mesAtual === 11) {
        setAno((anoAtual) => anoAtual + 1);
        return 0;
      } else {
        return mesAtual + 1;
      }
    });
  };

  const mesAtualNome = nomesMeses[mes];

  return { ano, mes: mesAtualNome, avancarTurno };
};
