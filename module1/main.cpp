#include <iostream>
using namespace std;

//const char* blank = " ";
//const char* x = "x";
//const char* o = "o";
//
//bool isCharBlank(char* c) {
//    if (c == NULL) return true;
//    if (c[0] == ' ') return true;
//}

class TicTacToe {
public:
    char board[3][3];
    void printBoard() {
        cout << "┏━━━┳━━━┳━━━┓\n";
        for (int i = 0; i < 3; i++) {
            cout << "┃ ";
            for (int j = 0; j < 3; j++) {
                if (board[i][j] == ' ') {
                    cout << i * 3 + j + 1;
                }
                else {
                    cout << board[i][j];
                }
                cout << " ┃ ";
            }
            cout << "\n";
            if (i != 2) {
                cout << "┣━━━╋━━━╋━━━┫\n";
            }
            else {
                cout << "┗━━━┻━━━┻━━━┛\n";
            }
        }
    }
    void updateBoard() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if ((i + j) % 3 == 0) {
                    board[i][j] = 'x';
                }
                else if ((i + j) % 3 == 1) {

                }
                else {
                    board[i][j] = 'o';
                }
            }
        }
    }
    TicTacToe() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                board[i][j] = ' ';
            }
        }
    }
};

int main() {
    TicTacToe ticTacToe = TicTacToe();
    ticTacToe.printBoard();
    return 0;
} 