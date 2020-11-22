class NameSender {

    constructor() {

        // Image sources
        this.imgUnselected = $("#textUnselected").attr("src");
        this.imgSelected = $("#textSelected").attr("src");

        // Textbox elements
        this.box = $("<img>");
        this.text = $("<p>");

        // Append elements to div
        $("#textbox").append(this.box);
        $("#textbox").append(this.text);

        // Image setup
        const BOTTOM_POSITION = isMobile ? -60 : 420;
        const DIFF = 20;
        const RIGHT_POSITION = 30;
        const FONT_SIZE = 30;   
        this.box.attr({

            "src": this.imgUnselected,
            "draggable": "false",
            "style": `position: absolute; bottom: ${BOTTOM_POSITION}px; ${isMobile ? "left: 50%; margin-right: -50%; transform: translate(-50%, 0)" : `right: ${RIGHT_POSITION}px`};`
    
        });
        this.text.attr("style", `text-align: left; font-size: ${FONT_SIZE}px; width: 400px; position: absolute; bottom: ${BOTTOM_POSITION - DIFF}px; ${isMobile ? "left: 50%; margin-right: -50%; transform: translate(-50%, 0)" : `right: ${RIGHT_POSITION}px`};`);

        // Change size if screen is too small
        if (isMobile && screen.width < this.box.width()) {

            this.box.width(screen.width);
            this.text.width(screen.width - 10);
    
        }

        // Set up text
        this.name = "Type in name here";
        this.setText(this.name);
        this.sendData("/setDisplay", "FRC Team 568 The Nerds of the North");

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

    setText(t) {

        // Empty text and replenish to use <span> instead of just <p>
        $(this.text).empty();
        for (let i = 0; i < t.length; i++) {

            $(this.text).append("<span>");
            $(this.text).children("span")[i].style = "font-family: Nasalization";
            $(this.text).children("span")[i].textContent = t[i];

        }

        this.sendData("/setDisplay", t);

    }

    mobileTypeText() {

        // Retreives name
        this.name = prompt("What is your name?");
        this.setText(this.name);

        // Delete letters that are going outside the border
        loop: for (let i = this.name.length - 1; i >= 0; i--) {

            if ($(this.text).children()[i].getBoundingClientRect().right < 
                $(this.box).get(0).getBoundingClientRect().right -10) {
                
                const len = this.name.length;
                if (i == len - 1) {

                    break loop;

                }
                for (let j = i + 1; j < len; j++) {

                    $(this.text).children()[i + 1].remove();

                }
                break loop;

            }

        }

    }

    typeText(e) {

        if (e.key == "Backspace") {

            // Delete if backspace
            this.name = this.name.substring(0, this.name.length - 1);

        } else if (((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123) || 
                    e.which == 8 || e.which == 32 || (e.which >= 48 && e.which <= 57)) &&
                    !(e.which >= 112 && e.which <= 123) || (e.which == 186) || (e.which == 190)) {

            // Add letter if valid letter
            if (this.name.length == 0)
                this.name += e.key;
            else if ($(this.text).children().last().get(0).getBoundingClientRect().right 
                < $(this.box).get(0).getBoundingClientRect().right - 45)
                this.name += e.key;

        }

        // Set the text and send data
        this.setText(this.name);

    }

    select() {

        // Change image
        this.box.attr("src", this.imgSelected);

        // If it is the first time clicked, then empty text
        if (this.name == "Type in name here") {

            this.setText("");
            this.name = "";
            this.isClicked = true;

        }

    }

    unselect() {

        // Change image
        this.box.attr("src", this.imgUnselected);

    }

    isSelected() {

        if (this.box.attr("src") == this.imgSelected) return true;
        else return false;

    }

}