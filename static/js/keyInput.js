$(function() {

    // Get buttons
    let buttons = $("#buttons").children();

    // Source
    let unpressed = $("#unpressed").attr("src");
    let pressed = $("#pressed").attr("src");
    let slowMode = $("#slowMode").attr("src");
    let normalMode = $("#normalMode").attr("src");
    let raise = $("#raise").attr("src");
    let raisePressed = $("#raisePressed").attr("src");
    let lower = $("#lower").attr("src");
    let lowerPressed = $("#lowerPressed").attr("src");

    let isSlow = false;
    let isPressed = [false, false, false, false, false, false];

    // Get keydown input    
    $(document).on("keydown", e => {

        if ($("#textbox").children().attr("src") == $("#textSelected").attr("src")) {

            return false;

        }

        let dir;
        if (e.key == "w") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "up") {

                    buttons[i].src = pressed;

                }

            }
            dir = "up";

        } 
        if (e.key == "a") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "left") {

                    buttons[i].src = pressed;

                }

            }
            dir = "left";

        } 
        if (e.key == "s") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "down") {

                    buttons[i].src = pressed;

                }

            }
            dir = "down";

        } 
        if (e.key == "d") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "right") {

                    buttons[i].src = pressed;

                }

            }
            dir = "right";

        } 
        if (e.key == "ArrowUp" && !isPressed[4]) {

            isPressed[4] = true;

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "raise") {

                    buttons[i].src = raisePressed;

                }

            }

            $.ajax({

                type: "POST",
                url: "/setExtendPower",
                data : {"power": 1}
    
            });

        } 
        if (e.key == "ArrowDown" && !isPressed[5]) {

            isPressed[5] = true;

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "lower") {

                    buttons[i].src = lowerPressed;

                }

            }

            $.ajax({

                type: "POST",
                url: "/setExtendPower",
                data : {"power": -1}
    
            });

        }
        if (e.key == "Shift") {

            isSlow = !isSlow;
            if (isSlow) {

                $.ajax({

                    type: "POST",
                    url: "/setMultiplier",
                    data : {"multiplier": "0.5"}
        
                });

            } else {

                $.ajax({

                    type: "POST",
                    url: "/setMultiplier",
                    data : {"multiplier": "1"}
        
                });

            }

            // Update graphics
            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "slow") {

                    if (isSlow)
                        buttons[i].src = slowMode;
                    else 
                        buttons[i].src = normalMode;

                }

            }

        }

        if ((e.key == "w" && !isPressed[0]) || (e.key == "a" && !isPressed[1]) ||
            (e.key == "s" && !isPressed[2]) || (e.key == "d" && !isPressed[3])) {

            if (e.key == "w") isPressed[0] = true;
            if (e.key == "a") isPressed[1] = true;
            if (e.key == "s") isPressed[2] = true;
            if (e.key == "d") isPressed[3] = true;
            
            $.ajax({

                type: "POST",
                url: "/setDirection",
                data : {"dir": dir}
    
            });

        }
        
    });

    // Get keydown input
    $(document).on("keyup", e => {

        let dir;
        if (e.key == "w") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "up") {

                    buttons[i].src = unpressed;
                    isPressed[0] = false;

                }

            }
            dir = "up";

        } 
        if (e.key == "a") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "left") {

                    buttons[i].src = unpressed;
                    isPressed[1] = false;

                }

            }
            dir = "left";

        } 
        if (e.key == "s") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "down") {

                    buttons[i].src = unpressed;
                    isPressed[2] = false;

                }

            }
            dir = "down";

        } 
        if (e.key == "d") {

            for (let i = 0; i < buttons.length; i++) {

                if (buttons[i].name == "right") {

                    buttons[i].src = unpressed;
                    isPressed[3] = false;

                }

            }
            dir = "right";

        } 
        if (e.key == "ArrowUp" || e.key == "ArrowDown") {

            if (e.key == "ArrowUp") {
             
                isPressed[4] = false;
            
                for (let i = 0; i < buttons.length; i++) {

                    if (buttons[i].name == "raise") {
    
                        buttons[i].src = raise;
    
                    }
    
                }

            }
            if (e.key == "ArrowDown") {
            
                isPressed[5] = false;
            
                for (let i = 0; i < buttons.length; i++) {

                    if (buttons[i].name == "lower") {
    
                        buttons[i].src = lower;
    
                    }
    
                }

            }
            $.ajax({

                url: "/setExtendPowerZero"
    
            });

        } 

        if (dir) {

            $.ajax({

                type: "POST",
                url: "/setDirectionZero",
                data : {"dir": dir}
    
            });

        }

    });

});