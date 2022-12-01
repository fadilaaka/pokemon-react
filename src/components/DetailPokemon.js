import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useStoreZustand from "../utils/StateStore";
import { FaRegThumbsUp } from "react-icons/fa";

export default function DetailPokemon() {
  const { id } = useParams();
  const [detailPokemon, setDetailPokemon] = useState();
  const [descriptionPokemon, setDescriptionPokemon] = useState();

  const getLike = useStoreZustand((state) => state.likes);
  const likeButton = useStoreZustand((state) => state.addLike);

  useEffect(() => {
    PokemonAPI();
  }, []);

  const PokemonAPI = async () => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      console.log(res.data);
      setDetailPokemon(res.data);
      const description = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}/`
      );
      console.log(description.data);
      setDescriptionPokemon(description.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container-detail">
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
          alt={`Foto Pokemon ${id}`}
        />
        <button className="btn-like" onClick={likeButton}>
          <FaRegThumbsUp size={30} />
        </button>
        <h3>{getLike} likes</h3>
      </div>
      <div className="flex-col">
        <h1 style={{ margin: "0" }}>
          {detailPokemon && detailPokemon.species.name}
        </h1>
        <span>
          {descriptionPokemon &&
            descriptionPokemon.flavor_text_entries
              .filter((item) => {
                return item.version.name === "sapphire";
              })
              .map((item, index) => <p key={index}>{item.flavor_text}</p>)}
        </span>
        <span>
          <strong>Abilities: </strong>
          {detailPokemon &&
            detailPokemon.abilities.map((item, index) => (
              <ul key={index}>
                <li>{item.ability.name}</li>
              </ul>
            ))}
        </span>
        <span>
          <strong>Species: </strong>
          {detailPokemon && detailPokemon.name}
        </span>
        <span>
          <strong>Height: </strong>
          {detailPokemon && detailPokemon.height}
        </span>
        <span>
          <strong>Habitat: </strong>
          {descriptionPokemon && descriptionPokemon.habitat.name}
        </span>
        <span>
          <strong>Color: </strong>
          {descriptionPokemon && descriptionPokemon.color.name}
        </span>
        <span>
          <strong>Growth Rate: </strong>
          {descriptionPokemon && descriptionPokemon.growth_rate.name}
        </span>
        <span>
          <strong>Shape: </strong>
          {descriptionPokemon && descriptionPokemon.shape.name}
        </span>
        <span>
          <strong>Genus: </strong>
          {descriptionPokemon &&
            descriptionPokemon.genera
              .filter((item) => {
                return item.language.name === "en";
              })
              .map((item) => ` ${item.genus}`)}
        </span>
        <span>
          <strong>Types: </strong>
          {detailPokemon &&
            detailPokemon.types.map((item, index) => (
              <ul key={index}>
                <li>{item.type.name}</li>
              </ul>
            ))}
        </span>
        <Link to={"/"} className="modal-close-btn">
          Back
        </Link>
      </div>
    </div>
  );
}
