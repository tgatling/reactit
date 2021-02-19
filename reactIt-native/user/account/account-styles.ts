import {StyleSheet} from 'react-native';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: 'yellow',
        borderStyle: 'solid',
        borderWidth: 3,
        backgroundColor: '#aaa'
    },
    innercontainer: {
        width: perfectSize(750),
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: perfectSize(0),
        backgroundColor: '#aaa'


    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        textAlign: "center",
    },
    login: {
        backgroundColor: '#aaa'
    },
    logo: {
        // perfectSize is only going to call when the app is first loaded in the device.
        width: perfectSize(840),
        height: perfectSize(840)
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    text: {
        fontSize: 20
    }
});

export default styles;