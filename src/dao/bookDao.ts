/// <reference path="../types/book.d.ts" />

import db from '../services/db';
import Dao from 'enum';

async function getUserBook(id: string): Promise<Book.bet[]> {
	const serializedBet = await db.get(_getUserBookId(id));
	if (typeof serializedBet == 'string') {
		const bet: Book.bet[] = JSON.parse(serializedBet);
		return bet;
	}
	return [];
}

async function addToUserBook(id: string, data: Book.bet) {
	let userBook: Book.bet[];
	try {
		userBook = await getUserBook(id);
	} catch (e) {
		userBook = [];
	}

	userBook.push(data);
	return await db.put(_getUserBookId(id), JSON.stringify(userBook));
}

async function delUserBook(id: string) {
	return await db.del(_getUserBookId(id));
}

function _getUserBookId(id: string): string {
	return `${Dao.BOOK}:${Dao.USER}:${id}`;
}

export default {
	getUserBook,
	addToUserBook,
	delUserBook,
};
