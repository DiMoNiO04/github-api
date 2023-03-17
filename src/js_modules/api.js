'use strict';

//Importing Constants
import { REPO_PER_PAGE } from "./variables.js";
import { URL } from "./variables.js";

//How many records to display per page
export class Api {
	async loadRepos(value, page) {
		return await fetch(`${URL}search/repositories?q=${value}&per_page=${REPO_PER_PAGE}&page=${page}`)
	}
}