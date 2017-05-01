const primaryNav = (() => {

  // Cache DOM
  const primaryNavBtn = document.querySelector('.js-nav-primary__menu-btn');

  // Bind events
  primaryNavBtn.addEventListener('click', togglePrimaryNav);

  function togglePrimaryNav(e) {
    primaryNavBtn.closest('.js-nav-primary').classList.toggle('is-open');
  }
})();