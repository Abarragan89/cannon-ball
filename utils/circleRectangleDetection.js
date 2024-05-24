export default function isCircleInRectangle(circleX, circleY, radius, rectX, rectY, rectWidth, rectHeight) {
    // Check if the circle is to the left of the rectangle
    const circleRight = circleX + radius;
    if (circleRight < rectX) return false;

    // Check if the circle is to the right of the rectangle
    const circleLeft = circleX - radius;
    if (circleLeft > rectX + rectWidth) return false;

    // Check if the circle is above the rectangle
    const circleBottom = circleY + radius;
    if (circleBottom < rectY) return false;

    // Check if the circle is below the rectangle
    const circleTop = circleY - radius;
    if (circleTop > rectY + rectHeight) return false;

    // If none of the above, the circle is at least touching the rectangle
    return true;
}

