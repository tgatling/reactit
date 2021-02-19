import { StyleSheet } from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';
import { color } from 'react-native-reanimated';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const threadtablestyle = StyleSheet.create({
    card: {
        width:500,
        height:"fitcontent",
        borderStyle:"inset",
        borderWidth:3,
        borderColor:"black",
        borderRadius:3,
        backgroundColor:"white",
        position:"relative",

    },
    text: {
        fontSize:14,
        fontStyle:"italic",
        color:"black",
    },
    delete: {
        backgroundColor:"red",
        color:"black",
        
    }

});

export default threadtablestyle