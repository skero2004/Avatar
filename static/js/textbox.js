$(function() {

    // Sources
    let unselected = $("#textUnselected").attr("src");
    let selected = $("#textSelected").attr("src");

    // Create textbox
    const textbox = $("<img>");
    const text = $("<p>");

    const BOTTOM_POSITION = 420;
    const DIFF = 20;
    const RIGHT_POSITION = 30;
    const FONT_SIZE = 30;
    textbox.attr({

        "src": unselected,
        "draggable": "false",
        "style": `position: absolute; bottom: ${BOTTOM_POSITION}px; right: ${RIGHT_POSITION}px`

    });
    text.attr({

        "style": `text-align: left; font-size: ${FONT_SIZE}px; width: 400px; position: absolute; bottom: ${BOTTOM_POSITION - DIFF}px; right: ${RIGHT_POSITION}px;`

    });

    // Append image to div
    $("#textbox").append(textbox);
    $("#textbox").append(text);

    // Function to set text with span
    function setText(t) {

        $(text).empty();
        for (let i = 0; i < t.length; i++) {

            $(text).append("<span>");
            $(text).children("span")[i].style = "font-family: Nasalization";
            $(text).children("span")[i].textContent = t[i];

        }

        $.ajax({

            type: "POST",
            url: "/setDisplay",
            data : {"text": t}
    
        });

    }

    let name = "FRC Team 568";
    setText(name);
    $(document).on("click", e => {

        // Code for select/unselect
        if ($(e.target).is(textbox) || $(e.target).is(text) || $(e.target).is(text.children())) {

            if (!(textbox.attr("src") == selected)) {

                textbox.attr("src", selected);

                if (isMobile) {

                    name = prompt("What is your name?");
                    setText(name);
                    loop: for (let i = name.length - 1; i >= 0; i--) {

                        if ($(text).children()[i].getBoundingClientRect().right < 
                            $(textbox).get(0).getBoundingClientRect().right -10) {
                            
                            const len = name.length;
                            if (i == len - 1) {

                                break loop;

                            }
                            for (let j = i + 1; j < len; j++) {

                                $(text).children()[i + 1].remove();

                            }
                            break loop;

                        }

                    }
                    textbox.attr("src", unselected);

                }
    
            } 

        } else if (textbox.attr("src") == selected) {
            
            textbox.attr("src", unselected);

        }

    });

    $(document).on("keydown", e => {

        if (textbox.attr("src") == selected) {

            if (e.key == "Backspace") {

                name = name.substring(0, name.length - 1);

            } else if (((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123) || 
                        e.which == 8 || e.which == 32 || (e.which >= 48 && e.which <= 57)) &&
                        !(e.which >= 112 && e.which <= 123)) {

                if (name.length == 0)
                    name += e.key;
                else if ($(text).children().last().get(0).getBoundingClientRect().right 
                    < $(textbox).get(0).getBoundingClientRect().right - 45)
                    name += e.key;

            }
            
            setText(name);
        
        }

    });

});