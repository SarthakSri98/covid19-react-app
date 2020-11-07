import React from 'react';
import './dataTable.css';
import { Link } from 'react-router-dom';
import TotalData from '../../views/TotalData/totalData';
import * as constant from '../../utils/constants/constants';
import Loader from '../../common/Loader/loader';

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array: null, mainHeading: "India" }
        this.stateCodeMap = constant.stateIdMap;
    }

    componentDidMount() {
        if (!this.props.match) {
            console.log("States data", this.props.rawData);
            this.setState({ array: this.props.rawData });
        }
        else {
            this.setArrayForDistricts();
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.match && this.props.match.params.id !== prevProps.match.params.id) {
            this.setArrayForDistricts();
        };
    };

    render() {
        if (!this.state.array) {
            return (
                <div>
                    <Loader />
                </div>
            )
        }

        return (
            <div>
                <h1 className="mainHeading">{this.state.mainHeading}</h1>
                <TotalData rawData={this.state.array} />
                <table id="dataTable">
                    <thead>
                        <tr>
                            {
                                this.props.match ? <th>Districts</th> : <th>States</th>
                            }
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Tested</th>
                            <th>Deceased</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.array && Object.keys(this.state.array).map((stateId, i) => {
                                return (
                                    (this.stateCodeMap[ stateId ] || this.props.match) && <tr key={i}>
                                        {
                                            this.props.match ? <td>{stateId}</td> : <td><Link to={`/state/${stateId}`}>{this.stateCodeMap[ stateId ]}</Link></td>
                                        }
                                        <td>{this.state.array[ stateId ].total.confirmed?.toLocaleString() || "N/A"}</td>
                                        <td>{this.state.array[ stateId ].total.recovered?.toLocaleString() || "N/A"}</td>
                                        <td>{this.state.array[ stateId ].total.tested?.toLocaleString() || "N/A"}</td>
                                        <td>{this.state.array[ stateId ].total.deceased?.toLocaleString() || "N/A"}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

    setArrayForDistricts() {
        let { match: { params }, mainHeading } = this.props;
        mainHeading = this.stateCodeMap[ params.id ];
        let arrayData = this.props.rawData[ params.id ].districts;
        console.log("District data", arrayData);
        this.setState({ array: arrayData, mainHeading: mainHeading });
    }

}

export default DataTable;
