#include <iostream>
using namespace std;

const char* blank = " ";
const char* x = "x";
const char* o = "o";

class TicTacToe {
public:
    char board[3][3];
    void printBoard() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                cout << board[i][j];
            }
            cout << "\n";
        }
    }
    void updateBoard() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if ((i + j) % 2 == 0) {
                    board[i][j] = *x;
                }
                else {
                    board[i][j] = *o;
                }
            }
        }
    }
    TicTacToe() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                board[i][j] = *blank;
            }
        }
    }
};

int main() {
    TicTacToe ticTacToe = TicTacToe();
    ticTacToe.updateBoard();
    ticTacToe.printBoard();
    return 0;
} 