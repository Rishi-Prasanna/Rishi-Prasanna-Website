// Cursor stuff.
var cursor;
function createCursor() {
    cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', function(e){
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
    });
}

createCursor();
document.addEventListener("astro:after-swap", createCursor);