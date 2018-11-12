import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';

import CONFIG from '../../../config.json'

class Header extends React.Component {
    render () {
        return <div id="header">Devices Predictable Farm SSH</div>;
    }
}

class SshItem extends React.Component {
    constructor(props) {
        super(props);
        this.reload = this.reload.bind(this);
    }

    tunnelIsOk(tunnel) {
        if(tunnel) {
            return "ssh_item_left_name_socket ssh_item_left_name_indicator_ok"
        } else {
            return "ssh_item_left_name_tunnel"
        }
    }

    getUrlTerminal(port) {
        return 'http://' + CONFIG.webssh.host + ':' + CONFIG.webssh.port + '/ssh/host/' + CONFIG.server.host + '?port=' + port + '&color=red';
    }

    reload() {
        this.props.socket.emit("reload_tunnel", this.props.port);
    }

    render () {
        return (
            <div className="ssh_item">
                <div className="ssh_item_left">
                    <div className="ssh_item_left_name">
                        {this.props.name}
                        <div className="ssh_item_left_name_socket ssh_item_left_name_indicator_ok">socket</div>
                        {/*<div className={this.tunnelIsOk(this.props.tunnel)}>tunnel</div>*/}
                        <a className="ssh_item_left_reload" onClick={this.reload.bind(this)}>
                            open tunnel
                        </a>
                    </div>
                    <div className="ssh_item_left_port">Port : {this.props.port}</div>
                </div>
                <div className="ssh_item_right">
                    <a target="_blank" href={this.getUrlTerminal(this.props.port)}>
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
            socket: io('http://' + CONFIG.server.host + ':' + CONFIG.server.port),
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
                        <SshItem socket={this.state.socket} key={i} name={this.state.sshItems[itemSsh].name} port={itemSsh} tunnel={this.state.sshItems[itemSsh].tunnel}/>
                    )}
                </div>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
