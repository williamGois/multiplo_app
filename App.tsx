import React, { useState } from 'react';
import { SimpleLoginScreen } from './src/screens/SimpleLoginScreen';
import { SimpleRegisterScreen } from './src/screens/SimpleRegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AgendaScreen } from './src/screens/AgendaScreen';
import { PatientsScreen } from './src/screens/PatientsScreen';
import { ScheduleConfigScreen } from './src/screens/ScheduleConfigScreen';

type Screen =
  | 'login'
  | 'register'
  | 'home'
  | 'settings'
  | 'agenda'
  | 'patients'
  | 'scheduleConfig';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = (email: string, password: string) => {
    setCurrentScreen('home');
  };

  const handleRegister = (userData: any) => {
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <SimpleLoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        );
      case 'register':
        return (
          <SimpleRegisterScreen
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            onBack={handleBack}
            onLogout={handleLogout}
            onOpenScheduleConfig={() => setCurrentScreen('scheduleConfig')}
          />
        );
      case 'agenda':
        return (
          <AgendaScreen
            onBack={handleBack}
          />
        );
      case 'patients':
        return (
          <PatientsScreen
            onBack={handleBack}
          />
        );
      case 'scheduleConfig':
        return (
          <ScheduleConfigScreen
            onBack={handleBack}
          />
        );
      default:
        return (
          <SimpleLoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        );
    }
  };

  return (
    <>
      {renderScreen()}
    </>
  );
}


