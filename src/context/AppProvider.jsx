import { ThemeProvider } from "./ThemeContext";
import { LoadingProvider } from "./LoadingContext";
import { AuthProvider } from "../auth/AuthContext";

export const AppProvider = ({ children }) => {
    return (
        <ThemeProvider>
            <LoadingProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </LoadingProvider>
        </ThemeProvider >
    );
};
