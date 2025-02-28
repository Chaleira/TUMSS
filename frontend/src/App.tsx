import React from 'react';
import { AuthProvider } from 'context/auth.context';
import AppNavigator from 'navigation/app.navigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}