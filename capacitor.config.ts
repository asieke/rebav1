import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.rebademo.app',
	appName: 'reba-demo',
	webDir: 'build',
	server: {
		androidScheme: 'https'
	}
};

export default config;
