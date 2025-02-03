// controllers/userController.js
const XLSX = require('xlsx');
const User = require('../model/User');
const path = require('path');

// Function to process the uploaded Excel file
const processExcelFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(__dirname, '../public/uploads', req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Delete the uploaded file if necessary
    // fs.unlinkSync(filePath); // Uncomment if you want to delete the file after processing

    // Save each record to the database
    await User.insertMany(data);

    res.status(200).send('File processed and data saved successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing the file.');
  }
};


module.exports = { processExcelFile };
