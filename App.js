import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  PaperProvider,
  Button,
  Text,
  Surface,
  MD3DarkTheme,
} from "react-native-paper";

const BOTOES = [
  ["C", "⌫", "/", "*"],
  ["7", "8", "9", "-"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "="],
  ["0", ".", "", ""],
];

const OPERADORES = ["+", "-", "*", "/"];

function calcular(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
    default: return b;
  }
}

function formatar(n) {
  // evita erros de ponto flutuante, ex.: 0.1 + 0.2
  return String(parseFloat(n.toFixed(10)));
}

export default function App() {
  const [display, setDisplay] = useState("0");
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [novoNumero, setNovoNumero] = useState(true);

  const limpar = () => {
    setDisplay("0");
    setValorAnterior(null);
    setOperador(null);
    setNovoNumero(true);
  };

  const apagar = () => {
    if (novoNumero) return;
    setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
  };

  const digitar = (d) => {
    if (novoNumero) {
      setDisplay(d === "." ? "0." : d);
      setNovoNumero(false);
    } else {
      if (d === "." && display.includes(".")) return;
      setDisplay(display + d);
    }
  };

  const escolherOperador = (op) => {
    const atual = parseFloat(display);
    if (operador && !novoNumero) {
      const r = calcular(valorAnterior, atual, operador);
      if (r === null) {
        limpar();
        setDisplay("Erro");
        return;
      }
      setValorAnterior(r);
      setDisplay(formatar(r));
    } else {
      setValorAnterior(atual);
    }
    setOperador(op);
    setNovoNumero(true);
  };

  const igual = () => {
    if (!operador || valorAnterior === null) return;
    const r = calcular(valorAnterior, parseFloat(display), operador);
    if (r === null) {
      limpar();
      setDisplay("Erro");
      return;
    }
    setDisplay(formatar(r));
    setValorAnterior(null);
    setOperador(null);
    setNovoNumero(true);
  };

  const aoPressionar = (b) => {
    if (b === "C") limpar();
    else if (b === "⌫") apagar();
    else if (b === "=") igual();
    else if (OPERADORES.includes(b)) escolherOperador(b);
    else digitar(b);
  };

  return (
    <PaperProvider theme={MD3DarkTheme}>
      <View style={styles.container}>
        <Surface style={styles.display} elevation={2}>
          <Text variant="titleMedium" style={styles.historico}>
            {valorAnterior !== null ? `${valorAnterior} ${operador ?? ""}` : " "}
          </Text>
          <Text
            variant="displayMedium"
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {display}
          </Text>
        </Surface>

        <View style={styles.teclado}>
          {BOTOES.map((linha, i) => (
            <View key={i} style={styles.linha}>
              {linha.map((b, j) =>
                b === "" ? (
                  <View key={j} style={styles.vazio} />
                ) : (
                  <Button
                    key={j}
                    mode={
                      OPERADORES.includes(b) || b === "=" ? "contained" : "contained-tonal"
                    }
                    style={[styles.botao, b === "=" && styles.igual]}
                    contentStyle={styles.botaoConteudo}
                    labelStyle={styles.botaoTexto}
                    onPress={() => aoPressionar(b)}
                  >
                    {b}
                  </Button>
                )
              )}
            </View>
          ))}
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    paddingTop: 60,
  },
  display: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  historico: { opacity: 0.6 },
  teclado: { gap: 8 },
  linha: { flexDirection: "row", gap: 8 },
  botao: { flex: 1, borderRadius: 12 },
  botaoConteudo: { height: 70 },
  botaoTexto: { fontSize: 24 },
  vazio: { flex: 1 },
  igual: { position: "absolute", right: 0, height: 148 },
});