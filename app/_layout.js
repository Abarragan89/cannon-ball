import { Slot } from 'expo-router';
import { SoundProvider } from '../store/soundsContext';
import { PreferencesProvider } from '../store/preferencesContext';

export default function HomeLayout() {
    return (
        <SoundProvider>
            {/* <PreferencesProvider> */}
                <Slot />
            {/* </PreferencesProvider> */}
        </SoundProvider>
    )
}
