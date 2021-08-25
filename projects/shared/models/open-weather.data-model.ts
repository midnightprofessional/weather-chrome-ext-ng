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
        icon: string;
        id: string;
        main: string;
    }[];
    weather_details?: {
        iconUrl: string;
        description: string;
    };
    wind: {
        deg: number;
        speed: number;
    };
}

export type TempetureScale = 'metric' | 'imperial';
