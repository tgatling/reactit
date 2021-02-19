import { OpaqueColorValue, StyleSheet } from 'react-native';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const threadtablestyle = StyleSheet.create({
    threadCardContainer: {
        // perfectSize is only going to call when the app is first loaded in the device.
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: perfectSize(1300),
        height: perfectSize(200),
        borderStyle: 'solid',
        borderColor: 'green',
        borderWidth: perfectSize(6),
        backgroundColor: 'black',
        borderRadius: 8,

    },
    title: {
        textAlign: "center",
        fontSize: 25,
        fontFamily: "sans",
        fontWeight: "bold",
        borderStyle: "dashed",
        borderColor: "black",
        borderWidth: perfectSize(4),
        color: "green",
    },
    cont: {
        justifyContent: "center",
        paddingLeft: perfectSize(50),
        color: "yellow",
        fontSize: perfectSize(22),

    },
    t: {
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
        height: "fitcontent",
        backgroundColor:"white",
    },

    vac: {
        borderStyle:"inset",
        borderWidth:4,
        borderColor:"red",
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    switch: {
        position: "relative",
        left: 1050,
        marginTop: 15,
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    disabled: {
        marginRight: 20,
        textAlign: "right",
        position: "relative",
        top: 6,
        fontSize: 24,
        fontWeight: "bold",
        height: "fitcontent",
        color:"green",
    },
    container: {
        position:"relative",
        left:250,
        width: 1200,
        height: "fitcontent",
        borderStyle:"inset",
        borderColor:"red",
        borderWidth:4,
        backgroundColor:"navy",
    },
});

export default threadtablestyle;
