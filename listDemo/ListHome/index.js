import React from 'react';
import {DragSource, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Article from './../styles/Article';
import Button from './../styles/Button';
import Input from './../styles/Input';
import ListCard from './../ListCard/ListCard';
import P from './../styles/P';
import Footer from './../styles/Footer';
import {TransitionMotion, spring, presets} from 'react-motion';
import initialCards from './getInitialState'

export class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      cards: initialCards,
      cardKeys: {} // dictionary to prevent duplicates, key => text
    }
  }

  componentWillMount() {
    // setup initial dictionary
    let cardKeys = this.state.cards.reduce((result, {text}) => {
      result[text.toUpperCase()] = true
      return result
    }, {})
    this.setState({cardKeys})
  }

  addText(e) { this.setState({text: e.target.value}) }

  clear() { 
    this.setState({cards: [], cardKeys: {}})
    this.input.focus()
  }

  destroyItem(key) {
    this.setState({
      cards: this.state.cards.filter(({text})=> key !== text), 
      cardKeys: {...this.state.cardKeys, [key.toUpperCase()]: null}
    })
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    const dragCard = cards[dragIndex];
    const copyCards = cards.map(card => ({...card}))

    copyCards.splice(dragIndex, 1)
    copyCards.splice(hoverIndex, 0, dragCard)

    this.setState({cards: copyCards});
  }

  submit(e) {
    e.preventDefault()
    const {cards, cardKeys, text} = this.state
    const formattedText = text.toUpperCase()
    // dont allow duplicates
    if (!cardKeys[formattedText]) {
      const newItem = {
        key: 't' + Date.now(), 
        text: text, 
        id: cards.length + 1
      }
      this.setState({
        cardKeys: { ...cardKeys, [formattedText]: true },
        cards: [newItem].concat(cards),
      })
    }
    this.setState({text: ''})
    this.input.value = ''
  }

  defaultStyles() {
    return this.state.cards.map(
      card => ({
        key: card.key, 
        data: { text: card.text, id: card.id }, 
        style : { height: 0, opacity: 1 }
      })
    )
  }

  getStyles() {
    const {cards, text} = this.state
    return cards.filter(
      card => card.text.toUpperCase().indexOf(text.toUpperCase()) >= 0
    )
    .map(({id, key, text}) => ({
      key, 
      data: { text, id }, 
      style : { height: spring(55, presets.gentle), opacity: 1 }
    }))
  }

  willLeave() {
    return { 
      height: spring(-1, {stiffness: 170, damping: 15}), 
      opacity: spring(-1, {stiffness: 170, damping: 50}) 
    }
  }

  willEnter() { return { height: 0, opacity: 1 } }

  render() {
    const {text, cards} = this.state
    return (
      <Article>
        <div>
          <P>a draggable list example</P>
        </div>
        <div style={{textAlign: 'center'}}>
          <form style={{display: 'inline'}} onSubmit={this.submit.bind(this)}>
            <Input 
              autoFocus={true}
              type='text' 
              placeholder='What would you like to add?' 
              innerRef={(ref) => this.input = ref} 
              onChange={this.addText.bind(this)}  />
          </form>
          <Button onClick={this.clear.bind(this)}>CLEAR</Button>
        </div>
        <TransitionMotion 
          willEnter={this.willEnter} 
          defaultStyles={this.defaultStyles()} 
          willLeave={this.willLeave} 
          styles={this.getStyles()}>
          {styles =>
            <ul style={{padding: '0'}}>
              {styles.map((card, i) => 
                <ListCard 
                  card={card}
                  destroyItem={this.destroyItem.bind(this)} 
                  index={i}
                  key={card.data.text} 
                  length={cards.length} 
                  moveCard={this.moveCard.bind(this)} />
              )}
            </ul>
          }
        </TransitionMotion>
        <Footer></Footer>
      </Article>
    );
  }
}

export default DragDropContext(HTML5Backend)(HomePage);
