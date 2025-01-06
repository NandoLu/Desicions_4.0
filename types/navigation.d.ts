// navigation.ts
import { Pais, Leader } from '../data/paises';

export type RootStackParamList = {
  Menu: undefined;
  NovoJogo: undefined;
  Jogo: { pais: Pais; lider: Leader };
};
