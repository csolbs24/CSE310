#include <iostream>
using namespace std;

class TicTacToe {
public:
    int turnNumber = 0;
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
    void updateBoard(int boardIndex) {
        board[boardIndex / 3][boardIndex % 3] = ((turnNumber % 2 == 0) ? 'O' : 'X');
    }
    bool didWin() {
        // Check across each row
        for (int i = 0; i < 3; i++) {
            if (
                (board[i][0] == board[i][1]) &&
                (board[i][0] == board[i][2]) &&
                (board[i][0] != ' '))
                return true;
        }

        // Check across each column
        for (int i = 0; i < 3; i++) {
            if (
                (board[0][i] == board[1][i]) &&
                (board[0][i] == board[2][i]) &&
                (board[0][i] != ' '))
                return true;
        }

        // Check the diagonals
        if (
            (board[0][0] == board[1][1]) &&
            (board[0][0] == board[2][2]) &&
            (board[0][0] != ' '))
            return true;
        if (
            (board[0][2] == board[1][1]) &&
            (board[0][2] == board[2][0]) &&
            (board[0][2] != ' '))
            return true;

        // Default means no match
        return false;
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
    char playIndexChar;
    int playIndex;
    do {
        if (ticTacToe.turnNumber > 8) {
            cout << "You stalemate. You bad. Try again??";
            return 0;
        }
        ticTacToe.printBoard();
        ticTacToe.turnNumber++;
        cout << ((ticTacToe.turnNumber % 2 == 0) ? "O" : "X");
        cout << "\'s turn. Type index of where you want to play: ";
        cin >> playIndexChar;
        playIndex = playIndexChar - '1';
        ticTacToe.updateBoard(playIndex);
    }
    while (!ticTacToe.didWin());

    cout << "Congratulations! " << ((ticTacToe.turnNumber % 2 == 0) ? "O" : "X") << " has won!!!";
    
    return 0;
} 