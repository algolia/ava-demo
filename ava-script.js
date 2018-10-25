// Default node memory is limited to 512mb.  Run the following to override.
// node --max-old-space-size=8000 ava-scripts.js
// Script can take over a minute to execute.
const fs = require('fs');
const data = require('./products_PROD.products_DEV.json') ;


const parseJSON = (ln = 2, arr) => {
  console.log('Script begin');
  var newData = [];
  var count = 0;
  var lnJSON = 'FRdata.json';
  if (ln === 1) {
    lnJSON = 'NLdata.json'
  }

  arr.forEach((el) => {
    let obj = {};
    obj.objectID = el._id;
    obj.title = el.Descriptions[ln].Description;
    obj.brand = el.Brand.Descriptions[2].Description;
    // Extra
    if (el.GroupLevels[1]) obj.subCategory = el.GroupLevels[1].Descriptions[ln].Description;
    if (el.GroupLevels[2]) obj.fineCategory = el.GroupLevels[2].Descriptions[ln].Description;
    if (el.GroupLevels[0]) obj.category = el.GroupLevels[0].Descriptions[ln].Description;
    if (el.Colours && el.Colours[0]) {
      if (el.Colours[0].Pictures[0]) obj.image = el.Colours[0].Pictures[0].Picture
      if (el.Colours[0].Descriptions[ln]) obj.colours = el.Colours[0].Descriptions[ln].Description
      if (el.Colours[0].BaseColours) obj.basecolour = el.Colours[0].BaseColours.Descriptions[ln].Description
      if (el.Colours[0].Skus[0]) obj.sku = el.Colours[0].Skus[0].Id
    }
    newData.push(obj);
    count++;
    console.log(count);
  });

  fs.writeFile(lnJSON, JSON.stringify(newData, null, 2), 'utf-8', function(err) {
    if (err) throw err;
      console.log(`Your index has been exported to ${lnJSON}!`);
  });
}


const generateJSON = () => {
  const options = {
    autoClose: true,
  };

  const writeStream = fs.createWriteStream(fileName, options);
  let i = 0;
  const write = () => {
    let ok = true;
    do {
      i += 1;
      if (i === 1) {
        writeStream.write(`[${JSON.stringify(createEntry(i))}`);
      } else {
        ok = writeStream.write(`,${JSON.stringify(createEntry(i))}`);
      }
    } while (i < entryNum && ok);
    if (i < entryNum) {
      writeStream.once('drain', write);
    } else {
      writeStream.write(']');
    }
  };
  write();
}


// FR === 2
// NL === 1
// EN === 0
parseJSON(2, data)
// 82776 records
