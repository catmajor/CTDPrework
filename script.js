async function main() {
	if (!navigator.geolocation) {
		document.querySelector("main").innerHTML = "no geolocation api for your device found";
		return;
	}
	let coordinates;
	let tempname = "fahrenheit";
	await navigator.geolocation.getCurrentPosition(async (geolocation) => {
		coordinates = geolocation.coords;
		const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m&temperature_unit=${tempname}`);
		const data = await response.json();
		console.log(data);
		const current = data.current;
		console.log(current);
		const units = data.current_units;
		document.getElementById("temperature").textContent = `${current.temperature_2m}${units.temperature_2m}`;
		document.getElementById("weather").textContent = `${weatherCodes(current.weather_code)}`
		document.getElementById("precipitation").textContent = `${current.precipitation} ${units.precipitation}`;
		document.getElementById("wind").textContent = `${current.wind_speed_10m} ${units.wind_speed_10m} ${degToDir(current.wind_direction_10m)}`;
		document.getElementById("longitude").textContent = `${coordinates.longitude}`;
		document.getElementById("latitude").textContent = `${coordinates.latitude}`;
		document.body.classList.add("show-data");
	});
}
main();
