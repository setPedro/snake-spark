use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Rectangle {
    position: (f64, f64),
    direction: (i32, i32),
    speed: f64,
}

#[wasm_bindgen]
impl Rectangle {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            position: (10.5, 10.5),
            direction: (1, 0),
            speed: 1.0
        }
    }

    #[wasm_bindgen]
    pub fn move_snake(&mut self, input: char) {
        self.direction = match input.to_ascii_lowercase() {
            'w' => (0, -1),
            'a' => (-1, 0),
            's' => (0, 1),
            'd' => (1, 0),
            _ => self.direction
        };
    }

    #[wasm_bindgen]
    pub fn update(&mut self, delta_time: f64) {
        self.position.0 += self.direction.0 as f64 * self.speed * delta_time;
        self.position.1 += self.direction.1 as f64 * self.speed * delta_time;
    }

    #[wasm_bindgen(getter)]
    pub fn position(&self) -> Vec<f64> {
        vec![self.position.0, self.position.1]
    }

    #[wasm_bindgen(getter)]
    pub fn direction(&self) -> Vec<i32> {
        vec![self.direction.0, self.direction.1]
    }
}
