const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
/*
  this function creates the sql for an update/put request from the json converting
  it to valid sql.It enumerates the paramters to use variables in sql to 
  prevent sql injection rather than direcrtly referencing the passed in variable
  this provides dynamic functionality to the update function so it 
  works on any permutation of variables.

  {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
*/

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
