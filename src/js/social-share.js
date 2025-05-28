// Social Share Component
class SocialShare {
    constructor() {
      this.isOpen = false;
      this.init();
    }
  
    init() {
      document.addEventListener('DOMContentLoaded', () => {
        this.bindEvents();
      });
    }
  
    bindEvents() {
      // Handle share button clicks
      document.addEventListener('click', (e) => {
        if (e.target.closest('.share-button')) {
          e.preventDefault();
          this.toggleDropdown(e.target.closest('.social-share'));
        }
      });
  
      // Handle share option clicks
      document.addEventListener('click', (e) => {
        const shareOption = e.target.closest('.share-option');
        if (shareOption) {
          e.preventDefault();
          this.handleShareOption(shareOption);
        }
      });
  
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.social-share') && this.isOpen) {
          this.closeDropdown();
        }
      });
  
      // Close dropdown on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeDropdown();
        }
      });
    }
  
    toggleDropdown(shareComponent) {
      const dropdown = shareComponent.querySelector('.share-dropdown');
      
      if (this.isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown(dropdown);
      }
    }
  
    openDropdown(dropdown) {
      // Close any other open dropdowns first
      this.closeAllDropdowns();
      
      dropdown.classList.add('show');
      this.isOpen = true;
      this.currentDropdown = dropdown;
    }
  
    closeDropdown() {
      if (this.currentDropdown) {
        this.currentDropdown.classList.remove('show');
      }
      this.isOpen = false;
      this.currentDropdown = null;
    }
  
    closeAllDropdowns() {
      document.querySelectorAll('.share-dropdown.show').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
      this.isOpen = false;
    }
  
    handleShareOption(option) {
      const action = option.getAttribute('data-action');
      const shareComponent = option.closest('.social-share');
      
      switch (action) {
        case 'copy':
          this.copyLink(shareComponent);
          break;
        case 'twitter':
          this.shareToTwitter();
          break;
        case 'facebook':
          this.shareToFacebook();
          break;
        case 'linkedin':
          this.shareToLinkedIn();
          break;
        case 'email':
          this.shareByEmail();
          break;
      }
      
      this.closeDropdown();
    }
  
    async copyLink(shareComponent) {
      const url = window.location.href;
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
        } else {
          // Fallback for older browsers or non-secure contexts
          this.fallbackCopyToClipboard(url);
        }
        
        this.showCopySuccess(shareComponent);
      } catch (err) {
        console.error('Failed to copy link:', err);
        this.fallbackCopyToClipboard(url);
        this.showCopySuccess(shareComponent);
      }
    }
  
    fallbackCopyToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      
      document.body.removeChild(textArea);
    }
  
    showCopySuccess(shareComponent) {
      const success = shareComponent.querySelector('.copy-success');
      if (success) {
        success.classList.add('show');
        setTimeout(() => {
          success.classList.remove('show');
        }, 2000);
      }
    }
  
    shareToTwitter() {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(document.title);
      this.openPopup(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
    }
  
    shareToFacebook() {
      const url = encodeURIComponent(window.location.href);
      this.openPopup(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
    }
  
    shareToLinkedIn() {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      this.openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`);
    }
  
    shareByEmail() {
      const url = encodeURIComponent(window.location.href);
      const subject = encodeURIComponent(`Check out: ${document.title}`);
      const body = encodeURIComponent(`I thought you might find this interesting:\n\n${window.location.href}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  
    openPopup(url) {
      const popup = window.open(
        url,
        'share',
        'width=600,height=400,scrollbars=yes,resizable=yes'
      );
      
      if (popup) {
        popup.focus();
      }
    }
  }
  
  // Initialize the social share component
  new SocialShare();