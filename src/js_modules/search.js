'use strict';

import { EMPTY_SEARCH_VALUE } from "./variables.js";
import { NO_ENOUGH_VALUE } from "./variables.js";

//Search functional class
export class Search {

	constructor(view, api, log) {
		this.view = view;
		this.api = api;
		this.log = log;

		this.view.searchForm.addEventListener('submit', async(event) => {
			event.preventDefault();
			this.loadRepos();
		})

		this.view.loadMore.addEventListener('click', this.loadMoreRepos.bind(this));
		this.currentPage = 1;
		this.reposCount = 0;
	}

	setCurrentPage = (pageNumber) => this.currentPage = pageNumber;

	setReposCount = (count) => this.reposCount = count;
	
	clearRepos = () => this.view.reposList.innerHTML = '';

	//search for repositories on demand
	loadRepos() {

		let message = '';
		this.setCurrentPage(1);
		this.view.setCounterMessage('');
		this.view.setErrorMessage('');

		if(this.view.searchInput.value.length < 4 && this.view.searchInput.value !== '') {
			this.clearRepos();
			this.view.toggleLoadMoreButton(false);
			message = this.log.errorMessage(NO_ENOUGH_VALUE);
			this.view.setErrorMessage(message)
			return
		}else if(this.view.searchInput.value === '') {
			this.clearRepos();
			this.view.toggleLoadMoreButton(false)
			message = this.log.errorMessage(EMPTY_SEARCH_VALUE);
			this.view.setErrorMessage(message)
			return
		}else {
			this.clearRepos()
			this.reposRequest(this.view.searchInput.value);
			this.view.searchError.textContent = '';
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
}