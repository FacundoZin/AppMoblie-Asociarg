import { Platform } from 'react-native';

export const lightShadows = {
  sm: Platform.OS === 'web'
    ? { boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
  md: Platform.OS === 'web'
    ? { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
      },
  lg: Platform.OS === 'web'
    ? { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
      },
  xl: Platform.OS === 'web'
    ? { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 8,
      },
} as const;

export const darkShadows = {
  sm: Platform.OS === 'web'
    ? { boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
      },
  md: Platform.OS === 'web'
    ? { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
      },
  lg: Platform.OS === 'web'
    ? { boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
      },
  xl: Platform.OS === 'web'
    ? { boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)' }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 8,
      },
} as const;

export const shadows = lightShadows;
