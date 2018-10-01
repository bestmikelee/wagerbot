import shortId from 'shortid';

interface parsedTernary {
	condition: string;
	ifTrue: string;
	ifFalse: string;
}

function _parseTernary(message: string): parsedTernary {
	const conditionIndex: number = message.indexOf('?');
	const separatorIndex: number = message.indexOf(':');
	return {
		condition: message.slice(0, conditionIndex).trim(),
		ifTrue: message.slice(conditionIndex + 1, separatorIndex).trim(),
		ifFalse: message.slice(separatorIndex + 1).trim(),
	};
}

function _parseUsers(stringWithUser: string): string {
	const tagIndex: number = stringWithUser.indexOf('@');
	const spaceAfterIndex: number = stringWithUser.slice(tagIndex).indexOf(' ');
	return stringWithUser.slice(tagIndex + 1, spaceAfterIndex);
}

function createNewBet(betData: Slack.slashCommandRequest): Book.bet {
	const betConditional = _parseTernary(betData.text);
	return Object.assign(
		{
			id: shortId.generate(),
			time_created: Date.now(),
			time_accepted: null,
			bettor_id: betData.user_id,
			bettor: betData.user_name,
			taker: _parseUsers(betConditional.condition),
			meta: betData,
		},
		betConditional
	);
}

function generateResponseText(bookBet: Book.bet): string {
	return `[${bookBet.id}] \`${bookBet.bettor}\` just bet \`${
		bookBet.taker
	}\`! --\`${bookBet.ifTrue}\` if \`${bookBet.condition}\` is met and \`${
		bookBet.ifFalse
	}\` if not met`;
}

function generateWagerText(bookBet: Book.bet): string {
	return `[${bookBet.id}] \`${bookBet.bettor}\` just bet you! --\`${
		bookBet.ifTrue
	}\` if \`${bookBet.condition}\` is met and \`${bookBet.ifFalse}\` if not met`;
}
export default {
	createNewBet,
	generateResponseText,
	generateWagerText,
};
