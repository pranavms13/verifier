import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, PermissionsAndroid, TouchableOpacity } from 'react-native';

import { parseXML } from '../assets/xmler';

import {
    initialize,
    startDiscoveringPeers,
    stopDiscoveringPeers,
    unsubscribeFromPeersUpdates,
    unsubscribeFromThisDeviceChanged,
    unsubscribeFromConnectionInfoUpdates,
    subscribeOnConnectionInfoUpdates,
    subscribeOnThisDeviceChanged,
    subscribeOnPeersUpdates,
    connect,
    cancelConnect,
    createGroup,
    removeGroup,
    getAvailablePeers,
    sendFile,
    receiveFile,
    getConnectionInfo,
    getGroupInfo,
    receiveMessage,
    sendMessage,
} from 'react-native-wifi-p2p';

export default class VerificationScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            resident: null,
            recieved: false,
            residentxml : null,
            residentdata: null,
        }

    }
    async componentDidMount() {
        try {
            await initialize();
            // since it's required in Android >= 6.0
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Access to wi-fi P2P mode',
                    'message': 'ACCESS_COARSE_LOCATION'
                }
            );

            console.log(granted === PermissionsAndroid.RESULTS.GRANTED ? "You can use the p2p mode" : "Permission denied: p2p mode will not work");

            subscribeOnPeersUpdates(this.handleNewPeers);
            subscribeOnConnectionInfoUpdates(this.handleNewInfo);
            subscribeOnThisDeviceChanged(this.handleThisDeviceChanged);

            const status = await startDiscoveringPeers();

            removeGroup();
            createGroup()
                .then(() => console.log('Group created successfully!'))
                .catch(err => console.error('Something gone wrong. Details: ', err));
            console.log('startDiscoveringPeers status: ', status);
        } catch (e) {
            console.error(e);
        }
    }

    componentWillUnmount() {
        unsubscribeFromConnectionInfoUpdates(this.handleNewInfo);
        unsubscribeFromPeersUpdates(this.handleNewPeers);
        unsubscribeFromThisDeviceChanged(this.handleThisDeviceChanged);
    }

    handleNewInfo = (info) => {
        console.log('OnConnectionInfoUpdated', info);
        // if ((info.groupFormed === true) && (info.isGroupOwner === true)) {
        //     this.beforeRecieve()
        // }
        getGroupInfo().then(info => console.log('getGroupInfo', info))
    };

    handleNewPeers = ({ devices }) => {
        console.log('OnPeersUpdated', devices);
        this.setState({ devices: devices });
        if((devices.length > 0) && (devices[0].status===0)){
            this.setState({ resident: devices[0].deviceName });
            var rec = setInterval(() => {
                receiveMessage().then(message => {
                    this.setState({ residentxml: message, recieved: true });
                    this.parseAadhaar(message);
                    clearInterval(rec);
                    // console.log('Recieved : ', message);
                }).catch(err => {
                    console.log('Recieve Error : ', err);
                })
            },5000)
        }
        // if (devices.length > 0) {
        //     this.state.connected ? null : connect(devices[0].deviceAddress).then(() => {
        //         this.setState({ connected: true, residentname: devices[0].deviceName });
        //     })
        // }
    };

    parseAadhaar = (raw) => {
        var user = {}
        var data = parseXML(raw);
        user.name = data.children[1].children[0].attributes.name;
        user.image = data.children[1].children[3].value;
        this.props.navigation.navigate('FaceRD', { user: user, userxml: raw });
    }

    handleThisDeviceChanged = (groupInfo) => {
        console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
    };

    onGetConnectionInfo = () => {
        getConnectionInfo()
            .then(info => console.log('getConnectionInfo', info));
    };

    reload = async () => {
        removeGroup();
        createGroup()
            .then(() => console.log('Group created successfully!'))
            .catch(err => console.error('Something gone wrong. Details: ', err));
        startDiscoveringPeers();
    }

    onRecieve = () => {
        console.log('recieving');
        receiveMessage()
            .then((metaInfo) => console.log('Message received successfully', metaInfo))
            .catch(err => console.log('Error while message receiving', err))
    }

    onSend = () => {
        sendMessage('Hello from React Native')
    }

    beforeRecieve = () => {
        setTimeout(() => {
            this.onRecieve()
        }, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.resident?`Connected to ${this.state.resident}`:`Place your Device\nClose to the Resident`}</Text>
                <Image source={require('../assets/radar.png')} style={{ marginTop: '10%', width: 325, height: 325 }} />

                <View style={styles.buttoncontainer}>
                    <TouchableOpacity style={styles.info}>
                        <Text style={styles.infotext}>{`Waiting for Verification...`}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.info} onPress={() => { this.onRecieve() }}>
                        <Text style={styles.infotext}>{`Recieve`}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.info} onPress={() => { getConnectionInfo().then(info => console.log('getConnectionInfo', info)) }}>
                        <Text style={styles.infotext}>{`Connection Info`}</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        fontFamily: 'Ubuntu-Regular',
        height: '100%',
        backgroundColor: '#37C584',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appbar: {
        width: '100%',
        height: 100,
        paddingTop: '15%',
    },
    buttoncontainer: {
        paddingTop: '25%',
    },
    title: {
        fontFamily: 'Ubuntu-Medium',
        fontSize: 20,
        width: '100%',
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 30,
        paddingVertical: '5%',
        marginTop: '5%'
    },
    info: {
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 18,
    },
    infotext: {
        color: '#37C584',
        fontFamily: 'Ubuntu-Medium',
        fontSize: 16,
    }
});