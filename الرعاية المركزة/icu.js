document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  async function loadProducts(sectionId, jsonPath) {
    try {
      const response = await fetch(jsonPath);
      const products = await response.json();
      const container = document.getElementById(sectionId);

      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" class="product-image" alt="${product.name}" />
          <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <p class="product-price">${product.price}</p>
            <a href="#" class="product-btn">اطلب الآن</a>
          </div>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      console.error("خطأ في تحميل المنتجات:", error);
    }
  }

  loadProducts("ventilator-products", "icu-ventilators.json");
  loadProducts("monitor-products", "icu-monitors.json");
  loadProducts("infusion-products", "icu-infusions.json");
});
