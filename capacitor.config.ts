import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trendify.digital',
  appName: 'Trendify Digital',
  webDir: 'dist/TrendifyDigital/browser',
  server: {
    cleartext: true
  }
};

export default config;
