async function main() {
	if (!navigator.geolocation) {
		document.querySelector("main").innerHTML = "no geolocation api for your device found";
		return;
	}
	let coordinates;
	let tempname = "fahrenheit";
	let dropdownOpen = false;
	const dropdownMenu = document.getElementById("dropdown");
	dropdownMenu.addEventListener("click", () => {
		if (dropdownOpen) {
			dropdownMenu.classList.remove("open");
			dropdownOpen = false;
		} else {
			dropdownMenu.classList.add("open");
			dropdownOpen = true;
		}
	});
	document.getElementById("show-data").addEventListener("click", () => navigator.geolocation.getCurrentPosition(async (geolocation) => {
		const cover = document.getElementById("cover");
		cover.classList.add("blockout");
		cover.classList.add("z-index-fix");
		const timer = new Promise(resolve => setTimeout(resolve, 1000));
		coordinates = geolocation.coords;
		let dataVar;
		const request = (async () => {
			const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,is_day&temperature_unit=${tempname}`);
			return await response.json();
		})();
		request.then(data => dataVar = data);
		await Promise.all([request, timer]);
		setTimeout(() => {
			cover.classList.remove("z-index-fix");
		}, 1000);
		const data = dataVar;
		cover.classList.remove("blockout");
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
		if (current.is_day === 0) {
			document.body.classList.add("is-night");
		} else {
			document.body.classList.add("is-daylight")
		}
	}), {once: true});
}
main();
