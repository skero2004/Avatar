$(function() {

    // Get arrows
    let arrows = $("#arrows").children();

    // Source
    let unpressed = $("#unpressed").attr("src");
    let pressed = $("#pressed").attr("src");

    // Get keydown input
    $(document).keydown(e => {

        let dir;
        if (e.key == "w" || e.key == "ArrowUp") {

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "up") {

                    arrows[i].src = pressed;

                }

            }
            dir = "UP";

        } else if (e.key == "a" || e.key == "ArrowLeft") {

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "left") {

                    arrows[i].src = pressed;

                }

            }
            dir = "LEFT";

        } else if (e.key == "s" || e.key == "ArrowDown") {

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "down") {

                    arrows[i].src = pressed;

                }

            }
            dir = "DOWN";

        } else if (e.key == "d" || e.key == "ArrowRight") {

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "right") {

                    arrows[i].src = pressed;

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

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "up") {

                    arrows[i].src = unpressed;

                }

            }
            dir = "UP";

        } else if (e.key == "a" || e.key == "ArrowLeft") {

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "left") {

                    arrows[i].src = unpressed;

                }

            }
            dir = "LEFT";

        } else if (e.key == "s" || e.key == "ArrowDown") {

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "down") {

                    arrows[i].src = unpressed;

                }

            }
            dir = "DOWN";

        } else if (e.key == "d" || e.key == "ArrowRight") {

            for (let i = 0; i < arrows.length; i++) {

                if (arrows[i].name == "right") {

                    arrows[i].src = unpressed;

                }

            }
            dir = "RIGHT";

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