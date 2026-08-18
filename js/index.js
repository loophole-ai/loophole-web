/* ===== INDEX PAGE JS ===== */

// IDE OS tab selection
(function () {
  const subTabsEl = document.getElementById('subTabs');
  if (!subTabsEl) return;

  subTabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.stab');
    if (!btn) return;

    subTabsEl.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const os = btn.getAttribute('data-os') || btn.textContent.trim();
    const cmdTextEl = document.getElementById('cmdText');
    if (cmdTextEl) {
      cmdTextEl.textContent = `Download and install Loophole IDE for ${os}`;
    }
  });
})();


