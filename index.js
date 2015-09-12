var body;
var argumentPassed = [];
var exec = require('child_process').exec,child;
var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

process.argv.forEach(function (val, index, array) {
	argumentPassed.push(val);
});
	
rl.question("Enter Your Email Body:  ", function(answer) {
	body = answer;
	var email = argumentPassed[2];
	var subject = argumentPassed[3];
	sendEmail({email,subject,body})
		.then(() => {
			console.log("Email Sent");
			rl.close();
			process.exit();
		})
		.catch(() => {
			console.log("Email was NOT sent, try again");
			process.exit();
		});
});

	


let sendEmail = ({email,subject,body}) => {
	console.log(email,subject,body);
	let promise = new Promise((resolve,reject) => {
		child = exec(`
		curl -s --user '${process.env.MG_API_KEY}' \
		https://api.mailgun.net/v3/sandboxacc9ca0bab254f2eacdf9fb2d196a837.mailgun.org/messages \
		-F from='Mailgun Sandbox <postmaster@sandboxacc9ca0bab254f2eacdf9fb2d196a837.mailgun.org>' \
		-F to='Pinank <${email}>'\
		-F subject='${subject}' \
		-F text='${body}'`,
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				reject();
			} else {
				resolve();
			}
		});
	});
	return promise;
};

