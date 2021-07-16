/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// // Define function that will run on page load
// function init() {

//     // Read json data
//     d3.json("samples.json").then(function(data) {
//         console.log(data);
      
//         // Parse and filter data to get sample names
//         let names = d3.select("names");
//         // Add dropdown option for each sample
//         // Use D3 to select the dropdown menu
//         let dropdownMenu = d3.select("#selDataset");
        
//     // Call functions below using the first sample to build metadata and initial plots
//         data.metadata.forEach(item =>
//             {
//             // console.log(item.id);
//             d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
//             });
//     });
// }

// Define a function that will create metadata for given sample
function buildMetaData(sample) {

    // Read the json data
    d3.json("samples.json").then((data) => {
        let metadata = data.metadata;
        console.log(metadata);
    
        // Parse and filter the data to get the sample's metadata
    let buildArray = metadata.filter(sampleItem => sampleItem.id == sample);
    let response = buildArray[0];
    // Use d3 to select the required element on the page with the id property set to 'sample-metadata'
    let sampleMetadata = d3.select("#sample-metadata");

    // Clear the existing data in the html
    sampleMetadata.html("");
        // Specify the location of the metadata and update it
    // Use `Object.entries` to add each key and value pair to the panelData
    Object.entries(response).forEach(([key, value]) => {
        sampleMetadata.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("samples.json").then((data) => {});
        // Parse and filter the data to get the sample's OTU data

        // Pay attention to what data is required for each chart

        // Create bar chart in correct location

        // Create bubble chart in correct location
    
}