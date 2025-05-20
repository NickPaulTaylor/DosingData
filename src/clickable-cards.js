document.addEventListener('DOMContentLoaded', function() {
    // Make hero post cards clickable
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
      // Find the title link
      const titleLink = card.querySelector('.post-card__title a');
      if (!titleLink) return;
      
      const url = titleLink.getAttribute('href');
      
      // Make the entire card clickable (except links)
      card.addEventListener('click', function(e) {
        // Only navigate if not clicking an existing link or image link
        if (e.target.tagName !== 'A' && e.target.parentNode.tagName !== 'A') {
          window.location.href = url;
        }
      });
      
      // Add visual cue 
      card.style.cursor = 'pointer';
    });
    
    // Make post previews clickable in the "More Posts" section
    const postPreviews = document.querySelectorAll('.post-preview');
    
    postPreviews.forEach(preview => {
      // Find the title link 
      const titleLink = preview.querySelector('.post-preview__title a');
      if (!titleLink) return;
      
      const url = titleLink.getAttribute('href');
      
      // Make the entire preview clickable (except existing links)
      preview.addEventListener('click', function(e) {
        // Only navigate if not clicking an existing link
        if (e.target.tagName !== 'A' && e.target.parentNode.tagName !== 'A') {
          window.location.href = url;
        }
      });
      
      // Add visual cue
      preview.style.cursor = 'pointer';
    });
  });