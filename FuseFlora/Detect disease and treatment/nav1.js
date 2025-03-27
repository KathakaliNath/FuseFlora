const form = document.getElementById('uploadForm');
const resultText = document.getElementById('resultText');
const uploadedImage = document.getElementById('uploadedImage');

// Function to fetch and parse the CSV file
async function fetchCSV() {
    try {
        const response = await fetch('plant_disease_treatments.csv');
        if (!response.ok) throw new Error('Failed to fetch CSV');
        const csvText = await response.text();
        console.log("CSV Data:", csvText); // Check if CSV is fetched
        return parseCSV(csvText);
    } catch (error) {
        console.error("Error fetching CSV:", error);
        return [];
    }
}

function parseCSV(text) {
    const rows = text.split('\n').map(row => row.split(','));
    const header = rows[0];
    
    const data = rows.slice(1).map(row => {
        if (row.length >= 4) { // Ensure there are at least 4 columns
            return {
                Disease: row[0].trim(),
                Treatment1: row[1] ? row[1].trim() : 'No treatment available',
                Treatment2: row[2] ? row[2].trim() : 'No treatment available',
                Treatment3: row[3] ? row[3].trim() : 'No treatment available',
            };
        } else {
            return null; // Skip rows that don't have enough columns
        }
    }).filter(item => item !== null); // Filter out invalid rows

    return data;
}


async function findTreatment(diseaseName) {
    const treatments = await fetchCSV();

    const disease = treatments.find(t => t.Disease === diseaseName);
    const resultDiv = document.getElementById('treatment-suggestions');
    
    if (disease) {
        resultDiv.innerHTML = `
            <h3>${disease.Disease}</h3>
            <p>Treatment 1: ${disease.Treatment1}</p>
            <p>Treatment 2: ${disease.Treatment2}</p>
            <p>Treatment 3: ${disease.Treatment3}</p>
        `;
    } else {
        resultDiv.innerHTML = `<p>Disease not found!</p>`;
    }
}
form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('imageInput').files[0];
    if (!fileInput) return;

    const formData = new FormData();
    formData.append('file', fileInput);

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        // Display the prediction result
        resultText.textContent = `Prediction: ${data.prediction}`;
        
        // Display the uploaded image
        uploadedImage.src = URL.createObjectURL(fileInput);
        uploadedImage.style.display = 'block';
        
        // Call findTreatment to display treatment based on the prediction
        await findTreatment(data.prediction);
        
    } catch (error) {
        console.error('Error:', error);
        resultText.textContent = 'Error occurred while processing the image.';
    }
});
