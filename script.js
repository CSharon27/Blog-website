// Blog Data
const blogPosts = [
    {
        id: 1,
        title: "The Future of Artificial Intelligence in Everyday Life",
        category: "Technology",
        author: "Sarah Jenks",
        date: "Oct 12, 2024",
        excerpt: "AI is no longer just a buzzword. It's shaping how we work, live, and interact with the world around us.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
        image: "assets/images/featured-1.png", // We have this one
    },
    {
        id: 2,
        title: "Minimalism: How to Declutter Your Mind and Space",
        category: "Lifestyle",
        author: "Mark Doe",
        date: "Oct 08, 2024",
        excerpt: "Living with less can actually mean living more. Discover the benefits of a minimalist lifestyle.",
        content: "Lorem ipsum dolor sit amet...",
        image: "assets/images/featured-2.png", // Placeholder path, we will try to gen or use fallback
    },
    {
        id: 3,
        title: "Top 10 Travel Destinations for 2025",
        category: "Travel",
        author: "Emily Clark",
        date: "Sep 25, 2024",
        excerpt: "From hidden gems to bustling cities, here are the must-visit places for your next adventure.",
        content: "Lorem ipsum...",
        image: "assets/images/blog-1.png",
    },
    {
        id: 4,
        title: "Mastering the Art of Remote Work",
        category: "Technology",
        author: "James Smith",
        date: "Sep 20, 2024",
        excerpt: "Productivity tips and tricks for staying efficient while working from the comfort of your home.",
        content: "Lorem ipsum...",
        image: "assets/images/blog-2.png",
    },
    {
        id: 5,
        title: "Healthy Habits for a Productive Morning",
        category: "Lifestyle",
        author: "Anna Li",
        date: "Sep 15, 2024",
        excerpt: "Start your day right with these simple yet effective morning routines.",
        content: "Lorem ipsum...",
        image: "assets/images/blog-3.png",
    },
    {
        id: 6,
        title: "Understanding React Server Components",
        category: "Education",
        author: "Dev Guy",
        date: "Sep 10, 2024",
        excerpt: "A deep dive into the latest features of React and how they optimize web performance.",
        content: "Lorem ipsum...",
        image: "assets/images/blog-4.png",
    }
];

const categories = [
    { name: "Technology", icon: "fa-laptop-code" },
    { name: "Lifestyle", icon: "fa-mug-hot" },
    { name: "Education", icon: "fa-graduation-cap" },
    { name: "Travel", icon: "fa-plane" },
    { name: "Personal Growth", icon: "fa-seedling" }
];

// DOM Elements
const featuredGrid = document.getElementById('featured-grid');
const categoriesGrid = document.getElementById('categories-grid');
const blogGrid = document.getElementById('blog-grid');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme Toggle
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
});

// Render Functions
function renderFeatured() {
    // Featured posts - first 2
    const featured = blogPosts.slice(0, 2);
    featuredGrid.innerHTML = featured.map(post => `
        <div class="featured-card">
            <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Featured+Image'">
            <div class="featured-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <button class="btn primary" onclick="openModal(${post.id})">Read More</button>
            </div>
        </div>
    `).join('');
}

function renderCategories() {
    categoriesGrid.innerHTML = categories.map(cat => `
        <div class="category-card" onclick="filterBlogs('${cat.name}')">
            <i class="fa-solid ${cat.icon}"></i>
            <h3>${cat.name}</h3>
        </div>
    `).join('');
}

function renderBlogs(posts = blogPosts) {
    blogGrid.innerHTML = posts.map(post => `
        <div class="blog-card">
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/400x300?text=Blog+Image'">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span>${post.category}</span>
                    <span>${post.date}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-footer">
                    <span class="author">By ${post.author}</span>
                    <span class="read-more" onclick="openModal(${post.id})" style="cursor:pointer">Read More <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Function
window.filterBlogs = (category) => {
    const filtered = blogPosts.filter(post => post.category === category);
    renderBlogs(filtered);
    // Smooth scroll to blogs
    document.getElementById('blogs').scrollIntoView({ behavior: 'smooth' });
};

// Search Function
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = blogPosts.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
    );
    renderBlogs(filtered);
});

// Modal Logic
const modal = document.getElementById('blog-modal');
const closeModal = document.querySelector('.close-modal');

window.openModal = (id) => {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    document.getElementById('modal-body').innerHTML = `
        <img src="${post.image}" style="width:100%; height: 300px; object-fit: cover; border-radius: 10px; margin-bottom: 2rem;" onerror="this.src='https://via.placeholder.com/800x400'">
        <h2>${post.title}</h2>
        <div class="blog-meta" style="margin-bottom: 2rem;">
            <span><i class="fa-solid fa-user"></i> ${post.author}</span>
            <span><i class="fa-solid fa-calendar"></i> ${post.date}</span>
            <span><i class="fa-solid fa-tag"></i> ${post.category}</span>
        </div>
        <p>${post.content}</p>
        <div class="social-share" style="margin-top: 2rem;">
            <button class="btn secondary" onclick="toggleLike(this)"><i class="fa-regular fa-heart"></i> Like</button>
            <button class="btn secondary" onclick="sharePost('${post.title}')"><i class="fa-solid fa-share-nodes"></i> Share</button>
        </div>
    `;
    modal.style.display = 'block';
};

window.toggleLike = (btn) => {
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = 'var(--secondary-color)';
        btn.style.borderColor = 'var(--secondary-color)';
        btn.style.color = 'var(--secondary-color)';
    } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = '';
        btn.style.borderColor = '';
        btn.style.color = '';
    }
};

window.sharePost = (title) => {
    // Simulate copying to clipboard
    const dummyLink = `https://myblog.com/posts/${title.toLowerCase().replace(/ /g, '-')}`;
    navigator.clipboard.writeText(dummyLink).then(() => {
        alert(`Link copied to clipboard: ${dummyLink}`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for non-secure contexts if needed, but alert is fine for demo
        alert(`Link to share: ${dummyLink}`);
    });
};

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

// Mobile Nav
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.right = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--nav-bg)';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = 'var(--shadow)';
    }
});


// Initialization
renderFeatured();
renderCategories();
renderBlogs();
console.log("Blog loaded initialized");
