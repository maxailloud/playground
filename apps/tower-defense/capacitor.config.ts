import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'app.games.towerDefense',
    appName: 'Tower Defense',
    webDir: '../../dist/apps/tower-defense/browser',
    server: {
        androidScheme: 'https',
    },
};

export default config;
