class Button {

    constructor(imgUnpressed, imgPressed, numPosition, name) {

        // Image element
        this.img = $("<img>");

        // Set up images
        this.imgUnpressed = imgUnpressed;
        this.imgPressed = imgPressed;

        // Append to buttons div element
        let div = $("#buttons");
        div.append(this.img);

        // Image setup
        this.img.attr({

            "src": imgUnpressed,
            "draggable": false,
            "name": name

        });
        this.img.css("position", "absolute");

        /* 
        
        numPosition detemines the place of the button
        ___________________
        |  1  |  2  |  3  |
        |_____|_____|_____|
        |  4  |  5  |  6  |
        |_____|_____|_____|
        |  7  |  8  |  9  |
        |_____|_____|_____|

        */

        const TOP_POSITION = isMobile ? 100 : -325;
        const LEFT_POSITION = isMobile ? -155 : -335;
        const SPACING = 105;
        const X_POS = (((numPosition - 1) % 3) * SPACING) + LEFT_POSITION;
        const Y_POS = (Math.floor((numPosition - 1) / 3) * SPACING) + TOP_POSITION;

        this.img.css({

            "left": X_POS,
            "top": Y_POS

        });

    }

    rotate(degrees) {

        this.img.css("transform", `rotate(${degrees}deg)`);

    }

    sendData(command, sendData = null) {

        if (sendData == null) {

            $.ajax({

                url: command
    
            });
            
        } else {
            
            $.ajax({
        
            type: "POST",
            url: command,
            data : {"data": sendData}

            });

        }

    }

    press(command, sendData = null) {

        this.img.attr("src", this.imgPressed);
        this.sendData(command, sendData);

    }

    unpress(command, sendData = null) {

        this.img.attr("src", this.imgUnpressed);
        this.sendData(command, sendData);

    }

    toggleImage() {

        if (this.img.attr("src") == this.imgUnpressed) {

            this.img.attr("src", this.imgPressed);

        } else {

            this.img.attr("src", this.imgUnpressed);

        }

    }

    update() {

        

    }

}