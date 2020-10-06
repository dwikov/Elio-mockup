
anychart.data.loadJsonFile('https://static.anychart.com/git-storage/word-press/data/network-graph-tutorial/data.json', function (data) {
    // create a chart from the loaded data
    var chart = anychart.graph(data);

    // set the title
    //chart.title("graph sample");

    // draw the chart
    // set the size of nodes
    var nodes = chart.nodes();
    var edges = chart.edges();

    nodes.normal().height(50);
    nodes.hovered().height(60);
    nodes.selected().height(60);
    nodes.normal().fill("#008000");
    nodes.hovered().fill("#006400");
    nodes.selected().fill("#ADFF2F");
    chart.background().fill("black");
    chart.layout().iterationCount(5000);
    chart.container("graphContainer").draw();

})

var serverUrl = "http://13.58.99.80:5000/";

var data = {title:"ks rabak"};
fetch(serverUrl, {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

function Dataset(props){
    return (
        <div className={"dataset"}>
            <h1>{props.title}</h1>
            <h2>{props.date}</h2>
            <hr/>
        </div>
    );
}

class SearchResult extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            results: [
                {
                    "title" : "First sample dataset",
                    "date" : "10/10/2020"
                },
                {
                    "title" : "Second sample dataset",
                    "date" : "15/2/2015"
                }
            ]
        };
    }
    update(){
        /*
        GET request
        {
            "results" : [
                {
                    "title" : (title),
                    "data": (data),
                },
                {

                },
                {

                }
            ]
        }
         */
        fetch(serverUrl+"")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render(){
        var jsx = [];
        for(let i=0;i<this.state.results.length;i++){
            console.log(this.state.results[i]["title"]);
            jsx.push(<Dataset title={this.state.results[i]["title"]} date={this.state.results[i]["date"]} key={i}/>);
        }
        return jsx;
    }
}

ReactDOM.render(
    <SearchResult/>,
    document.getElementById('searchResultsContainer')
);


