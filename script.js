document.addEventListener('DOMContentLoaded', function() {
    const UNSPLASH_ACCESS_KEY = 'fxlLPw7UNpGxaizF-aEZmeIcIjmMZdw3Cnxl4oVy8vc';
    const query = 'italian food';
    const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?query=${query}&count=1&client_id=${UNSPLASH_ACCESS_KEY}`;

    function fetchAndDisplayPhoto() {
        console.log('Fetching photo from Unsplash...');
        fetch(UNSPLASH_URL)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Photo data:', data);
                if (data && data.length > 0) {
                    const photo = data[0];
                    const photoContainer = document.getElementById('photo');
                    photoContainer.innerHTML = `
                        <img src="${photo.urls.regular}" alt="${photo.alt_description}">
                        <p>${photo.description || 'No description'}</p>
                    `;
                } else {
                    console.error('No photo data available');
                    const photoContainer = document.getElementById('photo');
                    photoContainer.innerHTML = `<p>Brak dostępnych danych zdjęcia.</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching photo:', error);
                const photoContainer = document.getElementById('photo');
                photoContainer.innerHTML = `<p>Błąd podczas pobierania zdjęcia: ${error.message}</p>`;
            });
    }

    // Fetch and display photo initially
    fetchAndDisplayPhoto();

    // Fetch and display photo every 5 seconds
    setInterval(fetchAndDisplayPhoto, 5000);
});
