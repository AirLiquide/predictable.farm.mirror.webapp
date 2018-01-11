import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';

class Header extends React.Component {
    render () {
        return <div id="header">Devices Predictable Farm SSH</div>;
    }
}

class SshItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="ssh_item">
                <div className="ssh_item_left">
                    <div className="ssh_item_left_name">{this.props.name}</div>
                    <div className="ssh_item_left_port">Port : {this.props.port}</div>
                </div>
                <div className="ssh_item_right">
                    <a target="_blank" href="/topt">
                        <button className="ssh_item_right_button">open terminal</button>
                    </a>
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: io('http://localhost:3000'),
            sshItems: {}
        };

        this.itemsSshUpdate = this.itemsSshUpdate.bind(this);

        this.state.socket.on('ssh_items_list', this.itemsSshUpdate);

        this.state.socket.on('connect', function () {
            this.state.socket.emit("get_connected_clients");
        }.bind(this));
    }

    itemsSshUpdate(items) {
        this.setState({sshItems: items});
    }

    render () {
        return (
            <div>
                <Header/>
                <div id="ssh_items">
                    {Object.keys(this.state.sshItems).map((itemSsh, i) =>
                        <SshItem key={i} name={this.state.sshItems[itemSsh]} port={itemSsh}/>
                    )}
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));