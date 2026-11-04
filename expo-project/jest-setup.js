// Mock Expo Winter runtime
global.__ExpoImportMetaRegistry = {};

// Mock structuredClone si no está disponible de forma nativa en el entorno de pruebas
global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));

// Mock expo modules y router
jest.mock('expo-router', () => {
  const React = require('react');
  const { Text } = require('react-native');

  // Un único objeto para todas las llamadas a useRouter().
  const router = {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    navigate: jest.fn(),
  };

  return {
    Link: ({ children, ...props }) => React.createElement(Text, props, children),
    useRouter: () => router,
    useLocalSearchParams: jest.fn(() => ({})),
    __router: router,
  };
});

jest.mock('expo-constants', () => ({
  default: {},
}));
