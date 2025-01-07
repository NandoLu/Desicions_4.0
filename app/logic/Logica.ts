// Logica.tsx
import { useState, useEffect } from 'react';

const nomesMeses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const useTurno = (anoInicial: number, receitaInicial: number, despesaInicial: number, impactoInicial: number) => {
  const [ano, setAno] = useState(anoInicial);
  const [mes, setMes] = useState(0);
  const [receitaImposto, setReceitaImposto] = useState(receitaInicial);
  const [despesaEducacao, setDespesaEducacao] = useState(despesaInicial);
  const [impactoImposto, setImpactoImposto] = useState(impactoInicial);
  const [impactoEducacao, setImpactoEducacao] = useState(0);

  const atualizarTotais = (receita: number, despesa: number, impacto: number, tipo: string) => {
    if (tipo === 'imposto') {
      setReceitaImposto(receita);
      setImpactoImposto(impacto);
      console.log(`Receita Imposto: ${receita}, Impacto Imposto: ${impacto}`);
    } else if (tipo === 'educacao') {
      setDespesaEducacao(despesa);
      setImpactoEducacao(impacto);
      console.log(`Despesa Educação: ${despesa}, Impacto Educação: ${impacto}`);
    }
  };

  useEffect(() => {
    console.log(`Receita Total: ${receitaImposto}`);
    console.log(`Despesa Total: ${despesaEducacao}`);
    console.log(`Impacto Total: ${impactoImposto + impactoEducacao}`);
  }, [mes, ano]);

  const receitaTotal = receitaImposto;
  const despesaTotal = despesaEducacao;
  const impactoTotal = impactoImposto + impactoEducacao;

  const avancarTurno = () => {
    setMes((mesAtual) => {
      if (mesAtual === 11) {
        setAno((anoAtual) => {
          const novoAno = anoAtual + 1;
          console.log(`Ano: ${novoAno}`);
          return novoAno;
        });
        return 0;
      } else {
        const novoMes = mesAtual + 1;
        console.log(`Mês: ${nomesMeses[novoMes]}`);
        return novoMes;
      }
    });
  };

  const mesAtualNome = nomesMeses[mes];

  return { ano, mes: mesAtualNome, receitaTotal, despesaTotal, impactoTotal, avancarTurno, atualizarTotais };
};
