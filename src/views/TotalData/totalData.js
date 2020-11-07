import React from 'react';
import './totalData.css';

class IndiaData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { totalData: { confirmed: 0, tested: 0, recovered: 0, deceased: 0 } }
    }

    componentDidMount() {
        this.fillData(this.props.rawData);
    }

    render() {
        return (
            <div>
                <div className="cards">
                    <div className="card" id="card1">
                        <p className="heading"> Confirmed</p>
                        <span className="data">{this.state.totalData.confirmed}</span>
                    </div>
                    <div className="card" id="card2">
                        <p className="heading"> Tested</p>
                        <span className="data">{this.state.totalData.tested}</span>
                    </div>
                    <div className="card" id="card3">
                        <p className="heading"> Recovered</p>
                        <span className="data">{this.state.totalData.recovered}</span>
                    </div>
                    <div className="card" id="card4">
                        <p className="heading"> Deceased</p>
                        <span className="data">{this.state.totalData.deceased}</span>
                    </div>
                </div>
            </div>
        );
    }

    fillData = (requestData) => {
        let { totalData } = this.state;
        for (let key in requestData) {
            totalData.confirmed += requestData[ key ].total?.confirmed || 0;
            totalData.deceased += requestData[ key ].total?.deceased || 0;
            totalData.recovered += requestData[ key ].total?.recovered || 0;
            totalData.tested += requestData[ key ].total?.tested || 0;
        }
        totalData.confirmed = totalData.confirmed.toLocaleString();
        totalData.deceased = totalData.deceased.toLocaleString();
        totalData.recovered = totalData.recovered.toLocaleString();
        totalData.tested = totalData.tested.toLocaleString();
        console.log("Total data", requestData);
        this.setState({ totalData: totalData });
    }
}

export default IndiaData;
