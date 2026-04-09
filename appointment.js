// ===== APPOINTMENT FORM SCRIPT ===== */

document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const dateInput = document.getElementById('date');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Form submission
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            beautician: document.getElementById('beautician').value,
            notes: document.getElementById('notes').value,
            submittedAt: new Date().toLocaleString()
        };

        // Store in localStorage (for demo purposes)
        let appointments = JSON.parse(localStorage.getItem('hsm_appointments')) || [];
        appointments.push(formData);
        localStorage.setItem('hsm_appointments', JSON.stringify(appointments));

        // Show success message
        showSuccessMessage(formData);

        // Reset form
        appointmentForm.reset();
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const terms = document.getElementById('terms').checked;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return name && emailRegex.test(email) && phone && service && date && time && terms;
    }

    function showSuccessMessage(data) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #d4af37, #ffd700);
                color: #1a1a1a;
                padding: 30px;
                border-radius: 10px;
                margin-bottom: 30px;
                text-align: center;
                animation: slideInDown 0.5s ease;
            ">
                <h2 style="color: #1a1a1a; margin: 0 0 10px 0;">✅ Appointment Confirmed!</h2>
                <p style="margin: 10px 0; font-size: 1rem;">Thank you for booking with HSM Beauty Parlor!</p>
                <div style="text-align: left; margin-top: 20px; background: rgba(0,0,0,0.1); padding: 15px; border-radius: 5px;">
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Service:</strong> ${data.service}</p>
                    <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${data.time}</p>
                    <p><strong>Confirmation email sent to:</strong> ${data.email}</p>
                </div>
                <p style="margin-top: 15px; font-size: 0.9rem;">A confirmation email has been sent to your email address.</p>
            </div>
        `;

        // Insert success message at the top of the form
        appointmentForm.parentElement.insertBefore(successDiv, appointmentForm);

        // Remove success message after 10 seconds
        setTimeout(() => {
            successDiv.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => successDiv.remove(), 500);
        }, 8000);

        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Function to view all appointments (for admin/demonstration)
function viewAllAppointments() {
    const appointments = JSON.parse(localStorage.getItem('hsm_appointments')) || [];
    console.log('All Appointments:', appointments);
    return appointments;
}
