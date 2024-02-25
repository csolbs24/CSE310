class Conway {
  sizeInput: HTMLInputElement | null = null
  board: HTMLCanvasElement | null = null
  context: CanvasRenderingContext2D | null | undefined = null
  board_size: number = 50
  SCALE: 2 = 2
  STEP_DELAY: 300 = 300

  board_info: boolean[][] = []

  constructor() {
    this.sizeInput = document.querySelector<HTMLInputElement>("#board-size")
    this.board = document.querySelector<HTMLCanvasElement>("#game-board")
    this.context = this.board?.getContext("2d")

    this.addEventListerners()

    // Populate board_info
    for (let i: number = 0; i < 100; i++) {
      this.board_info[i] = []
      for (let j: number = 0; j < 100; j++) {
        this.board_info[i][j] = false
      }
    }
  }

  addEventListerners() {
    // Add event listener for when the window is resized
    window.addEventListener("resize", (event) => {
      this.updateCanvasResolution()
      this.drawGrid()
    })

    // Event listener for when the canvas is clicked
    this.board?.addEventListener("click", (event) => {
      const mouse_position = this.getMousePos(event)

      if (this.board == null) {
        return
      }

      // Get the width of every square
      let square_width = this.board.width / this.board_size

      let clicked_x_index: number = Math.floor(mouse_position.x / square_width)
      let clicked_y_index: number = Math.floor(mouse_position.y / square_width)

      this.flipState(clicked_x_index, clicked_y_index)

      this.drawBoard()
    })

    // Add event listener for changing the board size
    this.sizeInput?.addEventListener("input", (event) => {
      // Set the board size to the value contained in the sizeInput element
      this.board_size = Number.parseFloat((event.target as HTMLInputElement).value)

      // Update the canvas resolution
      this.updateCanvasResolution()

      // Draw
      this.drawGrid()
    })

    let button = document.querySelector("#step")

    if (button === null) return

    button.addEventListener("click", () => {
      this.step(this)

      let that: Conway = this
      setInterval(() => this.step(that), this.STEP_DELAY)
    })
  }

  fillSquare(boardX: number, boardY: number): void {
    if (this.board == null) {
      console.error("board is null silly")
      return
    }
    if (this.context == null) {
      console.error("context is null oWo")
      return
    }
  
    // Get the size of each square
    const square_width: number = this.board.offsetWidth * this.SCALE / this.board_size
  
    this.context.fillRect(boardX * square_width, boardY * square_width, square_width, square_width)
    this.context.stroke()
  }

  // Returns the position of the mouse relative to the canvas
  getMousePos(mouseEvent: MouseEvent) {
    return {
      x: mouseEvent.clientX * this.SCALE,
      y: mouseEvent.clientY * this.SCALE
    }
  }
  
  /**
   * Update the resolution of the board
   */
  updateCanvasResolution(): void {
    if (this.board == null) {
      console.log("Whoa something went wrong here. board is null or undefined")
      return
    }
  
    let displayWidth: number = this.board.offsetWidth
    let displayHeight: number = this.board.offsetHeight
    this.board.width = displayWidth * this.SCALE;
    this.board.height = displayHeight * this.SCALE;
  
    // console.log(board.offsetHeight)
  }
  
  drawGrid() {
    if (this.board === null) {
      console.error("Game board does not exist??")
      return
    }
  
    // "==" checks for undefined
    if (this.context == null) {
      console.error("Game board context does not exist??")
      return
    }
  
    // this.context.strokeStyle = "#000000"

    let canvas_width: number = this.board.width
    let canvas_height: number = this.board.height
  
    for (let i: number = 1; i < this.board_size; i++) {
      this.context.moveTo(i * (canvas_width / this.board_size), 0)
      this.context.lineTo(i * (canvas_width / this.board_size), canvas_height)
    }
  
    for (let i: number = 1; i < this.board_size; i++) {
      this.context.moveTo(0, i * (canvas_width / this.board_size))
      this.context.lineTo(canvas_width, i * (canvas_width / this.board_size))
    }
  
    this.context.stroke()
  }

  drawBoard() {
    // Error checking
    if (this.board == null) {
      console.error("Board null")
      return
    }

    // Clear the canvas
    this.context?.clearRect(0, 0, this.board?.width, this.board?.height)

    this.drawGrid()

    for (let i: number = 0; i < this.board_size; i++) {
      for (let j: number = 0; j < this.board_size; j++) {
        if (this.board_info[i][j]) {
          this.fillSquare(i, j)
        }
      }
    }
  }

  flipState(x_pos: number, y_pos: number) {
    this.board_info[x_pos][y_pos] = ! this.board_info[x_pos][y_pos]
  }

  step(that: Conway) {
    console.log(that)

    let current_time: number = Date.now()

    let button = document.querySelector("#step")
    if (button == null) {
      console.log("Buttons was null")
      return
    }

    // Deep copy
    let board_copy: [][] = JSON.parse(JSON.stringify(that.board_info))

    // Definitly a more intellegent way of doing this
    for (let i: number = 0; i < that.board_size; i++) {
      for (let j: number = 0; j < that.board_size; j++) {
        let current_cell_neighbor_count: number = 0
        
        // Left cell
        if (!(i - 1 < 0) && (board_copy[i - 1][j])) {
          current_cell_neighbor_count += 1
        }
        
        // Right cell
         if (!(i + 1 > that.board_size) && (board_copy[i + 1][j])) {
          current_cell_neighbor_count += 1
        }

        // Top cell
        if (!(j - 1 < 0) && (board_copy[i][j - 1])) {
          current_cell_neighbor_count += 1
        }

        // Bottom cell
        if (!(j + 1 > that.board_size) && board_copy[i][j + 1]) {
          current_cell_neighbor_count += 1
        }

        // Top left
        if (!(i - 1 < 0) && !(j - 1 < 0) && board_copy[i - 1][j - 1]) {
          current_cell_neighbor_count += 1
        }

        // Top right
        if (!(i + 1 > that.board_size) && !(j - 1 < 0) && board_copy[i + 1][j - 1]) {
          current_cell_neighbor_count += 1
        }

        // Bottom left
        if (!(i - 1 < 0) && !(j + 1 > that.board_size) && board_copy[i - 1][j + 1]) {
          current_cell_neighbor_count += 1
        }

        // Bottom right
        if (!(i + 1 > that.board_size) && !(j + 1 > that.board_size) && board_copy[i + 1][j + 1]) {
          current_cell_neighbor_count += 1
        }

        // Diffrent rules if current cell is "dead" or "alive"
        if (board_copy[i][j]) {
          that.board_info[i][j] = !(current_cell_neighbor_count < 2 || current_cell_neighbor_count > 3)
        }
        else {
          that.board_info[i][j] = (current_cell_neighbor_count == 3)
        }
      }
    }

    // Redraw the board after updating cell info
    that.drawBoard()
  }
}

let conway = new Conway()