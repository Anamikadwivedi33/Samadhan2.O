document.addEventListener('click', function(e) {
  if(e.target.matches('.like-btn')){
    e.target.classList.toggle('text-red-500');
  }
});
