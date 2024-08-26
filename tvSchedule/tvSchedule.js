async function getCountryCode(country) {
    const API_KEY='b3d0b02c8af15f545a393772bae9545d'
    try {
        const apiData = await axios.get(`https://api.countrylayer.com/v2/name/${country}?access_key=${API_KEY}&fullText=true`);
        var countryCode;
        apiData.data.forEach(countryList => {
            if(countryList.name.toLowerCase() === country.toLowerCase()) {
                countryCode = countryList.alpha2Code;
            }
        });
        return countryCode;
    }
    catch (err) {
        console.error(err);
        return 0;
    }
}

async function sendGetRequest() {
    try {
        document.getElementById("shows").innerHTML = "";
        const country = document.getElementById("country").value;
       
        const countryCode = await getCountryCode(country);
       
        if(countryCode === 0) {
            const app = document.getElementById("shows");
            no = document.createElement("h4");
            no.className = "text-light text-center mt-5";
            no.textContent = "Sorry! No shows found!";
            app.appendChild(no);
            return 0;
        }
           
        const date = document.getElementById("date").value;
        const apiData = await axios.get(`https://api.tvmaze.com/schedule?country=${countryCode}&date=${date}`);

        if(apiData.data.length === 0) {
            const app = document.getElementById("shows");
            no = document.createElement("h4");
            no.className = "text-light text-center mt-5";
            no.textContent = "Sorry! No shows found!";
            app.appendChild(no);
            return 0;
        }

        const app = document.getElementById("shows");
        app.className = "mt-5";

        const box = document.createElement("div");
        box.className = "row row-cols-6 row-cols-sm-6 g-4 mx-auto";

        apiData.data.forEach(episode => {
            var col = document.createElement("div");
            col.className = "col";

            var card = document.createElement("div");
            card.className = "card text-dark bg-light mb-2 text-center";

            var cardTitle = document.createElement("h6");
            cardTitle.className = "card-header";
            cardTitle.textContent = episode.show.name;

            var img = document.createElement("img");
            img.className = "img-fluid";
            if(episode.show.image)
                img.src = episode.show.image.medium;
            else
                img.src = "default.jpg";

            var cardText = document.createElement("div");
            cardText.className = "card-footer";
            cardText.textContent = episode.name;

            card.appendChild(cardTitle);
            card.appendChild(img);
            card.appendChild(cardText);
            col.appendChild(card);
            box.appendChild(col);
            app.appendChild(box);
        });
    }
   
    catch (err) {
        console.error(err);
        return 0;
    }
}