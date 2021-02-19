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
        justifyContent: 'center',
        borderColor: '#880022',
        borderStyle: 'solid',
        borderWidth: 3
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 20,
        textAlignVertical: 'top',
        paddingLeft: 10
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
    }
});

export default styles;