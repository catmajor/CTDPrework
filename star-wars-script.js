async function main() {
	document.querySelectorAll("#go-to-weather").forEach(ele => ele.addEventListener("click", () => {
		window.location = "./index.html";
	}));
	document.querySelectorAll("#show-data").forEach(ele => ele.addEventListener("click", async () => {
            const accessGranted = await navigator.permissions.query({ name: 'geolocation' });
            const cover = document.getElementById("cover");
            cover.classList.add("blockout");
            cover.classList.add("z-index-fix");
            const timer = new Promise(resolve => setTimeout(resolve, 1000));
            let weatherRequest;
            let personRequest;
            let homeworldRequest;
            const peopleRequest = fetch(`https://www.swapi.tech/api/people/`).then(async result => {
                const peopleData = await result.json();
                const numPeople = peopleData.results.length;
                personRequest = await fetch(`https://www.swapi.tech/api/people/${Math.floor(Math.random()*numPeople) + 1}/`);
                const personData = await personRequest.json();
                const personProperties = personData.result.properties;
                homeworldRequest = await fetch(personProperties.homeworld);
                const homeworldData = await homeworldRequest.json();
                const homeworldProperties = homeworldData.result.properties;
                await Promise.all([timer]);
                document.getElementById("name").textContent = personProperties.name
                document.getElementById("birth-year").textContent = personProperties.birth_year;
                document.getElementById("eye-color").textContent = personProperties.eye_color;
                document.getElementById("weight").textContent = `${personProperties.mass}kg`;
                document.getElementById("height").textContent = `${personProperties.height}cm`;
                document.getElementById("homeworld-name").textContent = homeworldProperties.name;
                document.getElementById("homeworld-climate").textContent = homeworldProperties.climate;
                document.getElementById("homeworld-terrain").textContent = homeworldProperties.terrain;
                document.getElementById("homeworld-population").textContent = homeworldProperties.population;
                document.getElementById("homeworld-day").textContent = `${homeworldProperties.rotation_period} hours`;
                document.getElementById("homeworld-year").textContent = `${homeworldProperties.orbital_period} days`;

            });
            if (accessGranted == "granted") {
                navigator.geolocation.getCurrentPosition(async (geolocation) => {
                        coordinates = geolocation.coords;
                        let dataVar;
                        weatherRequest = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=isDay`);
                        const data = await weatherRequest.json();
                        console.log(data);
                        const current = data.current;
                        console.log(current);
                        document.body.classList.add("show-data");
                        if (current.is_day === 0) {
                            document.body.classList.add("is-night");
                        } else {
                            document.body.classList.add("is-daylight")
                        }
                });
            } else {
                document.body.classList.add("is-night");
                weatherRequest = new Promise((resolve, reject) => {
                    resolve();
                });
            }
            await Promise.all([peopleRequest, homeworldRequest, personRequest, weatherRequest, timer]);
            document.body.classList.add("show-data");
            setTimeout(() => {
                cover.classList.remove("z-index-fix");
            }, 1000);
            cover.classList.remove("blockout");
    }));
}
main();
