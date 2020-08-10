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

        const TOP_POSITION = -20;
        const SPACING = 5;
        if (arrow == "up") {

            arrows[arrow].css({
           
                "left": `${-arrows[arrow].width() / 2}px`,
                "top": `${TOP_POSITION}px`
            
            });

        } else if (arrow == "down") {

            arrows[arrow].css({

                "transform": "rotate(180deg)",
                "left": `${-arrows[arrow].width() / 2}px`,
                "top": `${TOP_POSITION + arrows[arrow].height() + SPACING}px`
                
            });

        } else if (arrow == "right") {

            arrows[arrow].css({

                "transform": "rotate(90deg)",
                "left": `${arrows[arrow].width() / 2 + SPACING}px`,
                "top": `${TOP_POSITION + arrows[arrow].height() + SPACING}px`
                
            });

        } else {

            arrows[arrow].css({

                "transform": "rotate(-90deg)",
                "left": `${-3 * arrows[arrow].width() / 2 - SPACING}px`,
                "top": `${TOP_POSITION + arrows[arrow].height() + SPACING}px`
                
            });

        }

    }

    // Get touchstart input
    let dir;
    for (const arrow in arrows) {
        
        if (arrow == "up") {
            
            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                dir = "UP";

                $.ajax({
        
                    type: "POST",
                    url: "/setDirectionTrue",
                    data : {"DIR": dir}
        
                }); 
    
            });

        } else if (arrow == "down") {

            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                ledOn = "LED_DOWN";
              
                $.ajax({
        
                    type: "POST",
                    url: "/turnOnLED",
                    data : {"LED": ledOn}
        
                }); 
    
            });

        } else if (arrow == "right") {

            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                ledOn = "LED_RIGHT";

                $.ajax({
        
                    type: "POST",
                    url: "/turnOnLED",
                    data : {"LED": ledOn}
        
                }); 
    
            });

        } else {
            
            $(arrows[arrow]).on("touchstart", () => {

                arrows[arrow].attr("src", pressed);
                ledOn = "LED_LEFT";

                $.ajax({
        
                    type: "POST",
                    url: "/turnOnLED",
                    data : {"LED": ledOn}
        
                }); 
    
            });

        }        

    }

    // Get touchend input
    let ledOff;
    for (const arrow in arrows) {
        
        if (arrow == "up") {
            
            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                ledOff = "LED_UP";

                $.ajax({
        
                    type: "POST",
                    url: "/turnOffLED",
                    data : {"LED": ledOff}
        
                });  
    
            });

        } else if (arrow == "down") {

            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                ledOff = "LED_DOWN";

                $.ajax({
        
                    type: "POST",
                    url: "/turnOffLED",
                    data : {"LED": ledOff}
        
                });  
    
            });

        } else if (arrow == "right") {

            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                ledOff = "LED_RIGHT";

                $.ajax({
        
                    type: "POST",
                    url: "/turnOffLED",
                    data : {"LED": ledOff}
        
                });  
    
            });

        } else {
            
            $(arrows[arrow]).on("touchend", () => {

                arrows[arrow].attr("src", unpressed);
                ledOff = "LED_LEFT";

                $.ajax({
        
                    type: "POST",
                    url: "/turnOffLED",
                    data : {"LED": ledOff}
        
                });  
    
            });

        }        

    }

});