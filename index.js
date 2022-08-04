const fs = require('fs');
const dirPath = "./files/";
const filePath = "./files/hello.txt";

// Sync - Blocking Code

// Read files

// const content = fs.readFileSync(filePath);
// const content = fs.readFileSync(filePath,'utf-8');
// const content = fs.readFileSync(filePath,{encoding:'utf-8'});
// console.log(content);

if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath,{encoding:'utf-8'});
    console.log(content);
} else {
    console.log(`${filePath} not found`);
}

// Write files
if (fs.existsSync(dirPath)) {
    // fs.writeFileSync(dirPath + "/writeFile.txt", "some written text");
    fs.writeFileSync(dirPath + "/writeFile2.txt", "\nsome text", { flag: "a" });
} else {
    console.log(`${dirPath} not found`);
}

// Update/Append files
if (fs.existsSync(dirPath)) {
    fs.appendFileSync(dirPath + "/writeFile.txt", "some update text");
} else {
    console.log(`File not found`);
}

// Rename files
if (fs.existsSync(dirPath + "/writeFile.txt")) {
    fs.renameSync(dirPath + "/writeFile.txt", dirPath + "/writeFile2.txt");
} else {
    console.log(`File not found`);
}


// Delete files
if (fs.existsSync(dirPath + "/writeFile3.txt")) {
    fs.unlinkSync(dirPath + "/writeFile3.txt");
} else {
    console.log(`File not found`);
}

// Async -Non-Blocking Code
// Read files
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) console.log(err.message);
    else console.log(data);
});


// Write files
fs.writeFile(dirPath + "/writeFile.txt", "some text", (err) => {
    if (err) console.log(err.message)
    else console.log("Data is saved")
});

// Update/Append files
fs.appendFile(dirPath + "/writeFile.txt", "\nsome updated text", (err) => {
    if (err) console.log(err.message);
    else console.log("Data is appended");
});

// Deleted files
fs.unlink(dirPath + "/writeFile.txt",(err) => {
    if (err) console.log(err.message);
    else console.log("file is deleted");
});

// Work with images
let img = Buffer.from(fs.readFileSync("./grow.jpg"), "base64");
fs.writeFileSync(dirPath + "/copied.jpg", img);
// fs.writeFileSync(dirPath + "/copied.png", img);

// Promise- Read File
function myReadFile(path, encoding) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, encoding, (err, data) => {
            if (err) {
                reject(err.message);
            } else {
                resolve(data);
            }
        })
    })
}

myReadFile(filePath, "utf8")
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    })

// Promise Read File




