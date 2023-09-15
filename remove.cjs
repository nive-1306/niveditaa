const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const inputFilePath = 'announcements.csv'; // Replace with the path to your CSV file
const outputFilePath = 'output.csv'; // Replace with the desired output path
const columnToRemove = 'date'; // Replace with the name of the column you want to remove
const results = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Remove the specified column
    delete row[columnToRemove];
    
    results.push(row);
  })
  .on('end', () => {
    // Write the modified data to a new CSV file
    const csvWriter = createCsvWriter({
      path: outputFilePath,
      header: Object.keys(results[0]).map((date) => ({ id: date, title: date })),
    });

    csvWriter
      .writeRecords(results)
      .then(() => console.log(`Column "${columnToRemove}" removed and saved to ${outputFilePath}`));
  });
  