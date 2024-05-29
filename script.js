import { createCarousel } from './ui/Carousel.js';
import { createHeader } from './ui/Header.js';
import { createProductDetails } from './ui/ProductDetails.js';
import { createSideMenu } from './ui/SideMenu.js';

function updateContent(slideIndex, sectionBlocks) {
	const currentBlock = sectionBlocks[slideIndex];
	const productDetailsTitle = document.querySelector('.product-details--title');
	const productDetailsTag = document.querySelector('.product-details-tag');
	const productDetailsDescription = document.querySelector('.product-details--description');
	const productDetailsPrice = document.querySelector('.product-details--price');
	const productDetails = document.querySelector('.product-details');
	let bgGradient = document.querySelector('.bg-gradient');
	// let bgGradient2 = document.querySelector('.bg-gradient2');

	// let gradient1opacity = getComputedStyle(bgGradient).opacity;

	// Apply fade out animation
	bgGradient.style.opacity = 0.6;
	productDetails.classList.remove('fade-in');
	productDetails.classList.add('fade-out');

	setTimeout(() => {
		bgGradient.style.background = currentBlock.color;
	}, 200);
	// Update text content after fade out animation
	productDetails.addEventListener('transitionend', () => {
		productDetailsTitle.textContent = currentBlock.title;
		productDetailsTag.textContent = currentBlock.tag;
		productDetailsDescription.textContent = currentBlock.description;
		productDetailsPrice.textContent = currentBlock.price;
		let bgGradient = document.querySelector('.bg-gradient');

		// Apply fade in animation
		productDetails.classList.remove('fade-out');
		productDetails.classList.add('fade-in');
		bgGradient.style.opacity = 1;

		// if (gradient1opacity === 0) {
		// 	bgGradient.style.opacity = 1;
		// 	bgGradient2.style.opacity = 0;
		// } else {
		// 	bgGradient.style.opacity = 0;
		// 	bgGradient2.style.opacity = 1;
		// }
		// bgGradient.style.background = currentBlock.color;
	}); // Same duration as the fade-out animation
}

// Function to change body color
function changeBodyColor(color) {
	document.body.style.setProperty('--bg-color', color);
}

// Fetch the JSON data
fetch('./data.json')
	.then((response) => response.json())
	.then((data) => {
		const app = document.getElementById('app');

		// Create and inject the header
		app.innerHTML += createHeader(data.header);

		// Create and inject the product details and carousel
		app.innerHTML += `
          <div class="product">
            ${createProductDetails({
							...data.sectionBlocks[0],
							socialMedia: data.socialMedia,
						})}
            ${createCarousel(data.sectionBlocks)}
          </div>
        `;

		document.querySelector('.bg-gradient').style.background = data.sectionBlocks[0].color;
		document.body.appendChild(createSideMenu(data.header.navlinks));

		let carousel = new Splide('#image-carousel', {
			width: '500px',
			// height: '640px',
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

		carousel.on('move', (e) => {
			let index = e;
			updateContent(index, data.sectionBlocks);
			// changeBodyColor(data.sectionBlocks[index].color);

			// let gradient1opacity = getComputedStyle(document.querySelector('.bg-gradient')).opacity;
			// let elem;
			// if (gradient1opacity === 0) {
			// 	elem = '.bg-gradient';
			// } else {
			// 	elem = '.bg-gradient2';
			// }
			// document.querySelector('.splide__arrow--next').addEventListener('mouseover', () => {
			// 	document.querySelector(elem).style.backgroundImage = data.sectionBlocks[e + 1].color;
			// });
			// document.querySelector('.splide__arrow--prev').addEventListener('mouseover', () => {
			// 	document.querySelector(elem).style.backgroundImage = data.sectionBlocks[e >= 1 ? e - 1 : e + 1].color;
			// });
		});

		let menuBtn = document.querySelector('.menu-btn');
		let sideMenu = document.querySelector('#sidemenu');
		let closeMenu = document.querySelector('#close');

		function toggleSideMenu() {
			if (sideMenu.classList.contains('hidden')) {
				sideMenu.classList.add('flex');
				sideMenu.classList.remove('hidden');
			} else {
				sideMenu.classList.remove('flex');
				sideMenu.classList.add('hidden');
			}
		}
		menuBtn.addEventListener('click', toggleSideMenu);
		closeMenu.addEventListener('click', toggleSideMenu);
	});

// document.addEventListener('DOMContentLoaded', function () {
// 	let carousel = new Splide('#image-carousel', {
// 		width: '500px',
// 		// height: '640px',
// 		heightRatio: 640 / 500,
// 		classes: {
// 			arrows: 'splide__arrows',
// 			arrow: 'splide__arrow arrows',
// 			prev: 'splide__arrow--prev move-arrow-left ',
// 			next: 'splide__arrow--next move-arrow-right',
// 			pagination: 'hidden',
// 		},
// 		breakpoints: {
// 			990: {
// 				width: '400px',
// 				// height: '496px',
// 				heightRatio: 640 / 500,
// 			},
// 		},
// 	});
// 	carousel.mount();

// 	carousel.on('move', (e) => {
// 		console.log(e);
// 	});
// });
