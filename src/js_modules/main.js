//Output functionality class and dom creation
class View {
	constructor() {
		//Get APP id
		this.app = document.getElementById('app');

		//Create element H1 and adding elements to the DOM
		this.title = this.createElement('h1', 'title');
		this.title.textContent = 'Github Search Repo';

		//Create element SEARCH and adding elements to the DOM
		this.searchLine = this.createElement('div', 'search-line')
		this.searchInput = this.createElement('input', 'search-input')
		this.searchCounter = this.createElement('span', 'counter');
		this.searchLine.append(this.searchInput);
		this.searchInput.append(this.searchCounter);

		//Create repos wrapper
		this.reposWrapper = this.createElement('div', 'repos-wrapper');
		this.reposList = this.createElement('ul', 'repos');
		this.reposWrapper.append(this.reposList);

		//Create main
		this.main = this.createElement('div', 'main');
		this.main.append(this.reposWrapper);

		//Add elements to the DOM
		this.app.append(this.title);
		this.app.append(this.searchLine);
		this.app.append(this.main);
	}

	//Method for creating an element
	createElement(elementTag, elementClass) {
		const element = document.createElement(elementTag);
		if(elementClass) { //If the class was passed to the method
			element.classList.add(elementClass)
		}
		return element;
	}

	//display of repositories
	createRepo(repoData) {
		const repoElement = this.createElement('li', 'repo-prev');
		repoElement.innerHTML = `
			<div class="repo-item">
				<a href="${repoData.html_url}">${repoData.name}</a>
				<div class="repo_content">
					<h3 class="repo-subtitle">Author: </h3>
					<p class="repo-author">${repoData.login}</p>
				</div>
				<div class="repo_content">
					<h3 class="repo-subtitle">Language: </h3>
					<p class="repo-author">${repoData.language}</p>
				</div>
				<div class="repo_content">
					<h3 class="repo-subtitle">Public or private: </h3>
					<p class="repo-author">${repoData.visibility}</p>
				</div>
			</div>
		`

		this.reposList.append(repoElement);
	}
}


//Search functional class
class Search {
	constructor(view) {
		this.view = view;
		this.view.searchInput.addEventListener('keyup', this.searchRepos.bind(this))
	}

	//search for repositories on demand
	async searchRepos() {
		return await fetch(`https://api.github.com/search/repositories?q=${this.view.searchInput.value}`)
			.then((res) => {
				if(res.ok) {
					res.json().then(res => {
						res.items.forEach( repo => this.view.createRepo(repo) )
					})
				} else {

				}
			})
	}
}

new Search( new View() );