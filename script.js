import { createCarousel, initializeCarousel } from './ui/Carousel.js';
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
	let bgGradient2 = document.querySelector('.bg-gradient2');

	let gradient1opacity = getComputedStyle(bgGradient).opacity;
	productDetails.classList.remove('fade-in');
	productDetails.classList.add('fade-out');

	productDetails.addEventListener('transitionend', () => {
		productDetailsTitle.textContent = currentBlock.title;
		productDetailsTag.textContent = currentBlock.tag;
		productDetailsDescription.textContent = currentBlock.description;
		productDetailsPrice.textContent = currentBlock.price;

		productDetails.classList.remove('fade-out');
		productDetails.classList.add('fade-in');
	});
	if (parseInt(gradient1opacity) === 0) {
		bgGradient.style.opacity = 1;
		bgGradient2.style.opacity = 0;
	} else {
		bgGradient2.style.opacity = 1;
		bgGradient.style.opacity = 0;
	}
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
		document.body.appendChild(createSideMenu(data.header.navlinks));

		document.querySelector('.bg-gradient').style.background = data.sectionBlocks[0].color;
		document.querySelector('.bg-gradient2').style.background = data.sectionBlocks[1].color;

		let carousel = initializeCarousel();
		let currIndex = 0;
		document.querySelector('.splide__arrow--next').addEventListener('click', () => {
			let gradient1opacity = getComputedStyle(document.querySelector('.bg-gradient')).opacity;
			let totalSections = data.sectionBlocks.length;
			let elem = parseInt(gradient1opacity) === 0 ? '.bg-gradient' : '.bg-gradient2';
			let newIndex = currIndex < totalSections - 1 ? currIndex + 1 : currIndex - 1;
			currIndex += 1;
			console.log('NExt', currIndex);
			let nextBlock = data.sectionBlocks[newIndex];
			document.querySelector(elem).style.backgroundImage = nextBlock.color;
		});

		document.querySelector('.splide__arrow--prev').addEventListener('click', () => {
			let gradient1opacity = getComputedStyle(document.querySelector('.bg-gradient')).opacity;
			let elem = parseInt(gradient1opacity) === 0 ? '.bg-gradient' : '.bg-gradient2';
			let prevIndex = currIndex > 0 ? currIndex - 1 : currIndex + 1;
			if (prevIndex) {
				currIndex -= 1;
			} else {
				currIndex = 0;
			}
			console.log('Prev', currIndex);
			let prevBlock = data.sectionBlocks[prevIndex];
			document.querySelector(elem).style.backgroundImage = prevBlock.color;
		});

		carousel.on('move', (newIndex, prevIndex) => {
			updateContent(newIndex, data.sectionBlocks);
		});

		let menuBtn = document.querySelector('.menu-btn');
		let sideMenu = document.querySelector('#sidemenu');
		let closeMenu = document.querySelector('#close');

		function openSideMenu() {
			sideMenu.classList.add('open');
			sideMenu.classList.remove('closing');
		}

		function closeSideMenu() {
			sideMenu.classList.add('closing');
		}

		function handleTransitionEnd(event) {
			if (event.propertyName === 'transform' && sideMenu.classList.contains('closing')) {
				sideMenu.classList.remove('open', 'closing');
			}
		}

		menuBtn.addEventListener('click', openSideMenu);
		closeMenu.addEventListener('click', closeSideMenu);
		sideMenu.addEventListener('transitionend', handleTransitionEnd);
	});
