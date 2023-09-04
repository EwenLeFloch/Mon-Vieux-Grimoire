const multer = require("multer");

// To verify the file extension

const whitelist = [".png", ".jpeg", ".jpg", ".webp"];

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		callback(null, name);
	},
});

const filter = (req, file, callback) => {
	const ext = path.extname(file.originalname).toLowerCase();

	if (ext !== whitelist) {
		return callback(new Error("Ce type de fichier n'est pas authorisé"));
	}

	callback(null, true);
};

module.exports = multer({ storage: storage, fileFilter: filter }).single(
	"image"
);
