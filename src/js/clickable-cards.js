document.addEventListener('DOMContentLoaded', function() {
  // Make all post cards clickable
  const allCards = document.querySelectorAll('.post-card, .post-preview');
  
  allCards.forEach(card => {
      // Find the title link
      const titleLink = card.querySelector('a[href]');
      if (!titleLink) return;
      
      const url = titleLink.getAttribute('href');
      
      // Make the entire card clickable
      card.addEventListener('click', function(e) {
          // If the click wasn't on a link already, navigate to the post
          if (!e.target.closest('a')) {
              window.location.href = url;
              e.preventDefault();
          }
      });
      
      // Add visual cue and accessibility improvement
      card.style.cursor = 'pointer';
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', 'Read post: ' + (card.querySelector('.post-card__title, .post-preview__title')?.textContent.trim() || 'Read more'));
  });
});