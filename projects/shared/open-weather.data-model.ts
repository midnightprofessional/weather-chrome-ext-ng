export interface OpenWeatherData {
    name: string;
    sys: {
        country: string;
    };
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    weather: {
        description: string;
        icon: number;
        id: string;
        main: string;
    }[];
    wind: {
        deg: number;
        speed: number;
    };
}

export type TempetureScale = 'metric' | 'imperial';
