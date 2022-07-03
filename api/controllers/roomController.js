const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const error = require("../utils/error");
exports.createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid;

	const newRoom = new Room(req.body);
	try {
		const savedRoom = await newRoom.save();

		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id },
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json(savedRoom);
	} catch (err) {
		next(err);
	}
};
exports.updatedRoom = async (req, res, next) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedRoom);
	} catch {
		next(err);
	}
};
exports.deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid;
	try {
		await Room.findByIdAndDelete(req.params.id);
		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.id },
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json("Room Deleted");
	} catch {
		next(err);
	}
};
exports.getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id);
		res.status(200).json(room);
	} catch {
		next(err);
	}
};
exports.getAllRoom = async (req, res, next) => {
	try {
		const rooms = await Room.find();
		res.status(200).json(rooms);
	} catch (err) {
		next(err);
	}
};
