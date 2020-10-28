$(function() {

    const elements = new Elements();
    const properties = new RobotProperties();
    new InputHandler(elements, properties);

    // Main loop
    let lastTime = 0;
    function loop(timeStamp) {

        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;



        requestAnimationFrame(loop);

    }
    requestAnimationFrame(loop);

});