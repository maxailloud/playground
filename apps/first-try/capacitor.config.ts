import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'app.games.firstTry',
    appName: 'First Try',
    webDir: '../../dist/apps/first-try/browser',
    server: {
        androidScheme: 'https',
    },
};

export default config;
