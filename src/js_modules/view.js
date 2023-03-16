'use strict';

//Output functionality class and dom creation
export class View {
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

		//Create button load more
		this.loadMore = this.createElement('button', 'button');
		this.loadMore.textContent = 'More...';
		this.loadMore.style.display = 'none';
		this.reposWrapper.append(this.loadMore)

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
			<li class="repo-item">
				<a href="${repoData.html_url}">${repoData.name}</a>
				<div class="repo_content">
					<h3 class="repo-subtitle">Author: </h3>
					<p class="repo-author">${repoData.owner.login}</p>
				</div>
				<div class="repo_content">
					<h3 class="repo-subtitle">Language: </h3>
					<p class="repo-author">${repoData.language}</p>
				</div>
				<div class="repo_content">
					<h3 class="repo-subtitle">Public or private: </h3>
					<p class="repo-author">${repoData.visibility}</p>
				</div>
				<div class="repo_content">
					<h3 class="repo-subtitle">Created_repo: </h3>
					<p class="repo-author">${repoData.created_at}</p>
				</div>
			</li>
		`

		this.reposList.append(repoElement);
	}

	toggleLoadMoreButton(show) {
		this.loadMore.style.display = show ? 'block' : 'none';
	}
}
