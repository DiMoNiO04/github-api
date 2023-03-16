'use strict';


//How many records to display per page
const REPO_PER_PAGE = 10;

//Search functional class
export class Search {

	setCurrentPage(pageNumber) {
		this.currentPage = pageNumber;
	}

	setReposCount(count) {
		this.reposCount = count;
	}

	constructor(view) {
		this.view = view;
		this.view.searchInput.addEventListener('keyup', this.debounce(this.loadRepos.bind(this), 500));
		this.view.loadMore.addEventListener('click', this.loadRepos.bind(this));
		this.currentPage = 1;
		this.reposCount = 0;
	}

	//search for repositories on demand
	async loadRepos() {

		const searchValue = this.view.searchInput.value;
		let totalCount;
		let repos;

		if(searchValue) {
			return await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=${REPO_PER_PAGE}&page=${this.currentPage}`)
			.then((res) => { 
				this.setCurrentPage(this.currentPage + 1);
				if(res.ok) {
					res.json().then(res => {
						repos = res.items;
						totalCount = res.total_count;
						this.setReposCount(this.reposCount + res.items.length)
						this.view.toggleLoadMoreButton(totalCount > REPO_PER_PAGE && this.reposCount !== totalCount);
						repos.forEach( repo => this.view.createRepo(repo) )
					})
				} else {

				}
			})
		}else{
			this.clearRepos();
		}
	}

	clearRepos() {
		this.view.reposList.innerHTML = '';
	}

	debounce(func, wait, immediate) {
		let timeout;
		return function() {
			const context = this, args = arguments;
			const later = function() {
				timeout = null;
				if(!immediate) {
					func.apply(context, args)
				}
			}
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if(callNow) {
				func.apply(context, args)
			}
		}
	}
}