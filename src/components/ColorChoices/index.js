import React from 'react';
import './index.css';

/* placeholder, use or delete! */

const ColorChoices = (props) => {
	// Empty array to hold color choices
	let colurBoxes =[] 

	// When a color choice is clicked
	const changeColorBox = (data) => { 
		// Call parent function callChangeColorBox
		props.callChangeColorBox(data) 
		// Call parent function callChangeOutlineChoice
		props.callChangeOutlineChoice(data) 
	}
	// When the fetched color data is not null 
	if(props.color.data.colorChoices != null){ 
		// Total number of colors fetched
		const total = (props.color.data.colorChoices.length) 
		// Array with the color choices fetched
		const array = props.color.data.colorChoices 
		// dynamically add color choices into array 
		for(var i = 0; i < total; i++){
			// When a color choice has been clicked
			if(props.colorChoiceId !== undefined){
				// Checking if color choice state is true
				if(props.colorChoiceId.state){
					// If the color in the array and color clicked is the same then give this div a border
					if(props.color.data.colorChoices[i] === props.colorChoiceId.id){
						colurBoxes.push(
						<div 
						key={props.color.data.colorChoices[i]} 
						className='colorChoiceBox' 
						style={{backgroundColor:array[i],border: '1px solid'}}
						onClick={changeColorBox}
						id={array[i]}
						/>)
					// Else color is not the same and should not have a border
					}else{
					colurBoxes.push(
						<div 
							key={props.color.data.colorChoices[i]} 
							className='colorChoiceBox' 
							style={{backgroundColor:array[i]}}
							onClick={changeColorBox}
							id={array[i]}
						/>
						)
					}
				// Else the color choice state is false
				}else{
					// Add a div with no border but with the background color 
					colurBoxes.push(
						<div 
							key={props.color.data.colorChoices[i]} 
							className='colorChoiceBox' 
							style={{backgroundColor:array[i]}}
							onClick={changeColorBox}
							id={array[i]}
						/>
						)
				}
			// When a color choice has not been clicked
			}else{ 
				colurBoxes.push(
					<div 
						key={props.color.data.colorChoices[i]} 
						className='colorChoiceBox' 
						style={{backgroundColor:array[i]}}
						onClick={changeColorBox}
						id={array[i]}
					/>
					)
			}
			// If 5 color choices have been added to the array, add a break
			if( ((i+1) % 5) === 0){
				colurBoxes.push(<div key={props.color.data.colorChoices[i]+"break"} className="line-break"></div>)
			}
		}
	}
	return(
	<div className="colorChoices">
		{colurBoxes}
	</div>
	);
}

export default ColorChoices;
