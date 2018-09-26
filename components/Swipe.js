import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';

// this is something that wont change over time so keep it outside
const SCREEN_WIDTH = Dimensions.get('window').width;
// thresh hold for swiping 40% of the screen
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
// duration of swipe out card
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
    // if user of the component does not pass in the given props than it will use the ones here as default
    // always do a default as a practice, when writing re-usable components (to avoid type checking like if(onSwipeRight) do.. and avoid errors)
    static defaultProps = {
        onSwipeRight: () => { },
        onSwipeLeft: () => { },
        keyProp: 'id' // if there is no keyProp passed in use the id element
        // in case we use this component without specifying a keyProp from deckScreen
    }

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            // always TRIPLE check the spelling here if its bad it wont fail but it wont work at ALL
            /*
            onStartShouldSetPanResponder: () => {}, ========= executed anytime a user taps on the screen
            if returned true, we want this instance of the panResponder (const) to handle that gesture
            anytime user taps on the screen
            - so below means if user taps on screen then set to true meaning assign pan responder at that time
            
            onPanResponderMove: () => {},  ============= anytime that the user starts to drag their finger across the screen
            first argument is always called event (convention) works similar to the event in reactJS (what element is pressed down on)
            second argument is always called gesture (convention) what the user is doing with their finger on the screen (what pixel value pressed, how quickly finger is moved on screen)
                    -- most important usually

            onPanResponderRelease: () => {}  =========== anytime the user removes their finger from the press screen
             */
            // below are Pan Responder lifecycle events
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                // every time the user drags the finger take the the value and update current position
                position.setValue({ x: gesture.dx })//to also move up and down , y: gesture.dy })
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    // swipe right
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    // swipe left (negative to indicate left)
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
                // gesture.numberActiveTouches: 1 indicates that 1 finger, can do something for 2 if more than one
            }
        });

        // a lot of official documentation will tell you to assign panResponder to the state (can apply to position too)
        // we will follow this convention but you can easily do just
        ////// this.panResponder = panResponder
        // you can create a panResponder to its own component (its outside of a state system)
        this.state = { panResponder, position, index: 0 };
    }

    // lifecycle method that is called whenever a component is going to be rendered with a new set of props (so in this case new data sets)
    // nextProps is convention but its arbitrary its like jquery functions defining w.e name as param so it makes more sense when comparing to this.props
    componentWillReceiveProps(nextProps){
        // if the new set of items are not the same array as current then set index back to 0
        if(nextProps.data !== this.props.data){
            // this is also done in onSwipeComplete to move index up to next card
            this.setState({ index: 0 });
        }
    }

    // to make the cards slide to top gracefully
    componentWillUpdate(){
        // useful for android but also put for iOS just incase (doesnt matter for iOS)
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        // timing is same as spring but timing is more linear
        // timing is used anytime there needs to be updates to NEW position (difference is you have to specify duration of animation)
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
        // callback once animation is complete and pass direction
        console.log("swiped right");
    }

    // reset the position of the card to default (0, 0)
    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    // after swiped card animation is complete (off the page)
    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        // get the next card ready for swiping
        // reset the position x y
        // if didnt take the bottom step then when position attached to next card then the next card will go where card before goes
        // below is weird goes back to the need to not set it in state as the setState isnt called
        // can do this as just this.position...
        // if you do this then you have to completely remove position from state (constructor)
        this.state.position.setValue({ x: 0, y: 0 });
        // NOT doing just this.state.index ++;
        // not modifying the existing value just resetting it using setState
        this.setState({ index: this.state.index + 1 })
    }

    // helper method to determine the styling for the top card
    getCardStyle() {
        // interpolation between the x location the card is dragged and rotation
        const { position } = this.state;  // get access to the position property
        // amount of input with the output of rotation
        const rotate = position.x.interpolate({
            // multiplying slows the rate of rotation(bigger value interpolated)
            inputRange: [-SCREEN_WIDTH * 2.0, 0, SCREEN_WIDTH * 2.0],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...position.getLayout(),
            //transform: [{ rotate: rotate }] old version belos is ES6 version
            transform: [{ rotate }]
        };
    }

    // render card
    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }
        
        // pass in the list of data (array)
        // for each item in that array it calls renderCard()
        return this.props.data.map((item, i) => {
            // the index is for something previous cards
            if (i < this.state.index) { return null; }

            // only the first position card
            // whenever you are using a list you have to assign a key
            if (i === this.state.index) {
                return (
                    //[this.getCardStyle(), styles.cardStyle]
                    <Animated.View
                        key={item[this.props.keyProp]}
                        style={[this.getCardStyle(), styles.cardStyle, { zIndex: i * -1 }]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            // other cards not part of previous or current index jsut make regular card
            return (
                // style={styles.cardStyle} to stack
                // the extra style here is to cascade
                // for every card take 10 pixels multiplied by the difference between i - index
                // i is the id for each thing, its the individual item's position within this.props.data array
                // this.state.index is the id so it will just reduce by a little
                // so becomes 10 * the number of spaces the card is away from becoming the top card in the deck
                <Animated.View 
                    key={item[this.props.keyProp]} style={[styles.cardStyle, { zIndex: i * -1 }, { top: 10 * (i - this.state.index) }]}                
                >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse();

        // this should resolve the issue of the reverse thing but its fine we assigned the zindex thing above
        // also it works for android 6 SSG6 phone so we should be ok
        // also remove the return above and add it as const deck =
        // dont forget to import platform from react-native above & remove the .reverse()
        //return Platform.OS === 'android' ? deck : deck.reverse();
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = {
    /* 
    position absolute works the same way as in the browser
    the element will be taken out of the normal flow or layout of the app
    --- here it will cause all the cards to stack up at the top of each screen
    */
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
};

export default Swipe;