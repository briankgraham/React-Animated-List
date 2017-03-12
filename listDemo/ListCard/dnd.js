import { findDOMNode } from 'react-dom';

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
const collect2 = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const cardSource = {
  beginDrag(props, monitor) {
    return {id: props.card.data.id, index: props.index}
  },
  canDrag(props) {
    if (props.length === 1) return false
    return true
  }
}

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  },
};

export {collect, collect2, cardSource, cardTarget}