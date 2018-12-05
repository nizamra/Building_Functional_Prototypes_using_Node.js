var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(':memory:');

db.serialize(function(){
    //create table
    db.run('CREATE TABLE Contacts (first_name TEXT, last_name TEXT, age INTEGER)');

    //insert values
    db.run('INSERT INTO Contacts VALUES ("John", "Doe", 25)');
    db.run('INSERT INTO Contacts VALUES ("Jane", "Doe", 19)');
    db.run('INSERT INTO Contacts VALUES ("Sue", "Smith", 42)');

    //queries
    db.all('SELECT * FROM Contacts', processRows);
    db.each('SELECT * FROM Contacts', processRow);
    db.each('SELECT * FROM Contacts WHERE last_name = "Doe"', processRow);
    var firstName = 'John';
    db.get('SELECT * FROM Contacts WHERE first_name = ?', [firstName], function(err, row){
        console.log("Get John's Age:");
        if(err){
            console.log("ERROR: " + err.message);
        }
        else{
            console.log(row.age);
        }
    });
});


function processRows(err, rows){
    console.log("PROCESS ROWS");
    if(err){
        console.log("ERROR: " + err.message);
    }
    else{
        for(var i = 0; i < rows.length; i++){
            console.log(rows[i].first_name);
        }
    }
}

function processRow(err, row){
    console.log("PROCESS ROW");
     if(err){
        console.log("ERROR: " + err.message);
    }
    else{
        console.log(row.first_name);
    }
}

db.close();




// var sqlite3 = require('sqlite3');
// var db = new sqlite3.Database(':memory:');

// db.serialize(function(){
//     //create table
//     db.run('CREATE TABLE Contracts (first_name TEXT, last_name TEXT, age INTEGER)');

//     //insert values
//     db.run('INSERT INTO Contracts VALUES ("John", "Doe", 25)');
// });
// db.close();

// // Running Select Statements:
// // all(): run a SELECT statement and process the resulting set of rows
// // each(): run a SELECT statement and process one resulting row at a time
// // get(): run a SELECT statement and process the first result (if it exists)

// //  db.<method>(sql, params, callback);
// // The first parameter is a string containing the SQL statement you wish to execute.
// // The second parameter is optional. This contains an array of any necessary parameters that should be added to the SQL statement.
// // The third parameter, the callback function, differs for each method based on the type of result the method provides for processing.

// //This executes a SELECT statement on the Contacts table of a database, and uses the callback function processRows to log the name of each contact to the console.
// db.all('SELECT * FROM Contacts', processRows);
// function processRows(err, rows){
//   if(err){
//     console.log("ERROR: " + err.message);
//   }
//   else{
//     for(var i = 0; i < rows.length; i++){
//       console.log(rows[i].name);
//     }
//   }
// }

// //This code executes a SELECT statement on the Contacts table of a database, and uses the callback function processRow to log the name of each contact to the console.
// db.each('SELECT * FROM Contacts', processRow);

// function processRow(err, row){
//     if(err){
//         console.log("ERROR: " + err.message);
//     }
//     else{
//         console.log(row.name);
//     }
// }

// //This code executes a SELECT statement on the Contacts table of a database, filtering by name, and uses the callback function processRow to log the age property of the Contact entry that is returned.
// db.get('SELECT * FROM Contacts WHERE first_name = ?', [firstName], function(err, row){
//   if(err){
//     console.log("ERROR: " + err.message);
//   }
//   else{
//     console.log(row.age);
//   }
// });
