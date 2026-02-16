import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Noughts & Crosses</Text>
      
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.square} 
            onPress={() => handlePress(index)}
          >
            <Text style={[
              styles.cellText, 
              { color: cell === 'X' ? '#FF5E5E' : '#32CD32' }
            ]}>
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {winner && <Text style={styles.winnerText}>Winner: {winner}!</Text>}
      {!winner && !board.includes(null) && <Text style={styles.winnerText}>It's a Draw!</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Restart Game" onPress={resetGame} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#000',
    borderWidth: 2,
  },
  square: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  cellText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  winnerText: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: '600',
    color: 'blue',
  },
  buttonContainer: {
    marginTop: 20,
  }
});