import React from 'react';
import './coronaUpdatesModal.css';
import api from '../../utils/apis';
class CoronaUpdatesModal extends React.Component {

    state = {
        updates: null
    };

    componentDidMount() {
        let modalBg = document.getElementById("modal-bg");
        modalBg.addEventListener("click", (e) => {
            if (e.target.id === 'modal-bg')
                this.closeModal();
        })
    }
    render() {
        return (
            <div>
                <button id="updatesButton" onClick={this.getLatestUpdates}>Click here for latest updates</button>
                <div id="modal-bg">
                    <div id="modal">
                        <button id="cross" onClick={this.closeModal}>X</button>
                        <h2>Latest Updates</h2><hr />
                        {
                            this.state.updates && Object.keys(this.state.updates).map((updateIndex, i) => {
                                return <p key={i}>{+(updateIndex) + 1}. {this.state.updates[ updateIndex ].update}</p>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    getLatestUpdates = async () => {
        let requestData = await api.getLatestUpdates();
        requestData = Object.keys(requestData).slice(0, 5).reduce((result, key) => {
            result[ key ] = requestData[ key ];
            return result;
        }, {});
        console.log("Updates", requestData);
        let modal = document.getElementById("modal");
        modal.style.transform = "scale(1)";
        modal.style.transition = ".25s";

        let modalBg = document.getElementById("modal-bg");
        modalBg.style.transform = "scale(1)";
        modalBg.style.transition = ".25s";
        this.setState({ updates: requestData });
    }

    closeModal = () => {
        let modal = document.getElementById("modal");
        let modalBg = document.getElementById("modal-bg");
        modal.style.transform = "scale(0)";
        modalBg.style.transform = "scale(0)";
    }
}

export default CoronaUpdatesModal;
