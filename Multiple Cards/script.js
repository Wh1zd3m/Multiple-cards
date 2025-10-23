// Profile Card: Update time
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

// Contact Us: Form validation
function validateForm(event) {
  event.preventDefault();
  const name = document.querySelector('[data-testid="test-contact-name"]').value.trim();
  const email = document.querySelector('[data-testid="test-contact-email"]').value.trim();
  const subject = document.querySelector('[data-testid="test-contact-subject"]').value.trim();
  const message = document.querySelector('[data-testid="test-contact-message"]').value.trim();
  const errorElements = {
    name: document.querySelector('[data-testid="test-contact-error-name"]'),
    email: document.querySelector('[data-testid="test-contact-error-email"]'),
    subject: document.querySelector('[data-testid="test-contact-error-subject"]'),
    message: document.querySelector('[data-testid="test-contact-error-message"]'),
  };
  const successElement = document.querySelector('[data-testid="test-contact-success"]');
  let isValid = true;

  // Reset error and success messages
  Object.values(errorElements).forEach(el => el.style.display = 'none');
  successElement.style.display = 'none';

  // Validation checks
  if (!name) {
    errorElements.name.textContent = 'Full name is required';
    errorElements.name.style.display = 'block';
    isValid = false;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorElements.email.textContent = 'A valid email is required';
    errorElements.email.style.display = 'block';
    isValid = false;
  }
  if (!subject) {
    errorElements.subject.textContent = 'Subject is required';
    errorElements.subject.style.display = 'block';
    isValid = false;
  }
  if (!message || message.length < 10) {
    errorElements.message.textContent = 'Message must be at least 10 characters';
    errorElements.message.style.display = 'block';
    isValid = false;
  }

  if (isValid) {
    successElement.textContent = 'Form submitted successfully!';
    successElement.style.display = 'block';
    event.target.reset();
  }
}

// Initialize functionality
document.addEventListener('DOMContentLoaded', () => {
  // Profile Card: Time update
  updateTime();
  setInterval(updateTime, 1000);

  // Profile Card: Image upload
  const avatarInput = document.createElement('input');
  avatarInput.type = 'file';
  avatarInput.accept = 'image/*';
  avatarInput.style.display = 'none';
  document.body.appendChild(avatarInput);

  avatarInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.querySelector('[data-testid="test-user-avatar"]');
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const avatar = document.querySelector('[data-testid="test-user-avatar"]');
  if (avatar) {
    avatar.addEventListener('click', () => avatarInput.click());
  }

  // Contact Us: Form submission
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', validateForm);
  }
});