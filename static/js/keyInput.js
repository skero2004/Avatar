$(function() {

    // Get moveButtons
    let moveButtons = $("#moveButtons").children();

    // Source
    let unpressed = $("#unpressed").attr("src");
    let pressed = $("#pressed").attr("src");
    let slowMode = $("#slowMode").attr("src");
    let normalMode = $("#normalMode").attr("src");
    let isSlow = false;

    // Get keydown input
    $(document).keydown(e => {

        let dir;
        if (e.key == "w" || e.key == "ArrowUp") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "up") {

                    moveButtons[i].src = pressed;

                }

            }
            dir = "UP";

        } else if (e.key == "a" || e.key == "ArrowLeft") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "left") {

                    moveButtons[i].src = pressed;

                }

            }
            dir = "LEFT";

        } else if (e.key == "s" || e.key == "ArrowDown") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "down") {

                    moveButtons[i].src = pressed;

                }

            }
            dir = "DOWN";

        } else if (e.key == "d" || e.key == "ArrowRight") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "right") {

                    moveButtons[i].src = pressed;

                }

            }
            dir = "RIGHT";

        }

        if (dir) {

            $.ajax({

                type: "POST",
                url: "/setDirection",
                data : {"DIR": dir}
    
            });

        }

    });

    // Get keydown input
    $(document).keyup(e => {

        let dir;
        if (e.key == "w" || e.key == "ArrowUp") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "up") {

                    moveButtons[i].src = unpressed;

                }

            }
            dir = "UP";

        } else if (e.key == "a" || e.key == "ArrowLeft") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "left") {

                    moveButtons[i].src = unpressed;

                }

            }
            dir = "LEFT";

        } else if (e.key == "s" || e.key == "ArrowDown") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "down") {

                    moveButtons[i].src = unpressed;

                }

            }
            dir = "DOWN";

        } else if (e.key == "d" || e.key == "ArrowRight") {

            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "right") {

                    moveButtons[i].src = unpressed;

                }

            }
            dir = "RIGHT";

        } else if (e.key = "Shift" && e.key != "Meta") {

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
                    data : {"multiplier": "1.0"}
        
                });

            }

            // Update graphics
            for (let i = 0; i < moveButtons.length; i++) {

                if (moveButtons[i].name == "slow") {

                    if (isSlow)
                        moveButtons[i].src = slowMode;
                    else 
                        moveButtons[i].src = normalMode;

                }

            }

        }

        if (dir) {

            $.ajax({

                type: "POST",
                url: "/setDirectionZero",
                data : {"DIR": dir}
    
            });

        }

    });

});