'use strict';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const e = React.createElement;

const colorClassName = "colorClass"
const colorName = "colorOption"
const colors = ["black" ,"blue", "green", "red"]
const thicknessClassName = "thicknessClass"
const thicknessName = "thicknessOption"
const thicknesses = ['1', '2', '3', '4', '5', '6', '7']


class ColorClass extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state = {color: this.props.color, colorClassName:colorClassName, colorName:colorName, disabled:this.props.isDisabled, isFirst:this.props.isFirst};

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event)
  {
      this.setState({color: event.target.value});
  }

  render()
  {
    if (this.state.disabled === false)
    {
      if (this.state.isFirst === false)
      {
          return (
              <label className="btn btn-secondary">
                  {this.state.color}
                  <input type="radio" className={this.state.colorClassName} style={{display:"none"}} name={this.state.colorName} value={this.state.color} />
              </label>
          );
      }
      else
      {
          return (
              <label className="btn btn-secondary active">
                  {this.state.color}
                  <input type="radio" className={this.state.colorClassName} style={{display:"none"}} name={this.state.colorName} value={this.state.color} checked/>
              </label>
          );
      }

    }
    else
    {
        return (
          <label className="btn btn-secondary disabled" disabled>
              Color
              <input type="radio" name={this.state.colorName} />
          </label>
        );
    }
  }
}

const colorListItems = colors.map((color) =>
  <ColorClass color = {color.capitalize()} isDisabled={false} isFirst={colors.indexOf(color) == 0}/>
);

const disabledColorHeadingButton = <ColorClass color={""} isDisabled ={true} isFirst={false}/>;

// ReactDOM.render(
//   <div className="btn-group btn-group-toggle" data-toggle="buttons">{disabledColorHeadingButton}{colorListItems}</div>,
//   document.getElementById('colorPicker')
// );

const colorBar = <div className="btn-group btn-group-toggle" data-toggle="buttons">{disabledColorHeadingButton}{colorListItems}</div>

class ThicknessClass extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state = {thickness: this.props.thickness, thicknessClassName:thicknessClassName, thicknessName:thicknessName, disabled:this.props.isDisabled, isFirst:this.props.isFirst};

      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event)
  {
      this.setState({thickness: event.target.value});
  }

  render()
  {
    if (this.state.disabled === false)
    {
      if (this.state.isFirst === false)
      {
          return (
              <label className="btn btn-secondary">
                  {this.state.thickness}
                  <input type="radio" className={this.state.thicknessClassName} style={{display:"none"}} name={this.state.thicknessName} value={this.state.thickness} />
              </label>
          );
      }
      else
      {
          return (
              <label className="btn btn-secondary active">
                  {this.state.thickness}
                  <input type="radio" className={this.state.thicknessClassName} style={{display:"none"}} name={this.state.thicknessName} value={this.state.thickness} checked/>
              </label>
          );
      }

    }
    else
    {
        return (
          <label className="btn btn-secondary disabled" disabled>
              Thickness
              <input type="radio" name={this.state.thicknessName} />
          </label>
        );
    }
  }
}

const thicknessListItems = thicknesses.map((thickness) =>
  <ThicknessClass thickness = {thickness} isDisabled={false} isFirst={thicknesses.indexOf(thickness) == 0}/>
);

const disabledThicknessHeadingButton = <ThicknessClass thickness={""} isDisabled ={true} isFirst={false}/>;

const thicknessBar = <div className="btn-group btn-group-toggle" data-toggle="buttons">{disabledThicknessHeadingButton}{thicknessListItems}</div>


// ReactDOM.render(
//   <div className="btn-group btn-group-toggle" data-toggle="buttons">{disabledThicknessHeadingButton}{thicknessListItems}</div>,
//   document.getElementById('thicknessPicker')
// );

class ButtonClass extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {id:this.props.id, heading:this.props.heading}
    }
    render()
    {
        return(
            <button type="button" id={this.state.id} class="btn btn-dark">{this.state.heading}</button>
        )
    }
}

const buttons = [{id:"eraseButton", heading:"Erase All"},
                 {id:"undoButton", heading:"Undo"},
                 {id:"redoButton", heading:"Redo"},
                ]

const buttonListItems = buttons.map((button) =>
  <ButtonClass id = {button.id} heading={button.heading}/>
);
ReactDOM.render(
    <div>{thicknessBar}{colorBar}</div>,
    document.getElementById('thicknessAndColorBar')
);

ReactDOM.render(
    <div>{buttonListItems}</div>,
    document.getElementById('buttonBar')
);
