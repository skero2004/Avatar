class Elements {

    constructor() {

        // Create buttons
        this.raiseButton = new Button($("#raise").attr("src"), $("#raisePressed").attr("src"), 1);
        this.lowerButton = new Button($("#lower").attr("src"), $("#lowerPressed").attr("src"), 2);
        this.slowButton = new Button($("#normalMode").attr("src"), $("#slowMode").attr("src"), 4);
        this.upButton = new Button($("#unpressed").attr("src"), $("#pressed").attr("src"), 5);
        this.leftButton = new Button($("#unpressed").attr("src"), $("#pressed").attr("src"), 7);
        this.leftButton.rotate(-90);
        this.downButton = new Button($("#unpressed").attr("src"), $("#pressed").attr("src"), 8);
        this.downButton.rotate(180);
        this.rightButton = new Button($("#unpressed").attr("src"), $("#pressed").attr("src"), 9);
        this.rightButton.rotate(90);

        // Create name sender
        this.nameSender = new NameSender();

    }

}