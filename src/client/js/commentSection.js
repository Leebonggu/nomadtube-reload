const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector('.video__comments ul');
  console.log(videoComments);
  const newComment = document.createElement('li');
  newComment.className = 'video__comment';
  newComment.dataset.id = newCommentId;
  const icon = document.createElement('i');
  icon.className = 'fas fa-comment';
  const span = document.createElement('span');
  span.innerText= `${text}`;
  newComment.appendChild(icon);
  newComment.appendChild(span);
  
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  // button in form => submit form => default action post
  // 브라우저가 하는 행동을 멈추게 해줌
  const textarea = form.querySelector('textarea');
  const { id } = videoContainer.dataset;
  const text = textarea.value;
  if (text === '') {
    return;
  }
  const result = JSON.stringify({ text });
  const response = await fetch(`/api/videos/${id}/comment`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: result,
  });
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
    textarea.value = '';
  }
  // window.location.reload();
};

if (form) {
  form.addEventListener('submit', handleSubmit);
}