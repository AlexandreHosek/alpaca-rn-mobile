import React, { Component } from 'react'
import { View, Text, Image, FlatList, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import {
    ApplicationStyles,
    Images,
    Colors,
    Metrics,
    Fonts
} from '../../Themes'
import PositionItem from './PositionItem'

class PositionScreen extends Component {

    render() {
        const { positions } = this.props
        console.log('positions get:', positions)

        return (
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <Image source={Images.logo} style={styles.logo}></Image>
                </View>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>Positions</Text>
                    <FlatList
                        style={styles.list}
                        data={positions}
                        keyExtractor={item => item.asset_id}
                        renderItem={({ item, index }) => {
                            return (
                                <PositionItem position={item} />
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
   
}

const styles = {
    ...ApplicationStyles.screen,
    label: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GRAY
    },
    list: {
        flex: 1,
        marginTop: 40,
        paddingRight: 5
    }
}

const mapStateToProps = (state) => {
    return {
        positions: state.positions.positions
    }
}

export default connect(mapStateToProps, null)(PositionScreen)
