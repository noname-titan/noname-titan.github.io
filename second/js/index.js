// Canvas "close" Function

// "background-image: linear-gradient(to right top, #051937, #0d296a, #3a349c, #7633c8, #bc12eb);"
(function () {
    var canvasBody = document.getElementById("canvas"),
        canvas = canvasBody.getContext("2d"),

        w = canvasBody.width = window.innerWidth, //Full width
        h = canvasBody.height = window.innerHeight, //Full height

        tick = 0, //Tick in time

        //YOU CAN CHANGE OPTIONS HERE. DO NOT REALLY MESS WITH STUFF BELOW THAT
        opts = { //Options, you can change those
            backgroundColor: "#051937",
            backgroundColors: ["#051937","#0d296a", "#3a349c", "#7633c8", "#bc12eb"],
            radiusGrd: -w / 3 * 2,
            particleColor: "#fcfcfc",
            particleAmount: 100,
            defaultSpeed: 0.2,
            addedSpeed: 0.2,

            defaultRadius: 2,
            addedRadius: 2,

            communicationRadius: 150, //The radius for the line
        },
        particles = [],

        Particle = function (Xpos, Ypos) {
            this.x = Xpos ? Xpos : Math.random() * w; //If there is not position stated, it takes a random position
            this.y = Ypos ? Ypos : Math.random() * h; //Same here
            this.speed = opts.defaultSpeed + Math.random() * opts.addedSpeed; //Speed + a bit of random one
            this.directionAngle = Math.floor(Math.random() * 360); //The angle of this particle its moving. !!!! TRUE ONLY ON INIT
            this.color = opts.particleColor;
            this.radius = opts.defaultRadius + Math.random() * opts.addedRadius; //Radius + a bit of random radius
            this.d = { //Object, stores directions. Computes directions according to the random this.directionAngle
                x: Math.cos(this.directionAngle) * this.speed,
                y: Math.sin(this.directionAngle) * this.speed
            };
            this.update = function () { //The update function. The function that calculates next coordinates
                this.border(); //Checks if this particles touches the border and THEN computes the next coordinates
                this.x += this.d.x; //Just adding the direction to the X
                this.y += this.d.y; //Same but with Y
            };
            this.border = function () { //The border function. Checks if this thing touches the border
                if (this.x >= w || this.x <= 0) { //X walls
                    this.d.x *= -1;
                }
                if (this.y >= h || this.y <= 0) { //Floor and ceiling
                    this.d.y *= -1;
                }
                this.x > w ? this.x = w : this.x; //This is really important.
                this.y > h ? this.y = h : this.y; //Same
                this.x < 0 ? this.x = 0 : this.x; //Same
                this.y < 0 ? this.y = 0 : this.y; //Same
                /* line ~49 explanation
                    Because sometimes the speed of the particle can be faster, so it doesn't touch the border - it goes through. And when it goes back it doesn't go all the way inside - it stucks there. So, you have to set the X to the point when it touches. Same with Y
                */

            }
            this.draw = function () { //Just draws the points. Pretty easy. Takes the coords, color, radius - draws.
                canvas.beginPath()
                canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                canvas.closePath()
                canvas.fillStyle = this.color
                canvas.fill()
            }
        },
        checkDistance = function (x1, y1, x2, y2) { //You got it. The point on the graph distance formula.
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        },
        //Here goes the function that makes lines!
        // @param point1 -	The point that check for neighboors
        // @param father - 	The array the point suppose to take thing from
        communicatePoints = function (point1, father) {
            for (var i = 0; i < father.length; i++) {
                var distance = checkDistance(point1.x, point1.y, father[i].x, father[i].y);
                var opacity = 1 - distance / opts.communicationRadius;
                if (opacity > 0) { //Draws the line
                    canvas.lineWidth = opacity;
                    canvas.strokeStyle = "rgba(255,255,255,0.5)"
                    canvas.beginPath()
                    canvas.moveTo(point1.x, point1.y)
                    canvas.lineTo(father[i].x, father[i].y)
                    canvas.closePath()
                    canvas.stroke()
                }
            }
        }

    function setup() { //Function called once to set everything up
        for (var i = 0; i < opts.particleAmount; i++) {
            particles.push(new Particle())
        }
        window.requestAnimationFrame(loop)
    }

    function loop() { //Function of loop that will be called for a frame of the animation
        window.requestAnimationFrame(loop)
        tick++;

        //Drawing the background. Basically clearing the frame that was before
        let grd = canvas.createLinearGradient(0, 0, w, opts.radiusGrd/3);
        for (let i = 0; i < opts.backgroundColors.length; i++) {
            let t = 1 / (opts.backgroundColors.length)
            const color = opts.backgroundColors[i];
            grd.addColorStop((i) * t, color)
        }
        canvas.fillStyle = grd
        canvas.fillRect(0, 0, w, h)

        //Executing particle functions
        for (var i = 0; i < particles.length; i++) {
            particles[i].update()
            particles[i].draw()
        }
        //Executing lines
        for (var a = 0; a < particles.length; a++) {
            communicatePoints(particles[a], particles)
        }
    }

    //Executing the animation
    setup()

    //Some event listeners for backup to look professional
    window.addEventListener("resize", function () {
        if (w < window.innerWidth || h < window.innerHeight) {
            // particles.push(new Particle())
        } else {
            // particles.shift()
        }
        w = canvasBody.width = window.innerWidth;
        h = canvasBody.height = window.innerHeight;
    })
})()

// Document Element(s)
const nav = document.getElementById("nav")
const block = document.getElementById("block")
const nav_links = block.children[0].children
const _body_ = document.getElementById("body")
const _footer_ = document.getElementById("footer")

// Need Function(s)
const $toogle = function $toogle(el, cls) {
    if (el.classList.contains(cls)) {
        el.classList.remove(cls)
        // return true
    } else {
        el.classList.add(cls)
        // return false
    }
};
function navigation_view(ev) {
    $toogle(block, "view")
    $toogle(_body_, "move")
    $toogle(document.getElementById("top"), "move")
    $toogle(document.getElementById("canvas"), "move")
    $toogle(nav, "close")
}
nav.addEventListener("click", navigation_view)

var Scrollbar = window.Scrollbar;
Scrollbar.use(OverscrollPlugin)
var option = {
    damping: 0.10,
    thumbMinSize: 5,
    renderByPixel: true,
    alwaysShowTracks: false,
    continuousScrolling: true,
    plugins: {
        overscroll: {
            effect: 'bounce',
            damping: 0.15,
            maxOverscroll: 80
        }
    },

}
/**
 * @param { "#top" | "#gallery" | "#skill" | "#footer" } params 
 */
function changePos(params) {
    if (typeof params != "string" || params == "") {
        return
    }
    if (!(params == "#top" | params == "#gallery" | params == "#skill" | params == "#footer")) {
        return
    }
    s.scrollTop = document.querySelector(params).offsetTop

    if (block.classList.contains("view")) {
        navigation_view()
    }
}

var s = Scrollbar.init(document.querySelector('#body'), option);

setTimeout(() => {
    document.querySelectorAll(".scrollbar-track, .scrollbar-thumb").forEach((el) => {
        el.classList.remove("scrollbar-track", "scrollbar-thumb")
    })
}, 100)