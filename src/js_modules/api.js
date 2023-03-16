'use strict';

//How many records to display per page
const REPO_PER_PAGE = 10;
const URL = 'https://api.github.com/';

export class Api {
	
	async loadRepos(value, page) {
		return await fetch(`${URL}search/repositories?q=${value}&per_page=${REPO_PER_PAGE}&page=${page}`)
	}
}