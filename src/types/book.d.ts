declare namespace Book {
	interface bet {
		id: string;
		condition: string;
		ifTrue: string;
		ifFalse: string;
		time_created: number;
		time_accepted: number | null | undefined;
		bettor: string; // person creating bet
		bettor_id: string;
		taker: string; // person tagged in condition
		meta: {
			channel_id: string;
		};
	}
}
