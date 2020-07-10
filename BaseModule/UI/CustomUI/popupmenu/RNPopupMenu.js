import React from 'react';

import PropTypes from 'prop-types';

import {
    Animated,
    Dimensions,
    Easing,
    FlatList,
    I18nManager,
    Image,
    Modal,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewPropTypes
} from 'react-native';
import styles from './PopupMenuStyle';
import itemStyles from './PopupMenuItemStyle';
import Separator from '../Separator';
import { isValidElement } from '../../../Utils/helpers';

const STATES = {
    HIDDEN: 'HIDDEN',
    ANIMATING: 'ANIMATING',
    SHOWN: 'SHOWN'
};

const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const SCREEN_INDENT = 8;

class RNPopupMenu extends React.Component {
    _container = null;

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.value) {
            if (nextProps.value !== this.props.value) {
                this.setInputDataState(nextProps.value);
            }
        }
    }

    state = {
        menuState: STATES.HIDDEN,

        top: 0,
        left: 0,

        menuWidth: 0,
        menuHeight: 0,

        buttonWidth: 0,
        buttonHeight: 0,

        menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
        opacityAnimation: new Animated.Value(0),
        inputDataSource: dataFromPropsToState(this.props.inputData, this.props.selector, this.props.value)
    };

    _setContainerRef = (ref) => {
        this._container = ref;
    };

    // Start menu animation
    _onMenuLayout = (e) => {
        if (this.state.menuState === STATES.ANIMATING) {
            return;
        }

        const { width, height } = e.nativeEvent.layout;

        this.setState(
            {
                menuState: STATES.ANIMATING,
                menuWidth: width,
                menuHeight: height,
                top:
                    isValidElement(this.props.isFromBottom) && this.props.isFromBottom
                        ? Dimensions.get('window').height - 160
                        : this.state.top
            },
            () => {
                Animated.parallel([
                    Animated.timing(this.state.menuSizeAnimation, {
                        toValue: { x: width, y: height },
                        duration: this.props.animationDuration,
                        easing: EASING
                    }),
                    Animated.timing(this.state.opacityAnimation, {
                        toValue: 1,
                        duration: this.props.animationDuration,
                        easing: EASING
                    })
                ]).start();
            }
        );
    };

    _onDismiss = () => {
        if (this.props.onHidden) {
            this.props.onHidden();
        }
    };

    show = () => {
        this._container.measureInWindow((left, top, buttonWidth, buttonHeight) => {
            if (isValidElement(this.props.isFromBottom) && this.props.isFromBottom) {
                this.setState({
                    buttonHeight,
                    buttonWidth,
                    menuState: STATES.SHOWN
                });
            } else {
                this.setState({
                    buttonHeight,
                    buttonWidth,
                    left,
                    menuState: STATES.SHOWN,
                    top
                });
            }
        });
    };

    hide = (onHidden) => {
        Animated.timing(this.state.opacityAnimation, {
            toValue: 0,
            duration: this.props.animationDuration,
            easing: EASING
        }).start(() => {
            // Reset state
            this.setState(
                {
                    menuState: STATES.HIDDEN,
                    menuSizeAnimation: new Animated.ValueXY({ x: 0, y: 0 }),
                    opacityAnimation: new Animated.Value(0)
                },
                () => {
                    if (onHidden) {
                        onHidden();
                    }

                    // Invoke onHidden callback if defined
                    if (Platform.OS !== 'ios' && this.props.onHidden) {
                        this.props.onHidden();
                    }
                }
            );
        });
    };

    // @@ TODO: Rework this
    _hide = () => {
        this.hide();
    };
    _onItemSelected = (dataItem, onSelected) => {
        onSelected(dataItem);
        this.hide();
        const { selector } = this.props;
        if (selector) {
            this.setInputDataState(dataItem.key);
        }
    };

    render() {
        const { isRTL } = I18nManager;

        const dimensions = Dimensions.get('window');
        const { width: windowWidth } = dimensions;
        const windowHeight = dimensions.height - (StatusBar.currentHeight || 0);

        const { menuSizeAnimation, menuWidth, menuHeight, buttonWidth, buttonHeight, opacityAnimation } = this.state;
        const menuSize = {
            width: menuSizeAnimation.x,
            height: menuSizeAnimation.y
        };

        // Adjust position of menu
        let { left, top } = this.state;
        const transforms = [];

        if ((isRTL && left + buttonWidth - menuWidth > SCREEN_INDENT) || (!isRTL && left + menuWidth > windowWidth - SCREEN_INDENT)) {
            transforms.push({
                translateX: Animated.multiply(menuSizeAnimation.x, -1)
            });

            left = Math.min(windowWidth - SCREEN_INDENT, left + buttonWidth);
        } else if (left < SCREEN_INDENT) {
            left = SCREEN_INDENT;
        }

        // Flip by Y axis if menu hits bottom screen border
        if (top > windowHeight - menuHeight - SCREEN_INDENT) {
            transforms.push({
                translateY: Animated.multiply(menuSizeAnimation.y, -1)
            });

            top = windowHeight - SCREEN_INDENT;
            top = Math.min(windowHeight - SCREEN_INDENT, top + buttonHeight);
        } else if (top < SCREEN_INDENT) {
            top = SCREEN_INDENT;
        }

        const shadowMenuContainerStyle = {
            opacity: opacityAnimation,
            transform: transforms,
            top,

            // Switch left to right for rtl devices
            ...(isRTL ? { right: left } : { left })
        };

        const { menuState } = this.state;
        const animationStarted = menuState === STATES.ANIMATING;
        const modalVisible = menuState === STATES.SHOWN || animationStarted;

        const {
            testID,
            button,
            style,
            showImage,
            inputData,
            onSelected,
            divider,
            selector,
            menuItemTextStyle,
            selectorImageStyle,
            imageStyle,
            menuItemContainerStyle,
            isCustomIcon
        } = this.props;
        return (
            <View ref={this._setContainerRef} collapsable={false} testID={testID}>
                <View>{button}</View>

                <Modal
                    visible={modalVisible}
                    onRequestClose={this._hide}
                    supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
                    transparent
                    onDismiss={this._onDismiss}
                >
                    {Platform.OS === 'android' ? (
                        <View>
                            <StatusBar backgroundColor="rgba(0,0,0,0.3)" barStyle="light-content" />
                        </View>
                    ) : null}
                    <TouchableWithoutFeedback onPress={this._hide} accessible={false}>
                        <View style={StyleSheet.absoluteFill}>
                            <Animated.View
                                onLayout={this._onMenuLayout}
                                style={[styles.shadowMenuContainer, shadowMenuContainerStyle, style]}
                            >
                                <Animated.View style={[styles.menuContainer, animationStarted && menuSize]}>
                                    <View style={itemStyles.container}>
                                        <FlatList
                                            keyExtractor={(item, index) => index.toString()}
                                            extraData={this.state.inputDataSource}
                                            showsVerticalScrollIndicator={false}
                                            data={selector ? this.state.inputDataSource : inputData}
                                            renderItem={({ item }) => (
                                                <Touchable onPress={() => this._onItemSelected(item, onSelected)}>
                                                    <View>
                                                        <View style={[itemStyles.itemContainer, menuItemContainerStyle]}>
                                                            <Item
                                                                imageSource={item.image}
                                                                selector={selector ? item.isSelect : false}
                                                                title={item.key}
                                                                textStyle={menuItemTextStyle}
                                                                showImage={showImage}
                                                                iconStyle={imageStyle}
                                                                iconSelectorStyle={selectorImageStyle}
                                                                isCustomIcon={isCustomIcon}
                                                            />
                                                        </View>
                                                        {divider ? <Separator /> : null}
                                                    </View>
                                                </Touchable>
                                            )}
                                        />
                                    </View>
                                </Animated.View>
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }

    setInputDataState(key) {
        this.state.inputDataSource.map((item, index) => {
            let allData = this.state.inputDataSource[index];
            if (item.key === key) {
                allData.isSelect = true;
            } else {
                allData.isSelect = false;
            }
        });

        this.setState({
            inputDataSource: this.state.inputDataSource
        });
    }
}

