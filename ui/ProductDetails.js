export function createProductDetails(product) {
	return `
        <section class="product-details">
          <h2 class="product-details--title">${product.title}</h2>
          <span class="product-details-tag">${product.tag.replace(
						'Choose Us',
						`<span class="tag-highlight" >Choose Us</span>`
					)}</span>
          <p class="product-details--description">
            ${product.description}
          </p>
          <div class="product-details--price">${product.price}</div>

          <div class="social-icons">
            ${product.socialMedia.map((icon) => `<div><img src="${icon.icon}" alt="${icon.name}" /></div>`).join('')}
          </div>
        </section>
      `;
}
