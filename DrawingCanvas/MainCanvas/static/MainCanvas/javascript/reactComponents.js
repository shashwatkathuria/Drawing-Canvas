'use strict';

// Defining new prototype method for string for capitalizing
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Initializing variables required for rendering thickness
// and color and eraser buttons
const colorClassName = "colorClass"
const colorName = "colorOption"
const colors = ["black" ,"blue", "green", "red"]
const thicknessClassName = "thicknessClass"
const thicknessName = "thicknessOption"
const thicknesses = ['1', '2', '3', '4', '5', '6', '7']
const eraserClassName = "eraserClass"
const eraserName = "eraserOption"
const erasers = ["0", "1", "2", "3", "4", "5", "6", "7"]

// Defining color class as a react component
class ColorClass extends React.Component
{
    constructor(props)
    {
        // Constructing parent elements
        super(props);

        // Defining state
        this.state = {
          color: this.props.color,
          colorClassName:colorClassName,
          colorName:colorName,
          disabled:this.props.isDisabled,
          isFirst:this.props.isFirst
        };

        // Binding handleChange method to this class
        this.handleChange = this.handleChange.bind(this);
    }

    // Function for handling change of color
    handleChange(event)
    {
        this.setState({color: event.target.value});
    }

    // Function for rendering color button
    render()
    {
        // Not rendering active button if button is disabled
        if (this.state.disabled === false)
        {
            // Button not active/selected if not first
            if (this.state.isFirst === false)
            {
                return (
                    <label className="btn btn-secondary">
                        {this.state.color}
                        <input type="radio" className={this.state.colorClassName} style={{display:"none"}} name={this.state.colorName} value={this.state.color} />
                    </label>
                );
            }
            // Button selected if first button
            else
            {
                return (
                    <label className="btn btn-secondary active">
                        {this.state.color}
                        <input type="radio" className={this.state.colorClassName} style={{display:"none"}} name={this.state.colorName} value={this.state.color} defaultChecked/>
                    </label>
                );
            }

        }
        // Rendering disabled button
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

// Creating color buttons for each color using its react class
const colorListItems = colors.map((color) =>
  <ColorClass color = {color.capitalize()} isDisabled={false} isFirst={colors.indexOf(color) == 0}/>
);

// Creating color buttons for disabled color heading button using its react class
const disabledColorHeadingButton = <ColorClass color={""} isDisabled ={true} isFirst={false}/>;

// Inserting disabledColorHeadingButton and colorListItems inside colorBar
const colorBar = <div className="btn-group btn-group-toggle" data-toggle="buttons">{disabledColorHeadingButton}{colorListItems}</div>

// Defining thickness class as a react component
class ThicknessClass extends React.Component
{
    constructor(props)
    {
        // Constructing parent elements
        super(props);

        // Defining state
        this.state = {
          thickness: this.props.thickness,
          thicknessClassName:thicknessClassName,
          thicknessName:thicknessName,
          disabled:this.props.isDisabled,
          isFirst:this.props.isFirst
        };

        // Binding handleChange method to this class
        this.handleChange = this.handleChange.bind(this);
    }

    // Function for handling change of thickness
    handleChange(event)
    {
        this.setState({thickness: event.target.value});
    }

    // Function for rendering thickness button
    render()
    {
        // Not rendering active button if button is disabled
        if (this.state.disabled === false)
        {
            // Button not active/selected if not first
            if (this.state.isFirst === false)
            {
                return (
                    <label className="btn btn-secondary">
                        {this.state.thickness}
                        <input type="radio" className={this.state.thicknessClassName} style={{display:"none"}} name={this.state.thicknessName} value={this.state.thickness} />
                    </label>
                );
            }
            // Button selected if first button
            else
            {
                return (
                    <label className="btn btn-secondary active">
                        {this.state.thickness}
                        <input type="radio" className={this.state.thicknessClassName} style={{display:"none"}} name={this.state.thicknessName} value={this.state.thickness} defaultChecked/>
                    </label>
                );
            }
        }
        // Rendering disabled button
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


// Defining thickness class as a react component
class EraserClass extends React.Component
{
    constructor(props)
    {
        // Constructing parent elements
        super(props);

        // Defining state
        this.state = {
          thickness: this.props.thickness,
          eraserClassName:eraserClassName,
          eraserName:eraserName,
          disabled:this.props.isDisabled,
          isFirst:this.props.isFirst
        };

        // Binding handleChange method to this class
        this.handleChange = this.handleChange.bind(this);
    }

    // Function for handling change of thickness
    handleChange(event)
    {
        this.setState({thickness: event.target.value});
    }

    // Function for rendering thickness button
    render()
    {
        // Not rendering active button if button is disabled
        if (this.state.disabled === false)
        {
            // Button not active/selected if not first
            if (this.state.isFirst === false)
            {
                return (
                    <label className="btn btn-secondary">
                        {this.state.thickness}
                        <input type="radio" className={this.state.eraserClassName} style={{display:"none"}} name={this.state.eraserName} value={this.state.thickness} />
                    </label>
                );
            }
            // Button selected if first button
            else
            {
                return (
                    <label className="btn btn-secondary active">
                        {this.state.thickness}
                        <input type="radio" className={this.state.eraserClassName} style={{display:"none"}} name={this.state.eraserName} value={this.state.thickness} defaultChecked/>
                    </label>
                );
            }
        }
        // Rendering disabled button
        else
        {
            return (
              <label className="btn btn-secondary disabled" disabled>
                  Eraser
                  <input type="radio" name={this.state.eraserName} />
              </label>
            );
        }
    }
}





// Creating eraser buttons for each eraser thickness using its react class
const eraserListItems = erasers.map((eraser) =>
  <EraserClass thickness = {eraser} isDisabled={false} isFirst={erasers.indexOf(eraser) == 0}/>
);

// Creating eraser buttons for disabled color heading button using its react class
const disabledEraserHeadingButton = <EraserClass thickness={""} isDisabled ={true} isFirst={false}/>;

// Inserting disabledEraserHeadingButton and eraserListItems inside eraserBar
const eraserBar = <div className="btn-group btn-group-toggle" data-toggle="buttons">{disabledEraserHeadingButton}{eraserListItems}</div>



// Creating thickness buttons for each color using its react class
const thicknessListItems = thicknesses.map((thickness) =>
  <ThicknessClass thickness = {thickness} isDisabled={false} isFirst={thicknesses.indexOf(thickness) == 0}/>
);

// Creating thickness buttons for disabled color heading button using its react class
const disabledThicknessHeadingButton = <ThicknessClass thickness={""} isDisabled ={true} isFirst={false}/>;

// Inserting disabledThicknessHeadingButton and thicknessListItems inside thicknessBar
const thicknessBar = <div className="btn-group btn-group-toggle" data-toggle="buttons">{disabledThicknessHeadingButton}{thicknessListItems}</div>

// Defining button class as a react component
class ButtonClass extends React.Component
{
    constructor(props)
    {
        // Constructing parent elements
        super(props)

        // Defining state
        this.state = {
          id:this.props.id,
          heading:this.props.heading
        }
    }

    // Function for rendering button
    render()
    {
        return(
            <button type="button" id={this.state.id} className="btn btn-dark" >{this.state.heading}</button>
        );
    }
}

// Initializing variables required for rendering buttons
// with appropriate id and heading
const buttons = [{id:"eraseButton", heading:"Erase All"},
                 {id:"undoButton", heading:"Undo"},
                 {id:"redoButton", heading:"Redo"},
                 {id:"saveDrawingButton", heading:"Save Drawing"}
                ]

// Creating buttons for each function button using its react class
const buttonListItems = buttons.map((button) =>
  <ButtonClass id = {button.id} heading={button.heading} />
);

// Rendering thickness, color and eraser bar
ReactDOM.render(
    <div>{thicknessBar}{colorBar}{eraserBar}</div>,
    document.getElementById('thicknessAndColorAndEraserBar')
);

// Rendering all funtion buttons
ReactDOM.render(
    <div>{buttonListItems}</div>,
    document.getElementById('buttonBar')
);

// Defining a new custom event for draw.js to
// start assigning functions to all thickness,
// color and funtion buttons after they are loaded
// by react in the DOM
var event = new CustomEvent("ReactDOMLoaded", { "detail": "React elements loaded." });

// Dispatching event
document.dispatchEvent(event);
