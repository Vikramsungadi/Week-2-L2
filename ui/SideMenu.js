export function createSideMenu(navlinks) {
	const sideMenuHTML = `
        <ul id="sidemenu" class="side-menu hidden">
            <li class="close-icon">
                <!-- CLOSE ICON -->
                <svg id="close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </li>
            ${navlinks.map((link) => `<li><a href="${link.link}">${link.title}</a></li>`).join('')}
        </ul>
    `;

	const container = document.createElement('div');
	container.innerHTML = sideMenuHTML;
	return container.firstElementChild;
}
