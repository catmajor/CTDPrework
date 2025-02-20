function weatherCodes (code) {
    switch (code) {
        case 0: 
            return "Clear Sky";
        case 1:
            return "Mainly Clear";
        case 2:
            return "Partly Cloudy";
        case 3:
            return "Overcast";
        case 45:
        case 48:
            return "Fog and Depositing Rime Fog";
        case 51:
            return "Drizzle: Light Intensity";
        case 53:
            return "Drizzle: Moderate Intensity";
        case 55:
            return "Drizzle: Dense Intensity";
        case 56:
            return "Freezing Drizzle: Light Intensity";
        case 57:
            return "Freezing Drizzle: Dense Intensity";
        case 61:
            return "Rain: Slight Intensity";
        case 63:
            return "Rain: Moderate Intensity";
        case 65:
            return "Rain: Heavy Intensity";
        case 66:
            return "Freezing Rain: Light Intensity";
        case 67:
            return "Freezing Rain: Heavy Intensity";
        case 71:
            return "Snow Fall: Slight Intensity";
        case 73:
            return "Snow Fall: Moderate Intensity";
        case 75:
            return "Snow Fall: Heavy Intensity";
        case 77:
            return "Snow Grains";
        case 80:
            return "Rain Showers: Slight";
        case 81:
            return "Rain Showers: Moderate";
        case 82:
            return "Rain Showers: Violent";
        case 85:
            return "Snow Showers: Slight";
        case 86:
            return "Snow Showers: Heavy";
        case 95:
            return "Thunderstorm: Slight or Moderate";
        case 96:
            return "Thunderstorm With Slight Hail";
        case 99:
            return "Thunderstorm With Heavy Hail";
        default:
            return "Unknown weather code";
    }
}
function degToDir(dir) {
    if (dir <= 22.5 || dir > 337.5) {
        return "North";
    } else if (dir <= 67.5) {
        return "North-West";
    } else if (dir <= 112.5) {
        return "West";
    } else if (dir <= 157.5) {
        return "South-West";
    } else if (dir <= 202.5) {
        return "South";
    } else if (dir <= 247.5) {
        return "South-East";
    } else if (dir <= 292.5) {
        return "East";
    } else if (dir <= 337.5) {
        return "North-East";
    }
}