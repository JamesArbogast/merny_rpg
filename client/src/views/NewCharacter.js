import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const NewCharacter = (props) => {
    const [name, setName] = useState("");
    const [characterClass, setCharacterClass] = useState("Sorcerer");
    const [attack, setAttack] = useState("");
    const [defense, setDefense] = useState("");
    const [magic, setMagic] = useState("");
    const [items, setItems] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    const [isSelected, setSelection] = useState(false);

    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/characters/" + props.id)
        .then((res) => {
            setName(res.data.name);
            setCharacterClass(res.data.characterClass);
            setAttack(res.data.attack);
            setDefense(res.data.defense);
            setMagic(res.data.magic)
            setItems(res.data.items);
            setImgUrl(res.data.imgUrl);
            setSelection(res.data.isSelected);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [props.id]);

    const handleNewCharacterSubmit = (event) => {
        event.preventDefault();

        const newCharacter = {
            name: name,
            characterClass: characterClass,
            attack: attack,
            defense: defense,
            magic: magic,
            items: items,
            imgUrl: imgUrl,
            isSelected : isSelected
        };

        axios
        .post("http://localhost:5000/api/characters/", newCharacter)
        .then((res) => {
            navigate("/characters/" + res.data._id);
        })
        .catch((err) => {
            // This .catch only happens if the controller uses
            // res.status(400).json(err)
            console.log(err);
            setErrors(err.response?.data?.errors);
        });
    };

    return (
        <div>
        <h1 style={{fontFamily: "", margin: "20px"}}>Create a new character</h1>
            <form
            onSubmit={(e) => {
                handleNewCharacterSubmit(e);
            }}
            style={{margin: "20px", fontSize: "20px", fontStyle: "bold"}}
            >
            <div style={{margin: "10px"}}>
                <label style={{margin: "10px"}}>Name: </label>
                {errors?.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
                    <input
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    type="text"
                    value={name}
                    />
            </div>

            <div style={{margin: "10px"}}>
                <label style={{margin: "10px"}}>Class: </label>
                {errors?.characterClass && (
                    <span style={{ color: "red" }}>{errors.characterClass.message}</span>
                )}
                <select
                    onChange={(e) => {
                        setCharacterClass(e.target.value);
                    }}
                    type="dropdown"
                    value={characterClass}
                >
                    <option value="Sorcerer">Sorcerer</option>
                    <option value="Bard">Bard</option>
                    <option value="Wizard">Wizard</option>
                    <option value="Druid">Druid</option>
                    <option value="Paladin">Paladin</option>
                    <option value="Ranger">Ranger</option>
                    <option value="Cleric">Cleric</option>
                </select>
            </div>

            <div style={{margin: "10px"}}>
                <label style={{margin: "10px"}}>Attack: </label>
                {errors?.attack && (
                <span style={{ color: "red" }}>{errors.attack.message}</span>
                )}
                <input
                onChange={(e) => {
                    setAttack(e.target.value);
                }}
                type="text"
                value={attack}
                />
            </div>

            <div style={{margin: "10px"}}>
                <label style={{margin: "10px"}}>Defense: </label>
                {errors?.defense && (
                <span style={{ color: "red" }}>
                    {errors.defense.message}
                </span>
                )}
                <input
                onChange={(e) => {
                    setDefense(e.target.value);
                }}
                type="text"
                value={defense}
                />
            </div>

            <div style={{margin: "10px"}}>
                <label style={{margin: "10px"}}>Magic: </label>
                {errors?.magic && (
                <span style={{ color: "red" }}>
                    {errors.magic.message}
                </span>
                )}
                <input
                onChange={(e) => {
                    setMagic(e.target.value);
                }}
                type="text"
                value={magic}
                />
            </div>

            <div style={{margin: "10px"}}>
                <label style={{margin: "10px"}}>Items: </label>
                <select
                    onChange={(e) => {
                        setItems(e.target.value);
                    }}
                    type="dropdown"
                    value={items}
                >
                    <option value="Sword">Sword</option>
                    <option value="Wand">Wand</option>
                    <option value="Lance">Lance</option>
                    <option value="Staff">Staff</option>
                    <option value="Mace">Mace</option>
                    <option value="Spell Book">Spell Book</option>
                    <option value="Shield">Shield</option>
                </select>
            </div>

            <div style={{margin: "10px"}}>
                <label style={{margin: "10px"}}>Image Url: </label>
                {errors?.imgUrl && (
                <span style={{ color: "red" }}>{errors.imgUrl.message}</span>
                )}
                <input
                onChange={(e) => {
                    setImgUrl(e.target.value);
                }}
                type="text"
                value={imgUrl}
                />
            </div>

            <button style={{margin: "20px", width: "15%", borderRadius: "5px", border: "darkblue 3px solid", fontSize: "20px", padding: "10px"}}>Update</button>
            </form>
        </div>
    );
};

export default NewCharacter;