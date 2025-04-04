document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const inputs = form.querySelectorAll('input[type="input"]');
    const submitButton = form.querySelector('.btn');

    // Validate form inputs
    function validateInputs() {
        let valid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '' && input.closest('.required')) {
                valid = false;
                input.classList.add('error');
                input.placeholder = "This field is required!";
            } else {
                input.classList.remove('error');
            }
        });
        return valid;
    }

    // Handle form submission
    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Validate inputs
        if (validateInputs()) {
            // If valid, show a success message
            alert('Thank you for your feedback!');
            form.reset(); // Reset the form
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Clear error message on input focus
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.remove('error');
            input.placeholder = input.placeholder.replace("This field is required!", "");
        });
    });
});
