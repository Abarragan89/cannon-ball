import { createContext, useEffect, useRef } from "react";
import { getUserDataPreferences } from "../utils/db/selectQueries";

const PreferencesContext = createContext();

const PreferencesProvider = ({ children }) => {

    const userPreferences = useRef({
        isMusicOn: null,
        isSoundEfxOn: null,
        isHapticsOn: null,
    })

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const [userPref] = await getUserDataPreferences(1)
                userPreferences.current = userPref;
            } catch (error) {
                console.log('error loading user preferences in context ', error)                
            }
        }
        loadPreferences();
    }, [])

    const toggleMusic = (value) => {
        userPreferences.current.isMusicOn = value === true ? 1 : 0;
        console.log('preferences in the context ', userPreferences.current)
    }


    return (
        <PreferencesContext.Provider value={{ userPreferences, toggleMusic }}>
            {children}
        </PreferencesContext.Provider>
    )

}

export { PreferencesContext, PreferencesProvider}