import { EventEmitter } from "node:events";

class UserAuthentication extends EventEmitter {}

const userAuth = new UserAuthentication();
userAuth.on("userLoggedIn", (user) => {
	console.log(Date.now() + ": User '" + user + "' logged in");
});
userAuth.on("userLoggedOut", (user) => {
	console.log(Date.now() + ": User '" + user + "' logged out");
});

function emit_login(user) {
	const time = 100 + 1900 * Math.random();
	setTimeout(() => {
		userAuth.emit("userLoggedIn", user);
		emit_logout(user);
	}, time);
}

function emit_logout(user) {
	const time = 100 + 1900 * Math.random();
	setTimeout(() => {
		userAuth.emit("userLoggedOut", user);
		emit_login(user);
	}, time);
}

for (const user of [1, 2, 3, 4, 5]) {
	emit_login(user);
}
