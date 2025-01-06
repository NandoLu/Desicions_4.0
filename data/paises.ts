import { ImageSourcePropType } from 'react-native';

export interface Leader {
  nome: string;
  foto: ImageSourcePropType;
  poder: number;
  popularidade: number;
}

export interface Pais {
  nome: string;
  bandeira: ImageSourcePropType;
  ano: number;
  populacao: number;
  pib: number;
  saldoEconomia: number;
  lideres: Leader[];
  impostos: {
    corporativo: number;
    propriedade: number;
  };
  educacao: {
    pesquisa: number;
    universidades: number;
  };
}

const brasilBandeira = require('../assets/img/brasil.png');
const vargasFoto = require('../assets/img/vargas.png');
const juscelinoFoto = require('../assets/img/juscelino.png');

const paises: Pais[] = [
  {
    nome: 'Brasil',
    bandeira: brasilBandeira,
    ano: 1822,
    populacao: 213,
    pib: 334,
    saldoEconomia: 400,
    lideres: [
      {
        nome: 'Getulio Vargas',
        foto: vargasFoto,
        poder: 75,
        popularidade: 80,
      },
      {
        nome: 'Juscelino Kubitschek',
        foto: juscelinoFoto,
        poder: 85,
        popularidade: 90,
      },
    ],
    impostos: {
      corporativo: 5,
      propriedade: 3,
    },
    educacao: {
      pesquisa: 4,
      universidades: 6,
    },
  },
  // Adicione outros países conforme necessário
];

export default paises;
