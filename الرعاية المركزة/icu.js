// icu.js

document.addEventListener("DOMContentLoaded", () => {
  const icuContainer = document.getElementById("icu-sections");
  const modal = document.getElementById("device-modal");
  const modalBody = modal.querySelector(".modal-body");
  const closeBtn = modal.querySelector(".close-modal");

  // Toggle nav
  document.querySelector(".menu-toggle").addEventListener("click", () => {
    document.querySelector(".main-nav").classList.toggle("open");
  });

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modalBody.innerHTML = "";
  });

  // Fetch JSON
  fetch("icu.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(section => {
        const sectionDiv = document.createElement("section");
        sectionDiv.className = "device-section";
        sectionDiv.innerHTML = `
          <h3>${section.title_ar} <span>(${section.title_en})</span></h3>
          <div class="device-slider">
            ${section.devices.map(device => `
              <div class="device-card" data-device='${JSON.stringify(device)}'>
                <div class="device-image-slider">
                  ${device.images.map(img => `<img src="${img}" alt="${device.name_ar}">`).join("")}
                </div>
                <div class="content">
                  <h4>${device.name_ar}<br><small>${device.name_en}</small></h4>
                  <p>${device.desc}</p>
                  <div class="price">${device.price}</div>
                </div>
              </div>
            `).join("")}
          </div>
        `;
        icuContainer.appendChild(sectionDiv);
      });

      // Activate modals
      document.querySelectorAll(".device-card").forEach(card => {
        card.addEventListener("click", () => {
          const device = JSON.parse(card.dataset.device);
          modalBody.innerHTML = `
            <h2>${device.name_ar} <span>(${device.name_en})</span></h2>
            <div class="modal-slider">
              ${device.images.map(img => `<img src="${img}" alt="صورة الجهاز">`).join("")}
            </div>
            <p>${device.desc}</p>
            <div class="price">${device.price}</div>
          `;
          modal.classList.remove("hidden");
        });
      });
    });
});
