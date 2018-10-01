declare namespace Slack {
	interface messageAction {
		type: 'message_action';
		token: string;
		action_ts: string;
		team: {id: string; domain: string};
		user: {id: string; name: string};
		channel: {id: string; name: string};
		callback_id: string;
		trigger_id: string;
		message_ts: string;
		message: message;
		response_url: string;
	}

	interface message {
		type: string;
		user: string;
		text: string;
		client_msg_id: string;
		ts: string;
	}

	interface slashCommandRequest {
		token: string;
		team_id: string;
		team_domain: string;
		channel_id: string;
		channel_name: string;
		user_id: string;
		user_name: string;
		command: string;
		text: string;
		response_url: string;
		trigger_id: string;
	}

	interface interactiveMessage {
		type: 'interactive_message';
		actions: [
			{
				name: string;
				type: string;
				value: string;
			}
		];
		callback_id: string;
		team: {id: string; domain: string};
		channel: {id: string; name: string};
		user: {id: string; name: string};
		action_ts: string;
		message_ts: string;
		attachment_id: string;
		token: string;
		is_app_unfurl: boolean;
		original_message: {
			type: string;
			user: string;
			text: string;
			bot_id: string;
			attachments: any;
			ts: string;
		};
		response_url: string;
		trigger_id: string;
	}
}
