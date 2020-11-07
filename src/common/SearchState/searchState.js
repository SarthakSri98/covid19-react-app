import React from 'react';
import './searchState.css';
import * as constant from '../../utils/constants/constants';
import { stateIdMap } from '../../utils/constants/constants';
import { withRouter } from 'react-router-dom';


class SearchState extends React.Component {
    constructor(props) {
        super(props);
        this.statesArray = [];
        for (let key in constant.stateIdMap) {
            this.statesArray.push({ stateCode: key, stateName: stateIdMap[ key ] });
        }
        this.state = { stateSuggestionArray: [] };
    }
    render() {
        return (
            <div>
                <div id="inputContainer">
                    <input focus="true" id="search" onKeyUp={this.autoSuggest} placeholder='Search...' autoComplete="off" />
                    {
                        <div id="suggestionBox">
                            {
                                this.state.stateSuggestionArray.map((state) => {
                                    return <div key={state.stateCode} className="suggestionItems" onClick={() => { this.selectSuggestion(state.stateCode) }}> {state.stateName} </div>
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }

    autoSuggest = () => {
        const inputVal = document.getElementById("search").value;
        if (!inputVal) {
            this.setState({ stateSuggestionArray: [] });
            document.getElementById("suggestionBox").style.display = "none";
            return;
        };
        let suggestion = this.statesArray.filter((state) => {
            return state.stateName.toLowerCase().startsWith(inputVal) || state.stateName.startsWith(inputVal);
        })
        if (suggestion.length > 0)
            document.getElementById("suggestionBox").style.display = "inline-block";
        this.setState({ stateSuggestionArray: suggestion });
    }

    selectSuggestion = (stateCode) => {
        document.getElementById("search").value = constant.stateIdMap[ stateCode ];
        document.getElementById("suggestionBox").style.display = "none";
        this.props.history.push(`/state/${stateCode}`);
        console.log(stateCode);
    }
}

export default withRouter(SearchState);
