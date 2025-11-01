// -------------------------------
// Sidebar Navigation
// -------------------------------
document.querySelectorAll('.sidebar li').forEach(li => {
  li.addEventListener('click', () => {
    const page = li.getAttribute('data-page');
    document.querySelectorAll('.sidebar li').forEach(x => x.classList.remove('active'));
    li.classList.add('active');

    if (page && page.endsWith('.html')) {
      window.location.href = page;
    } else if (page === 'settings') {
      document.querySelector('.settings-panel').classList.toggle('hidden');
    }
  });
});

// -------------------------------
// Chart.js
// -------------------------------
const chartCanvas = document.getElementById('statsChart');
if (chartCanvas) {
  new Chart(chartCanvas, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Bookings',
        data: [5, 8, 14, 10, 16, 20],
        borderColor: '#D81324',
        backgroundColor: 'rgba(216,19,36,0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
  });
}

// -------------------------------
// Gallery Upload System
// -------------------------------
const upload = document.getElementById('uploadImage');
const galleryContainer = document.getElementById('galleryContainer');
if (upload && galleryContainer) {
  const loadGallery = () => {
    const saved = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    galleryContainer.innerHTML = '';
    saved.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      galleryContainer.appendChild(img);
    });
  };

  upload.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const saved = JSON.parse(localStorage.getItem('galleryImages') || '[]');
      saved.push(reader.result);
      localStorage.setItem('galleryImages', JSON.stringify(saved));
      loadGallery();
    };
    reader.readAsDataURL(file);
  });

  loadGallery();
}

// -------------------------------
// Comments System
// -------------------------------
const addCommentBtn = document.getElementById('addComment');
const commentText = document.getElementById('commentText');
const commentList = document.getElementById('commentList');

if (addCommentBtn && commentText && commentList) {
  const loadComments = () => {
    const saved = JSON.parse(localStorage.getItem('comments') || '[]');
    commentList.innerHTML = '';
    saved.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      commentList.appendChild(li);
    });
  };

  addCommentBtn.addEventListener('click', () => {
    const text = commentText.value.trim();
    if (!text) return;
    const saved = JSON.parse(localStorage.getItem('comments') || '[]');
    saved.push(text);
    localStorage.setItem('comments', JSON.stringify(saved));
    commentText.value = '';
    loadComments();
  });

  loadComments();
}

// -------------------------------
// Theme System
// -------------------------------
const themeSelect = document.getElementById('themeSelect');
if (themeSelect) {
  const savedTheme = localStorage.getItem('theme') || 'red';
  document.body.className = savedTheme;
  themeSelect.value = savedTheme;

  themeSelect.addEventListener('change', () => {
    const theme = themeSelect.value;
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  });
}
