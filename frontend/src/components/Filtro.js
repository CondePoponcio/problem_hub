import React, { useState, useEffect } from "react";
import $ from 'jquery';
import './../../static/css/problemas/filter.css';

const jQuerycode = () => {
    /* ===== Logic for creating fake Select Boxes ===== */
    $('.sel').each(function() {
        $(this).children('select').css('display', 'none');
        
        var $current = $(this);
        
        $(this).find('option').each(function(i) {
        if (i == 0) {
            $current.prepend($('<div>', {
            class: $current.attr('class').replace(/sel/g, 'sel__box')
            }));
            
            var placeholder = $(this).text();
            $current.prepend($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__placeholder'),
            text: placeholder,
            'data-placeholder': placeholder
            }));
            
            return;
        }
        
        $current.children('div').append($('<span>', {
            class: $current.attr('class').replace(/sel/g, 'sel__box__options'),
            text: $(this).text()
        }));
        });
    });
    
    // Toggling the `.active` state on the `.sel`.
    $('.sel').click(function() {
        $(this).toggleClass('active');
    });
    
    // Toggling the `.selected` state on the options.
    $('.sel__box__options').click(function() {
        var txt = $(this).text();
        var index = $(this).index();
        
        $(this).siblings('.sel__box__options').removeClass('selected');
        $(this).addClass('selected');
        
        var $currentSel = $(this).closest('.sel');
        $currentSel.children('.sel__placeholder').text(txt);
        $currentSel.children('select').prop('selectedIndex', index + 1);
    });
  
}


export const Filtro = props => {
    jQuerycode()
    return (
        <form>
            
            <input id="categoria" type="text" name="categoria" placeholder="Categoria"></input>
            
            <div className="sel sel--black-panther">
                
                <select name="dificultad" id="select-profession">
                    <option value="" disabled>Dificultad</option>
                    <option name="none">Null</option>
                    <option name ="facil">Facil</option>
                    <option name="medio">Medio</option>
                    <option name="dificil">Dificil</option>
                </select>
            </div>





            <button type="submit">Buscar</button>
        </form>




        
        );
};