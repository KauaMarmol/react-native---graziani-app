import { useFonts } from "expo-font";
import { createContext, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native-web";

const FontContext = createContext({});

export function FontProvider({ children }) {

    const [loaded, error] = useFonts({
        regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
        bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
        semiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),

    });

    if (!loaded && !error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <FontContext.Provider value={{ loaded }}>
            {children}</FontContext.Provider>
    )
}

export function useFont() {
    const context = useContext(FontContext);
    if (!context) {
        throw new Error("useFont must be used within a FontProvider")
    }
    return context;
}