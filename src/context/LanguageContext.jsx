import React, { createContext, useState, useContext, useEffect } from 'react';

export const translations = {
  es: {
    settings: "Configuraciones",
    preferences: "PREFERENCIAS",
    language: "Idioma",
    darkMode: "Modo oscuro",
    notifications: "Recibir notificaciones",
    reset: "Restablecer configuraciones",
    resetButton: "Restablecer",
    activateDarkMode: "Activar modo oscuro",
    activateLightMode: "Activar modo claro",
    activateNotifications: "Activar notificaciones",
    deactivateNotifications: "Desactivar notificaciones",
    
    // UserProfile
    editProfile: "Editar perfil",
    basicInfo: "INFORMACIÓN BÁSICA",
    name: "Nombre",
    gender: "Género",
    email: "Correo electrónico",
    position: "Cargo",
    configuration: "Configuración",

    overtimeSummary: "Resumen de Horas Extras",
    totalOvertimeWorked: "Total horas extra trabajadas",
    hoursApprovedByAdmin: "Horas aprobadas por administrador",
    pendingHours: "Horas pendientes por aprobar",
    registerOvertime: "Registrar Horas Extras",
    date: "Fecha",
    activity: "Actividad",
    hours: "Horas",
    overtimeType: "Tipo de hora extra",
    add: "Agregar",
    overtimeHistory: "Historial de Horas Extras",
    day: "Diurna",
    night: "Nocturna",
    holiday: "Festiva",
    status: "Estado",
    pending: "Pendiente",
    noRecords: "No hay registros de horas extras aún"
  },
  en: {
    settings: "Settings",
    preferences: "PREFERENCES",
    language: "Language",
    darkMode: "Dark mode",
    notifications: "Receive notifications",
    reset: "Reset settings",
    resetButton: "Reset",
    activateDarkMode: "Activate dark mode",
    activateLightMode: "Activate light mode",
    activateNotifications: "Activate notifications",
    deactivateNotifications: "Deactivate notifications",
    
    editProfile: "Edit profile",
    basicInfo: "BASIC INFORMATION",
    name: "Name",
    gender: "Gender",
    email: "Email",
    position: "Position",
    configuration: "Settings",
    
    overtimeSummary: "Overtime Summary",
    totalOvertimeWorked: "Total overtime hours worked",
    hoursApprovedByAdmin: "Hours approved by admin",
    pendingHours: "Pending hours for approval",
    registerOvertime: "Register Overtime",
    date: "Date",
    activity: "Activity",
    hours: "Hours",
    overtimeType: "Overtime type",
    add: "Add",
    overtimeHistory: "Overtime History",
    day: "Day",
    night: "Night",
    holiday: "Holiday",
    status: "Status",
    pending: "Pending",
    noRecords: "No overtime records yet"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'es');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};