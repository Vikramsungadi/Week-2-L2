export function createCarousel(sectionBlocks) {
	return `
        <div class="carousel-wrapper">
          <section id="image-carousel" class="splide carousel" aria-label="Beautiful Images">
            <div class="splide__track">
              <ul class="splide__list">
                ${sectionBlocks
									.map(
										(block) => `
                  <li class="splide__slide">
                    <img src="${block.image}" alt="${block.title}" />
                  </li>`
									)
									.join('')}
              </ul>
            </div>
          </section>
        </div>
      `;
}
