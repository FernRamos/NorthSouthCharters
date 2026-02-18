import React, { createContext, useContext, useMemo } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // We keep the same shape so other components don't break.
  const value = useMemo(
    () => ({
      user: null,
      isAuthenticated: false,
      isLoadingAuth: false,
      isLoadingPublicSettings: false,
      authError: null,
      appPublicSettings: null,

      // No-ops (safe placeholders)
      logout: () => {},
      navigateToLogin: () => {},
      checkAppState: () => {},
    }),
    []
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};