import Employee from "../models/employee.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signup(req, res) {
	const { firstname, lastname, email,  contact } = req.body;
	console.log("user is trying to signup");
	const find = await Employee.findOne({ email });
	if (find != null) {
		console.log('find: ', find);
		return res.status(400).json({ message: "Employee already exists" });
	}
	await cloudinary.uploader
		.upload_stream((err, result) => {
			if (err) {
				console.error("Cloudinary upload error:", err);
				return res.status(400).json(err);
			}
			console.log(result);
			const employee = new Employee({
				firstname,
				lastname,
				email,
				contact,
				imgUrl: result.secure_url,
			});
			employee
				.save()
				.then((data) => {
					console.log("Employee created succsesfully...");
					res
						.status(201)
						.json({ message: "Employee created successfully", data });
				})
				.catch((error) =>{
					console.log("Employee creation failed...");
					console.log(error);
					 res.status(400).json(error)
					});

			return res.status;
		})
		.end(req.file.buffer);
}

function login(req, res) {
	const { email, password } = req.body;
	console.log(email, password);
	Employee.findOne({ email })
		.then((data) => {
			if (data) {
				console.log('credentials: ', data);
				console.log('password: ', password);
				console.log('data.password: ', data.password);
				bcrypt.compare(password, data.password, (err, result) => {
					if (err) {
						console.log(err);
						return res.status(400).json({ message: "Invalid Credentials" });
					}
					console.log("role: ", data.role);
					if (result) {
						const payload = {
							role: data.role,
							id: data._id,
							name: data.name,
							email: data.email,
							contact: data.contact,
							imgUrl: data.imgUrl,
						};
						const token = jwt.sign(payload, process.env.JWT_SECRET, {
							expiresIn: process.env.JWT_EXPIRES,
						});
						res.status(200).json({ message: "Login Successful", token });
					} else {
						res.status(400).json({ message: "Invalid Credentials" });
					}
				});
			} else {
				res.status(400).json({ message: "Invalid Credentials" });
			}
		})
		.catch((error) => {
			res.status(400).json(error);
		});
}

function getEmployee(req, res) {
	Employee.find({ role: { $ne: "admin" } })
	.then((data) => {
		res.status(200).json(data);
	})
	.catch((error) => {
		res.status(400).json(error);
	});
}

function getEmployeeById(req, res) {
	const { id } = req.params;
	Employee.findById(id)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(400).json(error);
		});
}

async function updateEmployee(req, res) {
	try {
		console.log('updating employee');
		const { id } = req.params;
		const user = await Employee.findById(id);
		if (!user) {
			return res.status(404).json({ message: "Employee not found" });
		}

		const {
			email = user.email,
			firstname = user.firstname,
			lastname = user.lastname,
			contact = user.contact,
		} = req.body;

		let imgUrl = user.imgUrl;

		if (req.file) {
			const result = await new Promise((resolve, reject) => {
				cloudinary.uploader
					.upload_stream((err, result) => {
						if (err) return reject(err);
						resolve(result);
					})
					.end(req.file.buffer);
			});

			imgUrl = result.secure_url;
		}

		const updatedEmployee = await Employee.findByIdAndUpdate(
			id,
			{ firstname, lastname, email, contact, imgUrl },
			{ new: true }
		);

		res.status(200).json({
			message: "Employee updated successfully",
			data: updatedEmployee,
		});
	} catch (error) {
		console.error("Update error:", error);
		res.status(500).json({ message: "Server error", error });
	}
}

function deleteEmployee(req, res) {
	const { id } = req.params;
	Employee.findByIdAndDelete(id)
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((error) => {
			res.status(400).json(error);
		});
}

export {
	signup,
	login,
	getEmployee,
	getEmployeeById,
	updateEmployee,
	deleteEmployee,
};
