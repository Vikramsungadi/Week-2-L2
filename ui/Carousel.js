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

export function initializeCarousel() {
	let carousel = new Splide('#image-carousel', {
		width: '500px',
		heightRatio: 640 / 500,
		classes: {
			arrows: 'splide__arrows',
			arrow: 'splide__arrow arrows',
			prev: 'splide__arrow--prev move-arrow-left ',
			next: 'splide__arrow--next move-arrow-right',
			pagination: 'hidden',
		},
		breakpoints: {
			990: {
				width: '450px',
				// height: '496px',
				heightRatio: 640 / 500,
			},
			749: {
				width: '350px',
				heightRatio: 640 / 500,
			},
		},
	});
	carousel.mount();

	return carousel;
}
