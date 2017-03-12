import React, {Component, PropTypes} from 'react';
import Div from './../styles/Div';
import Li from './../styles/Li'
import {flow} from 'lodash';
import {DropTarget, DragSource} from 'react-dnd';
import {collect, collect2, cardSource, cardTarget} from './dnd'

class ListCard extends Component {
  render() {
    const {connectDragSource, connectDropTarget, destroyItem, isDragging, card} = this.props
    const {style, data: {text, id}} = card
    const opacity = isDragging ? 0 : 1
    // hiding text / height during end of animation makes it smoother
    const height = style.height < 0.01 ? 0 : style.height
    const textFormatted = style.opacity < 0.6 ? '' : text

    return connectDragSource(connectDropTarget(
      <div>
        <Li key={id} style={{height, opacity}}>
          <div style={{opacity: style.opacity}}>
          {textFormatted}
          </div>
          <Div 
            style={{display: style.height < 50 ? 'none' : 'block'}} 
            onClick={destroyItem.bind(null, text)}>delete</Div>
        </Li>
      </div>
    ));
  }
}

ListCard.propTypes = {
  destroyItem: PropTypes.func,
  isDragging: PropTypes.bool,
  index: PropTypes.number,
  style: PropTypes.object,
  id: PropTypes.number
};

export default flow(
  DropTarget('card', cardTarget, collect2),
  DragSource('card', cardSource, collect)
)(ListCard)