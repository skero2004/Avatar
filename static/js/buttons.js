$(function() {

    // Create buttons
    let buttons = {

        up: $("<img>"),
        down: $("<img>"),
        right: $("<img>"),
        left: $("<img>"),
        slow: $("<img>"),
        raise: $("<img>"),
        lower: $("<img>")

    }

    // Source
    let unpressed = $("#unpressed").attr("src");
    let pressed = $("#pressed").attr("src");
    let slowMode = $("#slowMode").attr("src");
    let normalMode = $("#normalMode").attr("src");
    let raise = $("#raise").attr("src");
    let raisePressed = $("#raisePressed").attr("src");
    let lower = $("#lower").attr("src");
    let lowerPressed = $("#lowerPressed").attr("src");

    // Set up buttons
    let div = $("#buttons");
    for (const button in buttons) {

        // Append image to div
        div.append(buttons[button]);

        // Image setup
        
        buttons[button].attr({
        
            "src": unpressed,
            "draggable": "false",
            "name": button
            
        });
        buttons[button].css("position", "absolute");

        const TOP_POSITION = -240;
        const LEFT_POSITION = -180;
        const TO_HEAD_SPACING = 200
        const SPACING = 5;

        // Head raise buttons
        if (button == "raise") {

            buttons[button].css({

                "left": `${LEFT_POSITION + -3 * buttons[button].width() / 2 - SPACING}px`,
                "top": `${TOP_POSITION - TO_HEAD_SPACING}px` 

            }).attr("src", raise);

        } 
        if (button == "lower") {

            buttons[button].css({

                "left": `${LEFT_POSITION + -buttons[button].width() / 2}px`,
                "top": `${TOP_POSITION - TO_HEAD_SPACING}px`
                
            }).attr("src", lower);

        }

        // Robot move buttons
        if (button == "slow") {

            buttons[button].css({

                "left": `${LEFT_POSITION + -3 * buttons[button].width() / 2 - SPACING}px`,
                "top": `${TOP_POSITION}px` 

            }).attr("src", normalMode);

        } 
        if (button == "up") {

            buttons[button].css({
           
                "left": `${LEFT_POSITION + -buttons[button].width() / 2}px`,
                "top": `${TOP_POSITION}px`
            
            });

        } 
        if (button == "down") {

            buttons[button].css({

                "transform": "rotate(180deg)",
                "left": `${LEFT_POSITION + -buttons[button].width() / 2}px`,
                "top": `${TOP_POSITION + buttons[button].height() + SPACING}px`
                
            });

        } 
        if (button == "right") {

            buttons[button].css({

                "transform": "rotate(90deg)",
                "left": `${LEFT_POSITION + buttons[button].width() / 2 + SPACING}px`,
                "top": `${TOP_POSITION + buttons[button].height() + SPACING}px`
                
            });

        } 
        if (button == "left") {

            buttons[button].css({

                "transform": "rotate(-90deg)",
                "left": `${LEFT_POSITION + -3 * buttons[button].width() / 2 - SPACING}px`,
                "top": `${TOP_POSITION + buttons[button].height() + SPACING}px`
                
            });

        }

    }

    // Get touchstart input
    let dirTrue;
    let isSlow = false;
    for (const button in buttons) {
        
        if (button == "slow") {

            $(buttons[button]).on("touchstart", () => {

                isSlow = !isSlow;
                if (isSlow) {
                    
                    buttons[button].attr("src", slowMode);
                    $.ajax({

                        type: "POST",
                        url: "/setMultiplier",
                        data : {"multiplier": "0.5"}
            
                    });
                
                } else {

                    buttons[button].attr("src", normalMode);
                    $.ajax({

                        type: "POST",
                        url: "/setMultiplier",
                        data : {"multiplier": "1"}
            
                    });

                }

            });

        } 
        if (button == "raise") {

            $(buttons[button]).on("touchstart", () => {

                buttons[button].attr("src", raisePressed);

                $.ajax({
        
                    type: "POST",
                    url: "/setExtendPower",
                    data : {"power": 1}
        
                }); 
    
            });

        }
        if (button == "lower") {

            $(buttons[button]).on("touchstart", () => {

                buttons[button].attr("src", lowerPressed);

                $.ajax({
        
                    type: "POST",
                    url: "/setExtendPower",
                    data : {"power": -1}
        
                }); 
    
            });

        }
        if (button == "up") {
            
            $(buttons[button]).on("touchstart", () => {

                buttons[button].attr("src", pressed);
                dirTrue = "up";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"dir": dirTrue}
        
                }); 
    
            });

        } 
        if (button == "down") {

            $(buttons[button]).on("touchstart", () => {

                buttons[button].attr("src", pressed);
                dirTrue = "down";
              
                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"dir": dirTrue}
        
                }); 
    
            });

        } 
        if (button == "right") {

            $(buttons[button]).on("touchstart", () => {

                buttons[button].attr("src", pressed);
                dirTrue = "right";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"dir": dirTrue}
        
                }); 
    
            });

        } 
        if (button == "left") {
            
            $(buttons[button]).on("touchstart", () => {

                buttons[button].attr("src", pressed);
                dirTrue = "left";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirection",
                    data : {"dir": dirTrue}
        
                }); 
    
            });

        }        

    }

    // Get touchend input
    let dirFalse;
    for (const button in buttons) {
        
        if (button == "raise") {
            
            $(buttons[button]).on("touchend", () => {

                buttons[button].attr("src", raise);

                $.ajax({
        
                    url: "/setExtendPowerZero"
        
                });  
    
            });

        }
        if (button == "lower") {
            
            $(buttons[button]).on("touchend", () => {

                buttons[button].attr("src", lower);

                $.ajax({
        
                    url: "/setExtendPowerZero"
        
                });  
    
            });

        } 
        if (button == "up") {
            
            $(buttons[button]).on("touchend", () => {

                buttons[button].attr("src", unpressed);
                dirFalse = "up";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"dir": dirFalse}
        
                });  
    
            });

        } 
        if (button == "down") {

            $(buttons[button]).on("touchend", () => {

                buttons[button].attr("src", unpressed);
                dirFalse = "down";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"dir": dirFalse}
        
                });  
    
            });

        } 
        if (button == "right") {

            $(buttons[button]).on("touchend", () => {

                buttons[button].attr("src", unpressed);
                dirFalse = "right";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"dir": dirFalse}
        
                });  
    
            });

        } 
        if (button == "left") {
            
            $(buttons[button]).on("touchend", () => {

                buttons[button].attr("src", unpressed);
                dirFalse = "left";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionZero",
                    data : {"dir": dirFalse}
        
                });
    
            });

        }        

    }

});