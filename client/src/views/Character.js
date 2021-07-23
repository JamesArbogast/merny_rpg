import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";

const Character = (props) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/characters/" + props.id)
        .then((res) => {
            setCharacter(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [props.id]);

    const handleDelete = (delId) => {
        axios
        .delete("http://localhost:5000/api/characters/" + delId)
        .then((res) => {
            navigate("/characters");
        })
        .catch((err) => {
            console.log(err);
        });
    };

    if (character === null) {
        return "Loading...";
    }

    return (
        <div>
            <div style={{textAlign: "left", margin: "10px", paddingRight: "20px", width: "20%", color: "white", backgroundColor:"darkblue", border: "black 3px solid", borderRadius: "5px", width: "85%", boxShadow: "5px 5px 5px black", padding:"40px"}}>
                <h2>{character.name}</h2>
                <div width="100%"style={{backgroundColor: "black", padding: "25px", borderRadius: "5px", border:"#ADD8E6 5px solid"}}>
                    <h3>Class: {character.characterClass}</h3>
                    <p>Attack: {character.attack}</p>
                    <p>Defense: {character.defense}</p>
                    <p>Magic: {character.magic}</p>
                    <p>Items: {character.items}</p>
                </div>
                <img src={character.imgUrl} alt={character.name} width="100%" style={{border:"#ADD8E6 5px solid", borderRadius: "5px"}} />
                <div>
                    <button onClick={(e) => {
                    handleDelete(character._id);
                    }}
                    style={{ color: "white", backgroundColor: "red", cursor: "pointer", marginLeft: "10px", border: "black 2px solid", width: "20%", padding: "10px"}}
                    >
                        Delete
                    </button>
                    <button style={{ color: "white", backgroundColor: "brown", cursor: "pointer", marginLeft: "10px", border: "black 2px solid", width: "20%", padding: "10px", textDecoration: "none"}} navigate={`/characters/${character._id}/edit`}><Link to={`/characters/${character._id}/edit`} style={{textDecoration: "none"}}>Edit</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Character;