function upload(formData) {
    const csv = formData.getAll('csv');
    const promises = csv.map((x) => getImage(x).then((products) => products));
    return Promise.all(promises);
}

function getImage(file) {
    const reader = new FileReader();

    reader.onload = (function (theFile) {
        return function (e) {
            //call the parse function with the proper line terminator and cell terminator
            csvJSON(e.target.result);
        };
    })(file);
    //reader.readAsText(file);
    //fReader.readAsDataURL(file);
}

function csvJSON(csv) {
    var lines = csv.split('\n');
    var result = [];

    // NOTE: If your columns contain commas in their values, you'll need
    // to deal with those before doing the next step
    // (you might convert them to &&& or something, then covert them back later)
    // jsfiddle showing the issue https://jsfiddle.net/
    var headers = lines[0].split(';');

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(';');

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = isNaN(Number(currentline[j])) ? currentline[j] : Number(currentline[j]);
        }

        result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

export { csvJSON };

function csvJSON_text(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = strDelimiter || ',';

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        // Delimiters.
        '(\\' +
            strDelimiter +
            '|\\r?\\n|\\r|^)' +
            // Quoted fields.
            '(?:"([^"]*(?:""[^"]*)*)"|' +
            // Standard fields.
            '([^"\\' +
            strDelimiter +
            '\\r\\n]*))',
        'gi'
    );

    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;

    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while ((arrMatches = objPattern.exec(strData))) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];
        }

        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return arrData;
}
