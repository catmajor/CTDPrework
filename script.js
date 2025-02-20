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
	});
}
main();
