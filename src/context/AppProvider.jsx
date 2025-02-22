import { ThemeProvider } from "./ThemeContext";
import { LoadingProvider } from "./LoadingContext";

export const AppProvider = ({ children }) => {
    return (
        <ThemeProvider>
            <LoadingProvider>{children}</LoadingProvider>
        </ThemeProvider>
    );
};
