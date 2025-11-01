// Chart
const ctx = document.getElementById('myChart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Sales',
      data: [120, 190, 300, 500, 200, 300, 400],
      borderColor: '#00c6ff',
      backgroundColor: 'rgba(0,198,255,0.2)',
      tension: 0.3,
      fill: true
    }]
  }
});

// Comments LocalStorage
const commentInput = document.getElementById('commentInput');
const addComment = document.getElementById('addComment');
const commentList = document.getElementById('commentList');

let comments = JSON.parse(localStorage.getItem('comments')) || [];

function renderComments() {
  commentList.innerHTML = comments.map(c => `<li>${c}</li>`).join('');
}
renderComments();

addComment.addEventListener('click', () => {
  if (commentInput.value.trim() !== "") {
    comments.push(commentInput.value.trim());
    localStorage.setItem('comments', JSON.stringify(comments));
    renderComments();
    commentInput.value = "";
  }
});

// Gallery Upload
const uploadPhoto = document.getElementById('uploadPhoto');
const galleryGrid = document.getElementById('galleryGrid');
let gallery = JSON.parse(localStorage.getItem('gallery')) || [];

function renderGallery() {
  galleryGrid.innerHTML = gallery.map(src => `<img src="${src}" />`).join('');
}
renderGallery();

uploadPhoto.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      gallery.push(reader.result);
      localStorage.setItem('gallery', JSON.stringify(gallery));
      renderGallery();
    };
    reader.readAsDataURL(file);
  }
});
