/// <reference path="../types/book.d.ts" />

import db from '../services/db';
import Dao from 'enum';

async function getBet(id: string): Promise<Book.bet> {
	const serializedBet = await db.get(_getBetId(id), {
		asBuffer: false,
	});
	if (typeof serializedBet == 'string') {
		const bet: Book.bet = JSON.parse(serializedBet);
		return bet;
	}
	return undefined;
}

async function putBet(id: string, data: Object) {
	return await db.put(_getBetId(id), JSON.stringify(data));
}

async function delBet(id: string) {
	return await db.del(_getBetId(id));
}

function _getBetId(id: string): string {
	return `${Dao.BET}:${id}`;
}

export default {
	getBet,
	putBet,
	delBet,
};
