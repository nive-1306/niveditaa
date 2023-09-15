import cheerio from "cheerio";
import axios from "axios";
import { parse } from 'json2csv';
import { writeFileSync } from 'fs';

const url = "https://www.use.or.ug/content/corporate-announcements";

const results = [];

(async () => {
  const res = await axios(url);
 
  const $ = cheerio.load(res.data);

  const dataelem = $("tbody>tr");
  
  for (const element of dataelem) {
       const titleElement = $(element).find("a");
    const announcement = titleElement.text().trim();

    const sizeElement = $(element).find("td:nth-child(2)");
    const size = sizeElement.text();

    const dateElement = $(element).find("td:nth-child(3)");
    const date = dateElement.text();

       results.push({ announcement, size, date });
  }
  const csv = parse(results); 
    //console.log(results);
    console.log(csv);
    writeFileSync('announcements.csv', csv);
})();