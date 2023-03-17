'use strict';

export class Log{
	counterMessage(counter) {
		return counter ? `Найдено ${counter} репозиториев` : 'Ничего не найдено';
	}
}