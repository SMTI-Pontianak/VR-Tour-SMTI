/**
 * Gateway Manager for VR Tour
 * Handles landing page interactions and modal popups
 */

document.addEventListener('DOMContentLoaded', () => {
    const majorsBtn = document.getElementById('majors-btn');
    const majorsModal = document.getElementById('majors-modal');
    const majorsCloseBtn = document.getElementById('majors-close-btn');
    const devModal = document.getElementById('dev-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const devMajors = document.querySelectorAll('.major-item.dev-only');

    // Open Majors Modal
    if (majorsBtn && majorsModal) {
        majorsBtn.addEventListener('click', (event) => {
            event.preventDefault();
            majorsModal.classList.add('visible');
        });
    }

    // Close Majors Modal
    if (majorsCloseBtn && majorsModal) {
        majorsCloseBtn.addEventListener('click', () => {
            majorsModal.classList.remove('visible');
        });

        majorsModal.addEventListener('click', (event) => {
            if (event.target === majorsModal) {
                majorsModal.classList.remove('visible');
            }
        });
    }

    // Dev-only majors click triggers the development modal
    devMajors.forEach(item => {
        item.addEventListener('click', () => {
            if (majorsModal) majorsModal.classList.remove('visible');
            if (devModal) devModal.classList.add('visible');
        });
    });

    // Close Dev Modal (and go back to Majors Modal)
    if (modalCloseBtn && devModal) {
        modalCloseBtn.addEventListener('click', () => {
            devModal.classList.remove('visible');
            if (majorsModal) majorsModal.classList.add('visible');
        });

        devModal.addEventListener('click', (event) => {
            if (event.target === devModal) {
                devModal.classList.remove('visible');
                if (majorsModal) majorsModal.classList.add('visible');
            }
        });
    }
});
