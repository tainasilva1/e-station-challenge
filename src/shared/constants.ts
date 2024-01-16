export const KEYS_DATA_BY_DAY = {
  CONSUMPTION: 'consumption',
  MAXIMUM_FLEX: 'maximum_flex',
  MINIMUM_FLEX: 'minimum_flex',
  FLAT_CONSUMPTION: 'flat_consumption'
}

export const KEYS_BY_LAST_WEEK = [{ key: 'consumo', color: '#8884d8'}]

export const KEYS_BY_YEAR = [
  { key: '2021', color: '#3c81f6' },
  { key: '2022', color: '#1ab8a6' }
]

export const KEYS_BY_DATE = [
  {
    key: KEYS_DATA_BY_DAY.CONSUMPTION,
    color: '#5e9ae5'
  },
  {
    key: KEYS_DATA_BY_DAY.MAXIMUM_FLEX,
    color: '#f97415'
  },
  {
    key: KEYS_DATA_BY_DAY.MINIMUM_FLEX,
    color: '#6466f1'
  },
  {
    key: KEYS_DATA_BY_DAY.FLAT_CONSUMPTION,
    color: '#23c45e'
  },
]


export const BY_DAY_LEGENDS = {
  [KEYS_DATA_BY_DAY.CONSUMPTION]: 'Consumo',
  [KEYS_DATA_BY_DAY.MAXIMUM_FLEX]: 'Flex Máxima',
  [KEYS_DATA_BY_DAY.MINIMUM_FLEX]: 'Flex Mínima',
  [KEYS_DATA_BY_DAY.FLAT_CONSUMPTION]: 'Consumo Flat'
}