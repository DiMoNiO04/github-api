export class Log{
	counterMessage(counter) {
		return counter ? `Найдено ${counter} репозиториев` : 'По данному поиску ничего не найдено. Повторите поиск';
	}
}