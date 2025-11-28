document.addEventListener("DOMContentLoaded", () => {
  const bscBtns = document.querySelectorAll("#bsc-buttons .platform-btn");
  const solBtns = document.querySelectorAll("#sol-buttons .platform-btn");

  function setActive(buttons, value) {
    buttons.forEach(btn =>
      btn.classList.toggle("active", btn.dataset.value === value)
    );
  }

  chrome.storage.local.get(["ca_pref_platforms", "ca_pref_open_new_tab"], (stored) => {
    if (stored?.ca_pref_platforms) {
      setActive(bscBtns, stored.ca_pref_platforms.bsc || "axiom");
      setActive(solBtns, stored.ca_pref_platforms.sol || "axiom");
    } else {
      setActive(bscBtns, "axiom");
      setActive(solBtns, "axiom");
    }
  });

  function savePlatforms() {
    const activeBsc = [...bscBtns].find(b => b && b.classList && b.classList.contains('active'));
    const activeSol = [...solBtns].find(b => b && b.classList && b.classList.contains('active'));

    const bscValue = activeBsc?.dataset?.value ?? bscBtns[0]?.dataset?.value ?? 'axiom';
    const solValue = activeSol?.dataset?.value ?? solBtns[0]?.dataset?.value ?? 'axiom';

    chrome.storage.local.set({ ca_pref_platforms: { bsc: bscValue, sol: solValue }}, () => {});}

  bscBtns.forEach(btn =>
    btn.addEventListener("click", () => {
      setActive(bscBtns, btn.dataset.value);
      savePlatforms();
    })
  );

  solBtns.forEach(btn =>
    btn.addEventListener("click", () => {
      setActive(solBtns, btn.dataset.value);
      savePlatforms();
    })
  );
});
