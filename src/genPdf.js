const fs = require('fs');
const output = require('d3node-output');
const D3Node = require('d3-node')
const d3n = new D3Node()      // initializes D3 with container element
const d3 = require('d3');
const PdfPrinter = require('pdfmake');

let _seed = Date.now();

let rand = function (min, max) {
    var seed = _seed;
    min = min === undefined
        ? 0
        : min;
    max = max === undefined
        ? 1
        : max;
    _seed = (seed * 9301 + 49297) % 233280;
    return min + (_seed / 233280) * (max - min);
};


let randomScalingFactor = function () {
    let result = Math.round(rand(0, 100));
    return result;
};
let w = 400;
let h = 300;
let barPadding = 1;

let dataset = [];
for (let idx = 0; idx < 10; idx++) {
    let key = 'Product ' + idx;
    dataset.push(
        {
            'key': key,
            value: randomScalingFactor()
        }
    )
};

console.log('dataset', dataset);
let xScale = d3.scaleBand()
    .range([0, w])
    .padding(0.1)
    .domain(dataset.map((d) => d.key));

let yScale = d3.scaleLinear()
    .range([h, 0])
    .domain([0, d3.max(dataset, (d) => d.value)]);


let svgObj = d3n.createSVG().append('g')
    .attr('width', w)
    .attr('height', h);

svgObj.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', function (d, i) {
        return xScale(d.key);
    })
    .attr('y', function (d) {
        console.log('y', d.value);
        return h - yScale(d.value);
    })
    .attr('width', xScale.bandwidth())
    .attr('height', function (d) {
        return yScale(d.value);
    })
    .attr('fill', function (d) {
        return 'rgb(0, 0, ' + (255 - Math.round(d.value * 2)) + ')';
    })

console.log('svgObj', d3n.svgString())

let fonts = {
    Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
    },
};
let printer = new PdfPrinter(fonts);


let tableBody = [];
tableBody.push(['Name', 'Value'])
dataset.forEach(entry => {
    tableBody.push([entry.key, entry.value])
})
console.log('tableBody', tableBody);
let docDefinition = {
    content: [

        {
            layout: 'lightHorizontalLines', // optional
            table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers

                headerRows: 1,
                body: tableBody
            }
        },
        {
            // If no width/height/fit is used, then dimensions from the svg element is used.
            svg: d3n.svgString(),
            fit: [150, 100]
        },
    ],
    defaultStyle: {
        fontSize: 15,
        font: 'Helvetica'
    }
};


let pdfDoc = printer.createPdfKitDocument(docDefinition)
pdfDoc.pipe(fs.createWriteStream('document.pdf'));
pdfDoc.end();