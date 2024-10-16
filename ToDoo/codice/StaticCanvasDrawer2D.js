class StaticCanvasDrawer2D
{
    CanvasDrawer2D(id)
    {
        this.canvas = document.getElementById(id).getContext('2d');
    }

    setColor(hex)
    {
        this.canvas.strokeStyle = hex;
        this.canvas.fillStyle = hex;
    }

    setLineWidth(width)
    {
        this.canvas.lineWidth = width;
    }

    drawLine(x1, y1, x2, y2)
    {
        this.canvas.beginPath();
        this.canvas.moveTo(x1,y1);
        this.canvas.lineTo(x2,y2);
        this.canvas.closePath();
        this.canvas.stroke();
    }

    drawSquare(x,y,d,fill)
    {
        this.canvas.strokeRect(x,y,d,d)
        if(fill)
        {
            this.canvas.fillRect(x,y,d,d);
        }
    }

    drawRect(x1,y1,w,h,fill)
    {
        this.canvas.strokeRect(x1,y1,w,h)
        if(fill)
        {
            this.canvas.fillRect(x1,y1,w,h);
        }
    }

    drawCircle(x,y,r,s,w,clockwise)
    {
        this.canvas.beginPath()
        this.canvas.arc(x,y,r,s,s+w,clockwise);
        this.canvas.stroke();
    }
}