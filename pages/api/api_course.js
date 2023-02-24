import { format } from 'date-fns';

export default function handler(req, res) {
  const csv = require("fast-csv");
  const fs = require("fs");
  const path = require('path');


  const filePath = path.join(process.cwd(), 'public', 'DataBases', 'courses.csv');


  if (req.method === "POST") {
    const formData = req.body;

    let data = [];
    
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed : POST");
        const newComment = [
          {
            id: Date.now(),
            firstname: formData.firstname,
            lastname: formData.lastname,
            year: formData.year,
            date: formData.newdate,
            subject: formData.newsubject,
            paid: false
          },
        ];
        data = data.concat(newComment);
        csv.writeToStream(
          fs.createWriteStream(filePath),
          data,
          { headers: true ,includeEndRowDelimiter: true}
        );
        console.log("Added new comment to CSV file");
        res.status(200).json({ data: newComment });
      });
  } else if (req.method === "GET") {
    const data = [];

    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed : GET");
        res.status(200).json({ data });
      });
  }
  else if (req.method === "PUT") {
    const updatedData = req.body;
    console.log(updatedData)
    let data = [];
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true }))
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed : PUT");
        data = data.map((d) => {
          if (d.id === updatedData.id) {
            d.firstname = updatedData.firstname;
            d.lastname = updatedData.lastname;
            d.year = updatedData.year;
            d.date = updatedData.date;
            d.subject = updatedData.subject;
            d.paid = updatedData.paid;
          }
          return d;
        });

        csv.writeToStream(fs.createWriteStream(filePath), data, { headers: true ,includeEndRowDelimiter: true});
        console.log("Edited element in CSV file");
        res.status(200).json({ data: data.find((d) => d.id === updatedData.id) });
        
      });
  }
  else if (req.method === "DELETE") {
    const id = req.body.id;
    console.log(req)
    console.log(req.body.id)
    let data = [];
    fs.createReadStream(filePath)
    .pipe(csv.parse({ headers: true }))
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
    console.log("CSV file successfully processed : DELETE");
    data = data.filter((d) => d.id !== id);
    ///console.log(data)
    csv.writeToStream(fs.createWriteStream(filePath), data, { headers: true, includeEndRowDelimiter: true });
    console.log("Deleted element from CSV file");
    res.status(200).json({ message: "Deleted successfully" });
    });
    }
}
