$(function() {

    // Create arrows
    let arrows = {

        up: $("<img>"),
        down: $("<img>"),
        right: $("<img>"),
        left: $("<img>")

    }

    // Source
    let unpressed = $("#unpressed").attr("src");
    let pressed = $("#pressed").attr("src");

    // Set up arrows
    let div = $("#arrows");
    for (const arrow in arrows) {

        // Append image to div
        div.append(arrows[arrow]);

        // Image setup
        
        arrows[arrow].attr({
        
            "src": unpressed,
            "draggable": "false",
            "name": arrow
            
        });
        arrows[arrow].css("position", "absolute");

        const TOP_POSITION = -350;
        const LEFT_POSITION = -180;
        const SPACING = 5;
        if (arrow == "up") {

            arrows[arrow].css({
           
                "left": `${LEFT_POSITION + -arrows[arrow].width() / 2}px`,
                "top": `${TOP_POSITION}px`
            
            });

        } else if (arrow == "down") {

            arrows[arrow].css({

                "transform": "rotate(180deg)",
                "left": `${LEFT_POSITION + -arrows[arrow].width() / 2}px`,
                "top": `${TOP_POSITION + arrows[arrow].height() + SPACING}px`
                
            });

        } else if (arrow == "right") {

            arrows[arrow].css({

                "transform": "rotate(90deg)",
                "left": `${LEFT_POSITION + arrows[arrow].width() / 2 + SPACING}px`,
                "top": `${TOP_POSITION + arrows[arrow].height() + SPACING}px`
                
            });

        } else {

            arrows[arrow].css({

                "transform": "rotate(-90deg)",
                "left": `${LEFT_POSITION + -3 * arrows[arrow].width() / 2 - SPACING}px`,
                "top": `${TOP_POSITION + arrows[arrow].height() + SPACING}px`
                
            });

        }

    }

    // Get touchstart input
    let dirTrue;
    for (const arrow in arrows) {
        
        if (arrow == "up") {
            
            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                dirTrue = "UP";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"DIR": dirTrue}
        
                }); 
    
            });

        } else if (arrow == "down") {

            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                dirTrue = "DOWN";
              
                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"DIR": dirTrue}
        
                }); 
    
            });

        } else if (arrow == "right") {

            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                dirTrue = "RIGHT";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"DIR": dirTrue}
        
                }); 
    
            });

        } else {
            
            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                dirTrue = "LEFT";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"DIR": dirTrue}
        
                }); 
    
            });

        }        

    }

    // Get touchend input
    let dirFalse;
    for (const arrow in arrows) {
        
        if (arrow == "up") {
            
            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                dirFalse = "UP";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"DIR": dirFalse}
        
                });  
    
            });

        } else if (arrow == "down") {

            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                dirFalse = "DOWN";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"DIR": dirFalse}
        
                });  
    
            });

        } else if (arrow == "right") {

            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                dirFalse = "RIGHT";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"DIR": dirFalse}
        
                });  
    
            });

        } else {
            
            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                dirFalse = "LEFT";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"DIR": dirFalse}
        
                });  
    
            });

        }        

    }

});