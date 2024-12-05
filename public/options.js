document.addEventListener("DOMContentLoaded", function() {

    // Create the options box
    const optionsBox = document.createElement("div");
    optionsBox.className = "options-box";
    document.body.appendChild(optionsBox);

    const title = document.createElement("div");
    title.className = "title-box";
    title.innerHTML = 'Options'
    optionsBox.appendChild(title);

    // Create the toggle button inside the options box
    const toggleButton = document.createElement("button");
    toggleButton.className = "toggle-button";
    toggleButton.innerHTML = "▼"; // Down arrow (default state when the box is visible)
    toggleButton.onclick = toggleOptionsBox;
    optionsBox.appendChild(toggleButton);

    // Function to toggle the visibility of the options box (hide/show)
    function toggleOptionsBox() {
        optionsBox.classList.toggle("hidden");
        updateToggleButtonState();
    }

    // Function to update the toggle button state (arrow direction)
    function updateToggleButtonState() {
        if (optionsBox.classList.contains("hidden")) {
            toggleButton.innerHTML = "▲"; // Show down arrow when hidden
        } else {
            toggleButton.innerHTML = "▼"; // Show up arrow when visible
        }
    }

    // Populate the options box with the options object
    for (const [key, values] of Object.entries(options)) {
        const label = document.createElement("div");
        label.className = "label";
        label.innerText = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter of the key
        optionsBox.appendChild(label);

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        values.forEach(value => {
            const button = document.createElement("button");
            button.className = "option-button";
            button.innerText = value;
            button.onclick = function() {
                updateQueryParams(key, value);
                highlightSelectedOption(button);
            };
            buttonContainer.appendChild(button);
        });

        optionsBox.appendChild(buttonContainer);
    }

    // Function to update query parameters and reload the page
    function updateQueryParams(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.location.href = url.toString();
    }

    // Function to highlight the selected option
    function highlightSelectedOption(selectedButton) {
        // Remove the 'selected' class from all buttons
        const allButtons = document.querySelectorAll('.option-button');
        allButtons.forEach(button => button.classList.remove('selected'));

        // Add 'selected' class to the clicked button
        selectedButton.classList.add('selected');
    }

    // Determine the selected options based on the current query parameters
    function setSelectedOptions() {
        const urlParams = new URLSearchParams(window.location.search);
        const allButtons = document.querySelectorAll('.option-button');

        allButtons.forEach(button => {
            const key = button.closest('.button-container').previousElementSibling.innerText.toLowerCase();
            const selectedValue = urlParams.get(key);
            if (selectedValue && button.innerText === selectedValue) {
                button.classList.add('selected');
            }
        });
    }

    // Initialize the selected options based on the query params
    setSelectedOptions();
});
