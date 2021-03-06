/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define function that will run on page load
function init() {
    // Add dropdown option for each sample
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Read json data
    d3.json("samples.json").then((data) => {
        // console.log(data);
      
        // Parse and filter data to get sample names
        let names = data.names;
        
    // Call functions below using the first sample to build metadata and initial plots
        names.forEach((sample) => {
            dropdownMenu
            .append("option")
            .text(sample)
            .property("value", sample);
        })
    
        // Use the sample data from the list to build the plots
        let sampleData = names[0];
        buildMetaData(sampleData);
        buildCharts(sampleData);
        });
    };


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
    // Use `Object.entries` to add each key and value pair to the 'sampleMetadata' (or do a for loop)
    Object.entries(response).forEach(([key, value]) => {
        sampleMetadata.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("samples.json").then((data) => {
        
        // Parse and filter the data to get the sample's OTU data
        let sampleData = data.samples;
        let buildArray = sampleData.filter(sampleItem => sampleItem.id == sample);
        console.log(buildArray)
        let response = buildArray[0];
        // Pay attention to what data is required for each chart
        let otu_ids = response.otu_ids;
        let otu_labels = response.otu_labels;
        let sample_values = response.sample_values;
        // Create bar chart in correct location
        //Create a horizontal bar chart
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let trace1 = [
        {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }
        ];

        let layout1 = {
        margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", trace1, layout1);

        // Create bubble chart in correct location
        // Build a Bubble Chart
        let trace2 = [
            {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
            }
        ];
        let layout2 = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
        };

        Plotly.newPlot("bubble", trace2, layout2);
        
        // BONUS: GAUGE CHART
        sampleData = data.metadata;
        buildArray = sampleData.filter(sampleItem => sampleItem.id == sample);
        console.log(buildArray)
        response = buildArray[0];
        // Gauge Chart to plot weekly washing frequency 
        let guageChart = d3.select("#gauge");
        guageChart.html(""); 
        // console.log(response);
        let washFreq = response.wfreq;
        console.log(washFreq);
        let trace3 = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: "<b>Belly Button Washing Frequency </b><br> Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number+delta",     
            gauge: {
            axis: { range: [0,9] },
            bar: { color: "darkblue" },
            steps: [
                { range: [0, 1], color: "white" },
                { range: [1, 2], color: "ivory" },
                { range: [2, 3], color: "lightyellow" },
                { range: [3, 4], color: "palegoldenrod" },
                { range: [4, 5], color: "khaki" },
                { range: [5, 6], color: "yellow" },
                { range: [6, 7], color: "gold" },
                { range: [7, 8], color: "orange" },
                { range: [8, 9], color: "darkorange" }
                        
                ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: washFreq
                }
            }
            }
        ]; 
        let layout3 = {  width: 600, 
                        height: 400, 
                        margin: { t: 0, b: 0 }, 
                            };
        
        // Plot using Plotly
        Plotly.newPlot('gauge', trace3, layout3);
    });
}

function optionChanged(newSample){
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample
    buildMetaData(newSample);
    // Update charts with newly selected sample
    buildCharts(newSample);
}

// Initialize dashboard on page load
init()