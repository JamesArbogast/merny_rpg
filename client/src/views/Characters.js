import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const Characters = (props) => {
    const [characters, setCharacters] = useState([]);
    let team =[];

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/characters")
        .then((res) => {
            const sortedCharacters = res.data.sort((a, b) =>
            a.name.localeCompare(b.name)
            );

            setCharacters(sortedCharacters);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleDelete = (delId) => {
        axios
        .delete("http://localhost:5000/api/characters/" + delId)
        .then((res) => {
            // At this point it is deleted from DB but we need to cause a re-render to remove it from the page.
            const filteredCharacters = characters.filter((character) => {
            return character._id !== delId;
            });

            setCharacters(filteredCharacters);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const setTeam = (selectedCharacter) => {
        if(team.length >= 1) {
            team.push(selectedCharacter);
        }
        else {
            team.push(selectedCharacter);
        }
        console.log(team.length)
    }

    const handleSelection = (selectedCharacter) => {
        const updateBody = {
            isSelected: true,
        };
    
        // re-use update route since it can be used to update any part
        axios
            .put(`http://localhost:5000/api/characters/${selectedCharacter._id}`, updateBody)
            .then((res) => {
                const selectedCharacters = characters.map((character) => {
                    if (selectedCharacter._id === character._id) {
                        return res.data;
                    }
                    if(selectedCharacters.isSelected === true) {
                        team.push(selectedCharacter)
                        console.log(team);
                    }
                    return character;
                })
                setCharacters(selectedCharacters);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
        <h3 style={{fontFamily: "", margin: "20px"}}>All Characters</h3>
        {characters.map((character) => {
            return (
            <div
                key={character._id}
                style={{ width: "60%", margin: "0 auto", padding: "20px", border:"#063970 5px solid", borderRadius: "5px", margin: "15px", boxShadow:"5px 5px 2px black", backgroundColor:"#136ea5    "}}
            >   
                <h3 style={{border:"black 5px solid", borderRadius: "5px", margin: "15px", padding: "10px", textDecoration: "none", backgroundColor: "black", border: "#ADD8E6 3px solid", borderRadius: "5px"}}>
                    <Link to={"/characters/" + character._id} style={{textDecoration: "none", color:"white" }}>{character.name}</Link>
                </h3>
                <div style={{display: "flex"}}>
                    <div style={{textAlign: "left", margin: "10px", paddingRight: "20px", width: "20%", color: "white", backgroundColor:"black", border: "darkblue 3px solid", borderRadius: "5px"}}>
                        <p style={{border:"black 5px solid", borderRadius: "5px", padding: "10px"}}>Class: {character.characterClass}</p>
                        <p style={{border:"black 5px solid", borderRadius: "5px", padding: "10px"}}>Attack: {character.attack}</p>
                        <p style={{border:"black 5px solid", borderRadius: "5px", padding: "10px"}}>Defense: {character.defense}</p>
                        <p style={{border:"black 5px solid", borderRadius: "5px", padding: "10px"}}>Magic: {character.magic}</p>
                        <ul style={{border:"black 5px solid", borderRadius: "5px", padding: "10px", listStyleType: "none"}}>Items:
                        {character.items.map((item, idx) => {
                            return (
                                <li key={idx} value={item} style={{border:"black 5px solid", borderRadius: "5px"}}>{item}</li>
                            );
                        })} 
                        </ul>
                    </div>
                    <div>
                        <img src={character.imgUrl} alt={character.name} width="90%" style={{border:"black 5px solid", borderRadius: "5px"}} />
                    </div>
                </div>
                <div style={{textDecoration: "none", margin: "20px"}}    >
                <button style={{ color: "white", backgroundColor: "brown", cursor: "pointer", marginLeft: "10px", border: "black 2px solid", width: "20%", padding: "10px", textDecoration: "none"}}><Link to={`/characters/${character._id}/edit`} style={{textDecoration: "none", color: "white"}}>Edit</Link></button>
                <button
                    onClick={(e) => {
                        handleDelete(character._id);
                    }}
                    style={{ color: "white", backgroundColor: "red", cursor: "pointer", marginLeft: "10px", border: "black 2px solid", width: "20%", padding: "10px"}}
                >
                    Delete
                </button>
                <input 
                    type={"checkbox"} 
                    onClick={(e)=> {
                        handleSelection(character)
                        setTeam(character)}}
                >
                </input>
                </div>
                <hr />
            </div>
            );
        })}
        </div>
    );
};

export default Characters;