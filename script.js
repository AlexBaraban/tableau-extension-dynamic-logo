tableau.extensions.initializeAsync().then(() => {
    console.log('Tableau extension initialized.');

    tableau.extensions.dashboardContent.dashboard.getParametersAsync().then(parameters => {
        const logoURLParameter = parameters.find(param => param.name === 'LogoURL');

        if (logoURLParameter) {
            console.log('LogoURL Parameter:', logoURLParameter.currentValue.value);

            // Fetch the HTML from the LogoURL and extract the image URL
            fetch(logoURLParameter.currentValue.value)
                .then(response => response.text()) // Get the response as plain text
                .then(html => {
                    // Parse the HTML and extract the image source
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const imgTag = doc.querySelector('img'); // Find the <img> tag

                    if (imgTag) {
                        const imgSrc = imgTag.src; // Extract the src attribute from the <img> tag
                        document.getElementById('logo').src = imgSrc; // Set the src of the logo element
                        console.log('Extracted Image URL:', imgSrc);
                    } else {
                        console.error('No img tag found in HTML.');
                    }
                })
                .catch(err => {
                    console.error('Error fetching or parsing HTML:', err);
                });
        } else {
            console.error('LogoURL parameter not found.');
        }
    }).catch(err => {
        console.error('Error getting parameters:', err);
    });
}).catch(err => {
    console.error('Error initializing Tableau extension:', err);
});
