import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin User",
		email: "admin@domain.com",
		password: bcrypt.hashSync("1234", 10),
		isAdmin: true,
	},
	{
		name: "Ananth K",
		email: "ananth@domain.com",
		password: bcrypt.hashSync("1234", 10),
		isAdmin: true,
	},
	{
		name: "Durga P",
		email: "durga@domain.com",
		password: bcrypt.hashSync("1234", 10),
		isAdmin: true,
	},
	{
		name: "Rajesk K",
		email: "raj@domain.com",
		password: bcrypt.hashSync("1234", 10),
		isAdmin: true,
	},
];

export default users;
