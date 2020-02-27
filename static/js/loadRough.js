
let fillStyles = [
    'hachure',
    'cross-hatch',
    'zigzag',
    'dashed',
    'solid',
    'zigzag-line'
];

new roughViz.Bar({
    element: '#vis0',
    data: {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July'
        ],
        values: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()

        ]
    },
    //data: 'https://gist.githubusercontent.com/mbostock/3310560/raw/98311dc46685ed02588afdcb69e5fa296febc1eb/letter-frequency.tsv',
    title: 'Sales',
    stroke: 'coral',
    strokeWidth: 3,
    roughness: rand(1, 10),
    width: window.innerWidth * 0.7,
    color: 'pink',
    fillStyle: fillStyles[Math.floor(rand(0, fillStyles.length))],
    fillWeight: 1.5
});

new roughViz.StackedBar({
    element: '#vis1',
    data: [
        {
            month: 'January',
            A: randomScalingFactor(),
            B: randomScalingFactor(),
            C: randomScalingFactor()
        }, {
            month: 'February',
            A: randomScalingFactor(),
            B: randomScalingFactor(),
            C: randomScalingFactor()
        }, {
            month: 'March',
            A: randomScalingFactor(),
            B: randomScalingFactor(),
            C: randomScalingFactor()
        }

    ],
    labels: 'month',
    title: 'Monthly Sales',
    height: window.innerHeight * 0.7,
    width: window.innerWidth * 0.7,
    roughness: rand(1, 10),
    colors: [
        'blue', '#f996ae', 'skyblue', '#9ff4df'
    ],
    fillWeight: 0.35,
    strokeWidth: 0.5,
    fillStyle: fillStyles[Math.floor(rand(0, fillStyles.length))],
    stroke: 'black'
});

new roughViz.Line({
    element: '#vis2',
    data: 'https://raw.githubusercontent.com/jwilber/random_data/master/tweets.csv',
    title: 'Line Chart',
    // x: 'gdpPercap',
    y: 'favorites',
    y2: 'retweets',
    y3: 'tweets',
    yLabel: 'count',
    colorVar: 'continent',
    highlightLabel: 'country',
    highlight: 'red',
    fillWeight: 2,
    roughness: rand(0, 10),
    width: window.innerWidth * 0.7,
    height: 500
});

new roughViz.Pie({
    element: '#vis3',
    titleFontSize: '1.5rem',
    legend: true,
    margin: {
        top: 50,
        bottom: 100,
        left: 40,
        right: 100
    },
    data: {
        labels: [
            'Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'
        ],
        values: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    },
    strokeWidth: 3,
    roughness: rand(1, 10),
    width: window.innerWidth * 0.7,
    fillStyle: fillStyles[Math.floor(rand(0, fillStyles.length))],
    highlight: 'gold'
});