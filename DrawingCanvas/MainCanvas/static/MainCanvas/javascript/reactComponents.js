'use strict';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const e = React.createElement;

const colorClassName = "colorClass";
const colorName = "colorOption";
const colors = ["black" ,"blue", "green", "red"]
// var color = "Hello Ji";
// const element = (

// );

// for(let i = 0; i < colors.length ; i++)
// {
//     color = colors[i];
//
//     ReactDOM.render(
//         element,
//         document.getElementById('colorPicker')
//     );
// }



class ColorClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: this.props.color, colorClassName:colorClassName, colorName:colorName};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({color: event.target.value});
  }

  render() {
    return (
        <label className="btn btn-secondary">
            {this.state.color}
            <input type="radio" className={this.state.colorClassName} style={{display:"none"}} name={this.state.colorName} value={this.state.color} />
        </label>
    );
  }
}

// ReactDOM.render(
//   <ColorClass color = "Red"/>,
//   document.getElementById('colorPicker')
// );

const listItems = colors.map((color) =>
  <ColorClass color = {color.capitalize()}/>
);


ReactDOM.render(
  <div class="btn-group btn-group-toggle" data-toggle="buttons">{listItems}</div>,
  document.getElementById('colorPicker')
);

// <label class="btn btn-secondary disabled" disabled>
//     <input type="radio" name="colorOption" >Color
// </label>
// <label class="btn btn-secondary active">
//     <input type="radio" class="colorClass" name="colorOption" value="black" checked> Black
// </label>
// <label class="btn btn-secondary">
//     <input type="radio" class="colorClass" name="colorOption" value="blue" > Blue
// </label>
// <label class="btn btn-secondary">
//     <input type="radio" class="colorClass" name="colorOption" value="green" > Green
// </label>
// <label class="btn btn-secondary">
//     <input type="radio" class="colorClass" name="colorOption" value="red" > Red
// </label>
