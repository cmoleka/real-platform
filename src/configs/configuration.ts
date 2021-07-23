export interface AppConfigInterface {
    port: number;
    database: {
        host: string;
    };
}
const AppConfig: AppConfigInterface = {
    port: parseInt(process.env.PORT, 10) || 5001,
    database: {
        host: process.env.DATABASE_HOST,
    },
};

export default AppConfig;
