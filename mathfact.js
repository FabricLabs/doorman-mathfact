module.exports = function (Doorman) {
	return {
		commands: [
			'mathfact'
		],
		'mathfact': {
			usage: '!mathfact',
			description: 'Gives a Random Math Fact.',
			process: (msg, suffix, isEdit, cb) => {
				request('http://numbersapi.com/random/math?json',
					function (err, res, body) {
						try {
							if (err) throw err;
							var data = JSON.parse(body);
							if (data && data.text) {
								cb({
									embed: {
										color: Doorman.Config.discord.defaultEmbedColor,
										title: 'Math Fact',
										description: data.text
									}
								}, msg);
							}
						} catch (err) {
							var msgTxt = `command math_fact failed :disappointed_relieved:`;
							if (Doorman.Config.debug) {
								msgTxt += `\n${err.stack}`;

								Doorman.logError(err);
							}
							cb(msgTxt, msg);
						}
					});
			}
		}
	}
}