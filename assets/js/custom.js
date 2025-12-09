/**
 * Custom JavaScript for Form Handling
 * HTML_EN_LAB5: JavaScript Forms
 */

(function() {
  "use strict";

  // Initialize form handler when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
      initializeFormHandler(form);
      initializeRatingSliders(form);
    }
  });

  /**
   * Initialize form submission handler
   */
  function initializeFormHandler(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      handleFormSubmission(form);
    });
  }

  /**
   * Initialize rating sliders - update value display
   */
  function initializeRatingSliders(form) {
    const sliders = form.querySelectorAll('.form-range');
    sliders.forEach(slider => {
      slider.addEventListener('input', function() {
        const valueDisplay = this.parentElement.querySelector('.rating-value');
        if (valueDisplay) {
          valueDisplay.textContent = this.value;
        }
      });
    });
  }

  /**
   * Collect form data and process
   */
  function handleFormSubmission(form) {
    // Collect form data into an object
    const formData = {
      name: document.getElementById('name-field').value,
      surname: document.getElementById('surname-field').value,
      email: document.getElementById('email-field').value,
      phone: document.getElementById('phone-field').value,
      address: document.getElementById('address-field').value,
      rating1: parseInt(document.getElementById('rating1-field').value),
      rating2: parseInt(document.getElementById('rating2-field').value),
      rating3: parseInt(document.getElementById('rating3-field').value)
    };

    // Validate form data
    if (!validateFormData(formData)) {
      console.error('Form validation failed');
      return;
    }

    // Log to console
    console.log('Form Data:', formData);

    // Display form data below the form
    displayFormResults(formData, form);

    // Show success notification
    showSuccessNotification();

    // Optional: Reset form
    form.reset();
  }

  /**
   * Validate form data
   */
  function validateFormData(data) {
    if (!data.name.trim() || !data.surname.trim()) {
      alert('Please enter your name and surname');
      return false;
    }
    if (!data.email.trim() || !isValidEmail(data.email)) {
      alert('Please enter a valid email');
      return false;
    }
    if (!data.phone.trim()) {
      alert('Please enter your phone number');
      return false;
    }
    if (!data.address.trim()) {
      alert('Please enter your address');
      return false;
    }
    if (!data.rating1 || !data.rating2 || !data.rating3) {
      alert('Please answer all rating questions');
      return false;
    }
    return true;
  }

  /**
   * Check if email is valid
   */
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  /**
   * Display form results below the form
   */
  function displayFormResults(data, form) {
    // Remove previous results if they exist
    let resultsContainer = document.getElementById('form-results');
    if (resultsContainer) {
      resultsContainer.remove();
    }

    // Create results container
    resultsContainer = document.createElement('div');
    resultsContainer.id = 'form-results';
    resultsContainer.className = 'form-results-container';

    // Calculate average rating
    const averageRating = (data.rating1 + data.rating2 + data.rating3) / 3;
    const averageColor = getAverageColor(averageRating);

    // Build results HTML
    let resultsHTML = `
      <div class="results-content">
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Surname:</strong> ${escapeHtml(data.surname)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Phone number:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Address:</strong> ${escapeHtml(data.address)}</p>
        <p><strong>Rating 1:</strong> ${data.rating1}</p>
        <p><strong>Rating 2:</strong> ${data.rating2}</p>
        <p><strong>Rating 3:</strong> ${data.rating3}</p>
        <p style="margin-top: 1.5rem; font-weight: 700; font-size: 1.1rem;">
          <strong>${escapeHtml(data.name)} ${escapeHtml(data.surname)}:</strong>
          <span style="color: ${averageColor}; font-weight: 700;"> ${averageRating.toFixed(1)}</span>
        </p>
      </div>
    `;

    resultsContainer.innerHTML = resultsHTML;

    // Insert results after the form
    form.parentNode.insertAdjacentElement('afterend', resultsContainer);
  }

  /**
   * Get color based on average rating
   * 0-4: red, 4-7: orange, 7-10: green
   */
  function getAverageColor(average) {
    if (average < 4) {
      return '#e74c3c'; // red
    } else if (average < 7) {
      return '#f39c12'; // orange
    } else {
      return '#27ae60'; // green
    }
  }

  /**
   * Show success notification popup
   */
  function showSuccessNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="bi bi-check-circle"></i>
        <p>Form submitted successfully!</p>
      </div>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 400);
    }, 3000);
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

})();
