'use strict';


//Search functional class
export class Search {

	setCurrentPage(pageNumber) {
		this.currentPage = pageNumber;
	}

	setReposCount(count) {
		this.reposCount = count;
	}

	constructor(view, api, log) {
		this.view = view;
		this.api = api;
		this.log = log;

		this.view.searchInput.addEventListener('keyup', this.debounce(this.loadRepos.bind(this), 500));
		this.view.loadMore.addEventListener('click', this.loadMoreRepos.bind(this));
		this.currentPage = 1;
		this.reposCount = 0;
	}

	//search for repositories on demand
	loadRepos() {

		this.setCurrentPage(1);
		this.view.setCounterMessage('');
		if(this.view.searchInput.value) {
			this.clearRepos()
			this.reposRequest(this.view.searchInput.value)
		}else{
			this.clearRepos();
			this.view.toggleLoadMoreButton(false)
		}
	}

	loadMoreRepos() {
		this.setCurrentPage(this.currentPage + 1);
		this.reposRequest(this.view.searchInput.value);
	}

	async reposRequest(searchValue) {
		let totalCount;
		let repos;
		let message;
		try{
			await	this.api.loadRepos(searchValue, this.currentPage).then((res) => { 
				res.json().then(res => {
						repos = res.items;
						totalCount = res.total_count;
						message = this.log.counterMessage(totalCount)
						this.setReposCount(this.reposCount + res.items.length);
						this.view.setCounterMessage(message);
						this.view.toggleLoadMoreButton(totalCount > 10 && this.reposCount !== totalCount);
						repos.forEach( repo => this.view.createRepo(repo) )
					})
			})
		} catch(e) {
			console.log('Error:' + e);
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