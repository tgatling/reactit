import { StyleSheet } from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import { color } from 'react-native-reanimated';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Importing using require because there is no @types
const { create } = require('react-native-pixel-perfect');
const designResolution = {
    width: 1125,
    height: 2436
} // what we're designing for
const perfectSize = create(designResolution);

const routerstyles = StyleSheet.create({
    row: {
        left:-16,
        paddingTop:20,
        textAlignVertical:"center",
        position:"relative",
        marginTop:perfectSize(0),
        height:perfectSize(90),
        width:"100%",
        justifyContent:'center',
        color:"white",
        fontFamily:'sans',
        backgroundColor:'darkgreen',
        fontSize: 25,
    }

});

export default routerstyles;