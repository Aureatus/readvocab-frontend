import { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

import type { DefinitionWord } from "../../types/dataTypes";

import WordDataContext from "../../library/context/WordDataContext";
import WordItem from "../WordItem";

const WordList = () => {
  const context = useContext(WordDataContext);
  if (context === null)
    return (
      <View>
        <Text>Unknown Error</Text>
      </View>
    );
  const { wordData, wordDataError } = context;

  const renderItem = ({ item }: { item: DefinitionWord }) => (
    <WordItem
      word={item.word}
      definition={item.definition}
      wordClass={item.wordClass}
    />
  );

  if (wordDataError)
    return (
      <View>
        <Text>{wordDataError.message}</Text>
      </View>
    );

  return wordData.length === 0 ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please upload a PDF to see it&apos;s rare words.
      </Text>
    </View>
  ) : (
    <View>
      <FlatList
        data={wordData}
        renderItem={renderItem}
        keyExtractor={(item) => item.word}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
  },
});

export default WordList;
