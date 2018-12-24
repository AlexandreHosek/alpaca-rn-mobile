import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import PropTypes from 'prop-types'

import {
    ApplicationStyles,
    Colors,
    Fonts
} from '../../Themes'
import {
    capitalize,
    changeTimeFormat
} from '../../Util/Helper'

class OrderItem extends Component {

    render() {
        const { order } = this.props
        // console.log('order item:', order)
        const mainValue = `${order.qty} | ${capitalize(order.type)} ${capitalize(order.side)} ${capitalize(order.time_in_force)}`
        const timeValue = capitalize(order.status) + ': ' + changeTimeFormat(order.submitted_at)

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={styles.rowContainer}>
                    <Text style={styles.actionLabel}>
                        {order.status}
                    </Text>
                    <Text style={styles.h3}>
                        {timeValue}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.h2}>
                        {order.symbol}
                    </Text>
                    <Text style={styles.h3}>
                        {mainValue}
                    </Text>
                </View>
                <View style={styles.separator} />
            </View>
        )
    }
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
}

const styles = {
    ...ApplicationStyles.screen,
    h2: {
        ...Fonts.style.h2,
        color: Colors.BLACK
    },
    h3: {
        ...Fonts.style.h3,
        fontSize: 14,
        color: Colors.BLACK
    },
    actionLabel: {
        ...Fonts.style.h3,
        color: Colors.BLACK,
        backgroundColor: Colors.COLOR_LIGHT_YELLOW,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 7,
        overflow: 'hidden',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

export default OrderItem