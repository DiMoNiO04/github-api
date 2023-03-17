'use strict';

//Importing Constants
import { EMPTY_SEARCH_VALUE } from './variables.js';
import { NO_ENOUGH_VALUE } from './variables.js'
import { FILL_FORM } from './variables.js';
import { ENTER_MORE_CHARACTERS } from './variables.js';
import { NOTHING_FOUND } from './variables.js';


export class Log{

	//Search result output
	counterMessage(counter) {
		return counter ? `Найдено ${counter} репозиториев` : NOTHING_FOUND;
	}

	//Displaying a message in case of an error
	errorMessage(exodus) {
		if(exodus === EMPTY_SEARCH_VALUE) {
			return FILL_FORM;
		} else if(exodus == NO_ENOUGH_VALUE) {
			return ENTER_MORE_CHARACTERS;
		} else {
			return '';
		}
	}
}