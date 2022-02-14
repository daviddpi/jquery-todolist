$(document).ready(function(){

    let click = 0;
    const lista = $("#lista");

    const testo = $("#input-search");

    // ! crea un elemento della lista
    function createTodo(){
        lista.prepend('<input type="text" placeholder="Inserisci Todo"></input>');

        $("input").keydown( function (e){ 
            if (e.keyCode == 13) {
                lista.prepend(
                    `<li class="list-group-item"><i class="fa-solid fa-circle-check"></i>
                    ${$(this).val()}
                        <div class="container-ellipsis">
                            <i class="fa-solid fa-ellipsis"></i>
                            <div class="dropdown--ellipsis">
                                <option value="modifica">Modifica</option>
                                <option value="elimina">Elimina</option>
                            </div>
                        </div>
                    </li>`
                );
                $(this).remove();

                // il click serve a non permettere di cliccare più volte su 'aggiunti todo'
                click = 0;
            }
        })
    }

    // ! modifica l'elemento della lista
    function editTodo(el, testo){
        el.parents("li").html(`<input type="text" value="${testo.trim()}" placeholder="Modifica Todo"></input>`);
        $(".list-group input").keydown( function (e){ 
            if (e.keyCode == 13) {
                $(this).parents("li").append(
                    `<i class="fa-solid fa-circle-check"></i>
                    ${$(this).val()}
                    <div class="container-ellipsis">
                        <i class="fa-solid fa-ellipsis"></i>
                        <div class="dropdown--ellipsis">
                            <option value="modifica">Modifica</option>
                            <option value="elimina">Elimina</option>
                        </div>
                    </div>`
                );
                $(this).remove()

                click = 0;
            }
        })
    }

    // ! disattiva l'elemento della lista
    function deactive(ele){
        $(ele).toggleClass('deactivate');
    }

    // // ! funzione di ricerca
    // testo.keydown( function(e){
    //     let findText = $(`li:contains(${testo.val()})`)
    //     if (e.keyCode == 13) {
    //         console.log(testo.val());
    //         if(findText){
    //             findText.css("backgroundColor", "yellow")
    //         }
            
    //     }
    // })
    
    
    $(".add-todo").click(function (){ 
        
        if(click == 0){
            createTodo();
        }
        click++;
    });

    
    $(lista).on("click", ".list-group-item", function(e){
        deactive(e.target);
    })

    $(lista).on("click", ".container-ellipsis .fa-ellipsis", function(){
        let dropdown = $(this).next();
        dropdown.toggle();
    })

    $(lista).on("click", ".container-ellipsis .dropdown--ellipsis", function(e){
        let testo = $(this).parents("li").clone().children().remove().end().text();
        
        let opzione = $(e.target)
        if(opzione.val() == "modifica"){
            click = 1;
            editTodo(opzione, testo);
            
        }else{
            opzione.parents("li").remove();
        }
        
    })




})