function dataFromPropsToState(data, selector, value) {
    if (selector) {
        return data.map((item, index) => {
            if (value) {
                item.isSelect = item.key === value;
            } else {
                item.isSelect = index === 0;
            }
            return item;
        });
    } else {
        return [];
    }
}

function Item({
    // eslint-disable-next-line react/prop-types
    title,
    // eslint-disable-next-line react/prop-types
    showImage,
    // eslint-disable-next-line react/prop-types
    imageSource,
    // eslint-disable-next-line react/prop-types
    selector,
    // eslint-disable-next-line react/prop-types
    textStyle,
    // eslint-disable-next-line react/prop-types
    iconStyle,
    // eslint-disable-next-line react/prop-types
    iconSelectorStyle,
    isCustomIcon
}) {
    let networkImage = false;
    if (showImage && imageSource != null) {
        // eslint-disable-next-line react/prop-types
        let imageSourceLength = imageSource.length;
        if (imageSourceLength > 5) {
            networkImage = true;
        }
    }
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            {showImage ? (
                !isCustomIcon ? (
                    <Image
                        resizeMode="contain"
                        style={[itemStyles.itemImage, iconStyle]}
                        source={
                            networkImage
                                ? {
                                      uri: imageSource
                                  }
                                : imageSource
                        }
                    />
                ) : (
                    imageSource
                )
            ) : null}
            <Text style={[itemStyles.title, textStyle]}>{title}</Text>

            {selector ? (
                <Image
                    resizeMode="contain"
                    source={require('../../../Images/common/checkMark.png')}
                    style={[itemStyles.selectorIcon, iconSelectorStyle]}
                />
            ) : null}
        </View>
    );
}

RNPopupMenu.propTypes = {
    animationDuration: PropTypes.number,
    button: PropTypes.node.isRequired,
    inputData: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    onHidden: PropTypes.func,
    style: ViewPropTypes.style,
    testID: ViewPropTypes.testID,
    showImage: PropTypes.bool,
    divider: PropTypes.bool,
    selector: PropTypes.bool,
    menuItemTextStyle: Text.propTypes.style,
    value: PropTypes.string,
    selectorImageStyle: ViewPropTypes.style,
    imageStyle: ViewPropTypes.style,
    menuItemContainerStyle: ViewPropTypes.style,
    isCustomIcon: PropTypes.bool
};

RNPopupMenu.defaultProps = {
    animationDuration: 300,
    showImage: false,
    divider: true,
    selector: false
};

const Touchable = Platform.select({
    android: TouchableNativeFeedback,
    default: TouchableOpacity
});
export default RNPopupMenu;
