import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import OrdersActions from '../../Redux/OrdersRedux'
import NavigationIcon from '../../Components/NavigationIcon'
import Button from '../../Components/Button'
import SearchItem from './SearchItem';
import TradeItem from './TradeItem';

class TradeScreen extends Component {

    state = {
        submitted: false,
        stopPriceEditable: true,
        limitPriceEditable: true,
        sideItems: [
            {
                label: 'Buy',
                value: 'buy',
            },
            {
                label: 'Sell',
                value: 'sell',
            },
        ],
        typeItems: [
            {
                label: 'Market',
                value: 'market',
            },
            {
                label: 'Limit',
                value: 'limit',
            },
            {
                label: 'Stop',
                value: 'stop',
            },
            {
                label: 'Stop limit',
                value: 'stop_limit',
            },
        ],
        timeInForceItems: [
            {
                label: 'Day',
                value: 'day',
            },
            {
                label: 'Gtc',
                value: 'gtc',
            },
            {
                label: 'Opg',
                value: 'opg',
            },
        ]
    }

    static navigationOptions = (props) => {
        return {
            headerLeft: (
                <NavigationIcon
                    onPress={() => props.navigation.pop()}
                    source={Images.back}
                />
            ),
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.postingOrder && !nextProps.postingOrder && nextProps.orderResult) {
            this.setState({
                submitted: true,
                stopPriceEditable: false,
                limitPriceEditable: false
            })
        }
    }

    requestOrder = (value) => {
        const { postOrder } = this.props
        const { shares, limitPrice, stopPrice, side, type, timeInForce } = this.state

        const orderData = {
            symbol: value.symbol,
            qty: shares,
            type,
            time_in_force: timeInForce,
            side,
            limit_price: limitPrice,
            stop_price: stopPrice
        }
        console.log('updated value:', orderData)
        postOrder(orderData)
    }

    renderBody = (value) => {
        const { orderResult, postingOrder } = this.props
        const {
            type, side, timeInForce,
            shares, limitPrice, stopPrice,
            sideItems, typeItems, timeInForceItems,
            stopPriceEditable, limitPriceEditable,
            submitted
        } = this.state
        let _stopPriceEditable = stopPriceEditable
        let _limitPriceEditable = limitPriceEditable

        let disabledSubmitBtn = !type
        if (type === 'market') {
            disabledSubmitBtn = !side || !timeInForce || !shares
            _stopPriceEditable = false
            _limitPriceEditable = false
        } else if (type === 'limit') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !limitPrice
            _stopPriceEditable = false
        } else if (type === 'stop') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !stopPrice
            _limitPriceEditable = false
        } else if (type === 'stop_limit') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !stopPrice || !limitPrice
        }

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <TradeItem
                        label='Side'
                        items={sideItems}
                        disabled={submitted}
                        onValueChange={value => this.setState({ side: value })}
                    />
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>
                            Shares
                        </Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => this.setState({ shares: text })}
                            value={shares}
                            keyboardType='number-pad'
                            autoCorrect={false}
                            editable={!submitted}
                            maxLength={20}
                        />
                    </View>
                    <TradeItem
                        label='Type'
                        items={typeItems}
                        disabled={submitted}
                        onValueChange={value => this.setState({ type: value })}
                    />
                    <TradeItem
                        label='Time in Force'
                        items={timeInForceItems}
                        disabled={submitted}
                        onValueChange={value => this.setState({ timeInForce: value })}
                    />
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>
                            Limit Price
                        </Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => this.setState({ limitPrice: text })}
                            value={limitPrice}
                            keyboardType='number-pad'
                            autoCorrect={false}
                            editable={_limitPriceEditable}
                            maxLength={20}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>
                            Stop Price
                        </Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={(text) => this.setState({ stopPrice: text })}
                            value={stopPrice}
                            keyboardType='number-pad'
                            autoCorrect={false}
                            editable={_stopPriceEditable}
                            maxLength={20}
                        />
                    </View>
                    {this.state.submitted && (
                        <ScrollView style={styles.jsonData}>
                            <Text>
                                {JSON.stringify(orderResult, undefined, 4)}
                            </Text>
                        </ScrollView>
                    )}
                </KeyboardAwareScrollView>
                {this.state.submitted ?
                    <Button
                        style={styles.button}
                        label="Submitted!"
                        color={Colors.COLOR_GRAY}
                        labelColor={Colors.WHITE}
                        height={50}
                    /> :
                    <Button
                        style={styles.button}
                        label="Submit"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={postingOrder}
                        disabled={disabledSubmitBtn}
                        onPress={() => this.requestOrder(value)}
                    />
                }
            </View>
        )
    }

    render() {
        const { navigation, bars, preBars } = this.props
        const value = navigation.getParam('value')

        return (
            <View style={styles.mainContainer}>
                <SearchItem
                    bars={bars}
                    preBars={preBars}
                    item={value}
                    symbolStyle={styles.symbol}
                />
                {this.renderBody(value)}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        marginTop: 30
    },
    h2: {
        ...Fonts.style.h2,
        color: Colors.BLACK
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.BLACK
    },
    symbol: {
        ...Fonts.style.h1,
        color: Colors.BLACK
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    value: {
        ...Fonts.style.h3,
        fontSize: 19,
        color: Colors.COLOR_GOLD
    },
    jsonData: {
        flex: 1,
        marginTop: 10,
        marginBottom: 60,
        paddingLeft: 5,
        backgroundColor: 'rgb(207, 207, 207)'
    },
    inputText: {
        width: 130,
        height: 40,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        color: Colors.COLOR_GOLD
    },
}

const mapStateToProps = (state) => {
    return {
        postingOrder: state.orders.postingOrder,
        orderResult: state.orders.orderResult,
        bars: state.assets.bars,
        preBars: state.assets.preBars,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postOrder: data => dispatch(OrdersActions.postOrderAttempt(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeScreen)
