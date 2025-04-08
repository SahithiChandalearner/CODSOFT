document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
});

async function loadBlogPosts() {
    try {
        const response = await fetch('/api/posts'); // Assuming your backend API endpoint
        const posts = await response.json();
        displayBlogPosts(posts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('content').innerHTML = '<p>Failed to load blog posts.</p>';
    }
}

function displayBlogPosts(posts) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear existing content
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p class="author">By ${post.author}</p>
            <p>${post.content.substring(0, 200)}...</p>
            <button onclick="loadComments('${post._id}')">View Comments</button>
            <div id="comments-${post._id}"></div>
        `;
        contentDiv.appendChild(postDiv);
    });
}

async function loadComments(postId) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    try {
        const response = await fetch(`/api/posts/${postId}/comments`); // Backend API for comments
        const comments = await response.json();
        displayComments(postId, comments);
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsDiv.innerHTML = '<p>Failed to load comments.</p>';
    }
}

function displayComments(postId, comments) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>${comment.author}:</strong> ${comment.text}</p>`;
        commentsDiv.appendChild(commentDiv);
    });
}

// You would add more JavaScript for handling new post creation, user authentication, search, etc.