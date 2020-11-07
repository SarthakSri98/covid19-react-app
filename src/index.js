import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DataTable from './ui/DataTable/dataTable'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SearchState from './common/SearchState/searchState';
import CoronaUpdatesModal from './views/CoronaUpdatesModal/coronaUpdatesModal';
import Loader from './common/Loader/loader';
import Error404 from './common/Error404/error404';
import api from './utils/apis';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { rawData: null, isLoading: true, isError: false }
  }


  componentDidMount = async () => {
    try {
      let requestData = await api.getRawData();
      this.fillData(requestData);
    }
    catch (e) {
      this.setState({ isLoading: false, isError: true });
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Loader />
        </div>
      )
    }

    if (this.state.isError) return (
      <div>
        <Error404 />
      </div>
    );

    return (
      <div>
        <h1 className="mainHeading">Covid19 Data</h1>

        <CoronaUpdatesModal />

        <Router>
          <SearchState />

          <Route exact path="/" component={() => { return (<DataTable rawData={this.state.rawData} />) }} />

          <Route exact path="/state/:id" component={(props) => <DataTable rawData={this.state.rawData} {...props} />} />

        </Router>
      </div>
    )
  }


  fillData = (requestData) => {
    this.setState({ rawData: requestData, isLoading: false });
  }
}

ReactDOM.render(<App />, document.getElementById('root'));



