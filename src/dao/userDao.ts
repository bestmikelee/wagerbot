/// <reference path="../types/book.d.ts" />

import db from '../services/db';
import Dao from '../types/enum';

async function getUser(id: string): Promise<User.info> {
	const serializedUser = await db.get(_getUserId(id), {
		asBuffer: false,
	});
	if (typeof serializedUser == 'string') {
		const user: User.info = JSON.parse(serializedUser);
		return user;
	}
	return undefined;
}

async function getUserByName(username: string): Promise<User.info> {
	const serializedUser = await db.get(_getUserName(username), {
		asBuffer: false,
	});
	if (typeof serializedUser == 'string') {
		return await getUser(serializedUser);
	}
	return undefined;
}

async function saveUsername(username: string, id: string) {
	return await db.put(_getUserName(username), id);
}

async function putUser(id: string, data: Object) {
	return await db.put(_getUserId(id), JSON.stringify(data));
}

async function delUser(id: string) {
	return await db.del(_getUserId(id));
}

function _getUserId(id: string): string {
	return `${Dao.USER}:${id}`;
}

function _getUserName(name: string): string {
	return `${Dao.USER}:name:${name}`;
}

export default {
	getUser,
	putUser,
	delUser,
	getUserByName,
	saveUsername,
};
