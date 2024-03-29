import { Slot } from 'expo-router';
import { SoundProvider } from '../store/soundsContext';

export default function HomeLayout() {
    return (
        <SoundProvider>
            <Slot />
        </SoundProvider>
    )
}
