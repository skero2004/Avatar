class InputHandler {

    constructor(elements, properties) {

        // All elements
        this.elements = elements;

        // All robot properties
        this.properties = properties;

        // List of inputs
        this.isW = false;
        this.isA = false;
        this.isS = false;
        this.isD = false;
        this.isUp = false;
        this.isDown = false;

        // Event listeners
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
        document.addEventListener("touchstart", this.onTouchStart.bind(this));
        document.addEventListener("touchend", this.onTouchEnd.bind(this));
        document.addEventListener("click", this.onClick.bind(this));

    }

    onKeyDown(e) {
        
        switch(e.key) {

            // Move the robot
            case "w":
                this.elements.upButton.press("/setDirection", "up");
                break;
            case "a":
                this.elements.leftButton.press("/setDirection", "left");
                break;
            case "s":
                this.elements.downButton.press("/setDirection", "down");
                break;
            case "d":
                this.elements.rightButton.press("/setDirection", "right");
                break;

            // Slow the robot
            case "Shift":
                this.properties.isSlow = !this.properties.isSlow;
                if (this.properties.isSlow) {

                    this.elements.slowButton.press("/setMultiplier", 0.7);

                } else {

                    this.elements.slowButton.press("/setMultiplier", 1);
                    this.elements.slowButton.toggleImage();

                }
                break;

            // Raise and lower the lift
            case "ArrowUp":
                this.elements.raiseButton.press("/setExtendPower", -1);
                break;
            case "ArrowDown":
                this.elements.lowerButton.press("/setExtendPower", 1);
                break;

        }

        // Type on textbox if it is selected
        if (this.elements.nameSender.isSelected()) {

            this.elements.nameSender.typeText(e);

        }

    }

    onKeyUp(e) {

        switch(e.key) {

            // Stop the robot
            case "w":
                this.elements.upButton.unpress("/setDirectionZero", "up");
                break;
            case "a":
                this.elements.leftButton.unpress("/setDirectionZero", "left");
                break;
            case "s":
                this.elements.downButton.unpress("/setDirectionZero", "down");
                break;
            case "d":
                this.elements.rightButton.unpress("/setDirectionZero", "right");
                break;

            // Stop moving lift
            case "ArrowUp":
                this.elements.raiseButton.unpress("/setExtendPowerZero");
                break;
            case "ArrowDown":
                this.elements.lowerButton.unpress("/setExtendPowerZero");
                break;

        }

    }

    onTouchStart(e) {

        switch(e.target) {

            // Move the robot
            case this.elements.upButton.img:
                this.elements.upButton.press("/setDirection", "up");
                break;
            case this.elements.leftButton.img:
                this.elements.leftButton.press("/setDirection", "left");
                break;
            case this.elements.downButton.img:
                this.elements.downButton.press("/setDirection", "left");
                break;
            case this.elements.rightButton.img:
                this.elements.rightButton.press("/setDirection", "left");
                break;

            // Slow the robot
            case this.elements.slowButton.img:
                this.properties.isSlow = !this.properties.isSlow;
                if (this.properties.isSlow) {

                    this.elements.slowButton.press("/setMultiplier", 0.7);

                } else {

                    this.elements.slowButton.press("/setMultiplier", 1);

                }
                this.elements.slowButton.toggleImage();
                break;

            // Raise and lower the lift
            case this.elements.raiseButton.img:
                this.elements.raiseButton.press("/setExtendPower", -1);
                break;
            case this.elements.lowerButton.img:
                this.elements.lowerButton.press("/setExtendPower", 1);
                break;

        }

    }

    onTouchEnd(e) {

        switch(e.target) {

            // Stop the robot
            case this.elements.upButton.img:
                this.elements.upButton.unpress("/setDirectionZero", "up");
                break;
            case this.elements.leftButton.img:
                this.elements.leftButton.unpress("/setDirectionZero", "left");
                break;
            case this.elements.downButton.img:
                this.elements.downButton.unpress("/setDirectionZero", "down");
                break;
            case this.elements.rightButton.img:
                this.elements.rightButton.unpress("/setDirectionZero", "right");
                break;

            // Stop moving lift
            case this.elements.raiseButton.img:
                this.elements.raiseButton.unpress("/setExtendPowerZero");
                break;
            case this.elements.lowerButton.img:
                this.elements.lowerButton.unpress("/setExtendPowerZero");
                break;

        }

    }

    onClick(e) {

        if ($(e.target).is(this.elements.nameSender.box) || 
            $(e.target).is(this.elements.nameSender.text) || 
            $(e.target).is(this.elements.nameSender.text.children())) {

            // If clicked on name sender, select
            this.elements.nameSender.select();

            // Set text if mobile
            if (isMobile) {

                this.elements.nameSender.mobileTypeText();
                this.elements.nameSender.unselect();

            }


        } else if (this.elements.nameSender.isSelected()) {

            // If clicked outside of name sender and it was clicked, unselect
            this.elements.nameSender.unselect();

        }

    }

    update() {

        

    }

}