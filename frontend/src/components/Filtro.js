import React, { useState } from "react";

export const Filtro = props => {
    return (
        <form>
            <input type="text" name="categoria" placeholder="Categoria"></input>
            <select name="dificultad">
                <option name="none">Null</option>
                <option name ="facil">Facil</option>
                <option name="medio">Medio</option>
                <option name="dificil">Dificil</option>
            </select>
            <button type="submit">Buscar</button>
        </form>
        );
};