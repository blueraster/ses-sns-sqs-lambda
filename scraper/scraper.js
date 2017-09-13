const fs = require('fs');
const cheerio = require('cheerio');

// **** This can be used on the web for quick scraping.

// var a = document.querySelectorAll('tbody td'),
//     b = [];
// ​
// for(var i = 0; i < a.length; i = i + 8){
//     b.push({
//     	 type: a[i].innerHTML,
//     	 subtype: a[i + 1].innerHTML,
//     	 detail: a[i + 2].innerHTML,
//     	 to: a[i + 3].innerHTML,
//     	 error: a[i + 4].innerHTML,
//     	 date: a[i+ 5].innerHTML,
//     	 messageId: a[i + 6].innerHTML,
//     	 from: a[ i + 7 ].innerHTML,
//     })
// }
// ​
// console.log(b)

//**************

fs.readFile('targetReport.html', 'utf8', (err, data) => {
    if(err) throw err
    console.log('HTML File Loaded...');

    console.log('Starting Cheerio...')

    let $ = cheerio.load(data),
        output = [];
        els = [];


    els = $('tbody tr')
    els.each(( index, item ) => {
        output.push( {
                type: $(item.children[0].children[0]).text().trim('') || '',
                subtype: $(item.children[1].children[0]).text().trim('') || '',
                detail: $(item.children[2].children[0]).text().trim('') || '',
                to: $(item.children[3].children[0]).text().trim('') || '',
                error: $(item.children[4].children[0]).text().trim('') || '',
                date: $(item.children[5].children[0]).text().trim('') || '',
                messageId: $(item.children[6].children[0]).text().trim('') || '',
                from: $(item.children[7].children[0]).text().trim('') || '',
            } )
    } )


    console.log('Saving data to output.json')

    fs.writeFileSync('output.json', JSON.stringify(output, null, 3))

    console.log('Saving complete. Data saved to output.json')
})