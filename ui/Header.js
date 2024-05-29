export function createHeader(headerData) {
	return `
        <header>
          <img src="${headerData.logo}" alt="Logo" class="logo" />
          <nav>
            <ul>
              ${headerData.navlinks.map((link) => `<li><a href="${link.link}">${link.title}</a></li>`).join('')}
            </ul>
          </nav>
          ${headerData.CTA ? '<button class="primary-btn">Sign Up</button>' : ''}
          <img src="./assets/menu.svg" alt="" class="menu-btn" />
        </header>
      `;
}
