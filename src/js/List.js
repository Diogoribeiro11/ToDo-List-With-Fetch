import { useEffect, useState } from 'react';
import React from "react";

function List() {

	let [list, setList] = useState([]);
	let [newItem, setNewItem] = useState("");

	let num = list.length;
	if(list.length == 0){
		num = 'No items';
	} else if (list.length == 1){
		num = '1 item';
	} else {
		num = list.length + " items ";
	}

    useEffect(() => {
        fetch('https://3000-4geeksacadem-reacthello-yp7n565bzhv.ws-eu81.gitpod.io/')
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource')
                }
                return res.json();
            })
            .then(data => {
                setNewItem(data);
            })
    }, [])

    return(  
		<div className='container2'>
		<div className='addItem'>
		<input class="input" placeholder="What needs to be done?" value={newItem} onChange={value => setNewItem(value.target.value)} type="text" /> 
		<button className='addBtn' onClick={addItem}>add</button>
		</div>
		<ul className='list'>
			{list.map((item, index) => (
			<li key={index} className='listLi'><h5>{item}</h5><span><button className="delete" onClick = {() => deleteItem(index)}>Delete</button></span></li>
			))}
			<li className='listLastLi'><p>{num} left.</p></li>
		</ul>
		</div>
    );

	function addItem() {
		if(newItem.length <= 0){
			alert("please enter a topic")
			return;
		}

		setList([...list, newItem]);
		setNewItem("");
	}

	function deleteItem(index){
		let tempArray = [...list];
		tempArray.splice(index, 1);

		setList(tempArray);
	}

}

export default List;