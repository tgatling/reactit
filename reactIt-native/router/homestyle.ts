import { StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const homestyles = StyleSheet.create({
    logo: {
        // perfectSize is only going to call when the app is first loaded in the device.
        width: perfectSize(840),
        height: perfectSize(840)
    },
    homeContainer: {
        backgroundColor: "grey",
        width:  perfectSize(1500),
        height: "fitcontent",
        position:"relative",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: perfectSize(20)
    },
    searchBar: {
        // textAlign: "center"
        color:"white",
    },image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

});

export default homestyles;