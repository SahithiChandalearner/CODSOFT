const jobListingsContainer = document.getElementById('job-listings');
const jobDetailModal = document.getElementById('job-detail');
const applicationFormModal = document.getElementById('application-form');
const searchInput = document.getElementById('search-input');

// Sample job data (will be lost on refresh)
let jobs = [
    { id: 1, title: 'Web Developer', company: 'Tech Innovations Inc.', location: 'New York', description: 'Full-stack web development role...', requirements: [...] },
    { id: 2, title: 'Marketing Manager', company: 'Global Marketing Solutions', location: 'London', description: 'Lead marketing strategies...', requirements: [...] },
    // Add more job listings here
];

function displayJobs(jobList) {
    jobListingsContainer.innerHTML = '';
    jobList.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.classList.add('job-listing');
        jobDiv.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} - ${job.location}</p>
            <button onclick="showJobDetail(${job.id})">View Details</button>
        `;
        jobListingsContainer.appendChild(jobDiv);
    });
}

function showJobDetail(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        document.getElementById('job-title').textContent = job.title;
        document.getElementById('job-company').textContent = job.company;
        document.getElementById('job-location').textContent = job.location;
        document.getElementById('job-description').textContent = job.description;
        jobDetailModal.style.display = 'block';
    }
}

function closeJobDetail() {
    jobDetailModal.style.display = 'none';
}

function openApplicationForm() {
    jobDetailModal.style.display = 'none';
    applicationFormModal.style.display = 'block';
}

function closeApplicationForm() {
    applicationFormModal.style.display = 'none';
}

function searchJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.location.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
    );
    displayJobs(filteredJobs);
}

// Initial display of jobs
displayJobs(jobs);

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target === jobDetailModal) {
        closeJobDetail();
    }
    if (event.target === applicationFormModal) {
        closeApplicationForm();
    }
}

// Basic "application submission" (no actual backend)
document.getElementById('apply-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Application submitted (no actual processing in this basic version).');
    closeApplicationForm();
});