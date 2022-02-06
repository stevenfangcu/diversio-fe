import React, { useState } from 'react';
import './index.css';
import ColorBox from '../ColorBox';
import { fetchColors } from '../../api';
import ColorChoices from '../ColorChoices';

const ColorWidget = (props) => {

    /* Diversio's front end uses react-redux and redux-saga to
    manage fetching data from the backend API, placing it into
    the redux store, and making it available to appropriate components.

    https://react-redux.js.org/introduction/getting-started
    https://redux-saga.js.org/docs/introduction/GettingStarted

    If you are familiar with react-redux, 
    please use it to replace the DATA FETCHING CODE below,
    and make the colors list available via props.

    If you are familiar with redux-saga, please use it to
    trigger the data fetch when this component loads.

    You may treat fetchColors as a black-box "API".
    You don't need to edit it, but you are welcome to look at its code.

    If you are not comfortable with any of the above, 
    you are welcome to leave this Promise here as is.
    */
    // START OF DATA FETCHING CODE
    const [ colors, setColors ] = useState(null);
    // Setting color box state 
    const [ colorBox, setColorBox] = useState({color: "", state: false})
    // Setting color choice state 
    const [ colorChoiceOutline, setColorChoiceOutline] = useState({id:""})
    
    fetchColors
        .then((res) => {
            setColors(res);
        })
        .catch(
        (e) => {
            console.log("Error:" + e);
        }
    )
    // END OF DATA FETCHING CODE 

    // Handling and setting the color box state 
    const onHandleColorBox = (e) =>{
        setColorBox(Object.assign({}, colorBox, {color: e.target.style.backgroundColor, state: true}))
    }

    // Handling and setting the outline color choice state
    const onHandleOutline = (e) =>{
        if(colors != null){
            setColorChoiceOutline(Object.assign({}, colorChoiceOutline, {id: e.target.id, state: true}))
        }
    }
    // Render the color choices 
    const renderColors = () => {
        // If the color fetching has been completed return divs
        if(colors != null){ 
            // If a color choice has been clicked give extra parameter callChangeOutlineChoice
            if(colorChoiceOutline.state){ 
                return (
                    <ColorChoices
                        color={colors}
                        colorChoiceId={colorChoiceOutline}
                        callChangeColorBox={onHandleColorBox}
                        callChangeOutlineChoice={onHandleOutline}
                    />
                );
            }
            // If no color choice has been clicked 
            return(
                <ColorChoices 
                color={colors}
                callChangeColorBox={onHandleColorBox}
                callChangeOutlineChoice={onHandleOutline}
                />
            );
        }
    }
    // Render the color box
    const renderColorBox = () =>{
        // If the color box is colored i.e not grey 
        if(colorBox.state){ 
            // Give parameter with the color chosen
            return( 
            <ColorBox
                color={colorBox.color}
            />
            )
        // Otherwise don't give paramater with color
        }else{
            return(
                <ColorBox/>
            );
        }
    }

    return (
        <div className="color-widget">
            <div className="color-widget-title">
                <h2>I am a placeholder, change this file or delete it entirely and start over</h2>
            </div>
            {renderColorBox()}
            {renderColors()}
            <div>
                {JSON.stringify(colors)}
            </div>
        </div> 
    );
}

export default ColorWidget;
