const apiKey ='pk.eyJ1IjoibWFqaWRnb2F0IiwiYSI6ImNsaHRxaTNmYzM4OXUzbHFrZGgxYnA5Z3gifQ.-uix8efIc2Qe186BqOYcRQ';

const map = L.map('map').setView([34.833782, -40.971516], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 6,
    minZoom: 2,
}).addTo(map);

// Create a layer group to hold the markers
const markerGroup = L.layerGroup().addTo(map);

// Define marker data as an array of objects
const markerData = [
  { name: 'Albania <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [41, 20]},
  { name: 'Algeria <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [28, 3] },
  { name: 'Andorra <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [42.3, 1.3] },
  { name: 'Argentina <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [-34, -64] },
  { name: 'Armenia <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [40, 45] },
  { name: 'Australia <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [-27, 133] },
  { name: 'Austria <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [47.2, 13.2] },
  { name: 'Azerbaijan <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [40.3, 47.3] },
  { name: 'Bahrain <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [26, 50.33] },
  { name: 'Bangladesh <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [24, 90] },
  { name: 'Canada <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [60, -95] },
  { name: 'China <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [35, 105] },
  { name: 'France <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [46, 2] },
  { name: 'Germany <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [51, 9] },
  { name: 'Greece <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [39, 22] },
  { name: 'Hong Kong <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [22.15, 114.10] },
  { name: 'Italy <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [42.50, 12.50] },
  { name: 'Japan <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [36, 138] },
  { name: 'Malaysia <br><a href="about.html">Basic medicine</a>', coordinates: [2.30, 112.30] },
  { name: 'Mexico <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [23, -102] },
  { name: 'Netherlands <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [52.30, 5.45] },
  { name: 'Poland <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [52, 20] },
  { name: 'Portugal <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [39.30, -8] },
  { name: 'Russia <li><a href="about.html#essentials">Basic medicine</a></li> <li>Don\'t go there!</li>', coordinates: [60, 100] },
  { name: 'Spain <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [40, -4] },
  { name: 'Thailand <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [15, 100] },
  { name: 'Turkey <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [39, 35] },
  { name: 'United States <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [38, -97] },
  { name: 'United Kingdom <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [54, -2] },
  { name: 'Ukraine <br><a href="about.html#essentials">Basic medicine</a>', coordinates: [49, 32] }
];


// Function to duplicate markers and adjust coordinates
function duplicateMarkers() {
  const worldWidth = 360;
  const worldHeight = 180;

  const bounds = map.getBounds();
  const sw = bounds.getSouthWest();
  const ne = bounds.getNorthEast();

  const minX = Math.floor(sw.lng / worldWidth) * worldWidth;
  const maxX = Math.ceil(ne.lng / worldWidth) * worldWidth;

  markerGroup.clearLayers();

  for (const data of markerData) {
    for (let x = minX; x <= maxX; x += worldWidth) {
      const clonedCoordinates = [
        data.coordinates[0],
        data.coordinates[1] + x
      ];

      const clonedMarker = L.marker(clonedCoordinates).addTo(markerGroup);
      clonedMarker.bindPopup(data.name);

      // Add click event listener to the marker popup
      clonedMarker.on('click', function () {
        // Open the popup
        this.openPopup();

        // Get the "Basic Needs" link element inside the popup
        const link = this.getPopup().getContent().querySelector('a[href="about.html#essentials"]');

        // Add a click event listener to the "Basic Needs" link
        link.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent the default behavior of the link

          // Perform the navigation to the about.html page with the specific section
          window.location.href = 'about.html#essentials';
        });
      });
    }
  }
}

// Call the duplicateMarkers function initially
duplicateMarkers();

// Event handlers for map movement and zooming
map.on('moveend', duplicateMarkers);
map.on('zoomend', duplicateMarkers);

