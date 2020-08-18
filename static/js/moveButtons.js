$(function() {

    // Create buttons
    let moveButtons = {

        up: $("<img>"),
        down: $("<img>"),
        right: $("<img>"),
        left: $("<img>"),
        slow: $("<img>")

    }

    // Source
    let unpressed = $("#unpressed").attr("src");
    let pressed = $("#pressed").attr("src");
    let slowMode = $("#slowMode").attr("src");
    let normalMode = $("#normalMode").attr("src");

    // Set up buttons
    let div = $("#moveButtons");
    for (const button in moveButtons) {

        // Append image to div
        div.append(moveButtons[button]);

        // Image setup
        
        moveButtons[button].attr({
        
            "src": unpressed,
            "draggable": "false",
            "name": button
            
        });
        moveButtons[button].css("position", "absolute");

        const TOP_POSITION = -350;
        const LEFT_POSITION = -180;
        const SPACING = 5;
        if (button == "slow") {

            moveButtons[button].css({

                "left": `${LEFT_POSITION + -3 * moveButtons[button].width() / 2 - SPACING}px`,
                "top": `${TOP_POSITION}px` 

            }).attr("src", normalMode);

        } else if (button == "up") {

            moveButtons[button].css({
           
                "left": `${LEFT_POSITION + -moveButtons[button].width() / 2}px`,
                "top": `${TOP_POSITION}px`
            
            });

        } else if (button == "down") {

            moveButtons[button].css({

                "transform": "rotate(180deg)",
                "left": `${LEFT_POSITION + -moveButtons[button].width() / 2}px`,
                "top": `${TOP_POSITION + moveButtons[button].height() + SPACING}px`
                
            });

        } else if (button == "right") {

            moveButtons[button].css({

                "transform": "rotate(90deg)",
                "left": `${LEFT_POSITION + moveButtons[button].width() / 2 + SPACING}px`,
                "top": `${TOP_POSITION + moveButtons[button].height() + SPACING}px`
                
            });

        } else if (button == "left") {

            moveButtons[button].css({

                "transform": "rotate(-90deg)",
                "left": `${LEFT_POSITION + -3 * moveButtons[button].width() / 2 - SPACING}px`,
                "top": `${TOP_POSITION + moveButtons[button].height() + SPACING}px`
                
            });

        }

    }

    // Get touchstart input
    let dirTrue;
    let isSlow = false;
    for (const button in moveButtons) {
        
        if (button == "slow") {

            $(moveButtons[button]).on("touchstart", () => {

                isSlow = !isSlow;
                if (isSlow) {
                    
                    moveButtons[button].attr("src", slowMode);
                    $.ajax({

                        type: "POST",
                        url: "/setMultiplier",
                        data : {"multiplier": "0.5"}
            
                    });
                
                } else {

                    moveButtons[button].attr("src", normalMode);
                    $.ajax({

                        type: "POST",
                        url: "/setMultiplier",
                        data : {"multiplier": "1.0"}
            
                    });

                }

            });

        } else if (button == "up") {
            
            $(moveButtons[button]).on("touchstart", () => {

                moveButtons[button].attr("src", pressed);
                dirTrue = "UP";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"DIR": dirTrue}
        
                }); 
    
            });

        } else if (button == "down") {

            $(moveButtons[button]).on("touchstart", () => {

                moveButtons[button].attr("src", pressed);
                dirTrue = "DOWN";
              
                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"DIR": dirTrue}
        
                }); 
    
            });

        } else if (button == "right") {

            $(moveButtons[button]).on("touchstart", () => {

                moveButtons[button].attr("src", pressed);
                dirTrue = "RIGHT";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"DIR": dirTrue}
        
                }); 
    
            });

        } else if (button == "left") {
            
            $(moveButtons[button]).on("touchstart", () => {

                moveButtons[button].attr("src", pressed);
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
    for (const button in moveButtons) {
        
        if (button == "up") {
            
            $(moveButtons[button]).on("touchend", () => {

                moveButtons[button].attr("src", unpressed);
                dirFalse = "UP";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"DIR": dirFalse}
        
                });  
    
            });

        } else if (button == "down") {

            $(moveButtons[button]).on("touchend", () => {

                moveButtons[button].attr("src", unpressed);
                dirFalse = "DOWN";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"DIR": dirFalse}
        
                });  
    
            });

        } else if (button == "right") {

            $(moveButtons[button]).on("touchend", () => {

                moveButtons[button].attr("src", unpressed);
                dirFalse = "RIGHT";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"DIR": dirFalse}
        
                });  
    
            });

        } else if (button == "left") {
            
            $(moveButtons[button]).on("touchend", () => {

                moveButtons[button].attr("src", unpressed);
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