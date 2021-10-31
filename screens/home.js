import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, StatusBar } from 'react-native';


export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/Aadhaar_Background.png')} style={styles.image}>
                <Image source={require('../assets/Verifier_app_logo.png')} style={styles.logo} />
                <View style={{ paddingTop: '12%', paddingHorizontal: '8%' }}>
                    <Text style={styles.headingtext}>{`Welcome to\nAadhaar Verifier App`}</Text>

                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("VerificationScreen") }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 5, paddingTop: '2%' }}>
                                <Text style={styles.buttontext}>Verify Your Identity</Text>
                                <View style={{ flexDirection: 'row', width: '70%' }}>
                                    <View style={{ flex: 8 }}>
                                        <Text style={styles.buttonsubtext}>Proceed to Verify</Text>
                                    </View>
                                    <View style={{ flex: 2, paddingTop: 5 }}>
                                        <Image source={require('../assets/navigate.png')} style={{ width: 25, height: 25 }} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Image source={require('../assets/verification.png')} style={{ width: 35, height: 60 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style={{ alignItems: 'flex-start', width: '100%', paddingHorizontal: '10%', paddingBottom: '5%', paddingTop: '5%' }}>
                <Text style={[styles.buttonsubtext, { color: '#073042', fontSize: 20 }]}>How it works</Text>
            </View>
            <View style={styles.howitworkscard}>
                <Image source={require('../assets/howitworks.png')} style={styles.howitworks} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    statusbar: {
        color: '#ffffff'
    },
    logo: {
        marginTop: '10%',
        width: 180,
        height: 40,
        marginLeft: '8%',
        resizeMode: 'stretch'
    },
    headingtext: {
        fontFamily: 'Ubuntu-Bold',
        color: '#ffffff',
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 35,
    },
    container: {
        fontFamily: 'Ubuntu-Regular',
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    image: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // justifyContent: 'flex-start',
        width: '100%',
        height: '70%',
        marginBottom: '-45%'

    },
    button: {
        paddingTop: '5%',
        paddingHorizontal: '8%',
        marginTop: '8%',
        borderRadius: 8,
        elevation: 8,
        height: 95,
        backgroundColor: "#ffffff",
        padding: 10
    },
    buttontext: {
        fontFamily: 'Ubuntu-Bold',
        // fontWeight: '800',
        fontSize: 18,
        color: '#073042',
        lineHeight: 25,
    },
    buttonsubtext: {
        paddingTop: '8%',
        fontFamily: 'Ubuntu-Medium',
        // fontWeight: '800',
        color: '#37C584',
        fontSize: 15,
    },
    howitworkscard: {
        backgroundColor: '#ffffff',
        padding: '8%',
        paddingHorizontal: '5%',
        elevation: 3,
        borderRadius: 10,
    },
    howitworks: {
        width: 285,
        height: 210,
    }
});