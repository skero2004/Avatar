class InputHandler {

    constructor(elements, properties) {

        // All elements
        this.elements = elements;

        // All robot properties
        this.properties = properties;

        // Prevent multi-touch
        this.isPressed = false;
        this.pressedKey;

        // Event listeners
        document.addEventListener("keydown", this.onKeyDown.bind(this));
        document.addEventListener("keyup", this.onKeyUp.bind(this));
        document.addEventListener("touchstart", this.onTouchStart.bind(this));
        document.addEventListener("touchend", this.onTouchEnd.bind(this));
        document.addEventListener("click", this.onClick.bind(this));

    }

    onKeyDown(e) {

        // Prevent spamming
        if (!this.isPressed) {

            this.isPressed = true;
            this.pressedKey = e.key;

            switch(e.key) {

                // Move the robot
                case "w":
                    if (!this.elements.nameSender.isSelected())
                        this.elements.upButton.press("/setDirection", "up")
                    break;
                case "a":
                    if (!this.elements.nameSender.isSelected())
                        this.elements.leftButton.press("/setDirection", "left");
                    break;
                case "s":
                    if (!this.elements.nameSender.isSelected())
                        this.elements.downButton.press("/setDirection", "down");
                    break;
                case "d":
                    if (!this.elements.nameSender.isSelected())
                        this.elements.rightButton.press("/setDirection", "right");
                    break;
    
                // Slow the robot
                case "Shift":
                    // Prevent slow mode when typing name
                    if (!this.elements.nameSender.isSelected()) {

                        this.properties.isSlow = !this.properties.isSlow;
                        if (this.properties.isSlow) {
        
                            this.elements.slowButton.press("/setMultiplier", 0.7);
        
                        } else {
        
                            this.elements.slowButton.press("/setMultiplier", 1);
                            this.elements.slowButton.toggleImage();
        
                        }
                        
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

        }

        // Type on textbox if it is selected
        if (this.elements.nameSender.isSelected()) {
    
            this.elements.nameSender.typeText(e);

        }

    }

    onKeyUp(e) {

        // Unpress only the pressed key
        if (e.key == this.pressedKey) {

            this.isPressed = false

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

    }

    onTouchStart(e) {

        switch(e.target.name) {
            
            // Move the robot
            case "up":
                this.elements.upButton.press("/setDirection", "up");
                break;
            case "left":
                this.elements.leftButton.press("/setDirection", "left");
                break;
            case "down":
                this.elements.downButton.press("/setDirection", "down");
                break;
            case "right":
                this.elements.rightButton.press("/setDirection", "right");
                break;

            // Slow the robot
            case "slow":
                this.properties.isSlow = !this.properties.isSlow;
                if (this.properties.isSlow) {

                    this.elements.slowButton.press("/setMultiplier", 0.7);

                } else {

                    this.elements.slowButton.press("/setMultiplier", 1);
                    this.elements.slowButton.toggleImage();

                }
                break;

            // Raise and lower the lift
            case "raise":
                this.elements.raiseButton.press("/setExtendPower", -1);
                break;
            case "lower":
                this.elements.lowerButton.press("/setExtendPower", 1);
                break;

        }

    }

    onTouchEnd(e) {

        switch(e.target.name) {

            // Stop the robot
            case "up":
                this.elements.upButton.unpress("/setDirectionZero", "up");
                break;
            case "left":
                this.elements.leftButton.unpress("/setDirectionZero", "left");
                break;
            case "down":
                this.elements.downButton.unpress("/setDirectionZero", "down");
                break;
            case "right":
                this.elements.rightButton.unpress("/setDirectionZero", "right");
                break;

            // Stop moving lift
            case "raise":
                this.elements.raiseButton.unpress("/setExtendPowerZero");
                break;
            case "lower":
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

}