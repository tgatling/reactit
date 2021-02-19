import { StyleSheet } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const loginstyles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    innercontainer: {
        backgroundColor: "black",
        width: perfectSize(750),
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: perfectSize(0),
        borderStyle: "inset",
        borderRadius: 10,
        borderWidth: 5,

    },
    text: {
        backgroundColor: "navy",
        textAlign: "center",
        fontSize: 16,
        color: "white",
        width: "fitcontent",
        height: perfectSize(50),
    },
    input: {
        color:"black",
        backgroundColor: "white",
        textAlign: "center",
        fontSize: 16,
        fontStyle:"sans",
        width: "fitcontent",
        height: perfectSize(50),
    },

});

export default loginstyles;