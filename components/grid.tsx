import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import GridSquare from './gridSquare';

export default function Grid({ size, data, onGridSquarePressed }) {

    const [boardData, setBoardData] = useState(data);
    const [boardSize, setBoardSize] = useState(size);

    const screenWidth = Math.round(Dimensions.get('window').width);
    const screenHeight = Math.round(Dimensions.get('window').height);

    const onSquarePressed = (key) => {
        onGridSquarePressed(key)
    }

    var rows = []
    for (let i = 0; i < boardSize; i++) {
        var cols = []
        for (let j = 0; j < boardSize; j++) {
            let key = [i, j]
            cols.push(<GridSquare key={key} xo={boardData[i][j]} index={key} onGridSquarePressed={(key) => { onSquarePressed(key) }} />)
        }
        rows.push(
            <View style={styles.containerRow} key={i}>
                {cols}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Header</Text>
            </View>
            <View style={[styles.body, { maxHeight: screenWidth }]}>
                {rows}
            </View>
            <View style={styles.header}>
                <Text style={styles.titleText}>Footer</Text>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        flexDirection: 'column',
    },
    containerRow: {
        flex: 1,
        backgroundColor: '#ddd',
        flexDirection: 'row',
    },
    header: {
        flex: 1,
        borderRadius: 50,
        flexDirection: 'column',
        backgroundColor: '#46e0ff',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#111',
        shadowOpacity: 1,
        shadowRadius: 3,
        opacity: 0,
        borderColor: '#46e0ff',
    },
    titleText: {
        flex: 1,
        padding: 10,
        fontSize: 42,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#FFF',
    },
    body: {
        flex: 3,
        marginVertical: 25,
        marginHorizontal: 2,
    }
});
