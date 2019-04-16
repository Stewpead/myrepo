class PriceRuler {
	constructor(id, x, y, divs, start, end) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		
		this.rulerPos = 0;
		
		this.x = x;
		//this.y = y;
		this.y = this.canvas.height / 2;
		this.divisions = divs;
		this.start = start;
		this.end = end;
		this.divPriceStep = Math.ceil(this.end / this.divisions);

		this.divHeight = 25;
		this.midDivHeight = 20;
		this.miniDivHeight = 10;
		this.markerHeight = 40;
		this.dataPointsHeight = this.y - 40;
		this.divPointHeight = this.y - 40;
		this.divPriceHeight = this.y + 40;
		
		this.movable = true;
		
		this.init();
		
		this.pos = 0;
		this.isDown = false;
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.dataPoints = [];
		
		this.canvas.addEventListener("mousedown", (e) => {
			if (this.movable) {
				this.isDown = true;
				this.offsetX = e.clientX;
				this.offsetY = e.clientY;
			}
		});
		
		this.canvas.addEventListener("mousemove", (e) => {
			if (this.isDown) {
				// tell the browser we're handling this event
				e.preventDefault();
				e.stopPropagation();
				
				let mx = parseInt(e.clientX - this.offsetX);
				let my = parseInt(e.clientY - this.offsetY);
				
				this.rulerPos = mx / this.miniDivSpacing;

				this.render();
			}
		});
		
		this.canvas.addEventListener("mouseup", (e) => {
			if (this.isDown) {
				this.isDown = false;
				this.adjustMarkerPos();
				console.log(this.getPrice());
			}
		});
		
		this.canvas.addEventListener("mouseout", (e) => {
			if (this.isDown) {
				this.isDown = false;
				this.adjustMarkerPos();
			}
		});
		
		this.canvas.addEventListener("resize", (e) => {
			this.init();
		});
	}
	
	init() {
		this.len = this.canvas.width - this.x * 2;
		this.spacing = this.len / this.divisions;
		this.ndiv = this.len / this.spacing;
		//this.horizontalLineLen = this.x + this.len;
		this.horizontalLineLen = this.x + this.canvas.width - this.x * 2; // 10 padding left and right
		
		this.miniDivSpacing = this.spacing / 10;
		this.miniDivRange = this.len / this.miniDivSpacing;
		this.miniDivStartPos = this.x + this.miniDivSpacing;
		
		this.midDivPos = this.spacing / 2 + this.x;
	}
	
	setMovable(flag) {
		this.movable = flag;
	}
	
	setPrice(price) {
		this.adjustMarkerPos();
		this.pos = price;
		this.render();
	}
	
	getPrice() {
		return this.pos + this.start;
	}
	
	setDataPoints(data) {
		this.dataPoints = data;
	}
	
	markDataPoints(data) {
		for (let i in data) {
			//let x = (data[i] - this.start) * this.miniDivSpacing + this.x + (Math.floor(data[i]) * this.divPriceStep);
			let x = ((data[i] - this.start) * 10 / this.divPriceStep) * this.miniDivSpacing;
			
			this.drawCircle(x, this.y, 3, "#FFFFFF");
			
			this.displayPrice(data[i], x, this.dataPointsHeight, "#ffffff"); 
		}
	}
	
	displayPrice(txt, x, y, color) {
		this.ctx.strokeStyle = color;

		this.ctx.fillStyle = color;
		this.ctx.fill();
		
		this.ctx.font = "10px Arial";
		this.ctx.textAlign = "center";
		let price = "$" + txt.toFixed(2);
		//let width = this.ctx.measureText(price).width;
		this.ctx.fillText(price, x, y);
	}
	
	displayDivPrices() {
		for (let i = 1; i < this.ndiv; ++i) {
			let pos = i * 10;
			let x = pos * this.miniDivSpacing + this.x;
			this.displayPrice(this.start + i * this.divPriceStep, x, this.divPriceHeight, "#ffffff"); 
		}
	}
	
	adjustMarkerPos() {
		let newPos = (this.pos + this.rulerPos) * this.miniDivSpacing + this.x;
			
		if (newPos > this.len + this.x) {
			newPos = this.len / this.miniDivSpacing;
		} else if (newPos < 0) {
			newPos = 0;
		} else {
			newPos = this.pos + this.rulerPos;
		}
		
		this.pos = newPos;
	}
	
	render() {
		// clear canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		// draw horizontal line
		this.draw(this.x, this.y, this.horizontalLineLen, this.y, "#FFFFFF");

		this.drawMiniDivisions();
		this.drawDivisions();
		this.drawMidDivisions();
		
		this.displayDivPrices();
		
		this.markDataPoints(this.dataPoints);
		
		this.drawMarker(this.pos + this.rulerPos);
		//this.drawCircle(100, 70, 50);

	}
	
	drawCircle(x, y, r, color) {
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, 2 * Math.PI);
		this.ctx.stroke();
		this.ctx.fillStyle = color;
		this.ctx.fill();
	}
	
	drawDivisions() {
		let y1 = this.y - this.divHeight;
		let y2 = this.y + this.divHeight;

		for (let i = 0; i <= this.ndiv; ++i) {
			let x1 = i * this.spacing + this.x;
			this.draw(x1, y1, x1, y2, "#FFFFFF");
		}
	}
	
	drawMidDivisions() {
		let y1 = this.y - this.midDivHeight;
		let y2 = this.y + this.midDivHeight;
		
		this.ctx.strokeStyle = "#252525";
		
		for (let i = 0; i < this.ndiv; ++i) {
			let x1 = i * this.spacing + this.midDivPos;
			this.draw(x1, y1, x1, y2);
		}
	}
	
	drawMiniDivisions() {
		let y1 = this.y - this.miniDivHeight;
		let y2 = this.y + this.miniDivHeight;

		for (let i = 0; i < this.miniDivRange; ++i) {
			let x1 = i * this.miniDivSpacing + this.miniDivStartPos;
			this.draw(x1, y1, x1, y2, "#707070");
		}
	}
	
	drawMarker(pos) {
		let y1 = this.y;
		let y2 = this.y + this.markerHeight;
		
		let tmpVal = ((pos - this.start) * 10 / this.divPriceStep) * this.miniDivSpacing;
		
		//let x1 = tmpVal * this.miniDivSpacing + this.x + (Math.floor(pos) * 10 * this.miniDivSpacing);
		let x1 = tmpVal + this.x;
		//let x1 = this.x + (pos * this.divPriceStep);
		
		if (x1 < this.x) {
			x1 = this.x;
		} else if (x1 > this.len + this.x) {
			x1 = this.len + this.x;
		}
		
		this.displayPrice(this.pos, x1, this.dataPointsHeight + 15, "#fff");
		this.drawCircle(x1, y1, 3, "#e61a24");
		this.draw(x1, y1, x1, y2, "#e61a24");
	}
	
	draw(x1, y1, x2, y2, color) {
		this.ctx.strokeStyle = color;
		this.ctx.beginPath();
		this.ctx.moveTo(x1, y1);
		this.ctx.lineTo(x2, y2);
		this.ctx.stroke();
	}
}